import { Recipe } from "@/types/Recipe";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRecipes = async (query: string): Promise<Recipe[]> => {
  const res = await axios.get<Recipe[]>(API_URL + "/recipe", {
    params: {
      search: query,
    },
  });
  return res.data;
};

export const filterRecipes = async (
  filter: string,
  query: string
): Promise<Recipe[]> => {
  const res = await axios.get<Recipe[]>(API_URL + "/recipe/filter", {
    params: {
      [filter]: query,
    },
  });
  return res.data;
};

export const getRecipeById = async (id: string): Promise<Recipe> => {
  const res = await axios.get(API_URL + `/recipe/lookup/${id}`);
  return res.data;
};
