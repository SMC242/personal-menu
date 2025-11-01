export type Spiciness = "Not spicy" | "Mild" | "Medium" | "Hot";

export type Cuisine = "North Indian";

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
