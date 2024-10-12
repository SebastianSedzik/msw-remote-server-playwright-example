import { test, expect } from '@playwright/test';
import { setupMockServer } from './setup';
import { http, HttpResponse } from 'msw';
import { RecipePage } from './pages/Recipe.page';

test.describe('Recipes', () => {
  const remote = setupMockServer();

  test('List of recipes should be displayed', async ({ page }) => {
    // Given: RecipesApi API returns list of recipes
    remote.use(
      http.get('https://dummyjson.com/recipes', () => HttpResponse.json({
        recipes: [{
          name: 'Spaghetti Carbonara',
            image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
            difficulty: 'Mocked',
            rating: 1.2
        }]
      }))
    )

    // When: I visit the recipes page
    const recipePage = new RecipePage(page);
    await recipePage.goto();

    // Then: I should see the recipe
    expect(await recipePage.getRecipes()).toHaveLength(1);
  });

  test.skip('Error alert should be displayed when failed to load recipes', async ({ page }) => {
    // Given: RecipesApi returns an error
    remote.use(
      http.get('https://dummyjson.com/recipes', () => HttpResponse.error())
    );

    await page.goto('/recipes');
  
    // When: I visit the recipes page
    const recipePage = new RecipePage(page);
    await recipePage.goto();

    // Then: I should see the error alert
    expect(((await recipePage.getErrorAlert()).isVisible)).toBeFalsy();
  });
});
