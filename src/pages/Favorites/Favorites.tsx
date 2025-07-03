import { useEffect, useState } from "react";
import { getCategories } from "../../services/productService";
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import type { Category } from "../../types/Category";

const Favorites = () => {
  // Pega produtos favoritos do contexto
  const { favorites } = useFavorites();

  // Estado para armazenar categorias (para mostrar nomes legíveis)
  const [categories, setCategories] = useState<Category[]>([]);
  // Controle de loading enquanto categorias carregam
  const [loading, setLoading] = useState(true);

  // Carrega categorias na montagem do componente
  useEffect(() => {
    getCategories()
      .then((cats) => {
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => setLoading(false)); // Em caso de erro, também tira loading
  }, []);

  // Se estiver carregando categorias, mostra mensagem
  if (loading)
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        Carregando categorias...
      </div>
    );

  return (
    <section className="p-4 mt-20 flex flex-col items-center w-screen">
      <div className="row w-full">
        <div className="container">
          {/* Cabeçalho com título e link para voltar */}
          <div className="mb-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Favoritos</h1>
            <Link
              to="/"
              className="text-lg font-bold text-white hover:text-red-600 duration-300 mb-6"
            >
              ← Voltar para todos os produtos
            </Link>
          </div>

          {/* Mensagem se não houver favoritos */}
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg">
              <p className="text-white text-center">
                Nenhum produto favoritado ainda.
              </p>
            </div>
          ) : (
            // Lista de cards dos favoritos, passando as categorias para mostrar nome delas
            <div className="px-6 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
              {favorites.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  categories={categories}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
