import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface HeroSectionProps {
  badge?: string;
  titleBlack?: string;
  titleColor?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  className?: string;
}

export function HeroSection({
  badge = "NEW SEASON 2026",
  titleBlack = "REDEFINE",
  titleColor = "YOUR STYLE.",
  description = "Koleksi pakaian premium yang didesain untuk kenyamanan dan estetika modern. Bebaskan ekspresimu.",
  buttonText = "Shop Collection",
  buttonLink = "/products",
  imageUrl = "https://i.pinimg.com/736x/66/f1/05/66f1056962f5aad1ba1e904890b09eb0.jpg",
  imageAlt = "Model wearing yellow streetwear",
  className,
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        "w-full py-12 sm:py-16 md:py-20 lg:py-24 overflow-hidden",
        className,
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-5 sm:px-6 lg:flex-row lg:gap-16 lg:px-8">
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left gap-6 w-full max-w-2xl lg:max-w-none">
          {badge && (
            <div className="inline-flex items-center rounded-full bg-zinc-50 border border-zinc-200 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-zinc-800">
              {badge}
            </div>
          )}

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter">
            <span className="block text-zinc-950">{titleBlack}</span>
            <span className="block text-orange-500">{titleColor}</span>
          </h1>

          <p className="max-w-md sm:max-w-lg text-base sm:text-lg leading-relaxed text-zinc-500 mx-auto lg:mx-0">
            {description}
          </p>
          <Link
            to={buttonLink}
            className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-zinc-950 px-8 sm:px-10 py-4 text-sm sm:text-base font-bold text-white transition-all hover:bg-zinc-800 hover:shadow-xl active:scale-95"
          >
            {buttonText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="flex-1 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0">
          <div className="relative aspect-[4/5] sm:aspect-square lg:aspect-[4/3] xl:aspect-[3/2] w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-zinc-100 shadow-2xl">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
