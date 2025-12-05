// ===== Group Wishes Functionality =====
let groupCards = JSON.parse(localStorage.getItem('groupCards')) || [];

const createGroupCardBtn = document.getElementById('createGroupCard');
const createGroupModal = document.getElementById('createGroupModal');
const closeGroupModal = document.getElementById('closeGroupModal');
const groupCardForm = document.getElementById('groupCardForm');

// Initialize with sample data if empty
if (groupCards.length === 0) {
    groupCards = [
        {
            id: 1,
            recipient: "Michael Johnson",
            birthday: "2025-11-15",
            sendTime: "09:00",
            template: "classic",
            contributors: [
                { name: "Sarah A.", message: "Happy Birthday!" },
                { name: "John D.", message: "Wishing you the best!" },
                { name: "Emma M.", message: "Have an amazing day!" }
            ],
            status: "active",
            expectedContributors: 15,
            allowAnonymous: false
        }
    ];
    localStorage.setItem('groupCards', JSON.stringify(groupCards));
}

// Modal Controls
if (createGroupCardBtn) {
    createGroupCardBtn.addEventListener('click', () => {
        createGroupModal.style.display = 'flex';
    });
}

if (closeGroupModal) {
    closeGroupModal.addEventListener('click', () => {
        createGroupModal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === createGroupModal) {
        createGroupModal.style.display = 'none';
    }
});

// Template Selection
const templateOptions = document.querySelectorAll('.template-option');
templateOptions.forEach(option => {
    option.addEventListener('click', () => {
        templateOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
    });
});

// Create Group Card Form
if (groupCardForm) {
    groupCardForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const recipient = document.getElementById('groupRecipient').value;
        const birthday = document.getElementById('groupBirthday').value;
        const sendTime = document.getElementById('groupSendTime').value;
        const template = document.querySelector('.template-option.selected').getAttribute('data-template');
        const invites = document.getElementById('groupInvites').value;
        const expectedContributors = document.getElementById('expectedContributors').value;
        const allowAnonymous = document.getElementById('allowAnonymous').checked;
        const notifyContributors = document.getElementById('notifyContributors').checked;

        const newCard = {
            id: Date.now(),
            recipient,
            birthday,
            sendTime,
            template,
            contributors: [],
            status: 'pending',
            expectedContributors: parseInt(expectedContributors),
            allowAnonymous,
            notifyContributors,
            invites: invites.split(',').map(email => email.trim())
        };

        groupCards.push(newCard);
        localStorage.setItem('groupCards', JSON.stringify(groupCards));

        createGroupModal.style.display = 'none';
        groupCardForm.reset();

        alert(`Group card created for ${recipient}! Invitations will be sent. 🎉`);

        // Reload page to show new card
        location.reload();
    });
}

// Share/Invite functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.btn-primary') && e.target.textContent.includes('Invite')) {
        const shareText = 'Join me in creating a birthday wish!';
        const shareUrl = window.location.href;

        if (navigator.share) {
            navigator.share({
                title: 'Group Birthday Card',
                text: shareText,
                url: shareUrl
            }).catch(err => console.log('Error sharing:', err));
        } else {
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('Link copied to clipboard!'))
                .catch(err => console.log('Error copying:', err));
        }
    }
});
