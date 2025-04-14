import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { FilterRecipeDto } from './dto/filter-recipe.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(@Query('search') search: string) {
    return await this.recipeService.searchRecipes(search);
  }

  @Get('filter')
  async getFilteredRecipes(@Query() filter: FilterRecipeDto) {
    return await this.recipeService.getFilteredRecipes(filter);
  }

  @Get('lookup/:id')
  async getRecipeById(@Param('id') id: string) {
    return await this.recipeService.getRecipeById(id);
  }
}
