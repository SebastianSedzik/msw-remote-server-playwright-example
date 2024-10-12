const { setupServer } = require('msw/node');
const { http, HttpResponse } = require('msw');

/**
 * Setup MSW
 */
const server = setupServer(
    // Provide a mocked response for the "GET /recipes" request
    http.get('https://dummyjson.com/recipes', () => HttpResponse.json({
        recipes: [
            {
                name: 'Spaghetti Carbonara',
                image: 'https://cdn.dummyjson.com/recipe-images/1.webp',
                difficulty: 'Mocked',
                rating: 4.5
            },
            {
                name: 'Chicken Tikka Masala',
                image: 'https://cdn.dummyjson.com/recipe-images/2.webp',
                difficulty: 'Mocked',
                rating: 4.2
            },
            {
                name: 'Beef Wellington',
                image: 'https://cdn.dummyjson.com/recipe-images/3.webp',
                difficulty: 'Mocked',
                rating: 4.8
            }
        ]
    }))
);

server.listen({
    remote: true
});

/**
 * Start the server
 */
require('../server-app/index');
