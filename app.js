const searchField = document.querySelector('#userInput');
const searchBtn = document.querySelector('.submitBtn');
const recipesContainer = document.querySelector('.recipes-container');
const recipeDiv = document.querySelector('.recipe');
const displayText = document.querySelector('.display-text');
const recipeDetails = document.querySelector('.mainRecipe');
const hidden = document.querySelector('.hidden');
const recipeImg = document.querySelector('#mainRecipeImg');
const time = document.querySelector('.time');
const serving = document.querySelector('.serving');
const ingredientsContainer = document.querySelector('.ingredientsContainer');
const copywrite = document.querySelector('.copywrite');
const recipeURL = document.querySelector('.recipe__url');


let recipes = [];

function uiCreation(recipesData) {
    recipes = [];
    console.log(recipes)
    var recipesArr = recipesData.data.recipes;
    
    recipesArr.forEach((recipe) => {
            // let div = document.createElement('div');
            // div.setAttribute('class', 'recipe')
            // div.innerHTML 
            let recipesDiv = `<div class="recipe" id="${recipe.id}" onclick="getRecipeDetail('${recipe.id}')">
            <div class="recipeImg-div left-recipe-div">
            <img src="${recipe.image_url}" alt="" class="recipeImg">
        </div>
        <div class="right-recipe-div">
            <div id="recipeName">${recipe.title}</div>
            <div id="publisher" >${recipe.publisher}</div>
        </div> 
        </div>`
        // recipesContainer.appendChild(div);
        recipes.push(recipesDiv);
        recipesContainer.innerHTML = recipes.join("");
        searchField.value = '';
    });


    console.log(recipes)
}
 

function recipeAPI(userInput){
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${userInput.toLowerCase()}`)
            .then(res=>  res.json())
            .then((data) => {
            console.log(data);
            if(data.results === 0){
                throw new Error(`Sorry we don't have any recipe of ${userInput.toLowerCase()}`);
            }
            uiCreation(data);
        })
        .catch((err) => {
            console.log(err);
        })
    };


function itemRecipeHandler(singleRecipeData) {
    console.log(singleRecipeData.data.recipe.image_url);
    let recipeDetailToBeFetched = singleRecipeData.data.recipe;
    console.log(recipeDetailToBeFetched)

    displayText.classList.add('hidden');
    recipeDetails.classList.remove('hidden');

    recipeImg.src = `${recipeDetailToBeFetched.image_url}`;

    time.innerHTML = `${recipeDetailToBeFetched.cooking_time
    } MINUTES`;
    serving.innerHTML = `${recipeDetailToBeFetched.servings
    } SERVINGS`

    let ingredientArr = [];
    
    recipeDetailToBeFetched.ingredients.forEach((ingredient) => {
        let ingredientValues = Object.values(ingredient);
        console.log(ingredientValues);
        let [quantity, unit, description] = ingredientValues;
        console.log(quantity, unit, description);

        let ingredientDiv = `<p class="ingredients">${quantity} ${unit} ${description}</p>`;
        
        ingredientArr.push(ingredientDiv);
        console.log(ingredientArr);

    })

    ingredientsContainer.innerHTML = ingredientArr.join('');
    copywrite.innerHTML = `This recipe was carefully designed and tested by ${recipeDetailToBeFetched.publisher
    }. Please check out directions at their website.`;
    recipeURL.innerHTML = recipeDetailToBeFetched.source_url;
}


function getRecipeDetail(recipeId){
    fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`)
            .then(res=>  res.json())
            .then((data) => {
            console.log(data);
            if(data.results === 0){
                throw new Error(`Sorry we don't have any recipe of`);
            }
            itemRecipeHandler(data);
        })
        .catch((err) => {
            console.log(err);
        })
}




