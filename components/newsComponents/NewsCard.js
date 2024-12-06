"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import classes from "./newsCard.module.css";
import PostNewsForm from "./PostNewsForm";
import EditNewsForm from "./EditNewsForm";
import EditRecForm from "../recs/EditRecForm";
import { useLocale, useTranslations } from "next-intl";
import GoogleTranslateMessage from "../misc/GoogleTranslateMessage";
import googleText from "@/Lib/misc/googleText";


export default function NewsCard({
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
  anon,
  postedBy,
  createdAt,
  updatedAt,
  forNewsCard,
  author,
  topic,
  genre,
  session,
  id
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const locale = useLocale();
  const tN = useTranslations("News");
  const tR = useTranslations("Recs");
  let tempBody = body;
  let tempTitle = title;
  let tempAltText = imgAlt;

  // if local ===es and   en does not equal no english
  // languages
  if (locale === "es") {
    tempBody = bodySpanish || body;
    tempTitle = titleSpanish || title;
    tempAltText = imgAltSpanish || imgAlt;
  }


  const [currentBody, setCurrentBody] = useState(tempBody);
  const [currentTitle, setCurrentTitle] = useState(tempTitle);
  const [currentAtlText, setCurrentAltText] = useState(tempAltText);
  const [currentAltGoogle, setCurrentAltGoogle] = useState(
    googleText(imageAltSpanishHowTranslated, locale, imgAlt, currentAtlText)
  );

  // show expand/minimize on smaller screens

  const textRef = useRef(null);
  const [isClamped, setIsClamped] = useState(false);

  // want to show google translate if
  //  if local !=== en  AND current !== english and xLanguageHowTranslated === Google Translated

  const setTextToEnglish = (e) => {
    setCurrentBody(body);
    setCurrentTitle(title);
    setCurrentAltText(imgAlt);
  };

  const setTextToLocale = (e) => {
    if (locale === "es") {
      setCurrentBody(bodySpanish || body);
      setCurrentTitle(titleSpanish || title);
      setCurrentAltText(imgAltSpanish || imgAlt);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const [postedByState, setPostedByState] = useState(anon ? "The DNP Team" : postedBy);

  console.log("title:", title, "anon:", anon, "postedBy:", postedBy, "postedByState:", postedByState);

  const [deleteErrors, setDeleteErrors] = useState({})
  const [deleteTrigger, setDeleteTrigger] = useState(false);
  const [formTrigger, setFormTrigger] = useState(false);

  const dString = createdAt;
  // Parse the date string
  let date = new Date(dString);

  // Format the date
  let formattedTime = date.toLocaleTimeString();
  let formattedDate = date.toLocaleDateString("en-US");

  const handleEdit = () => {
    setFormTrigger(true);
  };

  // determine what language to use

  const handleDelete = async (e) => {
    const deleteMethod = {
      method: "DELETE", // Method itself
      headers: {
        "Content-type": "application/json; charset=UTF-8" // Indicates the content
      }
    };
    let resource = "news";
    if (!forNewsCard) {
      resource = "recs";
    }
    const url = `${process.env.DOMAIN_PREFIX}/api/${resource}/${id}`;
    const res = await fetch(url, deleteMethod);
    try {
      const result = await res.json();
      console.log(result);
      if (result.success) {
        setDeleteTrigger(true);
      }  else {
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

  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      const isOverFlowing =
        textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsClamped(isOverFlowing);
    }
  }, [currentBody, screenSize]);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.innerWidth > 768; // Assuming 1024px is the breakpoint for large screens
      setScreenSize(window.innerWidth);
      setIsExpanded(isLargeScreen);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showExpanded = isExpanded ? (
    <button
      className={`text-blue-500 hover:underline mt-2 font-header ${classes.more} `}
      onClick={toggleExpand}
    >
      {tN("News_minimize")}
    </button>
  ) : (
    <button
      className={`text-blue-500 hover:underline mt-2 font-header ${classes.more} `}
      onClick={toggleExpand}
    >
      {tN("News_expand")}
    </button>
  );

  if (deleteTrigger) {
    return null;
  }

  // if editing and news
  if (formTrigger && forNewsCard) {
    return (
      <EditNewsForm
        title={title}
        id={id}
        titleSpanish={titleSpanish}
        titleSpanishHowTranslated={titleSpanishHowTranslated}
        body={body}
        bodySpanish={bodySpanish}
        bodySpanishHowTranslated={bodySpanishHowTranslated}
        media={media}
        imgAlt={imgAlt}
        imgAltSpanish={imgAltSpanish}
        imageAltSpanishHowTranslated={imageAltSpanishHowTranslated}
        newsLink={newsLink}
        postedBy={postedBy}
        createdAt={createdAt}
        updatedAt={updatedAt}
        forNewsCard={forNewsCard}
        session={session}
        topic={topic}
        anon={anon}
        setFormTrigger={setFormTrigger}
      ></EditNewsForm>
    );
  }

  if (formTrigger && !forNewsCard) {
    return (
      <EditRecForm
        title={title}
        id={id}
        titleSpanish={titleSpanish}
        titleSpanishHowTranslated={titleSpanishHowTranslated}
        body={body}
        bodySpanish={bodySpanish}
        bodySpanishHowTranslated={bodySpanishHowTranslated}
        mediaLink={media}
        imgAlt={imgAlt}
        imgAltSpanish={imgAltSpanish}
        imageAltSpanishHowTranslated={imageAltSpanishHowTranslated}
        purchaseLink={newsLink}
        forNewsCard={forNewsCard}
        author={author}
        mediaType={topic}
        genre={genre}
        session={session}
        anon={anon}
        setFormTrigger={setFormTrigger}
      />
    );
  }

  return (
    <div className="max-w-2/3 offWhite rounded-lg shadow-md overflow-hidden mt-4 mb-4 mx-3 lg:mx-4 xl:mx-1 sm:mx-4">
      {/* Image and Content Container */}
      <div className="flex flex-wrap">
        {/* Image Container */}
        <div className="w-full md:w-1/2 h:w-1/2">
          <a target="_blank" href={media}>
            <Image
              src={media}
              alt={`${currentAtlText} ${currentAltGoogle}`}
              width={200}
              height={200}
              layout="responsive"
              className="object-cover"
            />
          </a>
        </div>

        {/* Title and Body Container */}
        <div className="w-full md:w-1/2  p-4 ">
          {/* Title */}
          <GoogleTranslateMessage
            check={titleSpanishHowTranslated}
            local={locale}
            englishText={title}
            currentText={currentTitle}
          ></GoogleTranslateMessage>
          <h2 className="text-3xl font-semibold mb-2 font-header">
            {currentTitle}
          </h2>

          {/* Body */}
          <div
            ref={textRef}
            className={`text-gray-600 font-text ${
              isExpanded ? "overflow-auto" : "overflow-hidden"
            } ${isExpanded ? "" : "line-clamp-4"}`}
          >
            {currentBody}
            <GoogleTranslateMessage
              check={bodySpanishHowTranslated}
              local={locale}
              englishText={body}
              currentText={currentBody}
            ></GoogleTranslateMessage>
          </div>

          {isClamped && screenSize < 768 ? showExpanded : ""}
        </div>
      </div>

      {/* Media Type, By, Genre Container */}
      {!forNewsCard && (
        <div className="p-4 border-t">
          <div className="flex flex-wrap justify-around font-text ">
            <p className="m-2 text-gray-500 text-sm">
              {" "}
              {tR("Recs_type_of_media") + " " + tR(`Recs_select_${topic}`)}
            </p>
            <p className="m-2 text-gray-500 text-sm">
              {tR("Recs_author") + " " + author}
            </p>
            <p className="m-2 text-gray-500 text-sm">
              {tR("Recs_type_genre") + " " + tR(`Recs_select_${genre}`)}
            </p>
          </div>

          {/* Read More and Meta */}
          <div className="flex flex-wrap justify-around mt-4">
            <a
              href={newsLink}
              target="_blank"
              className={`text-blue-500 font-text cursor-pointer ${classes.more}`}
            >
              {tR("Recs_where_to_find")}
            </a>

            {/* Posted By, Created At, Updated At */}
            <div className="text-gray-500 text-sm font-text text-center">
              {postedByState && `${tN("News_posted_by")} ${postedByState}`} |
              {createdAt &&
                ` ${tN("News_created_at")} ${formattedTime}, ${formattedDate}`}
              {updatedAt && `| Updated at ${updatedAt}`}
            </div>
          </div>
        </div>
      )}

      {/* For News Card */}
      {forNewsCard && (
        <div className="p-4 border-t">
          <div className="flex flex-wrap justify-around text-gray-500 font-text">
            <p>
              {" "}
              {tN("News_type_of_news") + ": " + tN(`News_select_${topic}`)}
            </p>
            <a
              href={newsLink}
              target="_blank"
              className={`text-blue-500 font-text cursor-pointer ${classes.more}`}
            >
              {tN("News_learn_more")}
            </a>
          </div>
          {/* Posted By, Created At, Updated At */}
          <div className="flex flex-wrap text-gray-500 text-sm mt-2 font-text text-center">
            {postedByState && `${tN("News_posted_by")} ${postedByState}`} |
            {createdAt &&
              ` ${tN("News_created_at")} ${formattedTime}, ${formattedDate}`}
            {updatedAt && `| Updated at ${updatedAt}`}
          </div>
        </div>
      )}
      {session && (
        <div className="ml-4 mb-6">
          <button
            className="btn bg-dark text-white text-lg py-2 px-4 answer-yes cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="btn bg-dark text-white text-lg py-2 px-4 ml-4 answer-yes cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
          {deleteErrors.deleteErrors && (
        <div className="mt-4 text-center">
          <p className="text-red-500">{deleteErrors.deleteErrors}</p>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
