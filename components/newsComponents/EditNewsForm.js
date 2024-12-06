"use client";
import React, { useState, useEffect, useCallback } from "react";
import ImagePicker from "./image-picker";
import NewsTypeSelection from "./NewsTypeSelection";
import {
  validateTitle,
  validateBody,
  validateImgAlt,
  validateLink,
  validateSelect,
  validateImage
} from "../../Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";
import TextInput from "../forms/TextInput";
import TextareaInput from "../forms/TextareaInput";
import GoogleOrHuman from "../forms/GoogleOrHuman";
import { useRouter } from 'next/navigation';



const EditNewsForm = ({
  title,
  titleSpanish,
  titleSpanishHowTranslated,
  body,
  bodySpanish,
  bodySpanishHowTranslated,
  media,
  imgAlt,
  imgAltSpanish,
  imageAltSpanishHowTranslated,
  newsLink,
  postedBy,
  createdAt,
  updatedAt,
  forNewsCard,
  author,
  topic,
  genre,
  session,
  id,
  anon,
  setFormTrigger
}) => {
  const [formValues, setFormValues] = useState({
    title: title,
    titleSpanish: titleSpanish,
    titleSpanishHowTranslated: titleSpanishHowTranslated,
    body: body,
    bodySpanish: bodySpanish,
    bodySpanishHowTranslated: bodySpanishHowTranslated,
    imageLink: media,
    imageAlt: imgAlt,
    imageAltSpanishHowTranslated: imageAltSpanishHowTranslated,
    imgAltSpanish: imgAltSpanish,
    link: newsLink
  });
  const [isAnon, setIsAnon] = useState(anon);
  const [newPhoto, setNewPhoto] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const [imageErrors, setImageErrors] = useState({});

  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [imageSelected, setImageSelected] = useState(null);
  const [selectValue, setSelectValue] = useState(topic);

  const updateFormValue = useCallback((name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  }, []);

  const updateSelectValue = useCallback((value) => {
    setSelectValue(value);
  }, []);

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
      <p className="mr-4 font-medium">Update Photo?</p>
      <a
        className="btn bg-dark text-white text-lg py-2 px-4 mt-3 no1 cursor-pointer"
        onClick={handleNewPhoto}
      >
        yes
      </a>
    </div>
  );

  const [imageObj, setImageObj] = useState({});

  const handleIsAnonClick = () => {
    setIsAnon(!isAnon);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    setHasAttemptedSubmission(true);

    const titleErrors = validateTitle(formValues.title, setErrors);

    const titleErrorsSpanish = validateTitle(
      formValues.titleSpanish,
      setErrors
    );

    const bodyErrors = validateBody(formValues.body, setErrors);

    const bodyErrorsSpanish = validateBody(
      formValues.bodySpanish,
      setErrors
    );

    const imgAltErrors = validateImgAlt(
      formValues.imageAlt,
      setErrors
    );

    const imgAltErrorsSpanish = validateImgAlt(
      formValues.imgAltSpanish,
      setErrors
    );

    const linkErrors = validateLink(formValues.link, setErrors);

    const selectErrors = validateSelect(
       "news category",
      selectValue,
      setErrors
    );
    let imageErrors = {};
    if (newPhoto) {
      imageErrors = validateImage(imageSelected, setImageErrors);
    }
    if (
      Object.keys(titleErrors).length > 0 ||
      Object.keys(titleErrorsSpanish).length > 0 ||
      Object.keys(bodyErrors).length > 0 ||
      Object.keys(bodyErrorsSpanish).length > 0 ||
      Object.keys(imgAltErrors).length > 0 ||
      Object.keys(imgAltErrorsSpanish).length > 0 ||
      Object.keys(linkErrors).length > 0 ||
      Object.keys(selectErrors).length > 0 ||
      Object.keys(imageErrors).length > 0
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
    formData.append("imageAlt", formValues.imageAlt);
    formData.set("newsImgAltSpanish", formValues.imgAltSpanish);
    formData.set(
      "imageAltSpanishHowTranslated",
      formValues.imageAltSpanishHowTranslated
    );
    formData.append("link", formValues.link);
    formData.append("select", selectValue);
    formData.append("anon", isAnon);
    formData.append("isNewPhoto", newPhoto);

    const putMethod = {
      method: "PUT", // Method itself
      body: formData,
      "Content-Type": "multipart/form-data"
    };

    const url = `${process.env.DOMAIN_PREFIX}/api/news/${id}`;
    let res;
    let result;
    try {
      res = await fetch(url, putMethod);
       result = await res.json();

      if (result.success) {
        window.location.reload(true);
      } else {


        throw new Error(
          result.message || result.error || "Failed to update news item."
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
      if (res.status === 403) {
        setErrors({
        formSubmit: error.message || "You don't have access to this"
      });
      }

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
    <div className="w-2/3 mx-auto mt-8 pb-12">
      <h1 className="text-4xl mb-4 font-header">Admin News Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4 font-text">
        <TextInput
          language="English"
          value={formValues.title}
          updateFormValue={updateFormValue}
          name="title"
          inputDisplayName="Title"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateTitle}
        ></TextInput>
        <TextInput
          language="Spanish"
          value={formValues.titleSpanish}
          updateFormValue={updateFormValue}
          name="titleSpanish"
          inputDisplayName="Title"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateTitle}
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
          inputDisplayName="Body"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        <TextareaInput
          language="Spanish"
          value={formValues.bodySpanish}
          updateFormValue={updateFormValue}
          name="bodySpanish"
          inputDisplayName="Body"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        <GoogleOrHuman
          language="Spanish"
          name="bodySpanishHowTranslated"
          value={formValues.bodySpanishHowTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

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
              name="newsMedia"
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
          inputDisplayName="Alt Text"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateImgAlt}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.imgAltSpanish}
          updateFormValue={updateFormValue}
          name="imageAltSpanish"
          inputDisplayName="Alt Text"
          hasAttemptedSubmission={hasAttemptedSubmission}
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
          name="link"
          inputDisplayName="Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateLink}
        ></TextInput>

        <div className="flex items-center space-x-4 ">
          <label
            htmlFor="newsAnon"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Anonymous:
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="newsAnon"
              id="newsAnon"
              checked={isAnon}
              onChange={handleIsAnonClick}
              className="mr-2"
            />
            <label htmlFor="newsAnon" className="font-medium">
              Check to post as anonymous
            </label>
          </div>
        </div>
        <NewsTypeSelection
          name="select"
          edit="no"
          value={selectValue}
          updateSelectValue={updateSelectValue}
          setSelectValue={setSelectValue}
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateSelect}
        />

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
              disabled={loading}
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

export default EditNewsForm;
