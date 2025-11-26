// Updated student_dashboard.js
document.addEventListener('DOMContentLoaded', function() {
  // Get user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('user'));
  
  if (!userData) {
    // Redirect to login if no user data
    window.location.href = '../FRONTEND/LogIn_Page.html';
    return;
  }

  // Populate student information with real data
  document.getElementById('student-id').textContent = userData.id_number;
  document.getElementById('student-name').textContent = `${userData.first_name} ${userData.middle_name} ${userData.last_name}`;
  document.getElementById('student-program').textContent = userData.course || 'Not specified';
  document.getElementById('student-year').textContent = userData.year ? `${userData.year} Year` : 'Not specified';
  
  // Set user name in header
  document.querySelector('.user-name').textContent = userData.first_name + ' ' + userData.last_name;

  // Load student activities
  loadStudentActivities(userData.id);
});

async function loadStudentActivities(studentId) {
  try {
    // This would be a real API call to get student activities
    const response = await fetch(`../System/BackEnd/Controller.php?method_finder=get_student_activities&student_id=${studentId}`);
    const activities = await response.json();
    
    updateActivitiesTable(activities);
  } catch (error) {
    console.error('Error loading activities:', error);
    // For demo, use sample data
    updateActivitiesTable(getSampleActivities());
  }
}

function updateActivitiesTable(activities) {
  const activitiesList = document.querySelector('.activities-list');
  if (!activitiesList) return;

  activitiesList.innerHTML = '';

  activities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.className = 'activity-item';
    activityItem.innerHTML = `
      <div class="activity-details">
        <h3 class="activity-title">${activity.title}</h3>
        <p class="activity-desc">${activity.description}</p>
        <span class="activity-due">${activity.due_date}</span>
      </div>
      <div class="activity-grade">
        <span class="grade-score ${activity.grade ? '' : 'pending'}">${activity.grade || '-'}</span>
      </div>
    `;
    activitiesList.appendChild(activityItem);
  });
}

function getSampleActivities() {
  return [
    {
      title: "Programming Assignment 1",
      description: "Basic Algorithms Implementation",
      due_date: "Due: Oct 15, 2023",
      grade: "9/10"
    },
    {
      title: "Database Design Project",
      description: "ER Diagram and Normalization",
      due_date: "Due: Oct 22, 2023",
      grade: "8/10"
    },
    {
      title: "Midterm Examination",
      description: "Chapters 1-5",
      due_date: "Completed: Oct 10, 2023",
      grade: "42/50"
    }
  ];
}

// ... (rest of the existing student dashboard JavaScript)

// DOM Elements
const userButton = document.querySelector('.user-button');
const dropdownMenu = document.querySelector('.dropdown-menu');
const logoutBtn = document.getElementById('logout-btn');

// Toggle dropdown menu
userButton.addEventListener('click', function(e) {
  e.stopPropagation();
  dropdownMenu.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', function() {
  dropdownMenu.classList.remove('show');
});

// Logout functionality
logoutBtn.addEventListener('click', function(e) {
  e.preventDefault();
  
  // Show confirmation dialog
  if (confirm('Are you sure you want to logout?')) {
    // In a real application, you would make an API call to logout
    // For now, we'll just redirect to the login page
    window.location.href = '../LogIn_Page.html';
  }
});

// Sample data - in a real application, this would come from an API
const studentData = {
  id: '2023-00123',
  name: 'John Michael Doe',
  program: 'BS Computer Science',
  year: '3rd Year'
};

// Populate student information
document.addEventListener('DOMContentLoaded', function() {
  // Set student info
  document.getElementById('student-id').textContent = studentData.id;
  document.getElementById('student-name').textContent = studentData.name;
  document.getElementById('student-program').textContent = studentData.program;
  document.getElementById('student-year').textContent = studentData.year;
  
  // Set user name in header
  document.querySelector('.user-name').textContent = studentData.name.split(' ')[0] + ' ' + studentData.name.split(' ')[2];
});

// Add animation to activity items when they come into view
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateX(0)';
    }
  });
}, observerOptions);

// Observe activity items for animation
document.querySelectorAll('.activity-item').forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(item);
});