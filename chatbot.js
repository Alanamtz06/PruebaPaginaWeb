// Chatbot Logic
const chatbotData = {
    greetings: [
        "¡Hola! 🐵 Bienvenido a Only feetMonkeys. ¿En qué puedo ayudarte?",
        "¡Hola, amigo! 🐒 Estoy aquí para responder tus preguntas. ¿Qué necesitas saber?",
        "¡Hola! ¡Me encanta poder ayudarte! 😊 ¿Cuál es tu pregunta?"
    ],
    
    questions: {
        "qué es only feetmonkeys": {
            answer: "Only feetMonkeys es la plataforma premium más exclusiva para contenido de monos de alta calidad. 🐵 Aquí encontrarás creadores increíbles compartiendo contenido único y emocionante. ¡Es como Netflix pero para los amantes del contenido de monos!"
        },
        "cómo me suscribo": {
            answer: "¡Excelente pregunta! 💪 Puedes hacer clic en el botón 'Join Now' en la sección principal, llenar el formulario con tus datos y listo. Después podrás suscribirte a tus creadores favoritos. ¡Es muy fácil y seguro!"
        },
        "cuál es el costo": {
            answer: "Nuestros creadores ofrecen diferentes planes según su contenido: 💰\n• Banana Joe: $9.99/mes\n• Coconut King: $14.99/mes\n• Paw Master: $19.99/mes\n• Jungle Pearl: $12.99/mes\n\n¡Elige el que mejor se adapte a ti!"
        },
        "quiénes son los creadores": {
            answer: "Tenemos 4 creadores increíbles: 🌟\n• Banana Joe - Modelo profesional con 12.5K suscriptores\n• Coconut King - Creador de lujo con 8.3K seguidores\n• Paw Master - Curador de élite con 15.2K suscriptores\n• Jungle Pearl - Reina de la jungla con 9.8K fans\n\n¡Todos ofrecen contenido exclusivo y de alta calidad!"
        },
        "cómo contacto soporte": {
            answer: "Me encanta tu intención de comunicarte. 📧 Aunque soy solo un chatbot, puedes:\n• Revisar las preguntas frecuentes más arriba\n• Dejar un comentario en la página\n• Usar los botones de suscripción para más información\n\n¡Estoy aquí para ayudarte en lo que pueda!"
        },
        "es seguro mi dinero": {
            answer: "¡Absolutamente! 🔒 Only feetMonkeys utiliza sistemas de pago seguros y encriptados. Tus datos financieros están protegidos con los más altos estándares de seguridad. Puedes confiar en nosotros completamente. 💳✨"
        },
        "puedo ser creador": {
            answer: "¡Qué emocionante que te interese! 🎬 Para convertirte en creador de Only feetMonkeys, deberías contactar a nuestro equipo administrativo. Buscamos pasionistas que quieran compartir contenido único. ¿Te interesa saber más sobre los requisitos?"
        },
        "hay descuentos": {
            answer: "¡Buena pregunta! 🎉 Regularmente ofrecemos promociones especiales para nuestros usuarios leales. Te recomiendo:\n• Suscribirse primero para recibir ofertas exclusivas\n• Estar atento a nuestras notificaciones\n• Seguirnos en redes sociales para códigos de descuento\n\n¡Mantente atento a las sorpresas! 🎁"
        },
        "qué pasa después de registrarme": {
            answer: "¡Excelente decisión! 🎊 Después de registrarte:\n1. Accedes al perfil de todos nuestros creadores\n2. Ves previsualizaciones de su contenido\n3. Eliges a quiénes suscribierte\n4. ¡Disfruta del contenido exclusivo! 🎥\n\nEs simple, rápido y emocionante. ¡Bienvenido a la comunidad!"
        },
        "en qué dispositivos funciona": {
            answer: "Only feetMonkeys funciona perfectamente en: 📱\n• Computadoras (Windows, Mac, Linux)\n• Teléfonos inteligentes (iOS y Android)\n• Tablets\n• Todas las pantallas modernas\n\n¡Accede desde donde quieras, cuando quieras! 🌐"
        }
    },

    fallback: [
        "Hmm, esa pregunta es un poco diferente. 🤔 ¿Podrías reformularla de otra manera? Intento ofrecerte la mejor respuesta.",
        "No estoy completamente seguro de eso, pero tu pregunta es válida. 💭 ¿Podrías darme más contexto? ¡Haré mi mejor esfuerzo!",
        "Eso es interesante, pero no tengo una respuesta lista. 🤷 ¿Hay algo más que pueda ayudarte con respecto a Only feetMonkeys?",
        "Vaya, esa es una pregunta que no esperaba. 😄 ¿Hay algo más sobre nuestra plataforma que quieras saber?"
    ]
};

// Chatbot UI Management
const chatbotContainer = document.getElementById('chatbot-container');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatToggleBtn = document.getElementById('chat-toggle-btn');

let chatInitialized = false;

// Open/Close Chatbot
function toggleChatbot() {
    chatbotContainer.classList.toggle('open');
    
    if (!chatInitialized) {
        initializeChat();
        chatInitialized = true;
    }
}

// Initialize Chat
function initializeChat() {
    const greeting = chatbotData.greetings[Math.floor(Math.random() * chatbotData.greetings.length)];
    addBotMessage(greeting);
}

// Add Bot Message
function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message bot-message';
    messageDiv.innerHTML = `<div class="message-content">${message}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add User Message
function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.innerHTML = `<div class="message-content">${escapeHtml(message)}</div>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Find Response
function findResponse(userInput) {
    const input = userInput.toLowerCase().trim();
    
    // Direct matching
    if (chatbotData.questions[input]) {
        return chatbotData.questions[input].answer;
    }
    
    // Partial matching
    for (const [key, value] of Object.entries(chatbotData.questions)) {
        if (input.includes(key) || key.includes(input)) {
            return value.answer;
        }
    }
    
    // Fallback response
    return chatbotData.fallback[Math.floor(Math.random() * chatbotData.fallback.length)];
}

// Handle Send Message
function sendMessage() {
    const userMessage = chatInput.value.trim();
    
    if (userMessage === '') return;
    
    addUserMessage(userMessage);
    chatInput.value = '';
    
    // Simulate bot thinking
    setTimeout(() => {
        const response = findResponse(userMessage);
        addBotMessage(response);
    }, 500);
}

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Send message on button click
chatSendBtn.addEventListener('click', sendMessage);

// Toggle chatbot on button click
chatToggleBtn.addEventListener('click', toggleChatbot);

// Close chatbot when clicking outside (optional)
document.addEventListener('click', (e) => {
    if (!e.target.closest('.chatbot-widget') && chatbotContainer.classList.contains('open')) {
        // Optional: uncomment to close on outside click
        // toggleChatbot();
    }
});
