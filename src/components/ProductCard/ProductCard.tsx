import type { Product } from "../../types/Product";
import type { Category } from "../../types/Category";
import { useFavorites } from "../../context/FavoritesContext";
import { useState } from "react";
import ProductModal from "../ProductModal/ProductModal";

interface Props {
  product: Product;
  categories: Category[];
}

const ProductCard = ({ product, categories }: Props) => {
  // Contexto para gerenciar favoritos
  const { favorites, toggleFavorite } = useFavorites();
  // Controle para mostrar ou esconder o modal de detalhes
  const [showModal, setShowModal] = useState(false);

  // Verifica se o produto já está nos favoritos
  const isFavorited = favorites.some((p) => p.id === product.id);

  // Concatena os nomes das categorias que o produto pertence
  const categoryNames = product.categorias
    .map((id) => categories.find((c) => c.id === id)?.nome)
    .filter(Boolean) // Remove undefined/null
    .join(", ");

  return (
    <>
      <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg p-5 border border-white/30">
        {/* Nome do produto */}
        <h2 className="text-xl font-semibold text-gray-800">
          {product.nome ?? "Nome desconhecido"}
        </h2>

        {/* Preço */}
        <p className="text-gray-600 mb-1">
          {product.preco ? `R$ ${product.preco}` : "Preço não disponível"}
        </p>

        {/* Categorias (nomes) */}
        <p className="text-sm text-gray-500 italic mb-3">
          {categoryNames || "Categoria desconhecida"}
        </p>

        {/* Botões de ação: abrir modal e favoritar */}
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
                : "bg-black/25 text-brand-200 hover:scale-105"
            }`}
          >
            {isFavorited ? "★ Favorito" : "☆ Favoritar"}
          </button>
        </div>
      </div>

      {/* Modal com detalhes do produto */}
      {showModal && (
        <ProductModal
          product={product}
          categories={categories} // Passa as categorias para mostrar no modal também
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
