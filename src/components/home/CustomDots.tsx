import React from "react";

interface CustomDotsProps {
  dots: React.ReactNode[];
  currentSlide: number;
  slidesToScroll: number;
  slideCount: number;
  onDotClick: (slide: number) => void;
}

export const CustomDots = ({
  dots,
  currentSlide,
  slidesToScroll,
  slideCount,
  onDotClick,
}: CustomDotsProps) => {
  return (
    <div className="custom-dots-container pt-3 pb-1">
      <ul
        className="slick-dots"
        style={{
          position: "static",
          display: "flex",
          justifyContent: "center",
          padding: 0,
          margin: "8px 0 0 0",
        }}
      >
        {dots.map((dot, i) => (
          <li
            key={i}
            className={
              i === Math.floor(currentSlide / slidesToScroll)
                ? "slick-active"
                : ""
            }
            style={{ margin: "0 5px", listStyle: "none" }}
          >
            <button
              onClick={() => onDotClick(i * slidesToScroll)}
              style={{
                backgroundColor:
                  i === Math.floor(currentSlide / slidesToScroll)
                    ? "white"
                    : "rgba(255, 255, 255, 0.5)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              <span className="sr-only">Diapositiva {i + 1}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
