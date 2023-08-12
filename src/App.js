import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const ImageGalleryMainDiv = styled.div`
  margin: 50px 0;
`;
const App = (props) => {
  const [model, setModel] = useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [tempImgSrc, setTempSrc] = useState("");
  const { images } = props;
  const imagesAfterLoad = () => {
    setIsLoaded(true);
  };
  const getImg = (src) => {
    setTempSrc(src);
    setModel(true);
  };
  const closeModel = () => {
    setModel(false);
  };
  const escFunction = (event) => {
    if (event.key === "Escape") {
      closeModel();
    }
  };
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (model && event.key === "Escape") {
        console.log("User pressed: ");
        event.preventDefault();
        closeModel();
      }
    };
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [model]);
  console.warn(images);

  return (
    <>
      <div
        className={model ? "model open" : " model"}
        onClick={closeModel}
        onKeyDown={escFunction}
      >
        <AiOutlineClose onClick={closeModel} />
        <img src={tempImgSrc} alt="" />
      </div>
      <ImageGalleryMainDiv className="ImageGalleryMainDiv">
        <div className="gallery">
          {images?.length === 0 && (
            <>
              <h2>No Images Found :(</h2>
            </>
          )}
          {isLoaded
            ? images?.map((item, index) => (
                <div className="pics" key={index}>
                  <img
                    src={
                      "https://static.wixstatic.com/media/3ddd1e_4fdb79e722b04ce58384795f6337d46b~mv2.gif"
                    }
                    srcSet={
                      "https://static.wixstatic.com/media/3ddd1e_4fdb79e722b04ce58384795f6337d46b~mv2.gif"
                    }
                    alt=""
                    onLoad={imagesAfterLoad}
                    loading="lazy"
                    style={{ filter: "grayscale(1)" }}
                    onKeyDown={escFunction}
                  />
                </div>
              ))
            : images?.map((item, index) => (
                <div
                  className="pics"
                  onClick={() => getImg(item.src)}
                  key={index}
                  onKeyDown={escFunction}
                >
                  <img src={item.src} style={{ width: "100%" }} alt="" />
                </div>
              ))}
        </div>
      </ImageGalleryMainDiv>
    </>
  );
};

export default App;
