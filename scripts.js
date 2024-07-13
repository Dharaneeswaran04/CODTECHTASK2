document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipe-form');
    const recipeNameInput = document.getElementById('recipe-name');
    const recipeIngredientsInput = document.getElementById('recipe-ingredients');
    const recipeInstructionsInput = document.getElementById('recipe-instructions');
    const recipesContainer = document.getElementById('recipes');

    let recipes = [];

    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = recipeNameInput.value;
        const ingredients = recipeIngredientsInput.value;
        const instructions = recipeInstructionsInput.value;

        const recipe = {
            id: Date.now(),
            name,
            ingredients,
            instructions
        };

        recipes.push(recipe);
        renderRecipes();
        recipeForm.reset();
    });

    function renderRecipes() {
        recipesContainer.innerHTML = '';
        recipes.forEach((recipe) => {
            const recipeEl = document.createElement('div');
            recipeEl.classList.add('recipe');

            recipeEl.innerHTML = `
                <h2>${recipe.name}</h2>
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                <button onclick="deleteRecipe(${recipe.id})">Delete</button>
                <button onclick="editRecipe(${recipe.id})">Edit</button>
            `;

            recipesContainer.appendChild(recipeEl);
        });
    }

    window.deleteRecipe = (id) => {
        recipes = recipes.filter((recipe) => recipe.id !== id);
        renderRecipes();
    };

    window.editRecipe = (id) => {
        const recipe = recipes.find((recipe) => recipe.id === id);
        recipeNameInput.value = recipe.name;
        recipeIngredientsInput.value = recipe.ingredients;
        recipeInstructionsInput.value = recipe.instructions;

        recipes = recipes.filter((recipe) => recipe.id !== id);
    };
});
