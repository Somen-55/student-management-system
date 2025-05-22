// Add School Functionality
document.getElementById('schoolForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const name = document.getElementById('schoolName').value;
    const address = document.getElementById('schoolAddress').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);

    const response = await fetch('http://localhost:3000/api/addSchool', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, address, latitude, longitude })
    });

    const result = await response.json();
    if (result.message) {
        alert('School added successfully!');
        loadSchools(); // Reload schools list after adding a new school
    }
});

// Load Schools Functionality
async function loadSchools() {
    const response = await fetch('http://localhost:3000/api/listSchools?latitude=28.61&longitude=77.20');
    const schools = await response.json();
    console.log(schools);
    const tableBody = document.getElementById('schoolsTable').querySelector('tbody');
    tableBody.innerHTML = '';

    schools.forEach(school => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${school.id}</td>
            <td>${school.name}</td>
            <td>${school.address}</td>
            <td>${school.latitude}</td>
            <td>${school.longitude}</td>
            <td>${school.distance.toFixed(2)} km</td>
        `;
        tableBody.appendChild(row);
    });
}

// Load the list of schools when the page loads
window.onload = loadSchools;