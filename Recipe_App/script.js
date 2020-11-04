const mealEl = document.getElementById("meals");
const btn = document.getElementById("btn");
const favoriteContainer = document.getElementById("fav-meals");

const mealPopUp = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");

const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");

const overlay = document.getElementById("overlay");

getRandomMeal();
fetchFavMeals();

async function getRandomMeal() {
  meals.innerHTML = "";
  const randomMeal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  )
    .then((res) => res.json())
    .then((res) => res.meals[0]);

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  )
    .then((res) => res.json())
    .then((res) => res.meals[0]);
  return meal;
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  )
    .then((res) => res.json())
    .then((res) => res.meals);

  return meals;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
    <div class="meal-header">
      ${random ? '<span class="random"> Random Recipe </span>' : ""}
      <img src='${mealData.strMealThumb}' alt="${mealData.strMeal}" />
    </div>
    <div class="meal-body">
      <h4>${mealData.strMeal}</h4>
      <div>
      <button id='btn' class="fav-btn">
        <i class="ion-ios-heart"></i>
      </button>
      ${
        random
          ? `<button id='btn' class='reload-btn'><i class='ion-ios-loop-strong'></i></button>`
          : ""
      }
      </div>
    </div>
    `;
  meal.querySelector(".meal-body .fav-btn").addEventListener("click", (e) => {
    if (e.target.classList.contains("active")) {
      removeMealLs(mealData.idMeal);
      e.target.classList.remove("active");
    } else {
      addMealLs(mealData.idMeal);
      e.target.classList.add("active");
    }

    fetchFavMeals();
  });

  {
    random &&
      meal
        .querySelector(".meal-body .reload-btn")
        .addEventListener("click", () => {
          getRandomMeal();
        });
  }

  meal.querySelector("img").addEventListener("click", () => {
    showMealInfo(mealData);
  });

  meals.appendChild(meal);
}

function addMealLs(mealId) {
  const mealIds = getMealLs();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds ? [...mealIds, mealId] : [mealId])
  );
}

function removeMealLs(mealId) {
  const mealIds = getMealLs();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLs() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds;
}

async function fetchFavMeals() {
  favoriteContainer.innerHTML = "";

  const mealIds = getMealLs();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];

    meal = await getMealById(mealId);
    addMealToFav(meal);
  }
}

function addMealToFav(mealData) {
  const favMeal = document.createElement("li");

  favMeal.innerHTML = `
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" /><span
      >${mealData.strMeal}</span
    >
        <button class='clear'><i class='ion-close-circled'></i></button>
      `;
  const btn = favMeal.querySelector(".clear");

  btn.addEventListener("click", () => {
    removeMealLs(mealData.idMeal);
    fetchFavMeals();
  });

  favMeal.querySelector("img").addEventListener("click", () => {
    showMealInfo(mealData);
  });

  favoriteContainer.appendChild(favMeal);
}

function showMealInfo(mealData) {
  mealInfoEl.innerHTML = "";
  const mealEl = document.createElement("div");

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (mealData["strIngredient" + i]) {
      ingredients.push(
        `${mealData["strIngredient" + i]} - ${mealData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealEl.innerHTML = ` <h1>${mealData.strMeal}</h1>
    <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
    <p>
      ${mealData.strInstructions}
    </p>
    <h3>Ingredients:</h3>
    <ul>
    ${ingredients.map((ingredient) => `<li>${ingredient}</li>`)}</ul>
    `;

  mealInfoEl.appendChild(mealEl);

  mealPopUp.classList.remove("hidden");
}

searchBtn.addEventListener("click", async () => {
  mealEl.innerHTML = "";

  const search = searchTerm.value;

  const meals = await getMealsBySearch(search);

  {
    meals &&
      meals.forEach((meal) => {
        addMeal(meal);
      });
  }
});

overlay.addEventListener("click", () => mealPopUp.classList.add("hidden"));

popupCloseBtn.addEventListener("click", () => {
  //   mealPopUp.style.display = "none";
  mealPopUp.classList.add("hidden");
});
