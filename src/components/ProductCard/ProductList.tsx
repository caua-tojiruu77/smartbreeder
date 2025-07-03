import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";
import type { Category } from "../../types/Category";

interface ProductListProps {
  products: Product[];
  categories: Category[];
}

const ProductList = ({ products, categories }: ProductListProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} categories={categories} />
      ))}
    </div>
  );
};

export default ProductList;
