const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("meal-popup");
const closePopupBtn = document.getElementById("close-popup");
const mealInfoEl = document.getElementById("meal-info");

getRandomMeal();
fetchFavMeals();

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.innerHTML = `
    <div class="meal-header">
          ${random ? `<span class="random">Random Recipe</span>` : ""}
          <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
          />
        </div>
        <div class="meal-body">
          <h4>${mealData.strMeal}</h4>
          <button class="fav-btn">
            <i class="fas fa-heart"></i>
          </button>
        </div>`;
  const btn = meal.querySelector(".meal-body .fav-btn");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add("active");
    }
    //fetch favmeal
    fetchFavMeals();
  });
  meal.querySelector("img").addEventListener("click", () => {
    showMealInfo(mealData);
  });
  mealsEl.appendChild(meal);
}
//LocalStorage functions
function addMealLS(mealId) {
  const mealIds = getMealLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}
//Favorite Meal function
async function fetchFavMeals() {
  //clean fav container
  favoriteContainer.innerHTML = "";
  const mealIds = getMealLS();
  const meals = [];

  for (let i = 0; i < mealIds.length; i++) {
    let mealId = mealIds[i];
    let meal = await getMealById(mealId);
    // add them to screen
    addMealFav(meal);
  }
}

function addMealFav(mealData) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `<li>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            /><span>${mealData.strMeal}</span>
          </li> <button class="clear"><i class="fas fa-times"></i></button>`;
  favoriteContainer.appendChild(favMeal);
  const btn = favMeal.querySelector(".clear");
  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavMeals();
  });
  favMeal.querySelector("li").addEventListener("click", () => {
    showMealInfo(mealData);
  });
}

//search function on click
searchBtn.addEventListener("click", async () => {
  mealsEl.innerHTML = "";
  const searchVal = searchTerm.value;
  const meals = await getMealsBySearch(searchVal);
  if (meals) {
    meals.forEach((meal) => {
      addMeal(meal);
    });
  }
});

//open popup function
function showMealInfo(mealData) {
  //clean up the last one info
  mealInfoEl.innerHTML = "";
  //update the meal info
  const mealEl = document.createElement("div");

  const ingredients = [];

  //get ingredients and measures
  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = `
            <h1>${mealData.strMeal}</h1>
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
            <p>
              ${mealData.strInstructions}
            </p>
            <h3>Ingredients:</h3>
            <ul>
              ${ingredients
                .map(
                  (ing) => `
              <li>${ing}</li>`
                )
                .join("")}
            </ul>`;
  mealInfoEl.appendChild(mealEl);
  //show the popup
  mealPopup.classList.remove("hidden");
}

//close popup function
closePopupBtn.addEventListener("click", () => {
  mealPopup.classList.add("hidden");
});

//fetch get random meal
async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  // console.log(randomMeal);
  addMeal(randomMeal, true);
}

//fetch add meal by id
async function getMealById(mealId) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + mealId
  );
  const respData = await resp.json();
  const meal = respData.meals[0];
  return meal;
}

//fetch add meal by search
async function getMealsBySearch(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}
