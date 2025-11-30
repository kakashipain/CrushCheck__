document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const genderBtns = document.querySelectorAll('.gender-btn');
    const typeSelect = document.getElementById('personality-type');
    const checkBtn = document.getElementById('check-btn');
    const inputSection = document.getElementById('input-section');
    const loadingSection = document.getElementById('loading-section');
    const resultSection = document.getElementById('result-section');
    const loadingText = document.getElementById('loading-text');
    const progressFill = document.querySelector('.progress-fill');
    const resultPercentage = document.getElementById('result-percentage');
    const resultMessage = document.getElementById('result-message');
    const resetBtn = document.getElementById('reset-btn');

    // State
    let selectedGender = null;
    let selectedType = '';

    // Event Listeners
    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove selected class from all
            genderBtns.forEach(b => b.classList.remove('selected'));
            // Add to clicked
            btn.classList.add('selected');
            selectedGender = btn.dataset.gender;
            validateInput();
        });
    });

    typeSelect.addEventListener('change', (e) => {
        selectedType = e.target.value;
        validateInput();
    });

    checkBtn.addEventListener('click', startAnalysis);
    resetBtn.addEventListener('click', resetApp);

    // Functions
    function validateInput() {
        if (selectedGender && selectedType) {
            checkBtn.disabled = false;
        } else {
            checkBtn.disabled = true;
        }
    }

    function startAnalysis() {
        // Switch to loading
        inputSection.classList.add('hidden');
        inputSection.classList.remove('active');
        loadingSection.classList.remove('hidden');
        loadingSection.classList.add('active');

        // Simulate progress
        let progress = 0;
        const messages = [
            "Searching Google...",
            "Analyzing Instagram...",
            "Checking compatibility...",
            "Reading the stars...",
            "Calculating vibes..."
        ];

        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = `${progress}%`;
            
            // Randomly change text
            if (Math.random() > 0.7) {
                loadingText.innerText = messages[Math.floor(Math.random() * messages.length)];
            }

            if (progress === 100) {
                clearInterval(interval);
                setTimeout(showResult, 500);
            }
        }, 200);
    }

    function showResult() {
        loadingSection.classList.add('hidden');
        loadingSection.classList.remove('active');
        resultSection.classList.remove('hidden');
        resultSection.classList.add('active');

        // Calculate random percentage (biased slightly high for fun)
        const percentage = Math.floor(Math.random() * 41) + 60; // 60-100%
        
        // Animate number
        let current = 0;
        const countInterval = setInterval(() => {
            current += 2;
            if (current >= percentage) {
                current = percentage;
                clearInterval(countInterval);
            }
            resultPercentage.innerText = `${current}%`;
        }, 20);

        // Set message
        if (percentage > 90) {
            resultMessage.innerText = "It's basically destiny! 😍";
        } else if (percentage > 75) {
            resultMessage.innerText = "Looking very real! ✨";
        } else {
            resultMessage.innerText = "There's a chance! 🤞";
        }
    }

    function resetApp() {
        resultSection.classList.add('hidden');
        resultSection.classList.remove('active');
        inputSection.classList.remove('hidden');
        inputSection.classList.add('active');
        
        // Reset state
        selectedGender = null;
        selectedType = '';
        genderBtns.forEach(b => b.classList.remove('selected'));
        typeSelect.value = "";
        checkBtn.disabled = true;
        progressFill.style.width = '0%';
        loadingText.innerText = "Searching internet...";
    }
});
