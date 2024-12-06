"use client";
import { catchNews } from "@/data-access/catchNews";
import React, { useRef, useState, useEffect, useCallback } from "react";
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

export default function PostNewsForm() {
  const ref = useRef(null);
  const [selectValue, setSelectValue] = useState("");

  const [formValues, setFormValues] = useState({
    newsTitle: "",
    newsTitleSpanish: "",
    newsTitleSpanishTranslated: "Google Translated",
    newsBody: "",
    newsBodySpanish: "",
    bodySpanishHowTranslated: "Google Translated",
    newsImgAlt: "",
    newsImgAltSpanish: "",
    imageAltSpanishHowTranslated: "Google Translated",
    newsLink: "",
    newsAnon: false
  });

  const [errors, setErrors] = useState({});

  const [imageErrors, setImageErrors] = useState({});

  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [imageSelected, setImageSelected] = useState(null);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

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
    if (hasAttemptedSubmission) {
      validateImage(imageSelected, setImageErrors);
    }
  }, [imageSelected, hasAttemptedSubmission]);
  // error object for each field only when that state is changed is it hooked

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormValues({
      ...formValues,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    setHasAttemptedSubmission(true);

    // should update these to not require setStates if not needed
    const tempTitleErrorCheck = validateTitle(formValues.newsTitle, setErrors);

    const tempTitleErrorCheckSpanish = validateTitle(
      formValues.newsTitleSpanish,
      setErrors
    );

    const tempBodyErrorCheck = validateBody(formValues.newsBody, setErrors);
    const tempBodyErrorCheckSpanish = validateBody(
      formValues.newsBodySpanish,
      setErrors
    );

    const tempImgAltErrorCheck = validateImgAlt(
      formValues.newsImgAlt,
      setErrors
    );
    const tempImgAltErrorCheckSpanish = validateImgAlt(
      formValues.newsImgAltSpanish,
      setErrors
    );

    const tempLinkErrorCheck = validateLink(formValues.newsLink, setErrors);

    const tempSelectErrorCheck = validateSelect(
      "news category",
      selectValue,
      setErrors
    );

    const tempImageErrorCheck = validateImage(imageSelected, setImageErrors);
    if (
      Object.keys(tempTitleErrorCheck).length > 0 ||
      Object.keys(tempTitleErrorCheckSpanish).length > 0 ||
      Object.keys(tempBodyErrorCheck).length > 0 ||
      Object.keys(tempBodyErrorCheckSpanish).length > 0 ||
      Object.keys(tempImgAltErrorCheck).length > 0 ||
      Object.keys(tempImgAltErrorCheckSpanish).length > 0 ||
      Object.keys(tempLinkErrorCheck).length > 0 ||
      Object.keys(tempSelectErrorCheck).length > 0 ||
      Object.keys(tempImageErrorCheck).length > 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(ref.current);

      formData.set("newsTitle", formValues.newsTitle);
      formData.set("newsTitleSpanish", formValues.newsTitleSpanish);
      formData.set(
        "newsTitleSpanishTranslated",
        formValues.newsTitleSpanishTranslated
      );
      formData.set("newsBody", formValues.newsBody);
      formData.set("newsBodySpanish", formValues.newsBodySpanish);
      formData.set(
        "bodySpanishHowTranslated",
        formValues.bodySpanishHowTranslated
      );
      formData.set("newsImgAlt", formValues.newsImgAlt);
      formData.set("newsImgAltSpanish", formValues.newsImgAltSpanish);
      formData.set(
        "imageAltSpanishHowTranslated",
        formValues.imageAltSpanishHowTranslated
      );
      formData.set("newsLink", formValues.newsLink);
      formData.set("newsAnon", formValues.newsAnon);

      await catchNews(formData);

      // setSelectValue("");
      setFormValues({
        newsTitle: "",
        newsTitleSpanish: "",
        newsTitleSpanishTranslated: "Google Translated",
        newsBody: "",
        newsBodySpanish: "",
        bodySpanishHowTranslated: "Google Translated",
        newsImgAlt: "",
        newsImgAltSpanish: "",
        imageAltSpanishHowTranslated: "Google Translated",
        newsLink: "",
        newsAnon: false
      });

      ref.current?.reset();
      setImageSelected(null);
      setErrors({});
      setLoading(false);
      setHasAttemptedSubmission(false);
      setResetTrigger((prev) => prev + 1);
      scrollToTop();
    } catch (err) {
      try {
        const parsedError = JSON.parse(err.message);

        setErrors({
          formSubmit: `uh oh, server seems to be down :( ${parsedError.statusText}`
        });
      } catch (parseError) {
        // Fallback for errors that are not JSON
        setErrors({
          formSubmit: `An unexpected error occurred. this is real bad or you put in bad data that I didt catch
           <.< >.>`
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-8 pb-12">
      <h1 className="text-4xl mb-4 font-header">Admin News Form</h1>
      <form ref={ref} className="space-y-4 font-text" onSubmit={handleSubmit}>
        <TextInput
          language="English"
          value={formValues.newsTitle}
          updateFormValue={updateFormValue}
          name="newsTitle"
          inputDisplayName="Title"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateTitle}
        ></TextInput>

        {/* spanish */}
        {/* can maybe make this a loop statement */}
        <TextInput
          language="Spanish"
          value={formValues.newsTitleSpanish}
          updateFormValue={updateFormValue}
          name="newsTitleSpanish"
          inputDisplayName="Title"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateTitle}
        ></TextInput>
        <GoogleOrHuman
          language="Spanish"
          name="newsTitleSpanishTranslated"
          value={formValues.newsTitleSpanishTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

        <TextareaInput
          language="English"
          value={formValues.newsBody}
          updateFormValue={updateFormValue}
          name="newsBody"
          inputDisplayName="Body"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        <TextareaInput
          language="Spanish"
          value={formValues.newsBodySpanish}
          updateFormValue={updateFormValue}
          name="newsBodySpanish"
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

        <div className="flex items-center space-x-4">
          <label
            htmlFor="newsMedia"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Image:
          </label>
          <ImagePicker
            name="newsMedia"
            onImagePicked={setImageSelected}
            resetTrigger={resetTrigger}
          />
        </div>

        <UserInputError
          errorObj={imageErrors}
          inputName="Image"
          singular="true"
        />

        <TextInput
          language="English"
          value={formValues.newsImgAlt}
          updateFormValue={updateFormValue}
          name="newsImgAlt"
          inputDisplayName="Alt Text"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateImgAlt}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.newsImgAltSpanish}
          updateFormValue={updateFormValue}
          name="newsImgAltSpanish"
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
          value={formValues.newsLink}
          updateFormValue={updateFormValue}
          name="newsLink"
          inputDisplayName="Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateLink}
        ></TextInput>

        <div className="flex items-center space-x-4">
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
              checked={formValues.newsAnon}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="newsDPN" className="font-medium">
              Check to post as The DNP Team
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
          <p>
            <button
              className="py-3 px-6 rounded btn bg-dark text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Post News"}
            </button>
          </p>
        </div>
      </form>
      {errors.formSubmit && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{errors.formSubmit}</p>
        </div>
      )}
    </div>
  );
}
