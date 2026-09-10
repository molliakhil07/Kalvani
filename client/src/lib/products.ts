import { supabase } from "./supabase";

export interface SupabaseProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string | null;
  featured: boolean;
  created_at: string;
}

export async function getProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching products:", error);
    throw error;
  }

  return data as SupabaseProduct[];
}