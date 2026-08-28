export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const allProducts: Product[] = [
  {
    id: 1,
    name: "Neelambari Kanchipuram",
    price: 6499,
    category: "Kanchipuram Silk",
    image:
      "https://github.com/molliakhil07/Kalavani/blob/main/kalavani%20p1.jpg?raw=true",
  },
  {
    id: 2,
    name: "Markata",
    price: 5499,
    category: "Kanchipuram pure cotton saree",
    image:
      "https://github.com/molliakhil07/Kalavani/blob/main/kalavani%20p2.jpg?raw=true",
  },
  {
    id: 3,
    name: "Heritage saffron Silk",
    price: 7499,
    category: "Kanchipuram Silk",
    image:
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
  },
  {
    id: 4,
    name: "Banarasi",
    price: 7250,
    category: "Kanchipuram Silk",
    image:
      "https://github.com/molliakhil07/Kalavani/blob/main/kalavani%20p4.jpg?raw=true",
  },
];