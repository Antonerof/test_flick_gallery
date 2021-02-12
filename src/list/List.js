import React, { useEffect, useState } from "react";
import { getImages } from "./list.api";
import "./list.scss";
import Image from "./components/Image";
import { IMAGES_PER_ROW } from "./constants";
import { useGetSelectedImage } from "./list.hooks";
import uniqWith from "lodash/uniqWith";
import isEqual from "lodash/isEqual";

const List = () => {
  const [images, setImages] = useState([]);
  const [selectedImage] = useGetSelectedImage();
  const [page, setPage] = useState(1);
  const selectedIndex = selectedImage.x + selectedImage.y * IMAGES_PER_ROW;
  const lastRowNumber = Math.floor(images.length / IMAGES_PER_ROW) - 1;

  useEffect(() => {
    getImages({ page, perPage: page === 1 ? 50 : 40 }).then(response => {
      setImages(data =>
        uniqWith([...data, ...response.data.photos?.photo], isEqual)
      );
    });
  }, [page]);

  useEffect(() => {
    if (lastRowNumber - 1 === selectedImage.y) {
      setPage(state => state + 1);
    }
  }, [selectedImage.y, lastRowNumber]);

  return (
    <>
      <div className="list">
        {images.map((image, index) => {
          return (
            <Image
              key={`${image.farm}${image.server}${image.id}${image.secret}`}
              image={image}
              isSelected={selectedIndex === index}
            />
          );
        })}
      </div>
    </>
  );
};

List.propTypes = {};

export default List;
