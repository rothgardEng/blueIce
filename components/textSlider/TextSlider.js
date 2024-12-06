"use client";
import SlideCard from "./SlideCard";
import dataText from "./data";
import { useState } from "react";
import classes from "./textSlider.module.css";
import { useLocale, useTranslations } from "next-intl";

export default function TextSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const locale = useLocale();

  const handleAreaClick = () => {
    if (currentSlide < 6) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  const handleClick = (index) => {
    setCurrentSlide(index);
  };
  return (
    <section id="our-demands">
      <div onClick={handleAreaClick}>
        {dataText.map((thing, index) => (
          <SlideCard
            key={index}
            slide={index}
            title={thing[`${locale}Title`]}
            body={thing[`${locale}Body`]}
            color={thing.color}
            shade={thing.shade}
            currentSlide={currentSlide}
          />
        ))}
      </div>
      <div className={`pb-8 c${currentSlide + 1}`}>
        <div className={`inline-flex ${classes.dotDiv}`} id="dotDiv">
          <div
            className={`flex justify-center  text-xl md:text-2xl lg:text-3xl  c${
              currentSlide + 1
            } font-header`}
          >
            {dataText.map((thing, index) => (
              <div key={index} onClick={() => handleClick(index)}>
                <h1 className={`ml-2 mr-2 cursor-pointer`}>-</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
