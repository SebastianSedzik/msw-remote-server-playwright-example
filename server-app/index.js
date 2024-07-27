const express = require('express');
const nodeFetch = require('node-fetch');

const app = express();

const getRecipes = () => nodeFetch('https://dummyjson.com/recipes?limit=5&select=name,image,difficulty,rating')
    .then((response) => response.json())
    .catch((error) => {
        console.error(error);

        return { recipes: [], error: true };
    });

app.get('/', (req, res) => {
    res.send(`
        <h1>Home</h1>
        <ul>
            <li><a href="/recipes">Recipes</a></li>
        </ul>
    `);
});

app.get('/recipes', async (req, res) => {
    const { recipes, error } = await getRecipes();

    console.log({ recipes });
    
    res.send(`
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/themes/light.css" />
        <script type="module" src="https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.1/cdn/shoelace-autoloader.js"></script>
  
        <sl-breadcrumb>
            <sl-breadcrumb-item href="/">Home</sl-breadcrumb-item>
            <sl-breadcrumb-item href="/Recipes">Recipes</sl-breadcrumb-item>
        </sl-breadcrumb>

        <h1>Recipes</h1>

        ${error ? `]
            <sl-alert variant="warning" open data-test-id="load-error-alert">
                <sl-icon slot="icon" name="exclamation-triangle"></sl-icon>
                <strong>Cannot load recipes</strong><br />
                Please try again for a while.
            </sl-alert>
        ` : ''}

        ${recipes.map(recipe => `
            <sl-card style="max-width: 250px" data-test-id="recipe">
                <img slot="image" src="${recipe.image}" width="100px" />
                
                <strong>${recipe.name}</strong>
                <br>
                <sl-badge pill>${recipe.difficulty}</sl-badge>

                <div slot="footer">
                    <sl-rating value="${recipe.rating}"></sl-rating>
                </div>
            </sl-card>`
        ).join('')}
    `);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
