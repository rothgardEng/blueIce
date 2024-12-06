"use client";
import React, { useState, useEffect, useCallback } from "react";
import ImagePicker from "../newsComponents/image-picker";
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

const EditOrgForm = ({
  setFormTrigger,
  src,
  alt,
  altSpanish,
  imageAltSpanishHowTranslated,
  orgName,
  englishText,
  spanishText,
  descriptionSpanishHowTranslated,
  twitter,
  instagram,
  facebook,
  website,
  id
}) => {
  const [formValues, setFormValues] = useState({
    imageLink: src,
    orgName: orgName,
    imageAlt: alt,
    imageAltSpanish: altSpanish,
    imageAltSpanishHowTranslated: imageAltSpanishHowTranslated,
    orgDescriptionEnglish: englishText,
    orgDescriptionSpanish: spanishText,
    descriptionSpanishHowTranslated: descriptionSpanishHowTranslated,
    twitter: twitter,
    instagram: instagram,
    facebook: facebook,
    website: website
  });
  const [errors, setErrors] = useState({});

  const [imageErrors, setImageErrors] = useState({});
  const [imageSelected, setImageSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasAttemptedSubmission, setHasAttemptedSubmission] = useState(false);

  const [resetTrigger, setResetTrigger] = useState(0);

  const [newPhoto, setNewPhoto] = useState(false);

  const updateFormValue = useCallback((name, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
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
      <p className="font-text">Change Photo?</p>
      <a
        className="btn bg-dark text-white text-lg py-2 px-4 ml-6 mt-3 no1 cursor-pointer"
        onClick={handleNewPhoto}
      >
        yes
      </a>
    </div>
  );

  const [imageObj, setImageObj] = useState({});

  useEffect(() => {
    if (hasAttemptedSubmission) {
      validateOptionalLink(imageSelected, setImageErrors);
    }
  }, [imageSelected, hasAttemptedSubmission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

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
      formValues.imageAlt,
      setErrors
    );

    const tempImgAltErrorsSpanish = validateImgAlt(
      formValues.imageAltSpanish,
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

    const tempTwitterErrors = validateOptionalLink(
      formValues.twitter,
      setErrors
    );
    const tempInstagramErrors = validateOptionalLink(
      formValues.instagram,
      setErrors
    );
    const tempFacebookErrors = validateOptionalLink(
      formValues.facebook,
      setErrors
    );
    const tempWebsiteErrors = validateOptionalLink(
      formValues.website,
      setErrors
    );

    let imageErrors = {};
    if (newPhoto) {
      imageErrors = validateImage(imageSelected, setImageErrors);
    }

    if (
      Object.keys(tempOrgNameErrors).length > 0 ||
      Object.keys(tempImgAltErrors).length > 0 ||
      Object.keys(tempImgAltErrorsSpanish).length > 0 ||
      Object.keys(tempBodyErrors).length > 0 ||
      Object.keys(tempBodyErrorsSpanish).length > 0 ||
      Object.keys(imageErrors).length > 0 ||
      Object.keys(tempTwitterErrors).length > 0 ||
      Object.keys(tempInstagramErrors).length > 0 ||
      Object.keys(tempFacebookErrors).length > 0 ||
      Object.keys(tempWebsiteErrors).length > 0
    ) {
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageObj);
    formData.append("orgName", formValues.orgName);
    formData.append("imageLink", formValues.imageLink);
    formData.append("imageAlt", formValues.imageAlt);
    formData.append(
      "imageAltSpanishHowTranslated",
      formValues.imageAltSpanishHowTranslated
    );
    formData.append("imageAltSpanish", formValues.imageAltSpanish);
    formData.set("orgImgAltSpanish", formValues.imageAltSpanish);
    formData.set("orgDescriptionEnglish", formValues.orgDescriptionEnglish);
    formData.set("orgDescriptionSpanish", formValues.orgDescriptionSpanish);
    formData.set(
      "descriptionSpanishHowTranslated",
      formValues.descriptionSpanishHowTranslated
    );
    formData.append("twitter", formValues.twitter);
    formData.append("instagram", formValues.instagram);
    formData.append("facebook", formValues.facebook);
    formData.append("website", formValues.website);
    console.log("newPhoto", newPhoto);
    formData.append("isNewPhoto", newPhoto);

    const putMethod = {
      method: "PUT",
      body: formData,
      "Content-Type": "multipart/form-data"
    };

    const url = `${process.env.DOMAIN_PREFIX}/api/organizations/${id}`;
    try {
      const res = await fetch(url, putMethod);
      const result = await res.json();
      if (result.success) {
        window.location.reload(true);
      } else {
        // Preserves and display the error message from the backend
        throw new Error(
          result.message || result.error || "Failed to update org item."
        );
      }
    } catch (error) {
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
    <div className="w-2/3 mx-auto mt-8 pb-10">
      <h1 className="text-2xl mb-1 font-header">Edit Organization Form:</h1>
      <p className="mb-4 font-text">
        (All fields are required except the organization links.)
      </p>
      <form className="space-y-4 font-text" onSubmit={handleSubmit}>
        {!newPhoto ? (
          newPhotoComponent
        ) : (
          <div className="flex items-center space-x-4">
            <label
              htmlFor="orgImage"
              className="w-1/6 flex-shrink-0 font-medium text-right mr-4 font-text"
            >
              Preview Image:
            </label>
            <ImagePicker
              name="orgImage"
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
          language=""
          value={formValues.orgName}
          updateFormValue={updateFormValue}
          name="orgName"
          inputDisplayName="Org Name"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOutsideTitle}
        ></TextInput>

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
          value={formValues.imageAltSpanish}
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

        <TextareaInput
          language="English"
          value={formValues.orgDescriptionEnglish}
          updateFormValue={updateFormValue}
          name="orgDescriptionEnglish"
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

        <TextareaInput
          language="Spanish"
          value={formValues.orgDescriptionSpanish}
          updateFormValue={updateFormValue}
          name="orgDescriptionSpanish"
          inputDisplayName="Description"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateBody}
        ></TextareaInput>

        {/* Twitter/X */}
        <TextInput
          language=""
          value={formValues.twitter}
          updateFormValue={updateFormValue}
          name="twitter"
          inputDisplayName="Twitter/X Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Instagram */}
        <TextInput
          language=""
          value={formValues.instagram}
          updateFormValue={updateFormValue}
          name="instagram"
          inputDisplayName="Instagram Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Facebook */}

        <TextInput
          language=""
          value={formValues.facebook}
          updateFormValue={updateFormValue}
          name="facebook"
          inputDisplayName="Facebook Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

        {/* Website */}

        <TextInput
          language=""
          value={formValues.website}
          updateFormValue={updateFormValue}
          name="website"
          inputDisplayName="Website Link"
          hasAttemptedSubmission={hasAttemptedSubmission}
          validation={validateOptionalLink}
        ></TextInput>

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
              className="btn bg-dark text-white text-lg py-2 px-4 ml-3 answer-yes cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? "..." : "Update"}
            </button>
          </div>
        </div>
      </form>
      <UserInputError
        errorObj={errors}
        inputName="Submission"
        singular="true"
      />
    </div>
  );
};

export default EditOrgForm;
