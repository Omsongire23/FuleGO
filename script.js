// Pricing Configuration
const fuelPrices = {
    petrol: 100, // per liter
    diesel: 90,  // per liter
    cng: 75      // per kg
};

// DOM Elements
const fuelTypeSelect = document.getElementById('fuelType');
const quantityInput = document.getElementById('quantity');
const quantityValue = document.getElementById('quantityValue');
const unitLabel = document.getElementById('unitLabel');
const totalPriceDisplay = document.getElementById('totalPrice');
const orderForm = document.getElementById('orderForm');
const successMessage = document.getElementById('successMessage');

// Initial calculation
calculatePrice();

// Event Listeners
if (fuelTypeSelect) {
    fuelTypeSelect.addEventListener('change', () => {
        // Update unit label
        if (fuelTypeSelect.value === 'cng') {
            unitLabel.textContent = 'Kg';
            quantityInput.max = 50; // max 50kg for CNG
            if (quantityInput.value > 50) {
                quantityInput.value = 50;
                updateQuantity();
            }
        } else {
            unitLabel.textContent = 'Liters';
            quantityInput.max = 100; // max 100L for liquid fuels
        }
        calculatePrice();
    });
}

// Calculate and format price
function calculatePrice() {
    if (!fuelTypeSelect || !quantityInput || !totalPriceDisplay) return;
    
    const selectedFuel = fuelTypeSelect.value;
    const quantity = parseFloat(quantityInput.value);
    
    if (!selectedFuel) {
        totalPriceDisplay.textContent = '₹0.00';
        return;
    }

    const pricePerUnit = fuelPrices[selectedFuel];
    const total = pricePerUnit * quantity;
    
    totalPriceDisplay.textContent = `₹${total.toFixed(2)}`;
}

// Update quantity display
window.updateQuantity = function() {
    if (quantityValue && quantityInput) {
        quantityValue.textContent = quantityInput.value;
        calculatePrice();
    }
};

// Handle Form Submission
if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate API call / order processing
        const btn = orderForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'Processing...';
        btn.disabled = true;
        
        setTimeout(() => {
            // Hide form, show success message
            orderForm.classList.add('hidden');
            if (successMessage) successMessage.classList.remove('hidden');
            
            // Reset button state
            btn.textContent = originalText;
            btn.disabled = false;
            
            // Clear inputs except quantity slider
            const locationInput = document.getElementById('location');
            const vehicleInput = document.getElementById('vehicle');
            if(locationInput) locationInput.value = '';
            if(vehicleInput) vehicleInput.value = '';
        }, 1500);
    });
}

// Reset form to place another order
window.resetForm = function() {
    if (successMessage && orderForm) {
        successMessage.classList.add('hidden');
        orderForm.classList.remove('hidden');
        if (fuelTypeSelect) fuelTypeSelect.value = '';
        calculatePrice();
    }
};

// --- Login & Authentication Logic ---
const loginModal = document.getElementById('loginModal');
const loginForm = document.getElementById('loginForm');
const signupModal = document.getElementById('signupModal');
const signupForm = document.getElementById('signupForm');
const navLoginBtn = document.getElementById('navLoginBtn');
const navSignupBtn = document.getElementById('navSignupBtn');
const navLogoutBtn = document.getElementById('navLogoutBtn');
const orderSection = document.getElementById('order');
const getStartedBtn = document.getElementById('getStartedBtn');

// Open modal
if (navLoginBtn) {
    navLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });
}

if (navSignupBtn) {
    navSignupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if(signupModal) signupModal.classList.remove('hidden');
    });
}

// Open modal from Get Started button if not logged in
if (getStartedBtn) {
    getStartedBtn.addEventListener('click', (e) => {
        if(orderSection.classList.contains('hidden')) {
            e.preventDefault();
            loginModal.classList.remove('hidden');
        }
    });
}

// Close modals
const closeBtns = document.querySelectorAll('.close-btn');
closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        if(loginModal) loginModal.classList.add('hidden');
        if(signupModal) signupModal.classList.add('hidden');
    });
});

// Handle Login Form Submission
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate successful login
        loginModal.classList.add('hidden');
        navLoginBtn.classList.add('hidden');
        navSignupBtn.classList.add('hidden');
        navLogoutBtn.classList.remove('hidden');
        
        // Reveal the order section
        orderSection.classList.remove('hidden');
        
        // Scroll down to the order section smoothly
        setTimeout(() => {
            orderSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
}

// Handle Logout
if (navLogoutBtn) {
    navLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navLogoutBtn.classList.add('hidden');
        navLoginBtn.classList.remove('hidden');
        navSignupBtn.classList.remove('hidden');
        orderSection.classList.add('hidden');
        
        // Reset the order form if they were logged in
        window.resetForm();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Handle Signup Form Submission
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate successful signup
        if(signupModal) signupModal.classList.add('hidden');
        if(navLoginBtn) navLoginBtn.classList.add('hidden');
        if(navSignupBtn) navSignupBtn.classList.add('hidden');
        if(navLogoutBtn) navLogoutBtn.classList.remove('hidden');
        
        // Reveal the order section
        if(orderSection) orderSection.classList.remove('hidden');
        
        // Scroll down to the order section smoothly
        setTimeout(() => {
            if(orderSection) orderSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    });
}

// Smooth scrolling for all anchor links (like Browse Stations)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if(this.getAttribute('href') !== '#') {
            const targetId = this.getAttribute('href');
            if (targetId === '#order' && orderSection && orderSection.classList.contains('hidden')) {
                // If order section is hidden, don't scroll to it (modal handles it)
                return;
            }
            const target = document.querySelector(targetId);
            if(target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// --- Search Bar Functionality ---
const stationSearch = document.getElementById('stationSearch');
const stationsSection = document.getElementById('stations');
const stationCards = document.querySelectorAll('.station-card');

if (stationSearch) {
    stationSearch.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        // Scroll to stations section if they start typing and it's visible
        if (query.length === 1 && stationsSection) {
            stationsSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Filter stations
        let hasVisible = false;
        stationCards.forEach(card => {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(query)) {
                card.style.display = 'block';
                hasVisible = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Handle empty state (optional but good practice)
        let emptyState = document.getElementById('emptySearchState');
        if (!hasVisible && query.length > 0) {
            if (!emptyState) {
                emptyState = document.createElement('p');
                emptyState.id = 'emptySearchState';
                emptyState.style.textAlign = 'center';
                emptyState.style.gridColumn = '1 / -1';
                emptyState.style.color = '#64748b';
                emptyState.style.padding = '40px 0';
                emptyState.textContent = 'No stations found matching your search.';
                document.querySelector('.stations-grid').appendChild(emptyState);
            }
            emptyState.style.display = 'block';
        } else if (emptyState) {
            emptyState.style.display = 'none';
        }
    });
}
