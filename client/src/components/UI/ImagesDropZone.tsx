import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { API_URL, STATIC_URL } from "../../index.http";
import Button from "./Button";
import "./UI.scss";

type dropZoneProps = {
  images: any[];
  setImages: (images: any[]) => void;
};

const ImagesDropZone: FC<dropZoneProps> = ({ images, setImages }) => {
  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any) => {
    images = images.concat(acceptedFiles.map((image) => image));
    setImages(images);
  }, []);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });
  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="dark-text">Перетащите файл(ы) сюда...</p>
        ) : (
          <p className="dark-text">
            Перетащите файлы или кликните для выбора...
          </p>
        )}
      </div>
      <div className="dropZone">
        {images.length > 0 &&
          images.map((image, index) => {
            let url = STATIC_URL + "/" + image;
            try {
              url = `${URL.createObjectURL(image)}`;
            } catch {}
            return (
              <div className="dropZone-image ">
                <img src={url} key={index} />
                <button
                  className="delete-image-btn"
                  onClick={(e) => {
                    images.splice(index, 1);
                    setImages(images);
                  }}
                >
                  X
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default ImagesDropZone;
