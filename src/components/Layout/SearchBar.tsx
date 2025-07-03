import { useEffect, useState } from 'react';
import type { Category } from '../../types/Category';
import { getCategories } from '../../services/productService';

interface Props {
  onSearchChange: (search: string) => void;
  onCategoryChange: (categoryId: number | null) => void;
}

const SearchBar = ({ onSearchChange, onCategoryChange }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value === '' ? null : Number(e.target.value);
    setSelectedCategory(value);
    onCategoryChange(value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border bg-brand-100 rounded w-full md:w-1/2"
      />

      <select
        value={selectedCategory ?? ''}
        onChange={handleCategoryChange}
        className="px-4 py-2 border bg-brand-100 rounded w-full md:w-1/2"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchBar;
