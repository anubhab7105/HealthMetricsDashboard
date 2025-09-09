// Update current date
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const el = document.getElementById('current-date');
    if (el) el.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize with random data for demonstration
function initializeData() {
    const hrEl = document.getElementById('heart-rate-value');
    const stepsEl = document.getElementById('steps-value');
    const sysEl = document.getElementById('systolic-value');
    const diaEl = document.getElementById('diastolic-value');
    const oxyEl = document.getElementById('oxygen-value');
    const sleepEl = document.getElementById('sleep-value');
    const deepEl = document.getElementById('deep-sleep-value');
    const lightEl = document.getElementById('light-sleep-value');
    const calEl = document.getElementById('calories-value');
    const respEl = document.getElementById('respiration-value');
    const weightEl = document.getElementById('weight-value');
    const hydrationEl = document.getElementById('hydration-value');
    const tempEl = document.getElementById('temperature-value');
    const stepsCard = document.getElementById('card-steps');
    const weightCard = document.getElementById('card-weight');

    if (hrEl) hrEl.textContent = Math.floor(Math.random() * 40) + 60;
    if (stepsEl) stepsEl.textContent = Math.floor(Math.random() * 5000) + 5000;
    if (sysEl) sysEl.textContent = Math.floor(Math.random() * 20) + 110;
    if (diaEl) diaEl.textContent = Math.floor(Math.random() * 15) + 70;
    if (oxyEl) oxyEl.textContent = Math.floor(Math.random() * 4) + 96;
    if (sleepEl) sleepEl.textContent = (Math.random() * 2 + 6).toFixed(1);
    if (deepEl) deepEl.textContent = (Math.random() + 1.5).toFixed(1);
    if (lightEl) lightEl.textContent = (Math.random() * 2 + 4).toFixed(1);
    if (calEl) calEl.textContent = Math.floor(Math.random() * 1000) + 2000;
    if (respEl) respEl.textContent = Math.floor(Math.random() * 6) + 12;
    if (weightEl) weightEl.textContent = '72.5';
    if (hydrationEl) hydrationEl.textContent = '1.8';
    if (tempEl) tempEl.textContent = '36.8';

    // set initial progress bar widths when cards exist
    if (stepsCard) {
        const prog = stepsCard.querySelector('.progress');
        const steps = parseInt(stepsEl ? stepsEl.textContent : '0') || 0;
        if (prog) prog.style.width = `${Math.min(100, (steps / 10000) * 100)}%`;
    }
    if (weightCard) {
        const prog = weightCard.querySelector('.progress');
        const w = parseFloat(weightEl ? weightEl.textContent : '0') || 0;
        if (prog) prog.style.width = `${Math.min(100, (w / 68) * 100)}%`;
    }
}

// Update metrics periodically to simulate live data
function startLiveUpdates() {
    setInterval(() => {
        // Heart rate
        const hrEl = document.getElementById('heart-rate-value');
        if (hrEl) {
            const currentHR = parseInt(hrEl.textContent) || 70;
            const newHR = Math.max(50, Math.min(100, currentHR + Math.floor(Math.random() * 11) - 5));
            hrEl.textContent = newHR;
        }

        // Steps
        const stepsEl = document.getElementById('steps-value');
        if (stepsEl) {
            const currentSteps = parseInt(stepsEl.textContent) || 0;
            const newSteps = currentSteps + Math.floor(Math.random() * 10);
            stepsEl.textContent = newSteps;
            const stepsCard = stepsEl.closest('.card');
            if (stepsCard) {
                const prog = stepsCard.querySelector('.progress');
                if (prog) {
                    const stepProgress = Math.min(100, (newSteps / 10000) * 100);
                    prog.style.width = `${stepProgress}%`;
                }
            }
        }

        // SpO2
        const o2El = document.getElementById('oxygen-value');
        if (o2El) {
            const currentO2 = parseInt(o2El.textContent) || 98;
            const newO2 = Math.max(95, Math.min(100, currentO2 + Math.floor(Math.random() * 3) - 1));
            o2El.textContent = newO2;
        }

        // Respiration
        const respEl = document.getElementById('respiration-value');
        if (respEl) {
            const currentResp = parseInt(respEl.textContent) || 16;
            const newResp = Math.max(12, Math.min(20, currentResp + Math.floor(Math.random() * 5) - 2));
            respEl.textContent = newResp;
        }

        // Temperature
        const tempEl = document.getElementById('temperature-value');
        if (tempEl) {
            const currentTemp = parseFloat(tempEl.textContent) || 36.8;
            const newTemp = (Math.max(36.0, Math.min(37.5, currentTemp + (Math.random() * 0.3 - 0.15)))).toFixed(1);
            tempEl.textContent = newTemp;
        }
    }, 5000);
}

// Set up event listeners for manual inputs
function setupEventListeners() {
    // Weight update
    const weightBtn = document.getElementById('weight-btn');
    if (weightBtn) {
        weightBtn.addEventListener('click', () => {
            const weightInput = document.getElementById('weight-input');
            const weightValueEl = document.getElementById('weight-value');
            if (weightInput && weightValueEl && weightInput.value && !isNaN(weightInput.value)) {
                const newWeight = parseFloat(weightInput.value);
                weightValueEl.textContent = newWeight.toFixed(1);
                const weightCard = document.getElementById('card-weight');
                if (weightCard) {
                    const prog = weightCard.querySelector('.progress');
                    if (prog) prog.style.width = `${Math.min(100, (newWeight / 68) * 100)}%`;
                }
                weightInput.value = '';
            }
        });
    }

    // Water intake
    const waterBtn = document.getElementById('water-btn');
    if (waterBtn) {
        waterBtn.addEventListener('click', () => {
            const waterInput = document.getElementById('water-input');
            const hydrationEl = document.getElementById('hydration-value');
            if (waterInput && hydrationEl && waterInput.value && !isNaN(waterInput.value)) {
                const currentHydration = parseFloat(hydrationEl.textContent) || 0;
                const newHydration = currentHydration + parseFloat(waterInput.value);
                hydrationEl.textContent = newHydration.toFixed(1);
                const hydrationCard = hydrationEl.closest('.card');
                if (hydrationCard) {
                    const prog = hydrationCard.querySelector('.progress');
                    if (prog) prog.style.width = `${Math.min(100, (newHydration / 3.0) * 100)}%`;
                }
                waterInput.value = '';
            }
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            document.body.classList.toggle('light-theme');

            const icon = themeToggle.querySelector('i');
            if (icon) {
                if (document.body.classList.contains('dark-theme')) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                } else {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            }

            localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
        });
    }
}

// Initialize the dashboard
function initDashboard() {
    updateDate();
    initializeData();
    startLiveUpdates();
    setupEventListeners();

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
}

document.addEventListener('DOMContentLoaded', initDashboard);