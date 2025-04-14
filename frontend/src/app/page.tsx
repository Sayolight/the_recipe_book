"use client";
import { Button } from "@/components/Button";
import { RecipeThumb } from "@/components/RecipeThumb";
import { filterRecipes, getRecipes } from "@/lib/api";
import { Recipe } from "@/types/Recipe";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[] | []>([]);
  const [title, setTitle] = useState("Recipe search");
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const searchParam = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (filterParam && searchParam) {
          const data =
            filterParam === "name"
              ? await getRecipes(searchParam)
              : await filterRecipes(filterParam, searchParam);
          setRecipes(data);
          setTitle(`Search by ${filterParam}: ${searchParam}`);
          setQuery(searchParam);
        } else {
          const data = await getRecipes("");
          setRecipes(data);
          setTitle("Recipe search");
          setQuery("");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
        setTitle("Error fetching recipes :(");
      }
    };

    fetchData();
  }, [filterParam, searchParam]);

  const handleSearch = () => {
    router.push(`/?filter=name&search=${query}`);
  };

  const handleFilter = (filter: string) => {
    router.push(`/?filter=${filter}&search=${query}`);
  };

  const handleClear = () => {
    router.push("/");
  };

  return (
    <div>
      <title>{title}</title>
      <h1 className="font-bold text-2xl text-center mb-4">{title}</h1>
      <div className="flex items-center gap-2 mb-2">
        <input
          id="search"
          name="search"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Enter your query here..."
          className="flex flex-4/5 items-center w-full rounded-md bg-white pl-3 py-1.5 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600"
        />
        <Button text="Clear" onClick={() => handleClear()}></Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-1">
        <Button text="Search by name" onClick={() => handleSearch()}></Button>
        <Button
          text="Search by ingredient"
          onClick={() => handleFilter("ingredient")}
        ></Button>
        <Button
          text="Search by country"
          onClick={() => handleFilter("country")}
        ></Button>
        <Button
          text="Search by category"
          onClick={() => handleFilter("category")}
        ></Button>
      </div>

      <div>
        {recipes.length > 0 ? (
          recipes.map((recipe: Recipe) => (
            <RecipeThumb
              key={recipe.idMeal}
              id={recipe.idMeal}
              img={
                recipe.strMealThumb || "https://placehold.co/600x400/EEE/31343C"
              }
              name={recipe.strMeal}
            ></RecipeThumb>
          ))
        ) : (
          <p className="my-5 text-gray-600 text-center text-2xl font-bold">
            No recipes found
          </p>
        )}
      </div>
    </div>
  );
}
