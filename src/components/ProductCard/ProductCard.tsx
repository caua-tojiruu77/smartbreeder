import type { Product } from "../../types/Product";
import { useFavorites } from "../../context/FavoritesContext";
import { useState } from "react";
import ProductModal from "../ProductModal/ProductModal";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();
  const [showModal, setShowModal] = useState(false);

  const isFavorited = favorites.some((p) => p.id === product.id);

  return (
    <>
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/30">
        <h2 className="text-xl font-semibold text-gray-800">
          {product.nome ?? "Nome desconhecido"}
        </h2>
        <p className="text-gray-600 mb-3">
          {product.preco ? `R$ ${product.preco}` : "Preço não disponível"}
        </p>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <button
            onClick={() => setShowModal(true)}
            className="w-full text-white bg-brand-100 text-sm transition hover:scale-105 hover:shadow-xl hover:bg-white hover:text-black duration-500"
          >
            Ver detalhes
          </button>

          <button
            onClick={() => toggleFavorite(product)}
            className={`w-full text-sm transition duration-500 ${
              isFavorited
                ? "bg-green-700 text-white hover:scale-105 hover:bg-green-600"
                : "bg-white text-brand-200 hover:scale-105"
            }`}
          >
            {isFavorited ? "★ Favorito" : "☆ Favoritar"}
          </button>
        </div>
      </div>

      {showModal && (
        <ProductModal product={product} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default ProductCard;
