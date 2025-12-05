// ===== Navbar Functionality =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Animated Counter for Stats =====
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Intersection Observer for Stats Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    stat.classList.add('animated');
                    animateCounter(stat);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.feature-card, .template-card, .gallery-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    revealObserver.observe(element);
});

// ===== Create Wish Page Functionality =====
if (document.getElementById('generateWish')) {
    const generateBtn = document.getElementById('generateWish');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const shareBtn = document.getElementById('shareBtn');
    const cardMessage = document.getElementById('cardMessage');

    // Theme Selection
    const themeOptions = document.querySelectorAll('.theme-option');
    let selectedTheme = 'balloons';

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            selectedTheme = option.getAttribute('data-theme');
            updateCardBackground(selectedTheme);
        });
    });

    // Select first theme by default
    if (themeOptions.length > 0) {
        themeOptions[0].classList.add('selected');
    }

    function updateCardBackground(theme) {
        const cardBg = document.querySelector('.card-background');
        const themes = {
            balloons: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            cake: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            party: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            gifts: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
        };
        if (cardBg) {
            cardBg.style.background = themes[theme] || themes.balloons;
        }
    }

    // Birthday Wish Templates
    const wishTemplates = {
        friend: {
            funny: [
                "Happy Birthday! You're not getting older, you're just becoming a classic! 🎉 May your day be filled with laughter, cake, and embarrassing moments to remember!",
                "Another year older, another year wiser... or so they say! 😄 Let's celebrate your journey around the sun with cake and questionable decisions!",
                "Happy Birthday! Age is just a number, but in your case, it's a really big number! 🎂 Let's party like we're young again!"
            ],
            heartfelt: [
                "Happy Birthday to an incredible friend! Your presence in my life has been a blessing. May this year bring you endless joy, love, and all the happiness you deserve. 💝",
                "Wishing you a birthday as wonderful as you are! Thank you for being such an amazing friend. May your special day be filled with love, laughter, and beautiful memories. 🌟",
                "Happy Birthday! Your friendship means the world to me. May this year bring you closer to your dreams and fill your heart with pure joy. 🎈"
            ],
            inspirational: [
                "Happy Birthday! May this new chapter of your life be filled with amazing opportunities, incredible adventures, and dreams coming true! 🌟",
                "Another year, another chance to shine brighter than ever! Wishing you a birthday full of inspiration and success. Go conquer the world! 🚀",
                "Happy Birthday! May you continue to grow, inspire others, and achieve everything your heart desires. The best is yet to come! ✨"
            ],
            playful: [
                "Hip hip hooray! It's your special day! 🎉 Time to celebrate with cake, presents, and all the fun we can handle! Let's make this birthday unforgettable!",
                "Happy Birthday! Let's eat cake, unwrap presents, and party like there's no tomorrow! You deserve all the fun in the world! 🎊",
                "Yay! It's your birthday! Time for balloons, confetti, and celebrating the awesome person you are! Let the festivities begin! 🎈"
            ],
            professional: [
                "Wishing you a wonderful birthday! May this year bring you continued success and happiness in all your endeavors. Best wishes!",
                "Happy Birthday! May your special day be filled with joy, and may the coming year bring you prosperity and achievement.",
                "Warmest birthday wishes to you! May you have a fantastic celebration and a successful year ahead."
            ],
            romantic: [
                "Happy Birthday to the love of my life! Every moment with you is precious. May your day be as beautiful and special as you are. I love you! 💕",
                "To my darling, happy birthday! You make every day brighter with your love. Here's to celebrating you today and always. 💖",
                "Happy Birthday, my love! You're the best thing that ever happened to me. May your day be filled with romance and happiness! 🌹"
            ]
        },
        family: {
            funny: [
                "Happy Birthday to my favorite family member (don't tell the others)! 😄 May your day be filled with love, laughter, and way too much cake!",
                "Another year older, but still the coolest family member around! Happy Birthday! Let's celebrate properly! 🎉",
                "Happy Birthday! Thanks for being the best family member and for not telling embarrassing stories about me... most of the time! 🎂"
            ],
            heartfelt: [
                "Happy Birthday! Your love and support mean everything to me. May your special day be filled with joy and surrounded by those who love you. 💝",
                "Wishing you the happiest of birthdays! You're not just family, you're a blessing in my life. May this year bring you all the happiness you deserve. 🌟",
                "Happy Birthday! Thank you for being such an important part of my life. May your day be as wonderful as you are to all of us. 🎈"
            ],
            inspirational: [
                "Happy Birthday! Your strength and wisdom inspire us all. May this year bring you joy, health, and countless blessings! 🌟",
                "Another year of being amazing! Happy Birthday! May you continue to inspire and shine bright in everything you do! ✨",
                "Happy Birthday! Your courage and love make our family stronger. Wishing you a year full of dreams come true! 🚀"
            ],
            playful: [
                "Happy Birthday to the most fun family member! Let's celebrate with cake, laughs, and making wonderful memories together! 🎊",
                "Hooray! It's your birthday! Time for family fun, delicious treats, and lots of smiles! Let's make it special! 🎉",
                "Happy Birthday! Ready for family games, birthday cake, and the best celebration ever? Let's do this! 🎈"
            ],
            professional: [
                "Wishing you a very happy birthday! May your day be wonderful and the year ahead bring you good health and happiness.",
                "Happy Birthday! Sending warm wishes for a joyful celebration and a blessed year ahead.",
                "Best wishes on your birthday! May you enjoy your special day surrounded by love and happiness."
            ],
            romantic: [
                "Happy Birthday to my everything! You complete our family with your love. Wishing you the most romantic and special day! 💕",
                "To my beloved, happy birthday! Your love makes our family whole. May your day be filled with romance and joy! 💖",
                "Happy Birthday, sweetheart! Thank you for being the heart of our family. I love you more each day! 🌹"
            ]
        },
        colleague: {
            funny: [
                "Happy Birthday! Don't worry, we won't reveal your real age at the office party! 😄 Enjoy your special day!",
                "Happy Birthday to the best coworker! May your day be filled with cake and zero meetings! 🎉",
                "Another year of making work fun! Happy Birthday! Let's celebrate after we finish that report! 🎂"
            ],
            heartfelt: [
                "Happy Birthday! Working with you has been a pleasure. Wishing you a wonderful day and a successful year ahead! 💝",
                "Warmest birthday wishes to an exceptional colleague! May your special day be filled with happiness and joy. 🌟",
                "Happy Birthday! Your dedication and positivity inspire us all. Wishing you all the best today and always! 🎈"
            ],
            inspirational: [
                "Happy Birthday! May this year bring you new opportunities, professional growth, and great success! Keep shining! 🌟",
                "Wishing you a birthday full of inspiration! May you achieve all your goals and reach new heights! 🚀",
                "Happy Birthday! Your hard work and talent are truly admirable. Here's to another year of excellence! ✨"
            ],
            playful: [
                "Happy Birthday! Time to celebrate another year of awesome teamwork and office adventures! 🎊",
                "Yay! It's your birthday! Let's take a break from work and celebrate properly! 🎉",
                "Happy Birthday, colleague! May your day be filled with cake, fun, and fewer emails! 🎈"
            ],
            professional: [
                "Wishing you a very happy birthday! May you have a wonderful celebration and continued success in your career.",
                "Happy Birthday! It's a pleasure working with you. Best wishes for a great day and prosperous year ahead.",
                "Warmest birthday greetings! May your special day be enjoyable and the coming year bring you achievement and satisfaction."
            ],
            romantic: [
                "Happy Birthday to my amazing colleague and secret crush! Hope your day is as wonderful as you are! 💕",
                "Wishing the most special person in the office a very happy birthday! May your day be filled with joy! 💖",
                "Happy Birthday! Working alongside you brightens my day. Hope yours is spectacular! 🌹"
            ]
        },
        partner: {
            funny: [
                "Happy Birthday to my favorite person to annoy! 😄 Thanks for putting up with me. Let's eat cake and celebrate! 🎉",
                "Another year of tolerating my jokes! Happy Birthday, love! You're the best! 🎂",
                "Happy Birthday! You're aging like fine wine... expensive and gives me headaches! Just kidding! Love you! 💕"
            ],
            heartfelt: [
                "Happy Birthday to the love of my life! You make every day special. May your birthday be as amazing as you are to me. 💝",
                "To my beloved, happy birthday! Your love fills my heart with joy. Wishing you all the happiness in the world today and always. 🌟",
                "Happy Birthday, my love! Every moment with you is a treasure. May your day be filled with love and beautiful memories. 🎈"
            ],
            inspirational: [
                "Happy Birthday, my inspiration! May this year bring you closer to your dreams. I'll be by your side every step! 🌟",
                "To my amazing partner, happy birthday! May you achieve everything you desire. I believe in you! 🚀",
                "Happy Birthday! Your strength and passion inspire me daily. Here's to another year of growing together! ✨"
            ],
            playful: [
                "Happy Birthday to my partner in crime! Let's celebrate with adventures, treats, and lots of laughs! 🎊",
                "Yay! It's your birthday! Time for fun, romance, and making the best memories together! 🎉",
                "Happy Birthday, sweetheart! Ready for birthday surprises and magical moments? Let's go! 🎈"
            ],
            professional: [
                "Wishing you a wonderful birthday! May your day be special and the year ahead bring you success and fulfillment.",
                "Happy Birthday! May you enjoy your special day and have a prosperous year filled with achievement.",
                "Warmest birthday wishes! Hope your day is memorable and the coming year brings you joy and success."
            ],
            romantic: [
                "Happy Birthday to my one and only! You're my soulmate, my best friend, my everything. I love you more than words can say! 💕",
                "To the love of my life, happy birthday! You make my world complete. May your day be filled with romance and passion! 💖",
                "Happy Birthday, my darling! You're the reason I smile every day. Here's to us and our beautiful love! 🌹"
            ]
        },
        child: {
            funny: [
                "Happy Birthday, superstar! You're another year more awesome! Let's party with cake and lots of fun! 🎉",
                "Happy Birthday! You're growing up so fast! Time to celebrate with games, treats, and silliness! 🎂",
                "Hooray! It's your birthday! Get ready for fun, laughter, and being the coolest kid around! 😄"
            ],
            heartfelt: [
                "Happy Birthday to the most wonderful child! You bring so much joy and love into our lives. May your day be magical! 💝",
                "Wishing you the happiest birthday! You're special, loved, and cherished. May all your dreams come true! 🌟",
                "Happy Birthday, sweetheart! You light up our world. May your day be filled with happiness and wonder! 🎈"
            ],
            inspirational: [
                "Happy Birthday! You can be anything you want to be! Dream big and reach for the stars! 🌟",
                "Another year of growing and learning! Happy Birthday! May you achieve amazing things! 🚀",
                "Happy Birthday! You're brave, smart, and capable of anything! Keep shining bright! ✨"
            ],
            playful: [
                "Happy Birthday! Time for balloons, presents, games, and the best party ever! Let's celebrate! 🎊",
                "Yay! It's your special day! Get ready for fun, cake, and all your favorite things! 🎉",
                "Happy Birthday! Let's play, laugh, and make this the most fun birthday ever! 🎈"
            ],
            professional: [
                "Wishing you a very happy birthday! May your day be filled with joy, fun, and wonderful surprises!",
                "Happy Birthday! Hope you have an amazing celebration with family and friends!",
                "Warmest birthday wishes! May your special day be magical and memorable!"
            ],
            romantic: [
                "Happy Birthday, little one! You're loved more than you know! Have the sweetest day ever! 💕",
                "To our precious child, happy birthday! You fill our hearts with love every day! 💖",
                "Happy Birthday! You're our little treasure and we love you to the moon and back! 🌹"
            ]
        },
        parent: {
            funny: [
                "Happy Birthday! Thanks for not grounding me today! 😄 You're the best parent ever! Let's celebrate! 🎉",
                "Happy Birthday! You're not old, you're vintage! Thanks for being awesome! 🎂",
                "Another year of being the coolest parent! Happy Birthday! Love you lots! 💕"
            ],
            heartfelt: [
                "Happy Birthday! Thank you for your endless love, support, and guidance. You mean everything to me. 💝",
                "Wishing the most wonderful parent a very happy birthday! Your love has shaped who I am. Thank you for everything. 🌟",
                "Happy Birthday! Words can't express how grateful I am for you. May your day be as special as you are. 🎈"
            ],
            inspirational: [
                "Happy Birthday! Your strength and wisdom inspire me every day. May this year bring you joy and fulfillment! 🌟",
                "To my amazing parent, happy birthday! You've taught me to dream big and work hard. Thank you! 🚀",
                "Happy Birthday! Your love and guidance light my path. Wishing you a year of happiness and health! ✨"
            ],
            playful: [
                "Happy Birthday! Time to celebrate the world's greatest parent with cake and fun! 🎊",
                "Yay! It's your birthday! Let's make it special with family, love, and lots of smiles! 🎉",
                "Happy Birthday! Ready for a day of celebration and being spoiled for once? You deserve it! 🎈"
            ],
};


// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close modal when clicking outside
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Close buttons
document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
        const modal = btn.closest('.modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Template selection
document.querySelectorAll('.template-option').forEach(option => {
    option.addEventListener('click', () => {
        const parent = option.parentElement;
        parent.querySelectorAll('.template-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        option.classList.add('selected');
    });
});
