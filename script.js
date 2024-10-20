// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    window.location.href = 'home.html'; // Redirect to the home page
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();
    alert('Sign Up Successful! You can now log in.');
    window.location.href = 'index.html'; // Redirect to login after signup
}

// Function to show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

// Function to calculate BMI and determine weight category
function calculateBMI(weight, height) {
    const bmi = weight / ((height / 100) ** 2); // Height in meters
    let category = '';

    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obesity';
    }

    return { bmi, category };
}

// Function to handle form submission for diet plan
function getDietPlan(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const gender = document.getElementById('gender').value;
    const diet = document.getElementById('diet').value;

    // Calculate BMI
    const { bmi, category } = calculateBMI(weight, height);

    // Generate diet plan
    const mealPlan = generateMealPlan(diet);
    const totalCalories = mealPlan.breakfast.reduce((sum, meal) => sum + meal.calories, 0) +
                         mealPlan.lunch.reduce((sum, meal) => sum + meal.calories, 0) +
                         mealPlan.dinner.reduce((sum, meal) => sum + meal.calories, 0);

    // Create an object to store the diet plan details
    const dietData = {
        bmi: bmi,
        category: category,
        meals: mealPlan,
        totalCalories: totalCalories
    };

    // Store diet plan in localStorage
    localStorage.setItem('dietPlan', JSON.stringify(dietData));

    // Redirect to the diet plan page
    window.location.href = 'diet-plan.html';
}

// Function to generate a meal plan based on the diet type    
function generateMealPlan(diet) {
    const vegetarianMeals = {
        breakfast: [
            { food: "Oatmeal", calories: 150, image: "https://plus.unsplash.com/premium_photo-1669559809547-6e4c4fe41371?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8b2F0bWVhbHxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Greek Yogurt", calories: 100, image: "https://plus.unsplash.com/premium_photo-1674482019268-7d55dc027bf2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZWslMjB5b2d1cnR8ZW58MHx8MHx8fDA%3D" },
            { food: "Smoothie", calories: 250, image: "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNtb290aGllfGVufDB8fDB8fHww" },
            { food: "Avocado Toast", calories: 300, image: "https://plus.unsplash.com/premium_photo-1661667100338-4e9bdf34ceef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZvY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww" },
            { food: "Chia Pudding", calories: 200, image: "https://plus.unsplash.com/premium_photo-1663840225455-1f385f41bf9b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpYSUyMHB1ZGRpbmd8ZW58MHx8MHx8fDA%3D" }
        ],
        lunch: [
            { food: "Quinoa Bowl", calories: 400, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc-YNKZPSg7xaMLMGTumf83_CQAK3gH6WBgw&s" },
            { food: "Vegetable Stir Fry", calories: 300, image: "https://images.unsplash.com/photo-1627662168806-efa33a7cda86?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmVnaXRhYmxlJTIwc3RpciUyMGZyeXxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Pasta Primavera", calories: 500, image: "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGFzdGElMjBwcmltYXZlcmF8ZW58MHx8MHx8fDA%3D" },
            { food: "Chickpea Salad", calories: 350, image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2twZWElMjBzYWxhZHxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Vegetable Wrap", calories: 400, image: "https://plus.unsplash.com/premium_photo-1664648119219-b00a63aa4bdb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dmVnZXRhYmxlJTIwd3JhcHxlbnwwfHwwfHx8MA%3D%3D" }
        ],
        dinner: [
            { food: "Vegetarian Tacos", calories: 400, image: "https://images.unsplash.com/photo-1593759608136-45eb2ad9507d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVnZXRhcmlhbiUyMHRhY29zfGVufDB8fDB8fHww" },
            { food: "Lentil Soup", calories: 300, image: "https://plus.unsplash.com/premium_photo-1712678665862-3c51d1fac466?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVudGlsJTIwc291cHxlbnwwfHwwfHx8MA%3D%3D" },               
            { food: "Mushroom Risotto", calories: 500, image: "https://plus.unsplash.com/premium_photo-1695240028448-9a8bf3e164f5?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bXVzaHJvb20lMjByaXNvdHRvfGVufDB8fDB8fHww" },
            { food: "Stuffed Peppers", calories: 350, image: "https://images.unsplash.com/photo-1726801979949-938c0a928a13?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZmZlZCUyMHBlcHBlcnxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Vegetable stir fry with rice", calories: 300, image: "https://images.unsplash.com/photo-1593967858208-67ddb5b4c406?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }  
        ]   
    };       

    const nonVegetarianMeals = {
        breakfast: [
            { food: "Eggs and Toast", calories: 250, image: "https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEVnZ3MlMjBhbmQlMjBUb2FzdHxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Breakfast Burrito", calories: 350, image: "https://images.unsplash.com/photo-1711488735428-27c6757beb5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QnJlYWtmYXN0JTIwQnVycml0b3xlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Greek Yogurt with Honey", calories: 300, image: "https://plus.unsplash.com/premium_photo-1663855531956-d549e50ed3ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8R3JlZWslMjBZb2d1cnQlMjB3aXRoJTIwSG9uZXl8ZW58MHx8MHx8fDA%3D" },
            { food: "Smoothie with Protein", calories: 400, image: "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U21vb3RoaWUlMjB3aXRoJTIwUHJvdGVpbnxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Avocado Toast with Eggs", calories: 350, image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8QXZvY2FkbyUyMFRvYXN0JTIwd2l0aCUyMEVnZ3N8ZW58MHx8MHx8fDA%3D" }
        ],
        lunch: [
            { food: "Grilled Chicken Salad", calories: 400, image: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8R3JpbGxlZCUyMENoaWNrZW4lMjBTYWxhZHxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Tandoori Chicken with Whole Wheat Roti", calories: 500, image: "https://media.istockphoto.com/id/1209287521/photo/lauki-kofta-curry.webp?a=1&b=1&s=612x612&w=0&k=20&c=RNGmg1lxNvbwlprWh0Rm3xo1HqJTY0uQVWpjCEi7D1M=" },
            { food: "Egg with Brown Rice", calories: 600, image: "https://media.istockphoto.com/id/1940621970/photo/rice-with-codfish.webp?a=1&b=1&s=612x612&w=0&k=20&c=WiwkU006-HNKuaNeJbB_Lpw2vfMufLNyVxulthdjffk=" },
            { food: "Fish Curry with Steamed Vegetables", calories: 700, image: "https://media.istockphoto.com/id/483551294/photo/broken-rice-saigon-style-vietnamese-food.webp?a=1&b=1&s=612x612&w=0&k=20&c=fVkMZHCPTXm8gU0ibjd2SVOrDMblhFkS3ViSbPmStwQ=" },
            { food: "Chicken Wrap", calories: 500, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpY2tlbiUyMFdyYXB8ZW58MHx8MHx8fDA%3D" }      
        ],
        dinner: [
            { food: "Grilled Salmon with Quinoa Salad", calories: 600, image: "https://plus.unsplash.com/premium_photo-1701006579137-2d976f001522?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8R3JpbGxlZCUyMFNhbG1vbiUyMHdpdGglMjBRdWlub2ElMjBTYWxhZHxlbnwwfHwwfHx8MA%3D%3D" },
            { food: "Chicken Curry with Cauliflower Rice", calories: 500, image: "https://images.unsplash.com/photo-1672933036331-e27ffae157bd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Q2hpY2tlbiUyMEN1cnJ5fGVufDB8fDB8fHww" },
            { food: "Egg Curry with Whole Wheat Roti", calories: 600, image: "https://media.istockphoto.com/id/171283673/photo/curry-dinner.webp?a=1&b=1&s=612x612&w=0&k=20&c=wUJIuwlqnxFB2Xadt12rEKXXieYB5cBq4c4GCteOS48=" },
            { food: "Grilled Fish Tikka with Stir-Fried Vegetables", calories: 800, image: "https://media.istockphoto.com/id/2015377259/photo/chicken-shish-kebab.webp?a=1&b=1&s=612x612&w=0&k=20&c=nftX01iA9Ujwi0T9FSimdoHfyCRaohKfPAoJpp6rYW4=" },
            { food: "Chicken Stew with Spinach", calories: 700, image: "https://media.istockphoto.com/id/1299059390/photo/delicious-cantonese-traditional-cuisines-like-claypot-rice-with-cured-meat-and-so-on.webp?a=1&b=1&s=612x612&w=0&k=20&c=GkNPWY8eBBkaJg6Dtbyb3rE4upB1M3IDwwWrIrS8K_w=" }
        ]
    };

    // Return the meal plan based on the diet selected
    return diet === 'veg' ? vegetarianMeals : nonVegetarianMeals;
}

// Function to display the diet plan on the diet-plan.html page
function displayDietPlan() {
    const dietPlan = JSON.parse(localStorage.getItem('dietPlan'));

    if (!dietPlan) {
        document.getElementById('dietResult').innerHTML = 'No diet plan found.';
        return;
    }

    let html = `<h2>Your Diet Plan</h2>
                <p>BMI: ${dietPlan.bmi}</p>
                <h3>Meals</h3>
                <div class="meal-container">`;

    // Breakfast
    html += `<div><h4>Breakfast</h4>`;
    dietPlan.meals.breakfast.forEach(meal => {
        html += `<div class="meal">
                    <h5>${meal.food} (${meal.calories} calories)</h5>
                    <img src="${meal.image}" alt="${meal.food}">
                  </div>`;
    });
    html += `</div>`; // Close Breakfast div

    // Lunch
    html += `<div><h4>Lunch</h4>`;
    dietPlan.meals.lunch.forEach(meal => {
        html += `<div class="meal">
                    <h5>${meal.food} (${meal.calories} calories)</h5>
                    <img src="${meal.image}" alt="${meal.food}">
                  </div>`;
    });
    html += `</div>`; // Close Lunch div

    // Dinner
    html += `<div><h4>Dinner</h4>`;
    dietPlan.meals.dinner.forEach(meal => {
        html += `<div class="meal">
                    <h5>${meal.food} (${meal.calories} calories)</h5>
                    <img src="${meal.image}" alt="${meal.food}">
                  </div>`;
    });
    html += `</div>`; // Close Dinner div

    html += `</div>`; // Close meal-container div

    document.getElementById('dietResult').innerHTML = html;
}

// Initialize the display when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayDietPlan);


// Initialize the diet plan and display it
document.addEventListener('DOMContentLoaded', () => {
    const dietPlan = getDietPlan();
    localStorage.setItem('dietPlan', JSON.stringify(dietPlan));
    displayDietPlan();
});

// Function to get a random food item from the meal array
function getRandomMeal(meals) {
    const randomIndex = Math.floor(Math.random() * meals.length);
    return meals[randomIndex];
}

// Function to get the diet plan and populate the HTML
function displayDietPlan() {
    // Retrieve the diet plan from localStorage
    const dietPlan = JSON.parse(localStorage.getItem('dietPlan'));

    if (!dietPlan) {
        document.getElementById('dietResult').innerHTML = 'No diet plan found.';
        return;
    }

    // Calculate total calories from the meals
    let totalCalories = 0;
    let mealPlanHtml = '';

    // Randomly select meals for each meal time
    const breakfastMeals = dietPlan.meals.breakfast;
    const lunchMeals = dietPlan.meals.lunch;
    const dinnerMeals = dietPlan.meals.dinner;

    const selectedBreakfast = getRandomMeal(breakfastMeals);
    const selectedLunch = getRandomMeal(lunchMeals);
    const selectedDinner = getRandomMeal(dinnerMeals);

     // Generate HTML for breakfast
     mealPlanHtml += `
     <div class="meal-type">
         <h4>Breakfast:</h4>
         <ul>
             <li>
                 <h5>${selectedBreakfast.food} (${selectedBreakfast.calories} calories)</h5>
                 <img src="${selectedBreakfast.image}" alt="${selectedBreakfast.food}" style="width: 150px;">
             </li>
         </ul>
     </div>
 `;

 // Generate HTML for lunch
 mealPlanHtml += `
     <div class="meal-type">
         <h4>Lunch:</h4>
         <ul>
             <li>
                 <h5>${selectedLunch.food} (${selectedLunch.calories} calories)</h5>
                 <img src="${selectedLunch.image}" alt="${selectedLunch.food}" style="width: 150px;">
             </li>
         </ul>
     </div>
 `;

 // Generate HTML for dinner
 mealPlanHtml += `
     <div class="meal-type">
         <h4>Dinner:</h4>
         <ul>
             <li>
                 <h5>${selectedDinner.food} (${selectedDinner.calories} calories)</h5>
                 <img src="${selectedDinner.image}" alt="${selectedDinner.food}" style="width: 150px;">
             </li>
         </ul>
     </div>
 `;

 // Set the inner HTML of the mealPlan section
 document.getElementById('mealPlan').innerHTML = mealPlanHtml;


    // Calculate total calories
    totalCalories = selectedBreakfast.calories + selectedLunch.calories + selectedDinner.calories;

    // Set the inner HTML of the dietResult section
    document.getElementById('mealPlan').innerHTML = mealPlanHtml;
    document.getElementById('totalCalories').innerText = totalCalories;

    // Set BMI and weight category
    document.getElementById('bmiValue').innerText = dietPlan.bmi.toFixed(2);
    document.getElementById('weightCategory').innerText = getWeightCategory(dietPlan.bmi);
}

// Function to determine weight category based on BMI
function getWeightCategory(bmi) {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obesity';
}

// Function to go back to the previous page
function goBack() {
    window.history.back();
}

function goBack() {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = 'recommender.html'; // or any other fallback page
    }
}

// Initialize the display when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayDietPlan);

// Handle contact form submission
function handleContact(event) {
    event.preventDefault();
    alert('Your message has been sent! We will get back to you shortly.');
    // Redirect to home or clear the form as needed
    window.location.href = 'home.html'; // Redirect to home page after submission
}

const jumpWorkouts = [
    { name: "Jumping Jacks", image: "https://media.istockphoto.com/id/1335680322/photo/asian-chinese-beautiful-woman-jumping-jack-warming-up-exercise-at-front-yard-of-her-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=fR4AbsTpCQUAecJa5hCGarjJuLn0HrqhltvG_W64gTM=", calories: "18-40" },
    { name: "Burpees", image: "https://media.istockphoto.com/id/1336192357/photo/strong-ethnic-woman-doing-cardio-in-her-home-gym.webp?a=1&b=1&s=612x612&w=0&k=20&c=qc16DXObOBjwhpBuOjharWB_-LFmCU28JoF_6lv3mfU=", calories: "24-60" },
    { name: "High Knees", image: "https://media.istockphoto.com/id/1148862848/photo/fit-athletic-male-model-in-sportswear-doing-strength-exercise-with-knee-up-in-gym-isolated-on.jpg?s=612x612&w=0&k=20&c=jyHi5jBzEsFZNPum7OkI_uYqeZivOpedgvjRU9xYurY=", calories: "20-45" },
    { name: "Box Jump", image: "https://media.istockphoto.com/id/546201928/photo/woman-doing-a-box-squat-at-the-gym.jpg?s=612x612&w=0&k=20&c=3qyErVKTdCRvrHg-bdG6DU017_NRFijsoOtQ6bRdrFk=", calories: "22-50" },
    { name: "Lateral Jumps", image: "https://media.istockphoto.com/id/1333301163/photo/man-doing-lateral-step-up-jumps-in-health-club.jpg?s=612x612&w=0&k=20&c=A8AImxfMjiaHvomKUnD5RMUr32WGEJ0y1XnibjLf2co=", calories: "18-40 " },
    { name: "Jump Rope", image: "https://media.istockphoto.com/id/857902224/photo/healthy-woman-skipping-ropes-outdoors.jpg?s=612x612&w=0&k=20&c=7tireYWfKE-ZCv8p-T6CuGk6996tFgBW8DT5PVF97lU=", calories: "30-75 " },
    { name: "Jump Squats", image: "https://media.istockphoto.com/id/1363074983/photo/fit-woman-exercising-doing-jump-squat-fitness-female-athlete.jpg?s=612x612&w=0&k=20&c=pcudxMguEvTT8gKD2kh9eW1hcZDXZYJ7ya2dolB4MHA=", calories: "20-45" },
    { name: "Push-ups", image: "https://media.istockphoto.com/id/1094479308/photo/bi-racial-man-doing-push-ups-in-sportswear-on-fitness-mat.jpg?s=612x612&w=0&k=20&c=3W7yb-IRh0FmuIv9CDF9OfTXRTogZn6GyDitfpRVA1I=", calories: "17-35" },
    { name: "Squats", image: "https://media.istockphoto.com/id/1224137084/photo/young-fit-asian-woman-working-out-at-home-beautiful-female-athlete-training-for-legs-muscles.jpg?s=612x612&w=0&k=20&c=q2rH-J_YQcuHeEpUF7gG-Osmly_cE34_5HLdIll9n4s=", calories:"18-40"  },
    { name: "Lunges", image: "https://media.istockphoto.com/id/1216992831/photo/fit-woman-exercising-at-home-doing-lunges-exercise.jpg?s=612x612&w=0&k=20&c=lF5Zz97YsjVwM7QrjqRuiyrbZoProFL86Yvs4EfdhpE=", calories: "18-40" },
    { name: "Plank", image: "https://media.istockphoto.com/id/1296318064/photo/exercise-at-home.jpg?s=612x612&w=0&k=20&c=0rSYKzCve-BTkx7463OszLsI7yk5cbku0ecXpAkoHQ4=", calories: "9-20" },
    { name: "Mountain Climbers", image: "https://media.istockphoto.com/id/1277132959/photo/asian-male-doing-exercise-at-home-to-stay-healthy-on-new-normal-lifestyle-indoor-home-workout.jpg?s=612x612&w=0&k=20&c=g1WKJVtMKlpL7u9CjIPrhTjfXDFCwa7HqXYRZxGCLLo=", calories: "18-45" },
    { name: "Russian Twists", image: "https://media.istockphoto.com/id/985468606/photo/rear-view-of-healthy-young-couple-sitting-on-mats-and-twisting-body-while-lengthening-spine.jpg?s=612x612&w=0&k=20&c=P2yqjMv_d6xBIR7zUI4mLlfYP5cQ80ICqjHiFLEeomo=", calories: "14-305" },
    { name: "Glute Bridges", image: "https://media.istockphoto.com/id/1920931318/photo/fit-middle-aged-woman-practicing-yoga-doing-press-bridge-exercise-in-nature-glute-bridge-pose.jpg?s=612x612&w=0&k=20&c=voeA3ZmHReUa16dxCtUQVKTx0Ld2ktRXat4uzvJiVz4=", calories: "9-20 " },
    { name: "Wall Sit", image: "https://media.istockphoto.com/id/1365425038/photo/young-man-doing-the-wall-sit-exercise-outdoors.jpg?s=612x612&w=0&k=20&c=0etXyX6J6zNnym0cq0w2NjzUtGfKp1GWtdIA7mtZdag=", calories: "10-25" },
    { name: "Superman Hold", image: "https://media.istockphoto.com/id/1188411147/photo/muscular-athletic-man-doing-an-alternate-superman-planking-position-as-a-part-of-his-warmup.jpg?s=612x612&w=0&k=20&c=Q2YiQDlptbk_FsAqadA6rwgAg7iaMKwlSfKYdxbvWGA=", calories: "12-25" },
    { name: "Bicycle Crunches", image: "https://media.istockphoto.com/id/1340405091/photo/athletic-young-man-training-at-home.jpg?s=612x612&w=0&k=20&c=bhC1YF6xSgZDOD799aUgrXxTdJ31avWo3B0zuMbPi8Q=", calories: "16-35" },
]

const noJumpWorkouts = [
    { name: "Push-ups", image: "https://media.istockphoto.com/id/1094479308/photo/bi-racial-man-doing-push-ups-in-sportswear-on-fitness-mat.jpg?s=612x612&w=0&k=20&c=3W7yb-IRh0FmuIv9CDF9OfTXRTogZn6GyDitfpRVA1I=", calories: "17-35" },
    { name: "Squats", image: "https://media.istockphoto.com/id/1224137084/photo/young-fit-asian-woman-working-out-at-home-beautiful-female-athlete-training-for-legs-muscles.jpg?s=612x612&w=0&k=20&c=q2rH-J_YQcuHeEpUF7gG-Osmly_cE34_5HLdIll9n4s=", calories:"18-40"  },
    { name: "Lunges", image: "https://media.istockphoto.com/id/1216992831/photo/fit-woman-exercising-at-home-doing-lunges-exercise.jpg?s=612x612&w=0&k=20&c=lF5Zz97YsjVwM7QrjqRuiyrbZoProFL86Yvs4EfdhpE=", calories: "18-40" },
    { name: "Plank", image: "https://media.istockphoto.com/id/1296318064/photo/exercise-at-home.jpg?s=612x612&w=0&k=20&c=0rSYKzCve-BTkx7463OszLsI7yk5cbku0ecXpAkoHQ4=", calories: "9-20" },
    { name: "Mountain Climbers", image: "https://media.istockphoto.com/id/1277132959/photo/asian-male-doing-exercise-at-home-to-stay-healthy-on-new-normal-lifestyle-indoor-home-workout.jpg?s=612x612&w=0&k=20&c=g1WKJVtMKlpL7u9CjIPrhTjfXDFCwa7HqXYRZxGCLLo=", calories: "18-45" },
    { name: "Russian Twists", image: "https://media.istockphoto.com/id/985468606/photo/rear-view-of-healthy-young-couple-sitting-on-mats-and-twisting-body-while-lengthening-spine.jpg?s=612x612&w=0&k=20&c=P2yqjMv_d6xBIR7zUI4mLlfYP5cQ80ICqjHiFLEeomo=", calories: "14-305" },
    { name: "Glute Bridges", image: "https://media.istockphoto.com/id/1920931318/photo/fit-middle-aged-woman-practicing-yoga-doing-press-bridge-exercise-in-nature-glute-bridge-pose.jpg?s=612x612&w=0&k=20&c=voeA3ZmHReUa16dxCtUQVKTx0Ld2ktRXat4uzvJiVz4=", calories: "9-20 " },
    { name: "Wall Sit", image: "https://media.istockphoto.com/id/1365425038/photo/young-man-doing-the-wall-sit-exercise-outdoors.jpg?s=612x612&w=0&k=20&c=0etXyX6J6zNnym0cq0w2NjzUtGfKp1GWtdIA7mtZdag=", calories: "10-25" },
    { name: "Superman Hold", image: "https://media.istockphoto.com/id/1188411147/photo/muscular-athletic-man-doing-an-alternate-superman-planking-position-as-a-part-of-his-warmup.jpg?s=612x612&w=0&k=20&c=Q2YiQDlptbk_FsAqadA6rwgAg7iaMKwlSfKYdxbvWGA=", calories: "12-25" },
    { name: "Bicycle Crunches", image: "https://media.istockphoto.com/id/1340405091/photo/athletic-young-man-training-at-home.jpg?s=612x612&w=0&k=20&c=bhC1YF6xSgZDOD799aUgrXxTdJ31avWo3B0zuMbPi8Q=", calories: "16-35" },
];

//workout 
function generateWorkoutPlan() {
    const workoutPlanDiv = document.getElementById("workoutPlan");
    workoutPlanDiv.innerHTML = ""; // Clear previous workouts

    const exerciseType = document.querySelector('input[name="exerciseType"]:checked').value;
    const selectedWorkouts = exerciseType === "jump" ? jumpWorkouts : noJumpWorkouts;

    // Randomly select 3 workouts
    const workoutsToDisplay = [];
    while (workoutsToDisplay.length < 3) {
        const randomIndex = Math.floor(Math.random() * selectedWorkouts.length);
        const randomWorkout = selectedWorkouts[randomIndex];
        if (!workoutsToDisplay.includes(randomWorkout)) {
            workoutsToDisplay.push(randomWorkout);
        }
    }

    // Generate HTML for selected workouts
    workoutsToDisplay.forEach(workout => {
        const workoutItem = document.createElement("div");
        workoutItem.classList.add("workout-item");
        workoutItem.innerHTML = `
            <img src="${workout.image}" alt="${workout.name}">
            <h4>${workout.name}</h4>
            <p>Calories Burned: ${workout.calories}</p>
        `;
        workoutPlanDiv.appendChild(workoutItem);
    });
}