import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  HouseIcon,
  KeyRound,
  ShirtIcon,
  ShoppingCartIcon,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

export default function LayoutMain() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();

  // Logic state untuk memantau status login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // CCTV: Cek token setiap kali route/halaman berubah
  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans text-zinc-900 selection:bg-orange-500/30">
      <nav className="sticky top-0 z-50 flex items-center justify-between w-full px-5 py-4 md:px-8 lg:px-12 bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm transition-all duration-300">
        <Link
          to="/"
          className="flex items-center gap-2 md:gap-3 group hover:opacity-90 transition-opacity"
        >
          <div className="bg-orange-500 p-1.5 md:p-2 rounded-lg hover:bg-orange-600 transition-colors text-white">
            {" "}
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

          <div className="hidden sm:block border-l border-zinc-200 h-6 mx-2"></div>

          <li>
            {isLoggedIn ? (
              /* Tampilan kalau SUDAH Login (Dropdown Profil) */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 overflow-hidden ring-offset-background transition-all hover:ring-2 hover:ring-orange-500/50"
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-orange-500 text-white font-bold uppercase">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuItem
                    asChild
                    className="cursor-pointer font-semibold py-2"
                  >
                    <Link to="/dashboard" className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer font-semibold py-2 text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Tampilan kalau BELUM Login */
              <Button
                className="gap-2 px-4 sm:px-6 md:px-8 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold transition-all hover:ring-4 hover:ring-zinc-950/10 active:scale-95"
                asChild
              >
                <Link to="/login">
                  <KeyRound className="w-4 h-4" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              </Button>
            )}
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
