document.addEventListener('DOMContentLoaded', () => {
  const featuredRecipesContainer = document.getElementById('featured-recipes');
  const searchResultsContainer = document.getElementById('search-results');
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');

  // Your Spoonacular API key
  const apiKey = '78bdab846ca241c389afc87db917d6fc';

  // Fetch featured recipes
  async function fetchFeaturedRecipes() {
      try {
          const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`);
          if (!response.ok) {
              throw new Error('Failed to fetch featured recipes');
          }
          const data = await response.json();
          displayFeaturedRecipes(data.recipes);
      } catch (error) {
          alert('Failed to fetch featured recipes. Please try again later.');
          console.error(error);
      }
  }

  // Fetch search results
  async function fetchSearchResults(query) {
      try {
          const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${apiKey}`);
          if (!response.ok) {
              throw new Error('Failed to fetch search results');
          }
          const data = await response.json();
          displaySearchResults(data.results);
      } catch (error) {
          alert('Failed to fetch search results. Please try again later.');
          console.error(error);
      }
  }

  // Display featured recipes
  function displayFeaturedRecipes(recipes) {
      featuredRecipesContainer.innerHTML = '';
      recipes.forEach(recipe => {
          const recipeCard = document.createElement('div');
          recipeCard.className = 'recipe';
          recipeCard.innerHTML = `
              <h3>${recipe.title}</h3>
              <img src="${recipe.image}" alt="${recipe.title}">
              <p><a href="${recipe.sourceUrl || '#'}" target="_blank">View Recipe</a></p>
          `;
          featuredRecipesContainer.appendChild(recipeCard);
      });
  }

  // Display search results
  function displaySearchResults(results) {
      searchResultsContainer.innerHTML = '';
      if (results.length === 0) {
          searchResultsContainer.innerHTML = '<p>Sorry, no recipes found for your search. Please try a different term.</p>';
          return;
      }
      results.forEach(recipe => {
          const recipeCard = document.createElement('div');
          recipeCard.className = 'recipe';
          recipeCard.innerHTML = `
              <h3>${recipe.title}</h3>
              <img src="${recipe.image}" alt="${recipe.title}">
              <p><a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a></p>
          `;
          searchResultsContainer.appendChild(recipeCard);
      });
  }

  // Event listener for the search form
  searchForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page refresh
      const query = searchInput.value.trim();
      if (query) {
          // Clear featured recipes
          featuredRecipesContainer.innerHTML = '';
          // Fetch search results
          fetchSearchResults(query);
      }
  });

  // Fetch featured recipes on page load
  fetchFeaturedRecipes();
});
