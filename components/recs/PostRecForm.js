"use client";
import RecGenre from "./RecGenre";
import MediaTypeSelection from "./MediaTypeSelection";
import ImagePicker from "../newsComponents/image-picker";
import { catchRec } from "@/data-access/catchRec";
import { useRef, useState, useEffect, useCallback } from "react";
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

export default function PostRecForm() {
  const ref = useRef(null);
  const [selectMediaType, setSelectMediaType] = useState("");
  const [selectGenre, setSelectGenre] = useState("");
  const [formValues, setFormValues] = useState({
    recTitle: "",
    recTitleSpanish: "",
    titleSpanishHowTranslated: "Google Translated",
    recBody: "",
    recBodySpanish: "",
    bodySpanishHowTranslated: "Google Translated",
    recAuthor: "",
    recLink: "",
    recImgAlt: "",
    imageAltSpanishHowTranslated: "Google Translated",
    recImgAltSpanish: "",
    recAnon: false
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

  const updateGenre = useCallback((value) => {
    setSelectGenre(value);
  }, []);
  const updateMediaType = useCallback((value) => {
    setSelectMediaType(value);
  }, []);

  useEffect(() => {
    if (hasAttemptedSubmission) {
      validateImage(imageSelected, setImageErrors);
    }
  }, [imageSelected, hasAttemptedSubmission]);

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

    const tempTitleErrorCheck = validateOutsideTitle(
      formValues.recTitle,
      setErrors
    );
    const tempTitleErrorCheckSpanish = validateOutsideTitle(
      formValues.recTitleSpanish,
      setErrors
    );
    const tempBodyErrorCheck = validateBody(formValues.recBody, setErrors);
    const tempBodyErrorCheckSpanish = validateBody(
      formValues.recBodySpanish,
      setErrors
    );
    const tempAuthorErrorCheck = validateName(
      formValues.recAuthor,
      setErrors,
      "author"
    );
    const tempLinkErrorCheck = validateLink(formValues.recLink, setErrors);
    const tempImageErrorCheck = validateImage(imageSelected, setImageErrors);
    const tempAltImgErrorCheck = validateImgAlt(
      formValues.recImgAlt,
      setErrors
    );
    const tempAltImgErrorCheckSpanish = validateImgAlt(
      formValues.recImgAltSpanish,
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
      Object.keys(tempImageErrorCheck).length > 0 ||
      Object.keys(tempAltImgErrorCheck).length > 0 ||
      Object.keys(tempAltImgErrorCheckSpanish).length > 0 ||
      Object.keys(tempMediaSelectError).length > 0 ||
      Object.keys(tempGenreErrorCheck).length > 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(ref.current);

      formData.set("recTitle", formValues.recTitle);
      formData.set("recTitleSpanish", formValues.recTitleSpanish);
      formData.set(
        "titleSpanishHowTranslated",
        formValues.titleSpanishHowTranslated
      );
      formData.set("recBody", formValues.recBody);
      formData.set("recBodySpanish", formValues.recBodySpanish);
      formData.set(
        "bodySpanishHowTranslated",
        formValues.bodySpanishHowTranslated
      );
      formData.set("recAuthor", formValues.recAuthor);
      formData.set("recLink", formValues.recLink);
      formData.set("recImgAlt", formValues.recImgAlt);
      formData.set(
        "imageAltSpanishHowTranslated",
        formValues.imageAltSpanishHowTranslated
      );
      formData.set("recImgAltSpanish", formValues.recImgAltSpanish);
      formData.set("recAnon", formValues.recAnon);

      await catchRec(formData);

      setSelectMediaType("");
      setSelectGenre("");
      setFormValues({
        recTitle: "",
        recTitleSpanish: "",
        titleSpanishHowTranslated: "Google Translated",
        recBody: "",
        recBodySpanish: "",
        bodySpanishHowTranslated: "Google Translated",
        recAuthor: "",
        recLink: "",
        imageAltSpanishHowTranslated: "Google Translated",
        recImgAlt: "",
        recImgAltSpanish: "",
        recAnon: false
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
          formSubmit: `An unexpected error occurred. this is real bad or you put in bad data that I did not catch
           <.< >.>`
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-8 mb-10">
      <h1 className="text-4xl mb-4 font-header">Admin Recommendation Form:</h1>
      <form ref={ref} className="space-y-4 font-text" onSubmit={handleSubmit}>
        <TextInput
          language="English"
          value={formValues.recTitle}
          updateFormValue={updateFormValue}
          name="recTitle"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Title"
          validation={validateOutsideTitle}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.recTitleSpanish}
          updateFormValue={updateFormValue}
          name="recTitleSpanish"
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
          value={formValues.recBody}
          updateFormValue={updateFormValue}
          name="recBody"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Body"
          validation={validateBody}
        ></TextareaInput>

        <TextareaInput
          language="Spanish"
          value={formValues.recBodySpanish}
          updateFormValue={updateFormValue}
          name="recBodySpanish"
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
          value={formValues.recAuthor}
          updateFormValue={updateFormValue}
          name="recAuthor"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Author"
          validation={validateName}
        ></TextInput>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="recImage"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4"
          >
            Preview Image:
          </label>
          <ImagePicker
            name="recImage"
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
          value={formValues.recImgAlt}
          updateFormValue={updateFormValue}
          name="recImgAlt"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Alt Text"
          validation={validateImgAlt}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.recImgAltSpanish}
          updateFormValue={updateFormValue}
          name="recImgAltSpanish"
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
          value={formValues.recLink}
          updateFormValue={updateFormValue}
          name="recLink"
          hasAttemptedSubmission={hasAttemptedSubmission}
          inputDisplayName="Link"
          validation={validateLink}
        ></TextInput>

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
              checked={formValues.recAnon}
              onChange={handleChange}
              className="mr-2"
            />
            <label htmlFor="newsDPN" className="font-medium">
              Check to post as {`"The DNP Team"`}
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-1/6 mr-4"></div>
          <p>
            <button
              className="py-3 px-6 rounded btn bg-dark text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Post Recommendation"}
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
