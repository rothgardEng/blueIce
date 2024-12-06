export default function SlideCard({
  title,
  body,
  color,
  shade,
  spanishTitle,
  spanishBody,
  slide,
  currentSlide
}) {
  let render;
  if (slide === currentSlide) {
    render = true;
  } else {
    render = false;
  }

  return (
    <>
      {render && (
        <div className={` ${color} min-h-96 flex justify-center items-center`}>
          <div className={` ${shade}`}>
            <h3 className=" english text-xl md:text-2xl lg:text-4xl font-header">
              {title}
            </h3>
            <h3 className=" spanish hide text-3xl lg:text-x1 font-header">
              {spanishTitle}
            </h3>

            <p className=" english font-text ml-4 mr-4">{body}</p>
            <p className=" spanish hide font-text ml-4 mr-4">{spanishBody}</p>
          </div>
        </div>
      )}
    </>
  );
}
