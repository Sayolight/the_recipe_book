"use client";
import { Button } from "@/components/Button";
import { RecipeThumb } from "@/components/RecipeThumb";
import { filterRecipes, getRecipeById } from "@/lib/api";
import { Recipe } from "@/types/Recipe";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipePage() {
  const { id } = useParams();
  const router = useRouter();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const recipe = await getRecipeById(id ? id.toString() : "");
      const recipeList = await filterRecipes(
        "category",
        recipe?.strCategory || ""
      );
      setRecipe(recipe);
      setRecipeList(recipeList);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <title>{recipe?.strMeal}</title>
      <Button
        className="w-full mb-5"
        text="Back to main"
        onClick={() => router.push("/")}
      ></Button>
      {recipe ? (
        <div className="flex md:flex-row flex-col gap-[16px] row-start-2 items-center sm:items-start">
          <div className="flex sm:flex-row flex-col sm:items-start items-center flex-2/3">
            <Image
              width={200}
              height={200}
              src={
                recipe?.strMealThumb ||
                "https://placehold.co/600x400/EEE/31343C"
              }
              alt={recipe?.strMeal || "Recipe Image"}
              className="sm:mr-4 text-center"
            />
            <div className="flex flex-col sm:text-start text-center">
              <h1 className="text-3xl font-bold">{recipe?.strMeal}</h1>
              <p>
                Country:{" "}
                <a
                  href={"/?filter=country&search=" + recipe?.strArea}
                  className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  {recipe?.strArea}
                </a>
              </p>
              <table className="table-auto mb-2">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th>Ingredient</th>
                    <th>Measure</th>
                  </tr>
                </thead>
                <tbody>
                  {recipe?.strIngredients.map((ingredient, index) => (
                    <tr
                      key={index}
                      className="odd:bg-white even:bg-gray-50 border-b border-gray-200 "
                    >
                      <td className="py-1">
                        <a
                          href={"/?filter=ingredient&search=" + ingredient.name}
                          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        >
                          {ingredient.name}
                        </a>
                      </td>
                      <td>{ingredient.measure}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p>{recipe?.strInstructions}</p>
            </div>
          </div>
          <div className="flex flex-col w-full md:flex-1/3">
            <p className="font-bold text-xl">
              Also in category{" "}
              <a
                href={"/?filter=category&search=" + recipe?.strCategory}
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                {recipe?.strCategory}
              </a>
              :
            </p>
            {recipeList.map((recipe) => (
              <div key={recipe.idMeal} className="flex flex-col">
                <RecipeThumb
                  id={recipe.idMeal}
                  name={recipe.strMeal}
                  img={
                    recipe.strMealThumb
                      ? recipe.strMealThumb
                      : "https://placehold.co/600x400/EEE/31343C"
                  }
                ></RecipeThumb>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="font-bold">Error fetching recipe with id {id}</p>
      )}
    </div>
  );
}
