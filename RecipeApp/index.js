const ApiKey = "e33276fca2bf4c3ca4e3d9c580dce315";

let recipeListEl = document.querySelector("#recipe");

async function generateRecipes() {
    const result = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${ApiKey}`);
    const data = await result.json();
    console.log(data);
    return data.recipes;
}

function showRecipe(recipes) {
    recipeListEl.innerHTML = "";
    recipes.forEach(recipe => {
        const recipeItemEl = document.createElement("li");
        recipeItemEl.classList.add("recipeItem");
        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;
        recipeImageEl.alt = recipe.title;

        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;

        const recipeDesEl = document.createElement("p");
        recipeDesEl.innerHTML = `<strong>Ingredients :</strong> ${recipe.extendedIngredients.map(ingredient => ingredient.original
        ).join(", ")}`;

        const recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.target = "_blank";
        recipeLinkEl.innerText = "View Recipe";


        recipeListEl.appendChild(recipeItemEl);
        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeDesEl);
        recipeItemEl.appendChild(recipeLinkEl);

    });
}

async function start() {
    const recipes = await generateRecipes();
    showRecipe(recipes);
}
start();
