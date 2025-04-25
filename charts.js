/**
 * WellTrack - Health & Wellness Tracker
 * Charts JavaScript File
 */

// Chart instance
let wellnessChart;

// Initialize chart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const chartCanvas = document.getElementById('wellnessChart');
    
    if (!chartCanvas) return; // Exit if we're not on the tracker page
    
    // Create initial chart
    createWellnessChart();
});

// Create the wellness chart
function createWellnessChart() {
    const ctx = document.getElementById('wellnessChart').getContext('2d');
    
    wellnessChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sleep', 'Water', 'Exercise', 'Meals', 'Mood'],
            datasets: [{
                label: 'Today\'s Wellness Metrics',
                data: calculateChartData(),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',  // Sleep
                    'rgba(54, 162, 235, 0.6)',  // Water
                    'rgba(255, 206, 86, 0.6)',  // Exercise
                    'rgba(153, 102, 255, 0.6)', // Meals
                    'rgba(255, 159, 64, 0.6)'   // Mood
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Score (%)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update the wellness chart with new data
function updateWellnessChart() {
    if (!wellnessChart) return;
    
    wellnessChart.data.datasets[0].data = calculateChartData();
    wellnessChart.update();
}

// Calculate percentage scores for each wellness metric
function calculateChartData() {
    // Sleep score (0-100%)
    let sleepScore;
    if (wellnessData.sleep < 5) {
        sleepScore = 20;
    } else if (wellnessData.sleep < 6) {
        sleepScore = 40;
    } else if (wellnessData.sleep < 7) {
        sleepScore = 60;
    } else if (wellnessData.sleep <= 9) {
        sleepScore = 100;
    } else {
        sleepScore = 60;
    }
    
    // Water score (0-100%)
    const waterScore = Math.min(wellnessData.water * 12.5, 100);
    
    // Exercise score (0-100%)
    let exerciseScore;
    switch(wellnessData.exercise) {
        case 'none':
            exerciseScore = 0;
            break;
        case 'light':
            exerciseScore = 40;
            break;
        case 'moderate':
            exerciseScore = 80;
            break;
        case 'intense':
            exerciseScore = 100;
            break;
        default:
            exerciseScore = 0;
    }
    
    // Meals score (0-100%)
    let mealsScore;
    if (wellnessData.meals <= 1) {
        mealsScore = 33;
    } else if (wellnessData.meals === 2) {
        mealsScore = 66;
    } else {
        mealsScore = 100;
    }
    
    // Mood score (0-100%)
    const moodScore = wellnessData.mood * 25;
    
    return [sleepScore, waterScore, exerciseScore, mealsScore, moodScore];
}