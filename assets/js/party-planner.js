// ===== Party Planner Functionality =====
let partyPlans = JSON.parse(localStorage.getItem('partyPlans')) || [];

const createPartyBtn = document.getElementById('createPartyBtn');
const createPartyModal = document.getElementById('createPartyModal');
const closePartyModal = document.getElementById('closePartyModal');
const partyPlanForm = document.getElementById('partyPlanForm');

// Initialize with sample data
if (partyPlans.length === 0) {
    partyPlans = [
        {
            id: 1,
            name: "Sarah's 30th Birthday Bash",
            date: "2025-11-22",
            time: "14:00",
            venue: "Downtown Venue",
            guests: 45,
            budget: 1500,
            theme: "Elegant & Sophisticated",
            tasksCompleted: 13,
            tasksPending: 7,
            status: "upcoming"
        }
    ];
    localStorage.setItem('partyPlans', JSON.stringify(partyPlans));
}

// Modal Controls
if (createPartyBtn) {
    createPartyBtn.addEventListener('click', () => {
        createPartyModal.style.display = 'flex';
    });
}

if (closePartyModal) {
    closePartyModal.addEventListener('click', () => {
        createPartyModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === createPartyModal) {
        createPartyModal.style.display = 'none';
    }
});

// Create Party Plan Form
if (partyPlanForm) {
    partyPlanForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(partyPlanForm);
        const newPlan = {
            id: Date.now(),
            name: formData.get('partyName') || partyPlanForm.querySelector('input[type="text"]').value,
            date: partyPlanForm.querySelector('input[type="date"]').value,
            time: partyPlanForm.querySelector('input[type="time"]').value,
            venue: partyPlanForm.querySelectorAll('input[type="text"]')[1].value,
            guests: parseInt(partyPlanForm.querySelector('input[type="number"]').value),
            budget: parseInt(partyPlanForm.querySelectorAll('input[type="number"]')[1].value),
            theme: partyPlanForm.querySelector('select').value,
            tasksCompleted: 0,
            tasksPending: 20,
            status: "planning"
        };

        partyPlans.push(newPlan);
        localStorage.setItem('partyPlans', JSON.stringify(partyPlans));

        createPartyModal.style.display = 'none';
        partyPlanForm.reset();

        alert(`Party plan created: ${newPlan.name}! 🎉`);
        location.reload();
    });
}

// Budget Calculator
const budgetInputs = document.querySelectorAll('.budget-input');
const totalBudget = document.getElementById('totalBudget');

budgetInputs.forEach(input => {
    input.addEventListener('input', calculateTotal);
});

function calculateTotal() {
    let total = 0;
    budgetInputs.forEach(input => {
        total += parseFloat(input.value) || 0;
    });
    totalBudget.textContent = `$${total.toFixed(2)}`;
}

// Checklist functionality
const checklistItems = document.querySelectorAll('.checklist-items input[type="checkbox"]');
checklistItems.forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
        const label = e.target.parentElement;
        if (e.target.checked) {
            label.style.textDecoration = 'line-through';
            label.style.opacity = '0.6';
        } else {
            label.style.textDecoration = 'none';
            label.style.opacity = '1';
        }
    });
});

// Budget Chart (if canvas is available)
const budgetChart = document.getElementById('budgetChart');
if (budgetChart && typeof Chart !== 'undefined') {
    const ctx = budgetChart.getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Venue', 'Food', 'Decorations', 'Entertainment', 'Other'],
            datasets: [{
                data: [300, 450, 150, 200, 100],
                backgroundColor: [
                    '#667eea',
                    '#f093fb',
                    '#4facfe',
                    '#43e97b',
                    '#ffa500'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
