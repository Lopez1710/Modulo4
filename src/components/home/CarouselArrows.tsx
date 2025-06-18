import { ChevronLeft, ChevronRight } from "lucide-react";

export const PrevArrow = (props: any) => {
  const { style, onClick } = props;
  return (
    <button
      className="slick-custom-prev z-20 cursor-pointer absolute top-1/2 -left-3 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 before:content-none"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
      aria-label="Anterior"
    >
      <ChevronLeft className="w-5 h-5 text-white" />
    </button>
  );
};

export const NextArrow = (props: any) => {
  const { style, onClick } = props;
  return (
    <button
      className="slick-custom-next z-20 cursor-pointer absolute top-1/2 -right-3 transform -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 before:content-none"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
      aria-label="Siguiente"
    >
      <ChevronRight className="w-5 h-5 text-white" />
    </button>
  );
};
