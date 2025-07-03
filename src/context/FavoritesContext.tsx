import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/Product";

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const toggleFavorite = (product: Product) => {
    const isAlreadyFavorited = favorites.some((p) => p.id === product.id);

    if (isAlreadyFavorited) {
      setFavorites((prev) => prev.filter((p) => p.id !== product.id));
      return;
    }

    let updatedFavorites = [...favorites];

    product.categorias.forEach((catId) => {
      const sameCategory = updatedFavorites.filter((p) =>
        p.categorias.includes(catId)
      );

      if (sameCategory.length >= 2) {
        const oldest = sameCategory[0]; // remove o mais antigo
        updatedFavorites = updatedFavorites.filter((p) => p.id !== oldest.id);
      }
    });

    updatedFavorites.push(product);
    setFavorites(updatedFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error("useFavorites must be used within a FavoritesProvider");
  return context;
};
