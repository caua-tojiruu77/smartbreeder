import { useEffect, useState } from "react";
import type { Category } from "../../types/Category";
import { getCategories } from "../../services/productService";

interface Props {
  onSearchChange: (search: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
  onStockChange: (showOnlyStock: boolean) => void;
}

const SearchBar = ({ onSearchChange, onCategoryChange, onStockChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [showOnlyStock, setShowOnlyStock] = useState(false);

  // Carrega as categorias do mock assim que o componente é montado
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // Atualiza o termo de busca e informa o componente pai
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value); // comunica ao Home.tsx o novo valor
  };

  // Atualiza a categoria selecionada e comunica ao pai
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === "" ? null : Number(e.target.value);
    setSelectedCategory(value);
    onCategoryChange(value); // informa ao Home.tsx
  };

  // Atualiza o estado "somente em estoque" e envia para o pai
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setShowOnlyStock(checked);
    onStockChange(checked); // repassa ao Home.tsx para filtrar
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border bg-brand-100 rounded w-full md:w-1/3"
      />

      <select
        value={selectedCategory ?? ""}
        onChange={handleCategoryChange}
        className="px-4 py-2 border bg-brand-100 rounded w-full md:w-1/3"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 px-4 py-2 bg-brand-100 border rounded w-full md:w-1/3 cursor-pointer">
        <input
          type="checkbox"
          checked={showOnlyStock}
          onChange={handleStockChange}
          className="accent-brand-500"
        />
        Somente em estoque
      </label>
    </div>
  );
};

export default SearchBar;
