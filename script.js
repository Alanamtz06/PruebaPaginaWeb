// Modal Functions
const modal = document.getElementById("myModal");
const notification = document.getElementById("notification");

function showModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const inputs = event.target.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
    const username = inputs[0].value;
    
    showNotification(`Welcome to Only feetMonkeys, ${username}! 🎉`);
    
    // Reset form
    event.target.reset();
    closeModal();
    
    // Reset inputs
    setTimeout(() => {
        inputs.forEach(input => input.value = '');
    }, 500);
}

// Subscribe Function
function subscribe(creatorName) {
    showNotification(`You subscribed to ${creatorName}! 💰`);
    
    // Change button appearance after subscription
    event.target.textContent = "✓ Subscribed";
    event.target.style.background = "green";
    event.target.disabled = true;
}

// Show Notification
function showNotification(message) {
    notification.textContent = message;
    notification.style.display = "block";
    
    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to creator cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add animation to all creator and post cards
document.querySelectorAll('.creator-card, .post-card').forEach(card => {
    observer.observe(card);
});

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Active nav link highlighting
function updateActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current) && current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Add more interactivity to post cards
document.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h4').textContent;
        showNotification(`To view "${title}", subscribe to the creator! 📺`);
    });
});

// Like button functionality
function likePost(event) {
    event.preventDefault();
    event.stopPropagation();
    const stat = event.target.parentElement;
    let likes = parseInt(stat.textContent.split(' ')[0]);
    likes++;
    stat.textContent = `❤️ ${likes}`;
}

console.log("🐵 Welcome to Only feetMonkeys! 🐵");
console.log("Your premium monkey content destination!");
