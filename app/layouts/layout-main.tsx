import { HouseIcon, KeyRound, ShirtIcon, ShoppingCartIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
import { Button } from "~/components/ui/button";

export default function LayoutMain() {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-orange-500/30">
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-5 py-4 md:px-8 lg:px-12 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm transition-all duration-300">
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 group hover:opacity-90 transition-opacity"
        >
          <div className="bg-orange-500 p-1.5 md:p-2 rounded-xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300 shadow-md shadow-orange-500/20">
            <ShirtIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black tracking-tighter uppercase italic">
            Clothify<span className="text-orange-500">.</span>
          </h1>
        </Link>

        <ul className="flex gap-1 sm:gap-2 items-center">
          <li>
            <Button
              variant="ghost"
              className="gap-2 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 px-3 md:px-4"
              asChild
            >
              <Link to="/">
                <HouseIcon className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Home</span>
              </Link>
            </Button>
          </li>

          <li>
            <Button
              variant="ghost"
              className="gap-2 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 px-3 md:px-4"
              asChild
            >
              <Link to="/products">
                <ShirtIcon className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Products</span>
              </Link>
            </Button>
          </li>

          <li>
            <Button
              variant="ghost"
              className="gap-2 rounded-full text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 px-3 md:px-4"
              asChild
            >
              <Link to="/cart">
                <ShoppingCartIcon className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">Cart</span>
              </Link>
            </Button>
          </li>

          <div className="hidden sm:block w-[1px] h-6 bg-zinc-200 mx-1 md:mx-2"></div>

          <li>
            <Button
              className="gap-2 px-4 sm:px-6 md:px-8 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold transition-all hover:ring-4 hover:ring-zinc-950/10 active:scale-95"
              asChild
            >
              <Link to="/login">
                <KeyRound className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            </Button>
          </li>
        </ul>
      </nav>

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 md:py-12 flex flex-col items-center justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <ShirtIcon className="w-4 h-4 text-orange-500" />
            <span className="text-lg font-black tracking-tighter uppercase italic">
              Clothify.
            </span>
          </Link>
          <p className="text-center text-[10px] sm:text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
            &copy; {year} CLOTHIFY. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
