import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useInView } from "react-hook-inview";

const Image = ({ image, isSelected }) => {
  const { farm, server, id, secret } = image;
  const [height, setHeight] = useState(false);
  const imageWrapperRef = useRef();
  const [imageRef, inView] = useInView({
    threshold: 0,
    rootMargin: "300px"
  });

  useEffect(() => {
    if (isSelected && imageWrapperRef.current) {
      imageWrapperRef.current.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
    }
  }, [isSelected]);

  const onLoad = image => {
    setHeight(image.target.height);
    imageRef.current &&
      imageRef.current.scrollIntoView({ block: "center", behavior: "smooth" });
  };

  return (
    <div ref={imageWrapperRef}>
      <img
        ref={imageRef}
        className={`${isSelected ? "selected" : ""}`}
        src={
          inView
            ? `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
            : ""
        }
        onLoad={onLoad}
        {...height && { height }}
      />
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.shape({
    farm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    server: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    secret: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }),
  isSelected: PropTypes.bool.isRequired
};

export default Image;
