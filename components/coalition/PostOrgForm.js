"use client";
import { useRef, useState, useEffect, useCallback } from "react";
import ImagePicker from "../newsComponents/image-picker";
import { catchOrg } from "../../data-access/catchOrg";
import {
  validateOutsideTitle,
  validateBody,
  validateImgAlt,
  validateOptionalLink,
  validateImage
} from "../../Lib/validation";
import UserInputError from "../ErrorComponents/UserInputError";
import TextInput from "../forms/TextInput";
import TextareaInput from "../forms/TextareaInput";
import GoogleOrHuman from "../forms/GoogleOrHuman";

export default function PostOrgForm() {
  const ref = useRef(null);
  const [formValues, setFormValues] = useState({
    orgName: "",
    orgImgAlt: "",
    orgImgAltSpanish: "",
    imageAltSpanishHowTranslated: "Google Translated",
    orgDescriptionEnglish: "",
    orgDescriptionSpanish: "",
    descriptionSpanishHowTranslated: "Google Translated",
    orgTwitter: "",
    orgInstagram: "",
    orgFacebook: "",
    orgWebsite: ""
  });
  const [errors, setErrors] = useState({});
  const [imageErrors, setImageErrors] = useState({});
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
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

  // Image
  useEffect(() => {
    if (hasAttemptedSubmission) {
      validateImage(imageSelected, setImageErrors);
    }
  }, [imageSelected, hasAttemptedSubmission]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({});
    setLoading(true);
    setHasAttemptedSubmission(true);

    const tempOrgNameErrors = validateOutsideTitle(
      formValues.orgName,
      setErrors
    );
    const tempImgAltErrors = validateImgAlt(
      formValues.orgImgAlt,
      setErrors
    );
    const tempImgAltErrorsSpanish = validateImgAlt(
      formValues.orgImgAltSpanish,
      setErrors
    );

    const tempBodyErrors = validateBody(
      formValues.orgDescriptionEnglish,
      setErrors
    );

    const tempBodyErrorsSpanish = validateBody(
      formValues.orgDescriptionSpanish,
      setErrors
    );

    const tempImageErrors = validateImage(imageSelected, setImageErrors);

    // links are optional
    const tempTwitterErrors = validateOptionalLink(
      formValues.orgTwitter,
      setErrors
    );
    const tempInstagramErrors = validateOptionalLink(
      formValues.orgInstagram,
      setErrors
    );
    const tempFacebookErrors = validateOptionalLink(
      formValues.orgFacebook,
      setErrors
    );
    const tempWebsiteErrors = validateOptionalLink(
      formValues.orgWebsite,
      setErrors
    );

    if (
      Object.keys(tempOrgNameErrors).length > 0 ||
      Object.keys(tempImgAltErrors).length > 0 ||
      Object.keys(tempImgAltErrorsSpanish).length > 0 ||
      Object.keys(tempBodyErrors).length > 0 ||
      Object.keys(tempBodyErrorsSpanish).length > 0 ||
      Object.keys(tempImageErrors).length > 0 ||
      Object.keys(tempTwitterErrors).length > 0 ||
      Object.keys(tempInstagramErrors).length > 0 ||
      Object.keys(tempFacebookErrors).length > 0 ||
      Object.keys(tempWebsiteErrors).length > 0
    ) {
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData(ref.current);
      formData.set("orgName", formValues.orgName);
      formData.set("orgImgAlt", formValues.orgImgAlt);
      formData.set("orgImgAltSpanish", formValues.orgImgAltSpanish);
      formData.set(
        "imageAltSpanishHowTranslated",
        formValues.imageAltSpanishHowTranslated
      );
      formData.set("orgDescriptionEnglish", formValues.orgDescriptionEnglish);
      formData.set("orgDescriptionSpanish", formValues.orgDescriptionSpanish);
      formData.set(
        "descriptionSpanishHowTranslated",
        formValues.descriptionSpanishHowTranslated
      );
      formData.set("orgTwitter", formValues.orgTwitter);
      formData.set("orgInstagram", formValues.orgInstagram);
      formData.set("orgFacebook", formValues.orgFacebook);
      formData.set("orgWebsite", formValues.orgWebsite);

      await catchOrg(formData);

      // Reset form
      setFormValues({
        orgName: "",
        orgImgAlt: "",
        orgImgAltSpanish: "",
        imageAltSpanishHowTranslated: "Google Translated",
        orgDescriptionEnglish: "",
        orgDescriptionSpanish: "",
        descriptionSpanishHowTranslated: "Google Translated",
        orgTwitter: "",
        orgInstagram: "",
        orgFacebook: "",
        orgWebsite: ""
      });
      setImageSelected(null);
      ref.current?.reset();
      setErrors({});
      setLoading(false);
      setHasAttemptedSubmission(false);
      setResetTrigger((prev) => prev + 1);
      scrollToTop();
    } catch (err) {
      try {
        const parsedError = JSON.parse(err.message);
        setErrors({
          formSubmit: `${parsedError.error || "error occured"} ${parsedError.statusText}`
        });
      } catch (parseError) {
        setErrors({
          formSubmit: `An unexpected error occurred. Please try again later.`
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto mt-8 pb-10">
      <h1 className="text-4xl mb-4 font-header">Create Organization Form:</h1>
      <p className="mb-4 font-text">
        (All fields are required except the organization links.)
      </p>
      <form ref={ref} className="space-y-4 font-text" onSubmit={handleSubmit}>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="orgImage"
            className="w-1/6 flex-shrink-0 font-medium text-right mr-4 font-text"
          >
            Preview Image:
          </label>
          <ImagePicker
            name="orgImage"
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
          language=""
          value={formValues.orgName}
          updateFormValue={updateFormValue}
          name="orgName"
          inputDisplayName="Organization Name"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOutsideTitle}
        ></TextInput>

        <TextInput
          language="English"
          value={formValues.orgImgAlt}
          updateFormValue={updateFormValue}
          name="orgImgAlt"
          inputDisplayName="Alt Text"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateImgAlt}
        ></TextInput>

        <TextInput
          language="Spanish"
          value={formValues.orgImgAltSpanish}
          updateFormValue={updateFormValue}
          name="orgImgAltSpanish"
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

        <TextareaInput
          language="English"
          value={formValues.orgDescriptionEnglish}
          updateFormValue={updateFormValue}
          name="orgDescriptionEnglish"
          inputDisplayName="Description"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        <TextareaInput
          language="Spanish"
          value={formValues.orgDescriptionSpanish}
          updateFormValue={updateFormValue}
          name="orgDescriptionSpanish"
          inputDisplayName="Description"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        <GoogleOrHuman
          language="Spanish"
          name="descriptionSpanishHowTranslated"
          value={formValues.descriptionSpanishHowTranslated}
          updateFormValue={updateFormValue}
          inputDisplayName="Translated by:"
        ></GoogleOrHuman>

        {/* Twitter/X */}
        <TextInput
          language=""
          value={formValues.orgTwitter}
          updateFormValue={updateFormValue}
          name="orgTwitter"
          inputDisplayName="Twitter/X Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Instagram */}
        <TextInput
          language=""
          value={formValues.orgInstagram}
          updateFormValue={updateFormValue}
          name="orgInstagram"
          inputDisplayName="Instagram Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Facebook */}

        <TextInput
          language=""
          value={formValues.orgFacebook}
          updateFormValue={updateFormValue}
          name="orgFacebook"
          inputDisplayName="Facebook Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Website */}
        <TextInput
          language=""
          value={formValues.orgWebsite}
          updateFormValue={updateFormValue}
          name="orgWebsite"
          inputDisplayName="Website Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        <div className="flex items-center space-x-4">
          <div className="w-1/6 mr-4"></div>
          <p>
            <button
              className="py-3 px-6 rounded btn bg-dark text-white text-lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Post Organization"}
            </button>
          </p>
        </div>
        {errors.formSubmit && (
          <p className="text-red-500 text-sm text-center">
            {errors.formSubmit}
          </p>
        )}
      </form>
    </div>
  );
}
