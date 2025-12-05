// ===== Birthday Calendar Functionality =====
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let birthdays = JSON.parse(localStorage.getItem('birthdays')) || [];

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

const currentMonthElement = document.getElementById('currentMonth');
const calendarDaysElement = document.getElementById('calendarDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const addBirthdayBtn = document.getElementById('addBirthdayBtn');
const addBirthdayModal = document.getElementById('addBirthdayModal');
const closeModal = document.getElementById('closeModal');
const birthdayForm = document.getElementById('birthdayForm');

// Sample birthdays (for demo)
if (birthdays.length === 0) {
    birthdays = [
        { name: 'John Doe', date: '2025-11-08', year: 1997, relation: 'friend', reminder: 1 },
        { name: 'Sarah Evans', date: '2025-11-09', year: 1993, relation: 'friend', reminder: 1 },
        { name: 'Mike Lopez', date: '2025-11-12', year: 2000, relation: 'colleague', reminder: 3 },
        { name: 'Emma Johnson', date: '2025-11-15', year: 1995, relation: 'family', reminder: 7 }
    ];
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Render Calendar
function renderCalendar() {
    currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    calendarDaysElement.innerHTML = '';

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarDaysElement.appendChild(emptyCell);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;

        const cellDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        // Check if it's today
        if (cellDate.toDateString() === today.toDateString()) {
            dayCell.classList.add('today');
        }

        // Check for birthdays
        const dateString = cellDate.toISOString().split('T')[0];
        const hasBirthday = birthdays.some(b => {
            const bDate = new Date(b.date);
            return bDate.getMonth() === currentMonth &&
                   bDate.getDate() === day;
        });

        if (hasBirthday) {
            dayCell.classList.add('has-birthday');
            const bdayIcon = document.createElement('i');
            bdayIcon.className = 'fas fa-birthday-cake';
            dayCell.appendChild(bdayIcon);
        }

        dayCell.addEventListener('click', () => showDayDetails(day));

        calendarDaysElement.appendChild(dayCell);
    }
}

// Show Day Details
function showDayDetails(day) {
    const dateString = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    const dayBirthdays = birthdays.filter(b => {
        const bDate = new Date(b.date);
        return bDate.getMonth() === currentMonth && bDate.getDate() === day;
    });

    if (dayBirthdays.length > 0) {
        let message = `Birthdays on ${monthNames[currentMonth]} ${day}:

`;
        dayBirthdays.forEach(b => {
            const age = currentYear - (b.year || 2000);
            message += `🎂 ${b.name} (${age} years old)
`;
        });
        alert(message);
    }
}

// Navigation
prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
});

// Modal Controls
addBirthdayBtn.addEventListener('click', () => {
    addBirthdayModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    addBirthdayModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === addBirthdayModal) {
        addBirthdayModal.style.display = 'none';
    }
});

// Add Birthday Form
birthdayForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newBirthday = {
        name: document.getElementById('bdayName').value,
        date: document.getElementById('bdayDate').value,
        year: document.getElementById('bdayYear').value || null,
        relation: document.getElementById('bdayRelation').value,
        reminder: parseInt(document.getElementById('bdayReminder').value),
        notes: document.getElementById('bdayNotes').value
    };

    birthdays.push(newBirthday);
    localStorage.setItem('birthdays', JSON.stringify(birthdays));

    birthdayForm.reset();
    addBirthdayModal.style.display = 'none';

    alert(`Birthday added for ${newBirthday.name}! 🎉`);
    renderCalendar();
    updateUpcomingList();
});

// Update Upcoming Birthdays List
function updateUpcomingList() {
    const today = new Date();
    const upcoming = birthdays
        .map(b => {
            const bDate = new Date(b.date);
            bDate.setFullYear(today.getFullYear());
            if (bDate < today) {
                bDate.setFullYear(today.getFullYear() + 1);
            }
            const daysUntil = Math.ceil((bDate - today) / (1000 * 60 * 60 * 24));
            return { ...b, daysUntil, date: bDate };
        })
        .sort((a, b) => a.daysUntil - b.daysUntil)
        .slice(0, 4);

    const upcomingList = document.getElementById('upcomingList');
    upcomingList.innerHTML = '';

    upcoming.forEach(b => {
        const item = document.createElement('div');
        item.className = 'birthday-item';
        if (b.daysUntil === 0) item.classList.add('today');
        if (b.daysUntil === 1) item.classList.add('tomorrow');

        const initials = b.name.split(' ').map(n => n[0]).join('');
        const age = b.year ? (new Date().getFullYear() - b.year) : '?';

        let dateText = '';
        if (b.daysUntil === 0) dateText = 'Today';
        else if (b.daysUntil === 1) dateText = 'Tomorrow';
        else dateText = monthNames[b.date.getMonth()] + ' ' + b.date.getDate();

        item.innerHTML = `
            <div class="birthday-avatar">${initials}</div>
            <div class="birthday-info">
                <h4>${b.name}</h4>
                <p><i class="fas fa-calendar"></i> ${dateText}</p>
                <span class="age-badge">Turns ${age}</span>
            </div>
            <button class="wish-btn"><i class="fas fa-gift"></i></button>
        `;

        upcomingList.appendChild(item);
    });
}

// Initialize
renderCalendar();
updateUpcomingList();
