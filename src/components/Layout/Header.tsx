import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { favorites } = useFavorites();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav
        className={`fixed z-50 top-0 left-0 w-full transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        } bg-black/70 backdrop-blur-md px-6 py-4`}
      >
        <div className="flex justify-between items-center row">
          {/* Ícone do lado direito (ex: avatar / imagem / ícone de perfil) */}
          <div>
            <FaUserCircle className="w-7 h-7 text-white hover:text-gray-800 cursor-pointer transition" />
          </div>
          
          {/* Navegação à esquerda */}
          <div className="flex gap-6 items-center">
            <Link
              to="/"
              className="flex items-center gap-2 text-white hover:text-brand-500 text-lg font-medium"
            >
              <FaShoppingCart className="w-5 h-5" />
              Produtos
            </Link>

            <Link
              to="/favoritos"
              className="relative flex items-center gap-2 text-red-600 hover:text-red-700 text-lg font-medium"
            >
              <FaHeart className="w-5 h-5" />
              Favoritos
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
