// Load Schools Functionality
async function loadSchools() {
    try {
        // Fetch the list of schools from the API endpoint
        const response = await fetch('http://localhost:3000/api/listSchools?latitude=28.61&longitude=77.20');
        
        // Check if the response is valid
        if (!response.ok) {
            throw new Error('Failed to load schools');
        }

        const schools = await response.json();
        
        // Get the table body element where the schools will be listed
        const tableBody = document.getElementById('schoolsTable').querySelector('tbody');
        
        // Clear any existing rows in the table
        tableBody.innerHTML = '';

        // Loop through the schools array and create table rows for each school
        schools.forEach(school => {
            // Ensure that the distance is a valid number and fallback to 0 if not
            const distance = (typeof school.distance === 'number' && !isNaN(school.distance)) ? school.distance : 0;

            // Create a new table row
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${school.id}</td>
                <td>${school.name}</td>
                <td>${school.address}</td>
                <td>${school.latitude}</td>
                <td>${school.longitude}</td>
                <td>${parseFloat(distance.toFixed(2))} km</td>
            `;
            
            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading schools:', error);
        // Display a message if the API request fails
        alert('There was an error loading the schools. Please try again later.');
    }
}

// Load the list of schools when the page loads
window.onload = loadSchools;