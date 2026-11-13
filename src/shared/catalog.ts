export const categories = ["Grains & millets", "Nuts & seeds", "Pantry essentials", "Drinks & infusions", "Pottery"] as const;
export const collections = ["Everyday nourishment", "Mindful sugar", "Hydration", "Balanced eating", "Diabetes-Friendly Picks"] as const;
export type Product = {
  id: number; version: number; sku: string; name: string; description: string; price: string; currency: string;
  category: string; collection: string; pack_size: string; ingredients: string; allergens: string;
  storage: string; origin: string; image_url: string; image_credit?: string; image_source?: string; stock: number; location: string;
  best_before: string | null; status: "draft" | "published"; available: boolean;
  protein_g: string; fibre_g: string; sugar_g: string; nutrition_basis: string;
  gallery_images?: string[]; search_aliases?: string[]; sugar_smart?: boolean; glycemic_index?: number | null; glycemic_source?: string; carbohydrate_g?: string | null;
};
export type ProductPage = { items: Product[]; total: number; page: number; page_size: number; search_suggestions?: string[] };
export const money = (price: string) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(price));
export const imageFor = (p: Product) => p.image_url || "/food/placeholder.svg";

export type AboutContent = {
 eyebrow: string; title: string; intro: string; definition_title: string; definition: string;
 story_title: string; story_paragraphs: string[]; why_title: string; why_intro: string;
 reasons: { title: string; text: string }[]; approach_title: string;
 approach: { title: string; text: string }[]; promise_title: string; promise: string;
 closing_title: string; closing_text: string; sources: { label: string; url: string }[];
};
