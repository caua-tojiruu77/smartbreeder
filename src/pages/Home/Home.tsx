import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import type { Product } from "../../types/Product";
import ProductCard from "../../components/ProductCard/ProductCard";
import SearchBar from "../../components/Layout/SearchBar";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);

  useEffect(() => {
    getProducts().then((prod) => {
      setProducts(prod);
      setFiltered(prod);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredList = products.filter((product) => {
      const matchesName =
        product.nome?.toLowerCase().includes(search.toLowerCase()) ?? false;
      const matchesCategory =
        categoryId === null || product.categorias.includes(categoryId);
      return matchesName && matchesCategory;
    });
    setFiltered(filteredList);
  }, [search, categoryId, products]);

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
          <SearchBar
            onSearchChange={setSearch}
            onCategoryChange={setCategoryId}
          />

          {filtered.length === 0 ? (
            <p className="text-gray-600 text-center mt-10">
              Nenhum produto encontrado.
            </p>
          ) : (
            <div className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
