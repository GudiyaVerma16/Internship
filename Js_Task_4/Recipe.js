const recipes = [
  {
    name: "Pancakes",
    ingredients: ["flour", "milk", "egg"],
    type: "breakfast",
  },
  {
    name: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheese", "butter"],
    type: "lunch",
  },
  {
    name: "Tomato Soup",
    ingredients: ["tomato", "cream", "garlic"],
    type: "dinner",
  },
  {
    name: "Salad",
    ingredients: ["lettuce", "tomato", "cucumber"],
    type: "lunch",
  },
];

document.getElementById("search-btn").addEventListener("click", () => {
  const ingredientInput = document
    .getElementById("ingredient-input")
    .value.toLowerCase();
  const filterType = document.getElementById("filter-dropdown").value;
  const recipesContainer = document.getElementById("recipes-container");

  // Clear previous results
  recipesContainer.innerHTML = "";

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesIngredients = recipe.ingredients.some((ingredient) =>
      ingredient.includes(ingredientInput)
    );
    const matchesType = filterType === "all" || recipe.type === filterType;

    return matchesIngredients && matchesType;
  });

  // Display recipes
  if (filteredRecipes.length > 0) {
    filteredRecipes.forEach((recipe) => {
      const recipeCard = document.createElement("div");
      recipeCard.className = "recipe-card";
      recipeCard.innerHTML = `
          <h3>${recipe.name}</h3>
          <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
          <p><strong>Type:</strong> ${recipe.type}</p>
        `;
      recipesContainer.appendChild(recipeCard);
    });
  } else {
    recipesContainer.innerHTML = "<p>No recipes found!</p>";
  }
});
