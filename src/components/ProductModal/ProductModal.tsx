import type { Product } from "../../types/Product";
import { useFavorites } from "../../context/FavoritesContext";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: Props) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some((p) => p.id === product.id);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-lg shadow-xl max-w-xl w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500 bg-white transition hover:scale-105 duration-300"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold">
          {product.nome ?? "Nome desconhecido"}
        </h2>
        <p className="font-bold text-lg">
          {product.preco ? `R$ ${product.preco}` : "Preço não disponível"}
        </p>
        <p className="text-sm text-white mb-4">{product.descricao}</p>

        <h3 className="font-medium mb-2">Variações:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto text-sm">
          {product.variacao.map((v, idx) => (
            <div key={idx} className="bg-white/55 rounded p-4 shadow-sm">
              <p>Cor: {v.cor ?? "Não Disponivel"}</p>
              <p>Tamanho: {v.tamanho ?? "Não Disponivel"}</p>
              <p>Voltagem: {v.voltagem ?? "Não Disponivel"}</p>
              <p>Vendedor: {v.vendedor ?? "Não Disponivel"}</p>
              <p>Fabricante: {v.fabricante ?? "Não Disponivel"}</p>
              <p>Garantia: {v.garantia ?? "Não Disponivel"}</p>
              <p>Peso: {v.peso ?? "Não Disponivel"}</p>
              <p>Dimensões: {v.dimensoes ?? "Não Disponivel"}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => toggleFavorite(product)}
          className={`mt-6 w-full font-bold py-2 rounded text-black hover:text-white transition duration-300 ${
            isFavorited
              ? "bg-white hover:bg-red-950"
              : "bg-white hover:bg-white/80"
          }`}
        >
          {isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
