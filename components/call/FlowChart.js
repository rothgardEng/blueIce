"use client";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import classes from "./flowChart.module.css";
import QuestionCard from "./QuestionCard";

export default function FlowChart() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const refRes = useRef(null);
  const refReset = useRef(null);
  const [renderQuestion2, setRenderQuestion2] = useState(false);
  const [renderQuestion3, setRenderQuestion3] = useState(false);
  const [renderQuestion4, setRenderQuestion4] = useState(false);
  const [reset, setReset] = useState(false);
  const [renderPDF, setRenderPDF] = useState(false);
  const [renderFed, setRenderFed] = useState(false);
  const [unfocus1, setUnfocus1] = useState("");
  const [unfocus2, setUnfocus2] = useState("");
  const [unfocus3, setUnfocus3] = useState("");
  const [unfocus4, setUnfocus4] = useState("");
  const [unfocus5, setUnfocus5] = useState("");
  const [currentCard, setCurrentCard] = useState(1);
  const [yesWasHit, setYesWasHit] = useState(false);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(0);
  const t = useTranslations("Call Who");

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderQuestion2]);

  useEffect(() => {
    ref2.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderQuestion3]);
  useEffect(() => {
    ref3.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderQuestion4]);
  useEffect(() => {
    ref4.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderFed]);
  useEffect(() => {
    refRes.current?.scrollIntoView({ behavior: "smooth" });
  }, [renderPDF]);
  useEffect(() => {
    refReset.current?.scrollIntoView({ behavior: "smooth" });
  }, [reset]);

  const updateDiabled = (quesitonNumberJustAnswered) => {
    setButtonIsDisabled(quesitonNumberJustAnswered);
  };

  const handleYes = (yesToWhichQuestion) => {
    setRenderPDF(true);
    setCurrentCard(yesToWhichQuestion);
    setButtonIsDisabled(10);
    setYesWasHit(true);
    setUnfocus1("unfocus");
    setUnfocus2("unfocus");
    setUnfocus3("unfocus");
    setUnfocus4("unfocus");
    setUnfocus5("unfocus");
  };

  // currentCard > question than should be disabled
  const handleQuestion1No = () => {
    setRenderQuestion2(true);
    updateDiabled(1);
    setCurrentCard(2);
    setUnfocus1("unfocus");
  };

  const handleQuestion2No = () => {
    setRenderQuestion3(true);
    updateDiabled(2);
    setCurrentCard(3);
    setUnfocus2("unfocus");
  };

  const handleQuestion3No = () => {
    setRenderQuestion4(true);
    updateDiabled(3);
    setCurrentCard(4);
    setUnfocus3("unfocus");
  };

  const handleQuestion4No = () => {
    setRenderFed(true);
    updateDiabled(4);
    setCurrentCard(5);
    setUnfocus4("unfocus");
  };

  const handleReset = () => {
    setUnfocus1("");
    setUnfocus2("");
    setUnfocus3("");
    setUnfocus4("");
    setUnfocus5("");
    setButtonIsDisabled(0);
    setRenderQuestion2(false);
    setRenderQuestion3(false);
    setRenderQuestion4(false);
    setRenderFed(false);
    setRenderPDF(false);
    setCurrentCard(1);
    setYesWasHit(false);
    setReset(!reset);
  };

  return (
    <section id="flowchart">
      {/* <div
        ref={refReset}
        className={`flex flex-col justify-center items-center pt-28 pb-28 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24  ${
          currentCard < 2 ? "" : "mb-0"
        } ${classes.noteCard} ${unfocus1} ${yesWasHit ? "mb-0" : ""}`}
      >
        <div className="pb-10 ml-4 mr-4 font-header break-words xs:text-sm s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl  grid grid-cols-1 gap-4">
          <p>{t("Call_question_one")}</p>
        </div>
        <div className="answers grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
            onClick={() => handleYes(1)}
            disabled={buttonIsDisabled > 0}
          >
            {t("Call_answer_one_yes")}
          </button>
          <button
            className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl  py-2 px-4 no1 cursor-pointer ${classes.flowChartButton}`}
            onClick={handleQuestion1No}
            disabled={buttonIsDisabled > 0}
          >
            {t("Call_answer_one_no")}
          </button>
        </div>
      </div> */}

      <QuestionCard
        ref={refReset}
        currentCard={currentCard}
        buttonIsDisabled={buttonIsDisabled}
        unfocusFunc={unfocus1}
        yesWasHit={yesWasHit}
        handleYes={handleYes}
        questionNumber={1}
        handleNo={handleQuestion1No}
        question={t("Call_question_one")}
        yes={t("Call_answer_one_yes")}
        no={t("Call_answer_one_no")}
      />

      {currentCard !== 1 && <div className={classes.connectionLine}></div>}

      {/* QUESTION 2 */}
      {renderQuestion2 && (
        <div
          ref={ref}
          className={` flex flex-col justify-center items-center pt-28 pb-28  mt-0 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24  ${
            currentCard === 2 ? "" : "mb-0"
          } ${classes.noteCard} ${unfocus2} ${yesWasHit ? "mb-0" : ""}`}
        >
          <div className="pb-10 ml-4 mr-4 font-header break-words xs:text-sm  s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl grid grid-cols-1 gap-4">
            <p className="english">{t("Call_question_two")}</p>
          </div>
          <div className="answers grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
              onClick={() => handleYes(2)}
              disabled={buttonIsDisabled > 1}
            >
              {t("Call_answer_two_yes")}
            </button>
            <button
              className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 no2 cursor-pointer ${classes.flowChartButton}`}
              onClick={() => handleQuestion2No()}
              disabled={buttonIsDisabled > 1}
            >
              {t("Call_answer_two_no")}
            </button>
          </div>
          <button
            className="btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 mt-8 cursor-pointer"
            onClick={handleReset}
          >
            {t("Call_reset")}
          </button>
        </div>
      )}
      {currentCard > 2 && <div className={classes.connectionLine}></div>}

      {renderQuestion3 && (
        <div
          ref={ref2}
          className={`flex flex-col justify-center items-center pt-28 pb-28 mt-0 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24  ${
            currentCard === 3 ? "" : "mb-0"
          } ${classes.noteCard} ${unfocus3} ${yesWasHit ? "mb-0" : ""}`}
        >
          <div className="pb-10 ml-4 mr-4 font-header break-words   xs:text-sm  s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl grid grid-cols-1 gap-4">
            <p className="english">{t("Call_question_three")}</p>
          </div>
          <div className="answers md:w-2/3 sm:w-2/3 lg:w-2/3 overflow-hidden grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              className={`btn bg-dark text-white text-base lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
              onClick={() => handleYes(3)}
              disabled={buttonIsDisabled > 2}
            >
              {t("Call_answer_three_yes")}
            </button>
            <button
              className={`btn bg-dark text-white beak-words text-base lg:text-2xl xl:text-3xl py-2 px-4 no3 cursor-pointer ${classes.flowChartButton} `}
              onClick={handleQuestion3No}
              disabled={buttonIsDisabled > 2}
            >
              {t("Call_answer_three_no")}
            </button>
          </div>
          <button
            className="btn bg-dark text-white xs:text-sm s:text-sm md:text-base lg:text-lg xl:text-lg py-2 px-4 cursor-pointer"
            onClick={handleReset}
          >
            {t("Call_reset")}
          </button>
        </div>
      )}
      {currentCard > 3 && <div className={classes.connectionLine}></div>}

      {renderQuestion4 && (
        <div
          ref={ref3}
          className={
            `flex flex-col justify-center items-center pt-28 pb-28 mt-0 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24 ${
              currentCard === 4 ? "" : "mb-0"
            } ${classes.noteCard}` + ` ${unfocus4} ${yesWasHit ? "mb-0" : ""}`
          }
        >
          <div className="pb-10 ml-4 mr-4 font-header  break-words  xs:text-sm s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl grid grid-cols-1 gap-4 ">
            <p className="english">{t("Call_question_four")}</p>
          </div>
          <div className="answers grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              className={`btn bg-dark text-white break-words text-xl lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
              onClick={() => handleYes(4)}
              disabled={buttonIsDisabled > 3}
            >
              {t("Call_answer_four_yes")}
            </button>
            <button
              className={`btn bg-dark text-white  break-words text-xl lg:text-2xl xl:text-3xl py-2 px-4 no4 cursor-pointer ${classes.flowChartButton}`}
              onClick={handleQuestion4No}
              disabled={buttonIsDisabled > 3}
            >
              {t("Call_answer_four_no")}
            </button>
          </div>
          <button
            className="btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 cursor-pointer"
            onClick={handleReset}
          >
            {t("Call_reset")}
          </button>
        </div>
      )}
      {currentCard > 4 && <div className={classes.connectionLine}></div>}

      {renderFed && (
        <div
          ref={ref4}
          className={
            `flex flex-col justify-center items-center pt-28 pb-28 mt-0 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24 ${
              currentCard === 5 ? "" : "mb-0"
            } ${classes.noteCard}` + ` ${unfocus5} ${yesWasHit ? "mb-0" : ""}`
          }
        >
          <div className="row ml-4 mr-4 pb-10 pl-8 pr-8  w-full overflow-hidden  ">
            <h3 className=" english font-header break-words xs:text-sm s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
              {t("Call_question_five")}
            </h3>
          </div>
          <div className="answers md:w-2/3 sm:w-2/3 lg:w-2/3 grid grid-cols-1 gap-4 mb-8 w-full overflow-hidden ">
            <button
              className={`btn bg-dark text-white beak-words text-base lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
              onClick={() => handleYes(6)}
              disabled={buttonIsDisabled > 5}
            >
              {t("Call_answer_five_no")}
            </button>
          </div>
          <button
            className="btn bg-dark text-white xs:text-sm text-xl lg:text-2xl xl:text-3xl py-2 px-4 cursor-pointer"
            onClick={handleReset}
          >
            {t("Call_reset")}
          </button>
        </div>
      )}
      {/* {currentCard >5 && <div className={classes.connectionLine}></div>} */}

      {renderPDF && (
        <>
          <div className={classes.connectionLine}></div>
          <div
            ref={refRes}
            className={`full flex flex-col  justify-center items-center space-y-8 pt-28 pb-28 mt-0 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24 ${classes.noteCard}`}
          >
            <div className="text-center w-full overflow-hidden">
              <h2 className="font-header ml-4 mr-4 english break-words xs:text-sm s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
                {t("Call_community_got_it")}
              </h2>
              <h4 className="font-text pt-6 pl-8 pr-8 english break-words xs:text-sm s:text-sm md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl">
                {t("Call_instructions_to_click")}
              </h4>
            </div>

            {/* break sizes for font size
              start
              2xl: 1536
              xl: 1280
              lg:1024
              md: 768
              sm:640
             */}
            <div className="answers grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pb-10">
              <div className="flex flex-col text-center">
                <p
                  className="mb-4 font-header text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                  id="arlington"
                >
                  Arlington
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    target="_blank"
                    className="btn bg-dark text-white  text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 md:px-4 lg:px-4 mt-2 cursor-pointer"
                    href="/pdfs/ENGLISH Flyer Arlington ATCP.pdf"
                  >
                    English
                  </a>
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/SPANISH Flyer Arlington ATCP.pdf"
                  >
                    Español
                  </a>
                </div>
              </div>

              <div className="flex flex-col text-center">
                <p className="mb-4 font-header text-base sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  Alexandria
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/ENGLISH Flyer Alexandria ATCP.pdf"
                  >
                    English
                  </a>
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/SPANISH Flyer Alexandria ATCP.pdf"
                  >
                    Español
                  </a>
                </div>
              </div>

              <div className="flex flex-col text-center">
                <p className="mb-4 font-header text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  Fairfax
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0  mt-2 cursor-pointer"
                    href="/pdfs/ENGLISH Flyer Fairfax ATCP.pdf"
                  >
                    English
                  </a>
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/SPANISH Flyer Fairfax ATCP.pdf"
                  >
                    Español
                  </a>
                </div>
              </div>

              <div className="flex flex-col text-center pb-20">
                <p className="mb-4 font-header text-xl sm:text-xl md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
                  PWC
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/ENGLISH Flyer PW ATCP.pdf"
                  >
                    English
                  </a>
                  <a
                    target="_blank"
                    className="btn bg-dark text-white text-xl sm:text-xl md:text-xl  lg:text-2xl xl:text-2xl py-2 px-2 sm:px-0 xs:px-0 mt-2 cursor-pointer"
                    href="/pdfs/SPANISH Flyer PW ATCP.pdf"
                  >
                    Español
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
