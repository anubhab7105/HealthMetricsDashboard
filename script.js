// Update current date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = now.toLocaleDateString('en-US', options);
}

// Initialize with random data for demonstration
function initializeData() {
    // Set random values for demonstration
    document.getElementById('heart-rate-value').textContent = Math.floor(Math.random() * 40) + 60;
    document.getElementById('steps-value').textContent = Math.floor(Math.random() * 5000) + 5000;
    document.getElementById('systolic-value').textContent = Math.floor(Math.random() * 20) + 110;
    document.getElementById('diastolic-value').textContent = Math.floor(Math.random() * 15) + 70;
    document.getElementById('oxygen-value').textContent = Math.floor(Math.random() * 4) + 96;
    document.getElementById('sleep-value').textContent = (Math.random() * 2 + 6).toFixed(1);
    document.getElementById('deep-sleep-value').textContent = (Math.random() + 1.5).toFixed(1);
    document.getElementById('light-sleep-value').textContent = (Math.random() * 2 + 4).toFixed(1);
    document.getElementById('calories-value').textContent = Math.floor(Math.random() * 1000) + 2000;
    document.getElementById('respiration-value').textContent = Math.floor(Math.random() * 6) + 12;
}

// Update metrics periodically to simulate live data
function startLiveUpdates() {
    setInterval(() => {
        // Update heart rate
        const currentHR = parseInt(document.getElementById('heart-rate-value').textContent);
        const newHR = Math.max(50, Math.min(100, currentHR + Math.floor(Math.random() * 11) - 5));
        document.getElementById('heart-rate-value').textContent = newHR;
        
        // Update steps (increment by small random amount)
        const currentSteps = parseInt(document.getElementById('steps-value').textContent);
        const newSteps = currentSteps + Math.floor(Math.random() * 10);
        document.getElementById('steps-value').textContent = newSteps;
        
        // Update step progress bar
        const stepProgress = Math.min(100, (newSteps / 10000) * 100);
        document.querySelector('#steps-value + .progress-bar .progress').style.width = `${stepProgress}%`;
        
        // Update SpO2 slightly
        const currentO2 = parseInt(document.getElementById('oxygen-value').textContent);
        const newO2 = Math.max(95, Math.min(100, currentO2 + Math.floor(Math.random() * 3) - 1));
        document.getElementById('oxygen-value').textContent = newO2;
        
        // Update respiration rate
        const currentResp = parseInt(document.getElementById('respiration-value').textContent);
        const newResp = Math.max(12, Math.min(20, currentResp + Math.floor(Math.random() * 5) - 2));
        document.getElementById('respiration-value').textContent = newResp;
        
        // Update temperature slightly (read-only)
        const currentTemp = parseFloat(document.getElementById('temperature-value').textContent);
        const newTemp = Math.max(36.0, Math.min(37.5, currentTemp + (Math.random() * 0.3 - 0.15))).toFixed(1);
        document.getElementById('temperature-value').textContent = newTemp;
    }, 5000);
}

// Set up event listeners for manual inputs
function setupEventListeners() {
    // Weight input
    document.getElementById('weight-btn').addEventListener('click', () => {
        const weightInput = document.getElementById('weight-input');
        if (weightInput.value && !isNaN(weightInput.value)) {
            document.getElementById('weight-value').textContent = parseFloat(weightInput.value).toFixed(1);
            
            // Update weight progress
            const weightProgress = Math.min(100, (parseFloat(weightInput.value) / 68) * 100);
            document.querySelector('#weight-value + .progress-bar .progress').style.width = `${weightProgress}%`;
            
            // Clear the input field
            weightInput.value = '';
        }
    });
    
    // Water intake input
    document.getElementById('water-btn').addEventListener('click', () => {
        const waterInput = document.getElementById('water-input');
        if (waterInput.value && !isNaN(waterInput.value)) {
            const currentHydration = parseFloat(document.getElementById('hydration-value').textContent);
            const newHydration = currentHydration + parseFloat(waterInput.value);
            document.getElementById('hydration-value').textContent = newHydration.toFixed(1);
            
            // Update hydration progress bar
            const hydrationProgress = Math.min(100, (newHydration / 3.0) * 100);
            document.querySelector('#hydration-value + .progress-bar .progress').style.width = `${hydrationProgress}%`;
            
            // Clear the input field
            waterInput.value = '';
        }
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        document.body.classList.toggle('light-theme');
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        if (document.body.classList.contains('dark-theme')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
        
        // Save theme preference
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
}

// Initialize the dashboard
function initDashboard() {
    updateDate();
    initializeData();
    startLiveUpdates();
    setupEventListeners();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        const icon = document.querySelector('.theme-toggle i');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// Run when document is loaded
document.addEventListener('DOMContentLoaded', initDashboard);