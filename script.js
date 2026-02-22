document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark Mode Toggle
    const toggleBtn = document.getElementById("theme-toggle");
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        toggleBtn.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
    });

    // 2. Typing Effect
    const typingText = ["Machine Learning Enthusiast", "Problem Solver", "AI Enthusiast", "Lifelong Learner"];
    let count = 0, index = 0;
    (function type() {
        if (count === typingText.length) count = 0;
        let current = typingText[count];
        let letter = current.slice(0, ++index);
        document.getElementById("typing").textContent = letter;
        if (letter.length === current.length) {
            count++; index = 0;
            setTimeout(type, 1500);
        } else {
            setTimeout(type, 100);
        }
    })();

    // 3. Skill Animation (Circular)
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circles = entry.target.querySelectorAll('.progress');
                circles.forEach(circle => {
                    const percent = circle.closest('.skill-circle').getAttribute('data-percent');
                    const offset = 251 - (251 * percent / 100);
                    circle.style.strokeDashoffset = offset;
                });
            }
        });
    }, { threshold: 0.5 });

    const skillsContainer = document.querySelector('.skills-container');
    if (skillsContainer) skillObserver.observe(skillsContainer);

    // 4. Project Flip Logic
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Check if user clicked the GitHub link - if so, don't flip
            if (e.target.closest('.github-link')) return;
            
            // Toggle the flip class
            this.classList.toggle('flipped');
        });
    });
});

// Achievement Counter Animation
// Function to handle counting animation
const startCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                let count = 0;
                const increment = target / 30; // Speed adjustment

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        entry.target.innerText = Math.ceil(count);
                        setTimeout(updateCount, 40);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCount();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0 });

    counters.forEach(counter => counterObserver.observe(counter));
};

document.addEventListener('DOMContentLoaded', startCounters);