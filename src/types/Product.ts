export interface ProductVariation {
  estoque: string;
  vendedor: string;
  fabricante: string;
  cor: string;
  voltagem: string;
  tamanho: string;
  garantia: string;
  peso: string | null;
  dimensoes: string | null;
}

export interface Product {
  id: number;
  nome: string | null;
  preco: string | null;
  categorias: number[];
  descricao: string;
  variacao: ProductVariation[];
}
