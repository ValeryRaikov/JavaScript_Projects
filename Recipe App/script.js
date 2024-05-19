const searchBoxElement = document.querySelector('.search-box');
const searchBtnElement = document.querySelector('.search-btn');
const recipeContainerElement = document.querySelector('.recipe-container');
const recipeDetailsContentElement = document.querySelector('.recipe-details-content');
const closeBtnElement = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (mealName) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;

    recipeContainerElement.innerHTML = '<h2>Fetching Recipies...</h2>';
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Invalid API fetch!');
        }

        const data = await response.json();

        recipeContainerElement.innerHTML = '';
        data.meals.forEach(meal => {
            const imgElement = document.createElement('img');
            imgElement.src = meal.strMealThumb;
            const h3Element = document.createElement('h3');
            h3Element.textContent = meal.strMeal;
            const pAreaElement = document.createElement('p');
            pAreaElement.textContent = `${meal.strArea} dish`;
            const pCategoryElement = document.createElement('p');
            pCategoryElement.textContent = `Category: ${meal.strCategory}`;
            pCategoryElement.style.fontStyle = 'italic';
            const buttonElement = document.createElement('button');
            buttonElement.textContent = 'View Recipe';

            const recipeDivElement = document.createElement('div');
            recipeDivElement.classList.add('recipe');
            recipeDivElement.appendChild(imgElement);
            recipeDivElement.appendChild(h3Element);	
            recipeDivElement.appendChild(pAreaElement); 
            recipeDivElement.appendChild(pCategoryElement);
            recipeDivElement.appendChild(buttonElement);

            buttonElement.addEventListener('click', () => {
                openRecipePopup(meal);
            });

            recipeContainerElement.appendChild(recipeDivElement);
        });
    } catch(err) {
        recipeContainerElement.innerHTML = `<h2>Error in fetching recipes! ${err}</h2>`;
    }
    
}

const fetchIngredients = (meal) => {
    let ingredients = {};

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];

        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredients[ingredient] = measure;
        } else {
            break;
        }
    }

    return ingredients;
}

const openRecipePopup = (meal) => {
    recipeDetailsContentElement.innerHTML = '';

    const h2MealElement = document.createElement('h2');
    h2MealElement.textContent = meal.strMeal;
    h2MealElement.classList.add('recipe-name');
    const h3IngredientsElement = document.createElement('h3');
    h3IngredientsElement.textContent = 'Ingredients:'
    const ulIngredientsElement = document.createElement('ul');
    ulIngredientsElement.classList.add('ingredient-list');

    const ingredients = fetchIngredients(meal);
    for (const mealData in ingredients) {
        const liMealElement = document.createElement('li');
        liMealElement.textContent = `${ingredients[mealData]} ${mealData}`;
        ulIngredientsElement.appendChild(liMealElement);
    }

    const h3InstructionsElement = document.createElement('h3');
    h3InstructionsElement.textContent = 'Instructions:';
    const pInstructionsElement = document.createElement('p');
    pInstructionsElement.textContent = meal.strInstructions;  
    const divInstructionsElement = document.createElement('div');
    divInstructionsElement.classList.add('recipe-instructions');
    divInstructionsElement.appendChild(h3InstructionsElement);
    divInstructionsElement.appendChild(pInstructionsElement);

    recipeDetailsContentElement.appendChild(h2MealElement);
    recipeDetailsContentElement.appendChild(h3IngredientsElement);
    recipeDetailsContentElement.appendChild(ulIngredientsElement);
    recipeDetailsContentElement.appendChild(divInstructionsElement);

    recipeDetailsContentElement.parentElement.style.display = 'block';
}

searchBtnElement.addEventListener('click', (e) => {
    e.preventDefault();

    const searchInput = searchBoxElement.value.trim();

    if (!searchInput) {
        recipeContainerElement.innerHTML = '<h2>Please enter your meal!</h2>';
    } else {
        fetchRecipes(searchInput);
    }
});

closeBtnElement.addEventListener('click', () => {
    recipeDetailsContentElement.parentElement.style.display = 'none';
});