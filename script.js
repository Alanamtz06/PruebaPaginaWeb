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

// ===== MonkeyIA Chatbot Functions =====

// Chatbot responses library
const chatbotResponses = {
    hello: "¡Hola! 👋 Soy MonkeyIA, tu asistente. ¿Cómo te puedo ayudar?",
    help: "Puedo ayudarte con:\n✅ Información de creadores\n✅ Suscripciones y planes\n✅ Cómo usar la plataforma\n✅ Preguntas frecuentes\n\n¿Qué necesitas?",
    creators: "Tenemos creadores increíbles como:\n🐵 Banana Joe - @bananajoe_feet\n🐒 Coconut King - @coconut_king_toes\n🦍 Paw Master - @paw_master_pro\n\n¿Quieres conocer más?",
    subscribe: "¡Perfecto! Nuestros planes son:\n💰 Básico: $9.99\n💰 Premium: $14.99\n💰 Elite: $19.99\n\n¿Cuál te interesa?",
    price: "Nuestros precios por suscripción varían:\n💎 Creators populares: $9.99-$19.99\n💎 VIP: Acceso a todo por $29.99\n\n¿Necesitas más información?",
    thanks: "¡De nada! 🐵 Estoy aquí cuando me necesites. ¿Hay algo más en lo que pueda ayudarte?",
    bye: "¡Hasta luego! 👋 Vuelve pronto para más contenido exclusivo. 🐵",
    default: "Interesante pregunta 🤔 Aunque soy MonkeyIA, aún estoy aprendiendo. ¿Puedo ayudarte con información sobre:\n- Creadores\n- Suscripciones\n- Cómo usar la plataforma?"
};

// Detect user intent
function detectIntent(message) {
    const msg = message.toLowerCase().trim();
    
    if (msg.includes('hola') || msg.includes('hey') || msg.includes('hi')) return 'hello';
    if (msg.includes('ayuda') || msg.includes('help') || msg.includes('qué puedes')) return 'help';
    if (msg.includes('creador') || msg.includes('creator') || msg.includes('influencer')) return 'creators';
    if (msg.includes('suscri') || msg.includes('subscribe')) return 'subscribe';
    if (msg.includes('precio') || msg.includes('price') || msg.includes('costo') || msg.includes('cuesta')) return 'price';
    if (msg.includes('thanks') || msg.includes('gracias') || msg.includes('thx') || msg.includes('ty')) return 'thanks';
    if (msg.includes('adiós') || msg.includes('bye') || msg.includes('chao')) return 'bye';
    
    return 'default';
}

// Toggle chatbot window
function toggleChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.classList.toggle('active');
    
    if (chatWindow.classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('chatbotInput').focus();
        }, 100);
    }
}

// Close chatbot window
function closeChatbot() {
    const chatWindow = document.getElementById('chatbotWindow');
    chatWindow.classList.remove('active');
}

// Handle chat input on Enter key
function handleChatInput(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// Send message
function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addUserMessage(message);
    
    // Clear input
    input.value = '';
    input.focus();
    
    // Simulate bot thinking and send response
    setTimeout(() => {
        const intent = detectIntent(message);
        const response = chatbotResponses[intent];
        addBotMessage(response);
    }, 500);
}

// Add user message to chat
function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'user-message');
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Add bot message to chat
function addBotMessage(message) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', 'bot-message');
    messageDiv.innerHTML = `<p>${message.replace(/\n/g, '<br>')}</p>`;
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

