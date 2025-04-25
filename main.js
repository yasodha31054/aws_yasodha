/**
 * WellTrack - Health & Wellness Tracker
 * Main JavaScript File
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSleepTracker();
    initWaterTracker();
    initExerciseTracker();
    initMealsTracker();
    initMoodTracker();
    updateWellnessScore();
});

// Global wellness data object
const wellnessData = {
    sleep: 7,
    water: 4,
    exercise: 'moderate',
    meals: 3,
    mood: 3
};

// Sleep tracker functionality
function initSleepTracker() {
    const sleepSlider = document.getElementById('sleepSlider');
    const sleepValue = document.getElementById('sleepValue');
    const sleepFeedback = document.getElementById('sleepFeedback');
    
    if (!sleepSlider) return; // Exit if we're not on the tracker page
    
    // Update display when slider changes
    sleepSlider.addEventListener('input', function() {
        const value = parseFloat(this.value);
        sleepValue.textContent = value;
        wellnessData.sleep = value;
        
        // Update feedback based on sleep hours
        if (value < 6) {
            sleepFeedback.textContent = "Try to get more sleep for better health.";
        } else if (value >= 6 && value < 7) {
            sleepFeedback.textContent = "You're getting close to the recommended amount of sleep.";
        } else if (value >= 7 && value <= 9) {
            sleepFeedback.textContent = "Great! You're getting the recommended amount of sleep.";
        } else {
            sleepFeedback.textContent = "You might be oversleeping. 7-9 hours is typically recommended.";
        }
        
        updateWellnessScore();
    });
}

// Water intake tracker functionality
function initWaterTracker() {
    const decreaseBtn = document.getElementById('decreaseWater');
    const increaseBtn = document.getElementById('increaseWater');
    const waterValue = document.getElementById('waterValue');
    const waterFeedback = document.getElementById('waterFeedback');
    
    if (!decreaseBtn || !increaseBtn) return; // Exit if we're not on the tracker page
    
    // Decrease water intake
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(waterValue.textContent);
        if (value > 0) {
            value--;
            waterValue.textContent = value;
            wellnessData.water = value;
            updateWaterFeedback(value);
            updateWellnessScore();
        }
    });
    
    // Increase water intake
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(waterValue.textContent);
        if (value < 12) {
            value++;
            waterValue.textContent = value;
            wellnessData.water = value;
            updateWaterFeedback(value);
            updateWellnessScore();
        }
    });
    
    // Initial feedback
    updateWaterFeedback(parseInt(waterValue.textContent));
    
    function updateWaterFeedback(value) {
        if (value < 4) {
            waterFeedback.textContent = "Try to drink more water throughout the day.";
        } else if (value >= 4 && value < 8) {
            waterFeedback.textContent = "You're doing well with hydration, but could drink a bit more.";
        } else {
            waterFeedback.textContent = "Excellent hydration! Keep it up.";
        }
    }
}

// Exercise tracker functionality
function initExerciseTracker() {
    const exerciseDropdown = document.getElementById('exerciseDropdown');
    const exerciseFeedback = document.getElementById('exerciseFeedback');
    
    if (!exerciseDropdown) return; // Exit if we're not on the tracker page
    
    // Update when exercise selection changes
    exerciseDropdown.addEventListener('change', function() {
        const value = this.value;
        wellnessData.exercise = value;
        
        // Update feedback based on exercise level
        switch(value) {
            case 'none':
                exerciseFeedback.textContent = "Try to incorporate some physical activity into your day.";
                break;
            case 'light':
                exerciseFeedback.textContent = "Light activity is better than none. Consider increasing intensity when possible.";
                break;
            case 'moderate':
                exerciseFeedback.textContent = "Great job staying active today!";
                break;
            case 'intense':
                exerciseFeedback.textContent = "Excellent work with your intense exercise! Remember to rest appropriately.";
                break;
        }
        
        updateWellnessScore();
    });
}

// Meals tracker functionality
function initMealsTracker() {
    const decreaseBtn = document.getElementById('decreaseMeals');
    const increaseBtn = document.getElementById('increaseMeals');
    const mealsValue = document.getElementById('mealsValue');
    const mealsFeedback = document.getElementById('mealsFeedback');
    
    if (!decreaseBtn || !increaseBtn) return; // Exit if we're not on the tracker page
    
    // Decrease meals count
    decreaseBtn.addEventListener('click', function() {
        let value = parseInt(mealsValue.textContent);
        if (value > 0) {
            value--;
            mealsValue.textContent = value;
            wellnessData.meals = value;
            updateMealsFeedback(value);
            updateWellnessScore();
        }
    });
    
    // Increase meals count
    increaseBtn.addEventListener('click', function() {
        let value = parseInt(mealsValue.textContent);
        if (value < 5) {
            value++;
            mealsValue.textContent = value;
            wellnessData.meals = value;
            updateMealsFeedback(value);
            updateWellnessScore();
        }
    });
    
    // Initial feedback
    updateMealsFeedback(parseInt(mealsValue.textContent));
    
    function updateMealsFeedback(value) {
        if (value <= 1) {
            mealsFeedback.textContent = "Consider eating more regular meals throughout the day.";
        } else if (value === 2) {
            mealsFeedback.textContent = "Try to aim for at least 3 meals per day.";
        } else if (value === 3) {
            mealsFeedback.textContent = "You're maintaining a good eating schedule.";
        } else {
            mealsFeedback.textContent = "Great job spacing your nutrition throughout the day!";
        }
    }
}

// Mood tracker functionality
function initMoodTracker() {
    const moodEmojis = document.querySelectorAll('.mood-emoji');
    const moodFeedback = document.getElementById('moodFeedback');
    
    if (moodEmojis.length === 0) return; // Exit if we're not on the tracker page
    
    // Add click event to each emoji
    moodEmojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            // Remove selected class from all emojis
            moodEmojis.forEach(e => e.classList.remove('mood-selected'));
            
            // Add selected class to clicked emoji
            this.classList.add('mood-selected');
            
            // Update mood value
            const moodValue = parseInt(this.getAttribute('data-mood'));
            wellnessData.mood = moodValue;
            
            // Update feedback based on mood
            switch(moodValue) {
                case 1:
                    moodFeedback.textContent = "I'm sorry you're not feeling well today. Consider talking to someone or doing something you enjoy.";
                    break;
                case 2:
                    moodFeedback.textContent = "Everyone has off days. Try some self-care activities to boost your mood.";
                    break;
                case 3:
                    moodFeedback.textContent = "You're feeling good today!";
                    break;
                case 4:
                    moodFeedback.textContent = "Fantastic! You're in a great mood today!";
                    break;
            }
            
            updateWellnessScore();
        });
    });
}

// Calculate and update overall wellness score
function updateWellnessScore() {
    const wellnessScoreElement = document.getElementById('wellnessScoreValue');
    const wellnessMessageElement = document.getElementById('wellnessMessage');
    
    if (!wellnessScoreElement) return; // Exit if we're not on the tracker page
    
    // Calculate score based on all metrics (0-100 scale)
    let score = 0;
    
    // Sleep score (0-25)
    if (wellnessData.sleep < 5) {
        score += 5;
    } else if (wellnessData.sleep < 6) {
        score += 10;
    } else if (wellnessData.sleep < 7) {
        score += 15;
    } else if (wellnessData.sleep <= 9) {
        score += 25;
    } else {
        score += 15;
    }
    
    // Water score (0-20)
    score += Math.min(wellnessData.water * 2.5, 20);
    
    // Exercise score (0-25)
    switch(wellnessData.exercise) {
        case 'none':
            score += 0;
            break;
        case 'light':
            score += 10;
            break;
        case 'moderate':
            score += 20;
            break;
        case 'intense':
            score += 25;
            break;
    }
    
    // Meals score (0-15)
    if (wellnessData.meals <= 1) {
        score += 5;
    } else if (wellnessData.meals === 2) {
        score += 10;
    } else {
        score += 15;
    }
    
    // Mood score (0-15)
    score += wellnessData.mood * 3.75;
    
    // Update the score display
    wellnessScoreElement.textContent = Math.round(score);
    
    // Update wellness message
    if (score < 40) {
        wellnessMessageElement.textContent = "There's room for improvement in your wellness habits.";
    } else if (score < 60) {
        wellnessMessageElement.textContent = "You're on the right track with your wellness journey.";
    } else if (score < 80) {
        wellnessMessageElement.textContent = "You're doing well! Keep up the good habits.";
    } else {
        wellnessMessageElement.textContent = "Excellent! You're maintaining great wellness habits!";
    }
    
    // Update chart if it exists
    if (typeof updateWellnessChart === 'function') {
        updateWellnessChart();
    }
}