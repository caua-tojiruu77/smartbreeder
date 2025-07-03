import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <section className="p-4 mt-20 flex flex-col items-center w-screen">
      <div className="row w-full">
        <div className="container">
          <div className="mb-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Favoritos</h1>
            <Link
              to="/"
              className="text-lg font-bold text-white hover:text-red-600 duration-300 mb-6"
            >
              ← Voltar para todos os produtos
            </Link>
          </div>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg">
              <p className="text-white text-center">
                Nenhum produto favoritado ainda.
              </p>
            </div>
          ) : (
            <div className="px-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
