export interface AddProductDTO {
  name: string;
  description: string;
  newPrice: number;
  oldPrice: number;
  categoryId: number;
  photo: File[]; 
}