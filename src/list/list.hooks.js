import { useCallback, useEffect, useState } from "react";
import {
  IMAGES_PER_ROW,
  KEY_DOWN,
  KEY_LEFT,
  KEY_RIGHT,
  KEY_UP
} from "./constants";

export const useGetSelectedImage = () => {
  const [selectedImage, setSelectedImage] = useState({ x: 0, y: 0 });

  const keyPressHandler = useCallback(
    event => {
      if (
        KEY_LEFT === event.keyCode ||
        KEY_UP === event.keyCode ||
        KEY_RIGHT === event.keyCode ||
        KEY_DOWN === event.keyCode
      ) {
        event.preventDefault();
        const maxX = IMAGES_PER_ROW - 1;

        switch (event.keyCode) {
          case KEY_LEFT:
            if (selectedImage.x === 0 && selectedImage.y > 0) {
              setSelectedImage(state => ({
                y: state.y - 1,
                x: maxX
              }));
            } else if (selectedImage.x !== 0) {
              setSelectedImage(state => ({
                y: state.y,
                x: state.x - 1
              }));
            }
            break;
          case KEY_RIGHT:
            if (selectedImage.x === maxX) {
              setSelectedImage(state => ({
                y: state.y + 1,
                x: 0
              }));
            } else {
              setSelectedImage(state => ({
                y: state.y,
                x: state.x + 1
              }));
            }
            break;
          case KEY_UP:
            if (selectedImage.y > 0) {
              setSelectedImage(state => ({
                y: state.y - 1,
                x: state.x
              }));
            }
            break;
          case KEY_DOWN:
            setSelectedImage(state => ({
              y: state.y + 1,
              x: state.x
            }));
            break;
        }
      }
    },
    [selectedImage]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler);
    return () => {
      document.removeEventListener("keydown", keyPressHandler);
    };
  }, [keyPressHandler]);

  return [selectedImage, setSelectedImage];
};
