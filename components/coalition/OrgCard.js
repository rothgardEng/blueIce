"use client";
import Image from "next/image";
import { useState } from "react";
import EditOrgForm from "./EditOrgForm";
import classes from "./orgCard.module.css";
import { useLocale, useTranslations } from "next-intl";
import GoogleTranslateMessage from "../misc/GoogleTranslateMessage";
import googleText from "@/Lib/misc/googleText";

export default function OrgCard({
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
  session,
  id
}) {
  const locale = useLocale();

  let tempText = englishText;
  let tempAlt = alt;

  if (locale === "es") {
    // || or there for if user is looking at spanish but db does not have that translated to spanish, this will be more applicable when there are new languages added
    tempText = spanishText || text;
    tempAlt = altSpanish || alt;
  }

  const [currentText, setCurrentText] = useState(tempText);
  const [currentAlt, setCurrentAlt] = useState(tempAlt);
  const [currentAltGoogle, setCurrentAltGoogle] = useState(
    googleText(imageAltSpanishHowTranslated, locale, alt, currentAlt)
  );

  const handleEdit = () => {
    setFormTrigger(true);
  };

  const [deleteErrors, setDeleteErrors] = useState({});
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [formTrigger, setFormTrigger] = useState(false);

  const handleDelete = async (e) => {
    const deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8" // Indicates the content
      }
    };

    const url = `${process.env.DOMAIN_PREFIX}/api/organizations/${id}`;
    const res = await fetch(url, deleteMethod);
    try {
      const result = await res.json();
      if (result.success) {
        setDeleteTrigger(true);
      } else {
        throw new Error(
          result.message || result.error || "Failed to delete item."
        );
      }
    } catch (error) {
      if (res.status === 403) {
        setDeleteErrors({
          deleteErrors: error.message || "You don't have access to this"
        });
      }

      setDeleteErrors({
        deleteErrors: error.message || "An unexpected error occurred."
      });
    }
  };

  if (deleteTrigger) {
    return null;
  }

  if (formTrigger) {
    return (
      <EditOrgForm
        src={src}
        alt={alt}
        altSpanish={altSpanish}
        imageAltSpanishHowTranslated={imageAltSpanishHowTranslated}
        orgName={orgName}
        englishText={englishText}
        spanishText={spanishText}
        descriptionSpanishHowTranslated={descriptionSpanishHowTranslated}
        twitter={twitter}
        instagram={instagram}
        facebook={facebook}
        website={website}
        session={session}
        id={id}
        setFormTrigger={setFormTrigger}
      ></EditOrgForm>
    );
  }

  return (
    <div className="mb-4 ml-4 mr-4 flex flex-col h-full">
      <div className="shadow-lg">
        {/* Centering the image */}
        <Image
          src={src}
          alt={`${currentAlt} ${currentAltGoogle}`}
          layout="responsive"
          width={500} // Set desired width or adjust as needed
          height={300} // Set desired height or adjust as needed
          className="mx-auto max-w-full h-auto"
        />

        <div className="light-light-green p-4">
          <h3 className="font-header text-gray-600 text-2xl">{orgName}</h3>
          <p className=" text-gray-600 english font-text">{currentText}</p>
          <GoogleTranslateMessage
            check={descriptionSpanishHowTranslated}
            local={locale}
            englishText={englishText}
            currentText={currentText}
          ></GoogleTranslateMessage>
          <div className="flex justify-between items-center mt-4 text-gray-600">
            {twitter && (
              <a target="_blank" className="text-muted" href={twitter}>
                <svg className={`bi ${classes.icon}`} width="24" height="24">
                  <use href="#twitter"></use>
                </svg>
              </a>
            )}

            {instagram && (
              <a target="_blank" className="text-muted" href={instagram}>
                <svg className={`bi ${classes.icon}`} width="24" height="24">
                  <use href="#instagram"></use>
                </svg>
              </a>
            )}
            {facebook && (
              <a target="_blank" className="text-muted" href={facebook}>
                <svg className={`bi ${classes.icon}`} width="24" height="24">
                  <use href="#facebook"></use>
                </svg>
              </a>
            )}

            {website && (
              <a target="_blank" className="text-muted" href={website}>
                <svg className={`bi ${classes.icon}`} width="24" height="24">
                  <use href="#web"></use>
                </svg>
              </a>
            )}
          </div>
          {session && (
            <div className="mt-5">
              <a
                className="btn bg-dark text-white text-lg py-2 px-4 mt-4 answer-yes cursor-pointer mx-2"
                onClick={handleEdit}
              >
                Edit
              </a>
              <a
                className="btn bg-dark text-white text-lg py-2 px-4 answer-yes cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </a>
              {deleteErrors.deleteErrors && (
                <div className="mt-4 text-center">
                  <p className="text-red-500">{deleteErrors.deleteErrors}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
