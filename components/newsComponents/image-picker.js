"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import classes from "./image-picker.module.css";

export default function ImagePicker({
  label,
  name,
  prePickedImage,
  edit,
  setImageObj,
  onImagePicked,
  resetTrigger
}) {
  const [pickedImage, setPickedImage] = useState(prePickedImage || "");
  const imageInput = useRef();

  function handlePickClick() {
    imageInput.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      setPickedImage(null);
      onImagePicked(null); // Notify parent component of no image
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
      if (edit) {
        setImageObj(file);
      }
      onImagePicked(file); // Notify parent component of selected image
    };

    fileReader.readAsDataURL(file);
  }

  useEffect(() => {
    if (resetTrigger) {
      setPickedImage(prePickedImage || "");
      imageInput.current.value = null; // Clear the file input value
    }
  }, [resetTrigger, prePickedImage]);

  return (
    <div className={`${classes.picker} font-text`}>
      <label htmlFor={name}>
        {label}
        <div className={classes.controls}>
          <div className={classes.preview}>
            {!pickedImage && <p>No image picked yet</p>}
            {pickedImage && (
              <Image
                src={pickedImage}
                alt="The image selected by the user"
                fill
              />
            )}
          </div>
          <input
            className={classes.input}
            type="file"
            id={name}
            accept="image/*"
            name={name}
            ref={imageInput}
            onChange={handleImageChange}
          />
        </div>
        <button
          className={`${classes.button} ${classes.fullWidthButton}`}
          type="button"
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </label>
    </div>
  );
}
