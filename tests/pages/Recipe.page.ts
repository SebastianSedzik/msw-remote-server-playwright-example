import { Page } from '@playwright/test';

export class RecipePage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('/recipes');
    }

    async getRecipes() {
        return this.page.locator('[data-test-id="recipe"]').all();
    }

    async getErrorAlert() {
        return this.page.locator('[data-test-id="load-error-alert"]');
    }
}