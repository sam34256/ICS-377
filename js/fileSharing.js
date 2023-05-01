const people = ['John Doe', 'Jane Smith', 'Mark Johnson', 'Sarah Thompson', 'David Lee'];

// Function to search for people
function search() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // Clear the search results
  searchResults.innerHTML = '';

  // Filter the list of people based on the search query
  const query = searchInput.value.toLowerCase();
  const matchingPeople = people.filter(person => person.toLowerCase().includes(query));

  // Add the matching people to the search results
  for (let i = 0; i < matchingPeople.length; i++) {
    const person = matchingPeople[i];
    const li = document.createElement('li');
    li.innerHTML = person;
    li.addEventListener('click', () => {
      // Populate the "from" input field with the selected person's name
      const shareFromInput = document.getElementById('share-from-input');
      shareFromInput.value = person;
    });
    searchResults.appendChild(li);
  }
}

// Function to share files with selected people
function share() {
  const selectedFiles = document.getElementById('file-upload').files;

  // Get the list of people to share with
  const shareToList = document.getElementById('share-to-list');

  // Loop through the list of people and get the selected ones
  const selectedPeople = [];
  const shareToListItems = shareToList.getElementsByTagName('li');
  for (let i = 0; i < shareToListItems.length; i++) {
    const item = shareToListItems[i];
    if (item.classList.contains('selected')) {
      selectedPeople.push(item.innerHTML);
    }
  }

  // Get the share from input value
  const shareFromInput = document.getElementById('share-from-input');
  const shareFrom = shareFromInput.value;

  // Alert the selected people and share from information
  alert(`Shared with: ${selectedPeople.join(', ')}\nShared from: ${shareFrom}`);
}
