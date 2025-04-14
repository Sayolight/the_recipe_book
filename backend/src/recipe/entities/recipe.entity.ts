export class Recipe {
  idMeal: number;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string | null;
  strArea: string | null;
  strInstructions: string | null;
  strMealThumb: string | null;
  strTags: string[] | null;
  strYoutube: string | null;
  strIngredients: { name: string; measure: string }[];
  strSource: string | null;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
