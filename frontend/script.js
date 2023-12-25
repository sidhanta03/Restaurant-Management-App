

function addRestaurant() {
  // Get form values
  var restaurantName = document.getElementById('restaurantName').value;
  var cuisine = document.getElementById('cuisine').value;
  var address = document.getElementById('address').value;
  var city = document.getElementById('city').value;
  var rating = document.getElementById('rating').value;


  // Check if any field is empty
  if (!restaurantName || !cuisine || !address || !city || !rating) {
    alert("Please fill in all fields.");
    return;
  }

  // Create a restaurant object
  var restaurant = {
      name: restaurantName,
      cuisine: cuisine,
      address: address,
      city: city,
      rating: rating
  };

 
  var restaurantList = JSON.parse(localStorage.getItem('restaurantList')) || [];

  // Add the new restaurant to the list
  restaurantList.push(restaurant);

  // Save the updated restaurant list back to localStorage
  localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

  // Redirect to the restaurant list page
  window.location.href = 'restaurant.html';
}



// Retrieve restaurant list from localStorage
var restaurantList = JSON.parse(localStorage.getItem('restaurantList')) || [];

function displayRestaurants(restaurants) {
// Display each restaurant as a card on the page
var restaurantListContainer = document.getElementById('restaurantList');



  restaurantListContainer.innerHTML = ''; 


restaurants.forEach(function (restaurant,index) {
  var listItem = document.createElement('li');
  listItem.className = 'list-group-item'; 

  // Populate list group item content with restaurant details
  listItem.innerHTML = `
      
        <div class="card-body">
            <h5 class="card-title">${restaurant.name}</h5>
            <p class="card-text">Cuisine: ${restaurant.cuisine}</p>
            <p class="card-text">Address: ${restaurant.address}, ${restaurant.city}</p>
            <p class="card-text">Rating: ${restaurant.rating}</p>

            <!-- Buttons for view, delete, and update -->
            <button class="btn btn-primary" onclick="viewRestaurant(${index})">View</button>
            <button class="btn btn-danger" onclick="deleteRestaurant(${index})">Delete</button>
            <button class="btn btn-warning" onclick="updateRestaurant(${index})">Update</button>

        </div>
    `;


         
    // Append the list group item to the container
    restaurantListContainer.appendChild(listItem);
});
}



displayRestaurants(restaurantList);

// ...

// Delete Restaurant function
function deleteRestaurant(index) {
  // Remove the restaurant from the list
  restaurantList.splice(index, 1);

  // Save the updated restaurant list back to localStorage
  localStorage.setItem('restaurantList', JSON.stringify(restaurantList));

  
  location.reload();
}

// Update Restaurant function
function updateRestaurant(index) {
  // Retrieve the restaurant from the list
  var restaurant = restaurantList[index];

  // Save the selected restaurant index and data to sessionStorage
  sessionStorage.setItem('selectedRestaurantIndex', index);
  sessionStorage.setItem('selectedRestaurantData', JSON.stringify(restaurant));

  // Redirect to the update page
  window.location.href = 'update-resturant.html';
}


// View Restaurant function
function viewRestaurant(index) {
  // Retrieve the restaurant from the list
  var restaurant = restaurantList[index];

  // Save the selected restaurant index and data to sessionStorage
  sessionStorage.setItem('selectedRestaurantIndex', index);
  sessionStorage.setItem('selectedRestaurantData', JSON.stringify(restaurant));

  // Redirect to the view page
  window.location.href = 'view.html';
}



// Function to sort and display restaurants
function sortAndDisplayRestaurants(restaurants) {
  displayRestaurants(restaurants);
}

// Function to filter restaurants based on cuisine
function filterRestaurants() {
  var cuisineFilter = document.getElementById('cuisineFilter').value.toLowerCase();

  // Retrieve restaurant list from localStorage
  var restaurantList = JSON.parse(localStorage.getItem('restaurantList')) || [];

  var filteredList = (cuisineFilter === 'all') ? restaurantList : restaurantList.filter(function (restaurant) {
    return restaurant.cuisine.toLowerCase() === cuisineFilter;
  });

  sortAndDisplayRestaurants(filteredList);
}




// Function to sort restaurants based on name or rating
function sortRestaurants() {
  var sortOrder = document.getElementById('sortOrder').value;

  // Retrieve restaurant list from localStorage
  var restaurantList = JSON.parse(localStorage.getItem('restaurantList')) || [];

  var sortedList = restaurantList.slice(); 

  if (sortOrder === 'name') {
    sortedList.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortOrder === 'rating') {
    sortedList.sort(function (a, b) {
      return b.rating - a.rating;
    });
  }

  sortAndDisplayRestaurants(sortedList);
}
