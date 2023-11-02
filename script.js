const searchMeal = async (e) => {
  e.preventDefault();
  // select elements
  const input = document.querySelector(".input");
  const title = document.querySelector(".title");
  const info = document.querySelector(".info");
  const img = document.querySelector(".img");
  const ingredientsOutput = document.querySelector(".ingredients");

  const showMealsInfo = (meal) => {
    console.log(meal);
    const { strMealThumb, strInstructions, strMeal } = meal;
    title.textContent = strMeal;
    img.style.backgroundImage = `url(${strMealThumb})`;
    info.textContent = strInstructions;
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        ingredients.push(
          `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
        );
      } else {
        break;
      }
    }

    const html = `<span>${ingredients
      .map((ing) => `<li class="ing"> ${ing}</li>`)
      .join("")}</span>`;

    ingredientsOutput.innerHTML = html;
  };

  const showAlert = () => {
    alert("Meals Not Found At The Movement ");
  };

  // featch data
  const featchMealData = async (val) => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
    );
    const { meals } = await res.json();
    return meals;
  };
  //   get the user value
  const val = input.value.trim();

  if (val) {
    const meals = await featchMealData(val);
    if (!meals) {
      showAlert();
      return;
    }
    meals.forEach(showMealsInfo);
  } else {
    alert(" Try Bit Later");
  }
};

const form = document.querySelector("form");
form.addEventListener("submit", searchMeal);

const magnifier = document.querySelector(".magnifier");
form.addEventListener("click", searchMeal);
