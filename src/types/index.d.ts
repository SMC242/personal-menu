export type Spiciness = "Not spicy" | "Mild" | "Medium" | "Hot";

export type Cuisine =
  | "North Indian"
  | "South Indian"
  | "Chinese"
  | "Italian"
  | "Parsi"
  | "British"
  | "Japanese";

export type DishType =
  | "Main"
  | "Side"
  | "Carbs"
  | "Drink"
  | "Dessert"
  | "Breakfast";

export type RecipeTags = {
  cuisine: Cuisine;
  spiciness: Spiciness;
  dishType: DishType;
};
