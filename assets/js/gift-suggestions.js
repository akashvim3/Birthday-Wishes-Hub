// ===== Gift Suggestions Functionality =====
const giftFinderForm = document.getElementById('giftFinderForm');
const budgetSlider = document.getElementById('budgetSlider');
const budgetValue = document.getElementById('budgetValue');
const giftResults = document.getElementById('giftResults');
const giftsGrid = document.getElementById('giftsGrid');

// Update budget display
budgetSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    budgetValue.textContent = value >= 500 ? '$500+' : `$${value}`;
});

// Gift Database (organized by interests)
const giftDatabase = {
    technology: [
        { name: 'Wireless Earbuds', price: 79, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', rating: 4.8, category: 'technology' },
        { name: 'Smart Watch', price: 199, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop', rating: 4.7, category: 'technology' },
        { name: 'Portable Charger', price: 35, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop', rating: 4.6, category: 'technology' },
        { name: 'Bluetooth Speaker', price: 89, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop', rating: 4.9, category: 'technology' }
    ],
    reading: [
        { name: 'Kindle E-Reader', price: 139, image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=300&fit=crop', rating: 4.8, category: 'reading' },
        { name: 'Book Subscription Box', price: 29, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=300&fit=crop', rating: 4.7, category: 'reading' },
        { name: 'Reading Light', price: 25, image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=300&h=300&fit=crop', rating: 4.5, category: 'reading' },
        { name: 'Personalized Bookmark Set', price: 18, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=300&fit=crop', rating: 4.6, category: 'reading' }
    ],
    sports: [
        { name: 'Yoga Mat Set', price: 45, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop', rating: 4.7, category: 'sports' },
        { name: 'Fitness Tracker', price: 99, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=300&h=300&fit=crop', rating: 4.8, category: 'sports' },
        { name: 'Water Bottle', price: 28, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop', rating: 4.6, category: 'sports' },
        { name: 'Resistance Bands Set', price: 32, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=300&h=300&fit=crop', rating: 4.7, category: 'sports' }
    ],
    cooking: [
        { name: 'Air Fryer', price: 129, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?w=300&h=300&fit=crop', rating: 4.9, category: 'cooking' },
        { name: 'Chef Knife Set', price: 89, image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=300&h=300&fit=crop', rating: 4.8, category: 'cooking' },
        { name: 'Cookbook Collection', price: 45, image: 'https://images.unsplash.com/photo-1589227365533-cee0a5fa1798?w=300&h=300&fit=crop', rating: 4.7, category: 'cooking' },
        { name: 'Spice Rack Set', price: 35, image: 'https://images.unsplash.com/photo-1596040033229-a0b44d4c6eb8?w=300&h=300&fit=crop', rating: 4.6, category: 'cooking' }
    ],
    art: [
        { name: 'Art Supply Kit', price: 75, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop', rating: 4.8, category: 'art' },
        { name: 'Adult Coloring Books', price: 22, image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=300&h=300&fit=crop', rating: 4.6, category: 'art' },
        { name: 'Watercolor Set', price: 48, image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300&h=300&fit=crop', rating: 4.7, category: 'art' },
        { name: 'Easel Stand', price: 65, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300&h=300&fit=crop', rating: 4.5, category: 'art' }
    ],
    fashion: [
        { name: 'Designer Wallet', price: 120, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop', rating: 4.8, category: 'fashion' },
        { name: 'Luxury Scarf', price: 85, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=300&fit=crop', rating: 4.7, category: 'fashion' },
        { name: 'Sunglasses', price: 95, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop', rating: 4.6, category: 'fashion' },
        { name: 'Watch', price: 175, image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop', rating: 4.9, category: 'fashion' }
    ],
    music: [
        { name: 'Wireless Headphones', price: 149, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop', rating: 4.9, category: 'music' },
        { name: 'Vinyl Record Player', price: 199, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300&h=300&fit=crop', rating: 4.8, category: 'music' },
        { name: 'Concert Tickets', price: 125, image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&h=300&fit=crop', rating: 5.0, category: 'music' },
        { name: 'Music Subscription', price: 99, image: 'https://images.unsplash.com/photo-1611339555312-e607c8352fd7?w=300&h=300&fit=crop', rating: 4.7, category: 'music' }
    ]
};

// Generate Gift Recommendations
giftFinderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const budget = parseInt(budgetSlider.value);
    const selectedInterests = Array.from(document.querySelectorAll('.interest-tags input:checked'))
        .map(input => input.value);

    if (selectedInterests.length === 0) {
        alert('Please select at least one interest!');
        return;
    }

    // Gather gifts based on interests
    let recommendedGifts = [];
    selectedInterests.forEach(interest => {
        if (giftDatabase[interest]) {
            recommendedGifts = recommendedGifts.concat(giftDatabase[interest]);
        }
    });

    // Filter by budget
    recommendedGifts = recommendedGifts.filter(gift => gift.price <= budget);

    // Sort by rating
    recommendedGifts.sort((a, b) => b.rating - a.rating);

    // Display results
    displayGiftResults(recommendedGifts);
});

function displayGiftResults(gifts) {
    giftResults.style.display = 'block';
    giftsGrid.innerHTML = '';

    if (gifts.length === 0) {
        giftsGrid.innerHTML = '<p class="no-results">No gifts found matching your criteria. Try adjusting your budget or interests.</p>';
        return;
    }

    gifts.forEach(gift => {
        const giftCard = document.createElement('div');
        giftCard.className = 'gift-card';
        giftCard.innerHTML = `
            <img src="${gift.image}" alt="${gift.name}">
            <div class="gift-card-body">
                <h4>${gift.name}</h4>
                <div class="gift-rating">
                    ${generateStars(gift.rating)}
                    <span>${gift.rating}</span>
                </div>
                <p class="gift-price">$${gift.price}</p>
                <button class="btn btn-primary btn-small">
                    <i class="fas fa-shopping-cart"></i> View Details
                </button>
            </div>
        `;
        giftsGrid.appendChild(giftCard);
    });

    // Scroll to results
    giftResults.scrollIntoView({ behavior: 'smooth' });
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }

    return stars;
}

// Age Tab Switching
const ageTabs = document.querySelectorAll('.age-tab');
ageTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        ageTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        // In a real app, you'd load different content here
    });
});
