import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "../../types";
import { HeroProductCard } from "./HeroProductCard";
import { PrevArrow, NextArrow } from "./CarouselArrows";

interface HeroCarouselProps {
  products: Product[];
}

export function HeroCarousel({ products }: HeroCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    appendDots: (dots: React.ReactNode[]) => (
      <div style={{ position: "static", padding: "10px 0" }}>
        <ul style={{ margin: 0, padding: 0, textAlign: "center" }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div
        className="custom-dot"
        style={{
          width: "10px",
          height: "10px",
          backgroundColor: "rgba(255,255,255,0.5)",
          borderRadius: "50%",
          margin: "0 5px",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1536, // 2xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // md
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="hero-carousel w-full mt-6">
      <div className="mx-3 pb-5">
        {" "}
        {/* Padding bottom adicional */}
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id} className="px-2">
              <HeroProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
