import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../../services/productService";
import type { Product } from "../../types/Product";
import type { Category } from "../../types/Category";
import ProductList from "../../components/ProductCard/ProductList";
import SearchBar from "../../components/Layout/SearchBar";

const Home = () => {
  // Estados principais: produtos, categorias, lista filtrada e loading
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados dos filtros e paginação
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [showOnlyStock, setShowOnlyStock] = useState(false);
  const [visibleCount, setVisibleCount] = useState(15);

  // Função para carregar mais produtos (incrementa visíveis)
  const loadMore = () => setVisibleCount((prev) => prev + 15);

  // Ao montar, busca produtos e categorias juntos (pra evitar múltiplas requisições)
  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([prod, cats]) => {
      setProducts(prod);
      setCategories(cats);
      setFiltered(prod);
      setLoading(false);
    });
  }, []);

  // Aplica os filtros sempre que algo muda (busca, categoria, estoque ou produtos)
  useEffect(() => {
    const filteredList = products.filter((product) => {
      const matchesName =
        product.nome?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const matchesCategory =
        categoryId === null || product.categorias.includes(categoryId);
      const matchesStock =
        !showOnlyStock ||
        product.variacao.some((v) => v.estoque?.toLowerCase() === "sim");

      return matchesName && matchesCategory && matchesStock;
    });

    setFiltered(filteredList);
    setVisibleCount(15); // resetar paginação ao filtrar
  }, [search, categoryId, showOnlyStock, products]);

  if (loading)
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        Carregando produtos...
      </div>
    );

  return (
    <section className="w-screen min-h-screen mt-12 px-6">
      <div className="row">
        <div className="container">
          {/* Barra de busca e filtros */}
          <SearchBar
            onSearchChange={setSearch}
            onCategoryChange={setCategoryId}
            onStockChange={setShowOnlyStock}
          />

          {/* Se não tiver produtos, mostra mensagem */}
          {filtered.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              Nenhum produto encontrado.
            </p>
          ) : (
            <div>
              {/* Lista paginada de produtos */}
              <ProductList
                products={filtered.slice(0, visibleCount)}
                categories={categories} // Passa as categorias para exibir nome
              />

              {/* Botão pra carregar mais, se tiver mais produtos */}
              {filtered.length > visibleCount && (
                <div className="text-center mt-6">
                  <button
                    onClick={loadMore}
                    className="px-4 py-2 bg-brand-100 text-white hover:text-black rounded hover:bg-white transition hover:scale-105 duration-300"
                  >
                    Carregar mais
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
