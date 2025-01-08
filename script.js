// API Base URL
var API_BASE_URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", function () {
    var searchTerm = document.getElementById("searchInput").value.trim();
    if (searchTerm) {
        fetchMeals(searchTerm);
    } else {
        alert("Please enter a search term.");
    }
});

// Fetch meals from the API
function fetchMeals(query) {
    fetch(API_BASE_URL + query)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.meals) {
                var totalMeals = data.meals.length;
                var mealsToShow = data.meals.slice(0, Math.min(totalMeals, 5)); // Show up to 5 meals

                displayMeals(mealsToShow);

                // Update result count
                document.getElementById("resultCount").innerText = `Showing ${mealsToShow.length} out of ${totalMeals} meals`;

                // Handle "Show All" button
                if (totalMeals > 5) {
                    var showAllBtn = document.getElementById("showAllBtn");
                    showAllBtn.classList.remove("d-none");
                    showAllBtn.onclick = function () {
                        displayMeals(data.meals.slice(5), true);
                        showAllBtn.classList.add("d-none");
                        document.getElementById("resultCount").innerText = `Showing ${totalMeals} out of ${totalMeals} meals`;
                    };
                }
            } else {
                clearResults();
                document.getElementById("resultCount").innerText = "No meals found. Try a different search.";
            }
        })
        .catch(function (error) {
            console.error("Error fetching meals:", error);
            alert("Failed to fetch meals. Please try again later.");
        });
}

// Display meals on the page
function displayMeals(meals, append = false) {
    var mealsContainer = document.getElementById("mealsContainer");
    if (!append) mealsContainer.innerHTML = "";

    meals.forEach(function (meal) {
        var mealCard = document.createElement("div");
        mealCard.classList.add("col-lg-4", "col-md-6");

        mealCard.innerHTML = `
            <div class="meal-card">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h3>${meal.strMeal}</h3>
                <p><strong>ID:</strong> ${meal.idMeal}</p>
                <p>${meal.strInstructions.substring(0, 100)}...</p>
                <a href="${meal.strSource}" target="_blank">See Full Recipe</a>
            </div>
        `;

        mealsContainer.appendChild(mealCard);
    });
}

// Clear results
function clearResults() {
    document.getElementById("mealsContainer").innerHTML = "";
    document.getElementById("showAllBtn").classList.add("d-none");
}
