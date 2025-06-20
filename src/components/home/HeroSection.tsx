import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { HeroCarousel } from "./HeroCarousel";
import { getFeaturedProducts } from "../../data/products";

export function HeroSection() {
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(white, rgba(255, 255, 255, 0.3) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>{" "}
      <div className="container mx-auto px-4 py-16 md:py-20 lg:py-24">
        <div className="flex flex-col xl:flex-row items-center gap-8">
          <div className="xl:w-1/2 text-center xl:text-left mb-8 xl:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              El Futuro de la <br />
              <span className="text-blue-300">Tecnología</span> está Aquí
            </h1>
            <p className="mt-6 text-lg text-blue-100 max-w-lg mx-auto xl:mx-0">
              Descubre lo último y mejor en tecnología. Dispositivos premium,
              calidad excepcional, precios imbatibles.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center xl:justify-start">
              <Link to="/category/smartphones">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                >
                  Comprar Ahora
                </Button>
              </Link>
              <Link to="/featured">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Explorar Destacados <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>{" "}
          <div className="xl:w-1/2 w-full relative">
            <div className="relative z-10 rounded-xl overflow-hidden p-4 pb-8">
              <div className="mx-auto">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  Productos destacados
                </h3>
                <HeroCarousel products={featuredProducts} />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-orange-500 rounded-full opacity-30 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
