import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RecipeApi } from './entities/recipe-api.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecipeService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async searchRecipes(search: string) {
    const results = await firstValueFrom(
      this.httpService.get(
        this.configService.get<string>('THEMEALDB_API_URL') + '/search.php',
        {
          params: {
            s: search ?? '',
          },
        },
      ),
    );

    return this.mapThumbRecipes(results.data.meals ?? []);
  }

  async getFilteredRecipes(filter: FilterRecipeDto) {
    const results = await firstValueFrom(
      this.httpService.get(
        this.configService.get<string>('THEMEALDB_API_URL') + '/filter.php',
        {
          params: {
            i: filter.ingredient,
            a: filter.country,
            c: filter.category,
          },
        },
      ),
    );

    return this.mapThumbRecipes(results.data.meals ?? []);
  }

  async getRecipeById(id: string) {
    const result = await firstValueFrom(
      this.httpService.get(
        this.configService.get<string>('THEMEALDB_API_URL') + '/lookup.php',
        {
          params: {
            i: id,
          },
        },
      ),
    );

    if (!result.data.meals || result.data.meals.length === 0) {
      throw new NotFoundException(`Recipe ${id} not found`);
    }

    const data = result.data.meals[0];

    const recipe = new Recipe();
    recipe.idMeal = parseInt(data.idMeal);
    recipe.strMeal = data.strMeal;
    recipe.strMealAlternate = data.strMealAlternate;
    recipe.strCategory = data.strCategory;
    recipe.strArea = data.strArea;
    recipe.strInstructions = data.strInstructions;
    recipe.strMealThumb = data.strMealThumb;
    recipe.strTags = data.strTags ? data.strTags.split(',') : null;
    recipe.strYoutube = data.strYoutube;
    recipe.strIngredients = this.getIngredients(data);
    recipe.strSource = data.strSource;
    recipe.strImageSource = data.strImageSource;
    recipe.strCreativeCommonsConfirmed = data.strCreativeCommonsConfirmed;
    recipe.dateModified = data.dateModified;

    return recipe;
  }

  private getIngredients(data: RecipeApi) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ name: ingredient, measure });
      }
    }
    return ingredients;
  }

  private mapThumbRecipes(recipes: RecipeApi[]) {
    return recipes.map((data) => {
      const recipe = new Recipe();
      recipe.idMeal = parseInt(data.idMeal);
      recipe.strMeal = data.strMeal;
      recipe.strMealThumb = data.strMealThumb;
      return recipe;
    });
  }
}
