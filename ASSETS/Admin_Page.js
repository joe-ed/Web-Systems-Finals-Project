// Update main header dynamically
const navLinks = document.querySelectorAll('.nav-link');
const mainHeader = document.getElementById('mainHeader');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const headerText = link.getAttribute('data-header');
    mainHeader.textContent = headerText;
  });
});

// Dashboard tab switching
const tabs = document.querySelectorAll('.dashboard-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const target = tab.getAttribute('data-tab');
    tabContents.forEach(content => {
      content.style.display = content.id === target ? 'block' : 'none';
    });
  });
});
