import type { Product } from "../../types/Product";
import type { Category } from "../../types/Category";
import { useFavorites } from "../../context/FavoritesContext";

interface Props {
  product: Product;
  categories: Category[];
  onClose: () => void;
}

const ProductModal = ({ product, categories, onClose }: Props) => {
  // Contexto dos favoritos
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorited = favorites.some((p) => p.id === product.id);

  // Pega os nomes das categorias do produto, juntando numa string
  const categoryNames = product.categorias
    .map((id) => categories.find((c) => c.id === id)?.nome)
    .filter(Boolean) // filtra valores nulos/indefinidos
    .join(", ");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/80 backdrop-blur-md rounded-lg shadow-xl max-w-xl w-full p-6 relative animate-fade-in">
        {/* Botão fechar modal */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-red-500 bg-white transition hover:scale-105 duration-300"
        >
          ✕
        </button>

        {/* Nome e preço do produto */}
        <h2 className="text-xl font-bold">
          {product.nome ?? "Nome desconhecido"}
        </h2>
        <p className="font-bold text-lg">
          {product.preco ? `R$ ${product.preco}` : "Preço não disponível"}
        </p>

        {/* Exibe as categorias em texto */}
        <p className="text-sm text-gray-300 italic mb-2">
          Categorias: {categoryNames || "Não informado"}
        </p>

        {/* Descrição */}
        <p className="text-sm text-white mb-4">{product.descricao}</p>

        {/* Variações do produto */}
        <h3 className="font-medium mb-2">Variações:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto text-sm">
          {product.variacao.map((v, idx) => (
            <div key={idx} className="bg-white/55 rounded p-4 shadow-sm">
              <p>
                <span className="font-bold text-sm">Cor:</span>{" "}
                {v.cor ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Tamanho:</span>{" "}
                {v.tamanho ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Voltagem:</span>{" "}
                {v.voltagem ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Vendedor:</span>{" "}
                {v.vendedor ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Fabricante:</span>{" "}
                {v.fabricante ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Garantia:</span>{" "}
                {v.garantia ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Peso:</span>{" "}
                {v.peso ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Dimensões:</span>{" "}
                {v.dimensoes ?? "Não Disponivel"}
              </p>
              <p>
                <span className="font-bold text-sm">Estoque:</span>{" "}
                {v.estoque ?? "Não Disponivel"}
              </p>
            </div>
          ))}
        </div>

        {/* Botão de favoritar/desfavoritar */}
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
