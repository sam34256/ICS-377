// Get the search input element
const searchInput = document.querySelector('input[type="text"]');

// Add event listener to search input
searchInput.addEventListener('keyup', function() {
  // Get the search input value
  const searchValue = this.value.toLowerCase();

  // Get all employee cards
  const employeeCards = document.querySelectorAll('.employee-card');

  // Loop through employee cards
  employeeCards.forEach(function(card) {
    // Get the employee name from the card
    const employeeName = card.querySelector('.employee-info h2').textContent.toLowerCase();

    // Show/hide the card based on search input value
    if (employeeName.indexOf(searchValue) !== -1) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});
