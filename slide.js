document.addEventListener('DOMContentLoaded', function () {
    // Initialize Swiper slider
    var TrandingSlider = new Swiper('.tranding-slider', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 2, // Adjust the value to reduce the gap between slides
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });

    var container = document.querySelector('.tranding-slider');
    container.addEventListener('mousemove', function (e) {
        var mouseX = e.clientX / window.innerWidth - 0.5;
        TrandingSlider.setTransition(0);
        TrandingSlider.setTranslate(TrandingSlider.width * mouseX);
    });

    container.addEventListener('mouseleave', function () {
        TrandingSlider.setTransition(0.5);
        TrandingSlider.slideTo(TrandingSlider.activeIndex);
    });

    // Get the search button and add click event listener
    var searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', function () {
        // Hide the images sliding by hiding the entire section
        document.getElementById('tranding').style.display = 'none';
    });

    // Get the account icon and add click event listener
    var accountIcon = document.querySelector('.account-icon img');
    accountIcon.addEventListener('click', function () {
        // Open the login.html file
        window.location.href = 'login.html';
    });

    //Initial References
    let result = document.getElementById("result");
    let searchBtn = document.getElementById("search-btn");
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

    searchBtn.addEventListener("click", () => {
        let userInp = document.getElementById("user-inp").value;
        if (userInp.length == 0) {
            result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
        } else {
            fetch(url + userInp)
                .then((response) => response.json())
                .then((data) => {
                    let myMeal = data.meals[0];
                    console.log(myMeal);
                    console.log(myMeal.strMealThumb);
                    console.log(myMeal.strMeal);
                    console.log(myMeal.strArea);
                    console.log(myMeal.strInstructions);
                    let count = 1;
                    let ingredients = [];
                    for (let i in myMeal) {
                        let ingredient = "";
                        let measure = "";
                        if (i.startsWith("strIngredient") && myMeal[i]) {
                            ingredient = myMeal[i];
                            measure = myMeal[`strMeasure` + count];
                            count += 1;
                            ingredients.push(`${measure} ${ingredient}`);
                        }
                    }
                    console.log(ingredients);

                    result.innerHTML = `
                        <img src=${myMeal.strMealThumb}>
                        <div class="details">
                            <h2>${myMeal.strMeal}</h2>
                            <h4>${myMeal.strArea}</h4>
                        </div>
                        <div id="ingredient-con"></div>
                        <div id="recipe">
                            <button id="hide-recipe">X</button>
                            <pre id="instructions">${myMeal.strInstructions}</pre>
                        </div>
                        <button id="show-recipe">View Recipe</button>
                    `;
                    let ingredientCon = document.getElementById("ingredient-con");
                    let parent = document.createElement("ul");
                    let recipe = document.getElementById("recipe");
                    let hideRecipe = document.getElementById("hide-recipe");
                    let showRecipe = document.getElementById("show-recipe");

                    ingredients.forEach((i) => {
                        let child = document.createElement("li");
                        child.innerText = i;
                        parent.appendChild(child);
                        ingredientCon.appendChild(parent);
                    });

                    hideRecipe.addEventListener("click", () => {
                        recipe.style.display = "none";
                    });
                    showRecipe.addEventListener("click", () => {
                        recipe.style.display = "block";
                    });
                })
                .catch(() => {
                    result.innerHTML = `<h3>Invalid Input</h3>`;
                });
        }
    });
});



//camera
function openScanner() {
    const scannerVideo = document.getElementById('scanner-video');

    // Check if getUserMedia is supported
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Request access to the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                // Display the camera stream in the video element
                scannerVideo.srcObject = stream;
                scannerVideo.play();
                scannerVideo.style.display = 'block';
            })
            .catch(function (error) {
                console.error('Error accessing camera:', error);
                alert('Error accessing camera. Please make sure your camera is connected and accessible.');
            });
    } else {
        console.error('getUserMedia is not supported');
        alert('getUserMedia is not supported in your browser. Please use a modern browser that supports getUserMedia API.');
    }
}
