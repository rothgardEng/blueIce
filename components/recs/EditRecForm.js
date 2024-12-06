"use client";
import React, { useState, useEffect, useCallback } from "react";
import RecGenre from "./RecGenre";
import MediaTypeSelection from "./MediaTypeSelection";
import ImagePicker from "../newsComponents/image-picker";
import {
  validateOutsideTitle,
  validateBody,
  validateImgAlt,
  validateLink,
  validateSelect,
  validateImage,
  validateName
} from "../../Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";
import TextInput from "../forms/TextInput";
import TextareaInput from "../forms/TextareaInput";
import GoogleOrHuman from "../forms/GoogleOrHuman";

const EditRecForm = ({
  title,
  titleSpanish,
  titleSpanishHowTranslated,
  body,
  bodySpanish,
  bodySpanishHowTranslated,
  author,
  mediaLink,
  imgAlt,
  imgAltSpanish,
  imageAltSpanishHowTranslated,
  mediaType,
  genre,
  anon,
  id,
  setFormTrigger,
  purchaseLink
}) => {
  const [formValues, setFormValues] = useState({
    title: title,
    titleSpanish: titleSpanish,
    titleSpanishHowTranslated: titleSpanishHowTranslated,
    body: body,
    bodySpanish: bodySpanish,
    bodySpanishHowTranslated: bodySpanishHowTranslated,
    author: author,
    link: purchaseLink,
    imageLink: mediaLink,
    imageAlt: imgAlt,
    imageAltSpanishHowTranslated: imageAltSpanishHowTranslated,
    imageAltSpanish: imgAltSpanish,
    anon: anon
  });

  const [isAnon, setIsAnon] = useState(anon);
  const [newPhoto, setNewPhoto] = useState(false);
  const [selectMediaType, setSelectMediaType] = useState(mediaType);
  const [selectGenre, setSelectGenre] = useState(genre);
  const [imageObj, setImageObj] = useState({});
  const [errors, setErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [imageSelected, setImageSelected] = useState(null);

  useEffect(() => {
    if (hasAttemptedSubmission && newPhoto) {
      validateImage(imageSelected, setImageErrors);
    }
  }, [imageSelected, hasAttemptedSubmission, newPhoto]);

  const handleNewPhoto = () => {
    setNewPhoto(true);
  };

  const newPhotoComponent = (
    <div className="flex items-center space-x-4">
      <p className="mr-4">Update Photo?</p>
      <a
        className="btn bg-dark text-white text-lg py-2 px-4 mt-3 no1 cursor-pointer"
        onClick={handleNewPhoto}
      >
        yes
      </a>
    </div>
  );

  const updateFormValue = useCallback((name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  const updateGenre = useCallback((value) => {
    setSelectGenre(value);
  }, []);
  const updateMediaType = useCallback((value) => {
    setSelectMediaType(value);
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleIsAnonClick = () => {
    setIsAnon(!isAnon);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    setHasAttemptedSubmission(true);

    const tempTitleErrorCheck = validateOutsideTitle(
      formValues.title,
      setErrors
    );
    const tempTitleErrorCheckSpanish = validateOutsideTitle(
      formValues.titleSpanish,
      setErrors
    );

    const tempBodyErrorCheck = validateBody(
      formValues.body,
      setErrors
    );

    const tempBodyErrorCheckSpanish = validateBody(
      formValues.bodySpanish,
      setErrors
    );

    const tempAuthorErrorCheck = validateName(
      formValues.author,
      setErrors,
      "author"
    );
    const tempLinkErrorCheck = validateLink(
      formValues.link,
      setErrors
    );
    let imageErrors = {};
    if (newPhoto) {
      imageErrors = validateImage(imageSelected, setImageErrors);
    }
    const tempAltImgErrorCheck = validateImgAlt(
      formValues.imageAlt,
      setErrors
    );

    const tempAltImgErrorCheckSpanish = validateImgAlt(
      formValues.imageAltSpanish,
      setErrors
    );

    const tempMediaSelectError = validateSelect(
      "media type",
      selectMediaType,
      setErrors
    );
    const tempGenreErrorCheck = validateSelect("genre", selectGenre, setErrors);

    if (
      Object.keys(tempTitleErrorCheck).length > 0 ||
      Object.keys(tempTitleErrorCheckSpanish).length > 0 ||
      Object.keys(tempBodyErrorCheck).length > 0 ||
      Object.keys(tempBodyErrorCheckSpanish).length > 0 ||
      Object.keys(tempAuthorErrorCheck).length > 0 ||
      Object.keys(tempLinkErrorCheck).length > 0 ||
      Object.keys(imageErrors).length > 0 ||
      Object.keys(tempAltImgErrorCheck).length > 0 ||
      Object.keys(tempAltImgErrorCheckSpanish).length > 0 ||
      Object.keys(tempMediaSelectError).length > 0 ||
      Object.keys(tempGenreErrorCheck).length > 0
    ) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageObj);
    formData.append("title", formValues.title);
    formData.append("titleSpanish", formValues.titleSpanish);
    formData.append(
      "titleSpanishHowTranslated",
      formValues.titleSpanishHowTranslated
    );
    formData.append("body", formValues.body);
    formData.append("bodySpanish", formValues.bodySpanish);
    formData.append(
      "bodySpanishHowTranslated",
      formValues.bodySpanishHowTranslated
    );
    formData.append("author", formValues.author);
    formData.append("link", formValues.link);
    formData.append("imageAlt", formValues.imageAlt);
    formData.append("imageAltSpanish", formValues.imageAltSpanish);
    formData.append(
      "imageAltSpanishHowTranslated",
      formValues.imageAltSpanishHowTranslated
    );
    formData.append("mediaType", selectMediaType);
    formData.append("genre", selectGenre);
    formData.append("anon", isAnon);
    formData.append("isNewPhoto", newPhoto);

    const putMethod = {
      method: "PUT",
      body: formData,
      "Content-Type": "multipart/form-data"
    };

    const url = `${process.env.DOMAIN_PREFIX}/api/recs/${id}`;
    try {
      const res = await fetch(url, putMethod);
      const result = await res.json();

      if (result.success) {
        window.location.reload(true);
      } else {
        // Preserve and display the error message from the backend
        throw new Error(
          result.message || result.error || "Failed to update news item."
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);

      setErrors({
        formSubmit: error.message || "An unexpected error occurred."
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormTrigger(false);
  };

  return (
    <div className="w-2/3 mx-auto mt-8 mb-10">
      <h1 className="text-4xl mb-4 font-header">Admin Recommendation Form</h1>
      <form onSubmit={handleSubmit} className="space-y-4 font-text">
        <TextInput
          language="English"
          value={formValues.title}
          updateFormValue={updateFormValue}
          name="title"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Title"
          validation={validateOutsideTitle}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.titleSpanish}
          updateFormValue={updateFormValue}
          name="titleSpanish"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Title"
          validation={validateOutsideTitle}
        ></TextInput>
        <GoogleOrHuman
          language="Spanish"
          name="titleSpanishHowTranslated"
          value={formValues.titleSpanishHowTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

        <TextareaInput
          language="English"
          value={formValues.body}
          updateFormValue={updateFormValue}
          name="body"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Body"
          validation={validateBody}
        ></TextareaInput>

        <TextareaInput
          language="Spanish"
          value={formValues.bodySpanish}
          updateFormValue={updateFormValue}
          name="bodySpanish"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Body"
          validation={validateBody}
        ></TextareaInput>
        <GoogleOrHuman
          language="Spanish"
          name="bodySpanishHowTranslated"
          value={formValues.bodySpanishHowTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

        <TextInput
          language=""
          value={formValues.author}
          updateFormValue={updateFormValue}
          name="author"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Author"
          validation={validateName}
        ></TextInput>

        {!newPhoto ? (
          newPhotoComponent
        ) : (
          <div className="flex items-center space-x-4">
            <label
              htmlFor="newsMedia"
              className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
            >
              Image:
            </label>
            <ImagePicker
              name="recImage"
              edit={true}
              setImageObj={setImageObj}
              onImagePicked={setImageSelected}
              resetTrigger={resetTrigger}
            />
          </div>
        )}
        <UserInputError
          errorObj={imageErrors}
          inputName="Image"
          singular="true"
        />

        <TextInput
          language="English"
          value={formValues.imageAlt}
          updateFormValue={updateFormValue}
          name="imageAlt"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Alt Text"
          validation={validateImgAlt}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.imageAltSpanish}
          updateFormValue={updateFormValue}
          name="imageAltSpanish"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Alt Text"
          validation={validateImgAlt}
        ></TextInput>
        <GoogleOrHuman
          language="Spanish"
          name="imageAltSpanishHowTranslated"
          value={formValues.imageAltSpanishHowTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

        <TextInput
          language=""
          value={formValues.link}
          updateFormValue={updateFormValue}
          name="recLink"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Link"
          validation={validateLink}
        ></TextInput>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="recAnon"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Anonymous:
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="recAnon"
              id="recAnon"
              checked={isAnon}
              onChange={handleIsAnonClick}
              className="mr-2"
            />
            <label htmlFor="recAnon" className="font-medium">
              Check to post as anonymous
            </label>
          </div>
        </div>

        <MediaTypeSelection
          name="recMediaType"
          value={selectMediaType}
          updateSelectValue={updateMediaType}
          setSelectValue={setSelectMediaType}
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateSelect}
        ></MediaTypeSelection>

        <RecGenre
          name="recGenre"
          value={selectGenre}
          updateSelectValue={updateGenre}
          setSelectValue={setSelectGenre}
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateSelect}
        ></RecGenre>

        <div className="flex items-center space-x-4">
          <div className="w-1/6 mr-4"></div>
          <div>
            <button
              className="btn bg-dark text-white text-lg py-2 px-4 answer-yes cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="btn bg-dark text-white text-lg py-2 px-4 answer-yes cursor-pointer"
              type="submit"
            >
              {loading ? "Updating..." : "Save"}
            </button>
          </div>
        </div>
      </form>
      <UserInputError
        errorObj={errors}
        inputName="Form or Submission"
        singular="true"
      />
    </div>
  );
};

export default EditRecForm;
