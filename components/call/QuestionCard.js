import React from 'react'
import classes from "./flowChart.module.css";


export default function QuestionCard({
  ref,
  currentCard,
  unfocusFunc,
  yesWasHit,
  handleYes,
  questionNumber,
  handleNo,
  buttonIsDisabled,
  question,
  yes,
  no,


}) {

 


// variations
  // button text size
    // default 1 text-xl lg:text-2xl xl:text-3xl
    // 2 text-base lg:text-2xl xl:text-3xl
        // if this is the case div aove need to add class names of "md:w-2/3 sm:w-2/3 lg:w-2/3"



  return (
 <div
        ref={ref}
        className={`flex flex-col justify-center items-center pt-28 pb-28 m-4 xs:ml-2 sm:ml-12 md:ml-16 lg:ml-24 xs:mr-4 sm:mr-12 md:mr-16 lg:mr-24  ${
          currentCard < 2 ? "" : "mb-0"
        } ${classes.noteCard} ${unfocusFunc} ${yesWasHit ? "mb-0" : ""}`}
      >
        <div className={`pb-10 ml-4 mr-4 font-header break-words xs:text-sm s:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl grid grid-cols-1 gap-4`}>
          <p>{question}</p>
        </div>
        <div className="answers grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <button
            className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl py-2 px-4 answer-yes cursor-pointer ${classes.flowChartButton}`}
            onClick={() => handleYes(questionNumber)}
            disabled={buttonIsDisabled > (questionNumber - 1)}
          >
            {yes}
          </button>
          <button
            className={`btn bg-dark text-white text-xl lg:text-2xl xl:text-3xl  py-2 px-4 no1 cursor-pointer ${classes.flowChartButton}`}
            onClick={handleNo}
            disabled={buttonIsDisabled > (questionNumber - 1)}
          >
            {no}
          </button>
        </div>
      </div>




  )
}
