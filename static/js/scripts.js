// Dark Mode Toggle
const toggleButton = document.createElement('button');
toggleButton.className = 'dark-mode-toggle';
toggleButton.innerHTML = '🌓 Switch';  // Correct dark mode symbol
document.body.appendChild(toggleButton);

const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
};

const darkMode = localStorage.getItem('darkMode');
if (darkMode === 'enabled') enableDarkMode();

toggleButton.addEventListener('click', () => {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});

// Feedback Form Handling (Local Storage)
const feedbackForm = document.querySelector('#feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form input values
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const feedback = document.querySelector('#feedback').value;

        // Create feedback object with a timestamp
        const feedbackData = { name, email, feedback, date: new Date().toLocaleString() };

        // Retrieve existing feedback list from localStorage, or initialize an empty array if none exists
        let feedbackList = JSON.parse(localStorage.getItem('feedbackList')) || [];
        feedbackList.push(feedbackData); // Add new feedback
        localStorage.setItem('feedbackList', JSON.stringify(feedbackList)); // Save back to localStorage

        // Provide success message and reset form
        alert('Thank you for your feedback!');
        feedbackForm.reset();
    });
}

// Display Festivals on Calendar
const festivalsData = [
    { name: 'Lohri', date: '2025-01-13', image: 'https://www.hindustantimes.com/ht-img/img/2024/01/10/1600x900/Delhi-residents-are-set-to-celebrate-Lohri-dancing_1673612444097_1704878438455.jpg' },
    { name: 'Pongal', date: '2025-01-14', image: 'https://static.toiimg.com/thumb/msid-73202857,width-400,resizemode-4/73202857.jpg' },
    { name: 'Makar Sankranti', date: '2025-01-14', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiKSBzpvhyw819HmME1v21ThDHWXDh5cjp5w&s' },
    { name: 'Republic Day', date: '2025-01-26', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8owsyPn62-Px6zCU-TuGg-rpX6ZJTczAFIQ&s' },
    { name: 'Mewari New Year', date: '2025-03-23', image: 'https://images.moneycontrol.com/static-mcnews/2025/01/20250101025320_5-am.png?impolicy=website&width=770&height=431' },
    { name: 'Holi', date: '2025-03-25', image: 'https://c.files.bbci.co.uk/7C71/production/_128875813_holiepa.jpg' },
    { name: 'Ugadi', date: '2025-04-04', image: 'https://mangalfashions.com/cdn/shop/articles/How-to-celebrate-Ugadi-the-traditional-way-Mangal-Fashions-Indian-Home-Decor-and-Craft-456.jpg?v=1681732022' },
    { name: 'Eid', date: '2025-04-10', image: 'https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/04/PTI06_29_2_1712735287-2-scaled.jpg?size=*:900' },
    { name: 'Baisakhi', date: '2025-04-13', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEjFJFMPAPn0dYyZB4wQtcRNXSlsKeX7hd_Q&s' },
    { name: 'Buddha Purnima', date: '2025-05-23', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnBnUsF70qt_mLVhKwRUtyRazx2eEzPOyd2A&s' },
    { name: 'Independence Day', date: '2025-08-15', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/A_still_of_Red_Fort%2C_during_the_62nd_Independence_Day_celebrations%2C_in_Delhi_on_August_15%2C_2008.jpg/800px-A_still_of_Red_Fort%2C_during_the_62nd_Independence_Day_celebrations%2C_in_Delhi_on_August_15%2C_2008.jpg' },
    { name: 'Raksha Bandhan', date: '2025-08-19', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiKSBzpvhyw819HmME1v21ThDHWXDh5cjp5w&s' },
    { name: 'Onam', date: '2025-08-21', image: 'https://bsmedia.business-standard.com/_media/bs/img/misc/2015-08/28/full/1440742999-27081390.jpg?im=FeatureCrop,size=(826,465)' },
    { name: 'Janmashtami', date: '2025-08-29', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynmdQcA5fI3GQeRmb_mbMxPMi8HnqXzYAOA&s' },
    { name: 'Ganesha Chaturthi', date: '2025-09-07', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Lalbaugh_Ganesha.jpg/1200px-Lalbaugh_Ganesha.jpg' },
    { name: 'Mahalaya', date: '2025-09-15', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcFcA9VD7JChbbOOEK1ZaEFPDCsyrQIIqdpA&s' },
    { name: 'Navratri', date: '2025-09-28', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1GJLGZr-YinruQc3WkxsiWN1_GMR3wKv6w&s' },
    { name: 'Durga Puja', date: '2025-10-11', image: 'https://images.hindustantimes.com/img/2022/09/30/1600x900/durga_puja_1664502025274_1664502025551_1664502025551.jpg' },
    { name: 'Karva Chauth', date: '2025-10-19', image: 'https://cdn0.weddingwire.in/article/4644/3_2/1280/jpg/124464-karwa-chauth-2024.webp' },
    { name: 'Diwali', date: '2025-11-01', image: 'https://static.toiimg.com/thumb/msid-114654950,width-400,resizemode-4/114654950.jpg' },
    { name: 'Christmas', date: '2025-12-25', image: 'https://hips.hearstapps.com/hmg-prod/images/decorated-christmas-tree-near-fireplace-at-home-royalty-free-image-1731335629.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*' }
];



const calendarContainer = document.querySelector('#festival-calendar');

if (calendarContainer) {
    festivalsData.forEach(festival => {
        const festivalDate = new Date(festival.date);
        const festivalCard = document.createElement('div');
        festivalCard.className = 'col-md-4 mb-3'; // Bootstrap column for responsive layout
        festivalCard.innerHTML = `
            <div class="card">
                <img src="${festival.image}" class="card-img-top" alt="${festival.name}">
                <div class="card-body">
                    <h5 class="card-title">${festival.name}</h5>
                    <p class="card-text"><strong>Date:</strong> ${festivalDate.toDateString()}</p>
                </div>
            </div>
        `;
        calendarContainer.appendChild(festivalCard);
    });
}

// Navigation Highlight
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});
