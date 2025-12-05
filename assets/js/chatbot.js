// ===== Chatbot Functionality =====
const chatbotButton = document.getElementById('chatbotButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Toggle Chatbot
chatbotButton.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        chatbotInput.focus();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Chatbot Response Database
const chatbotResponses = {
    greetings: [
        "Hello! How can I help you create the perfect birthday wish today? 😊",
        "Hi there! Ready to make someone's birthday special? 🎉",
        "Hey! Welcome to Birthday Wishes Hub! What can I do for you? 🎂"
    ],
    help: [
        "I can help you:
• Create personalized birthday wishes
• Choose the perfect template
• Download and share your wishes
• Give birthday celebration ideas

What would you like to do?",
        "Here's how I can assist you:
✨ Generate AI-powered birthday messages
🎨 Select beautiful card designs
📱 Share wishes on social media
💡 Get party planning tips

What interests you?"
    ],
    create: [
        "Great! To create a birthday wish, head over to our 'Create Wish' page. You can:
• Enter the recipient's name
• Choose their relationship to you
• Select the tone (funny, heartfelt, etc.)
• Pick a beautiful theme

Would you like some tips on choosing the right tone?",
        "Creating a wish is easy! Just:
1. Go to the Create Wish page
2. Fill in the details
3. Choose your favorite theme
4. Click generate!

Need help with anything specific?"
    ],
    templates: [
        "We have amazing templates for:
🎈 Balloons theme
🎂 Cake theme
🎊 Party theme
🎁 Gifts theme

Each comes with beautiful designs and animations! Which style do you prefer?",
        "Our template collection includes:
• Classic Celebration
• Sweet Wishes
• Elegant Party
• Gift of Joy

All fully customizable! Want to see them?"
    ],
    tone: [
        "We offer various tones:
😄 Funny & Humorous
💝 Heartfelt & Emotional
👔 Professional
🎮 Playful & Fun
💪 Inspirational
💕 Romantic

Which tone matches your relationship best?",
        "Choose a tone that fits your relationship:
• Funny - for close friends
• Heartfelt - for family
• Professional - for colleagues
• Romantic - for partners

What's your preference?"
    ],
    download: [
        "To download your birthday wish:
1. Create your wish
2. Preview it
3. Click the 'Download' button
4. Save it as an image

You can then share it anywhere! Need more help?",
        "Downloading is simple! Once you've created your wish, just click the download button. Your wish will be saved as a high-quality image perfect for sharing! 📥"
    ],
    share: [
        "You can share your wishes:
📱 On social media (Facebook, Instagram, Twitter)
💬 Via WhatsApp or messaging apps
📧 Through email
💾 Or download and print!

How would you like to share?",
        "Sharing options include:
• Direct social media sharing
• Copy link to clipboard
• Download as image
• Send via email

What works best for you?"
    ],
    ideas: [
        "Birthday celebration ideas:
🎉 Surprise party with friends
🎂 Special homemade cake
🎁 Personalized gift
📸 Photo album of memories
🌟 Virtual party (for distant friends)
🍰 Dinner at favorite restaurant

Need more suggestions?",
        "Make it special with:
• Themed decorations
• Personalized playlist
• Memory jar with notes
• Scavenger hunt
• Video messages from loved ones
• Birthday breakfast in bed

What sounds good?"
    ],
    thanks: [
        "You're very welcome! Happy to help! 😊",
        "My pleasure! Enjoy creating beautiful birthday wishes! 🎉",
        "Anytime! Have a wonderful day! 🎂"
    ],
    default: [
        "I'm here to help with birthday wishes! You can ask me about:
• Creating wishes
• Choosing templates
• Downloading & sharing
• Birthday ideas

What would you like to know?",
        "I can help you with birthday wishes and celebrations! Try asking about templates, creating wishes, or party ideas. What interests you? 🎈"
    ]
};

// Process User Message
function processMessage(message) {
    const lowerMessage = message.toLowerCase();

    // Keyword matching
    if (lowerMessage.match(/hello|hi|hey|greetings/)) {
        return getRandomResponse('greetings');
    } else if (lowerMessage.match(/help|what can you do|how/)) {
        return getRandomResponse('help');
    } else if (lowerMessage.match(/create|make|generate|wish|message/)) {
        return getRandomResponse('create');
    } else if (lowerMessage.match(/template|theme|design|style/)) {
        return getRandomResponse('templates');
    } else if (lowerMessage.match(/tone|funny|heartfelt|professional|romantic/)) {
        return getRandomResponse('tone');
    } else if (lowerMessage.match(/download|save/)) {
        return getRandomResponse('download');
    } else if (lowerMessage.match(/share|send|social/)) {
        return getRandomResponse('share');
    } else if (lowerMessage.match(/idea|suggestion|celebrate|party|plan/)) {
        return getRandomResponse('ideas');
    } else if (lowerMessage.match(/thank|thanks|appreciate/)) {
        return getRandomResponse('thanks');
    } else {
        return getRandomResponse('default');
    }
}

function getRandomResponse(category) {
    const responses = chatbotResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
}

// Add Message to Chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = isUser ? 'user-message' : 'bot-message';
    messageDiv.innerHTML = `<p>${text.replace(/
/g, '<br>')}</p>`;

    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send Message
function sendMessage() {
    const message = chatbotInput.value.trim();

    if (message) {
        // Add user message
        addMessage(message, true);
        chatbotInput.value = '';

        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'bot-message typing';
        typingDiv.innerHTML = '<p>...</p>';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

        // Simulate thinking time
        setTimeout(() => {
            typingDiv.remove();
            const response = processMessage(message);
            addMessage(response);
        }, 800);
    }
}

// Event Listeners
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Quick Action Buttons (Optional Enhancement)
function addQuickActions() {
    const quickActions = [
        { text: "Create Wish", action: "create" },
        { text: "View Templates", action: "templates" },
        { text: "Get Ideas", action: "ideas" }
    ];

    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'quick-actions';
    actionsDiv.style.cssText = 'display: flex; gap: 0.5rem; padding: 1rem; flex-wrap: wrap;';

    quickActions.forEach(action => {
        const btn = document.createElement('button');
        btn.textContent = action.text;
        btn.style.cssText = 'padding: 8px 16px; background: #f0f0f0; border: none; border-radius: 20px; cursor: pointer; font-size: 0.9rem;';
        btn.addEventListener('click', () => {
            addMessage(action.text, true);
            setTimeout(() => {
                const response = processMessage(action.action);
                addMessage(response);
            }, 500);
        });
        actionsDiv.appendChild(btn);
    });

    chatbotMessages.appendChild(actionsDiv);
}

// Initialize quick actions after initial greeting
setTimeout(addQuickActions, 1000);
