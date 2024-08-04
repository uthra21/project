document.getElementById('fetchButton').addEventListener('click', fetchData);
document.getElementById('postButton').addEventListener('click', postData);
document.getElementById('putButton').addEventListener('click', putData);
document.getElementById('deleteButton').addEventListener('click', deleteData);

async function fetchData() {
    try {
        console.log('Fetching data from API...');
        const response = await fetch('http://localhost:8080/jerseyDemo4/webapi/cities/getCities/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('output').textContent = 'Error fetching data';
    }
}

async function postData() {
    const cityName = document.getElementById('postData').value;
    try {
        const response = await fetch('http://localhost:8080/jerseyDemo4/webapi/cities/addCity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cityName }) // Ensure the payload matches server expectations
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Post response:', result);
        fetchData(); // Refresh data
    } catch (error) {
        console.error('Error posting data:', error);
        document.getElementById('output').textContent = 'Error posting data';
    }
}


async function putData() {
    const id = document.getElementById('putId').value;
    const cityName = document.getElementById('putData').value;
    try {
        const response = await fetch(`http://localhost:8080/jerseyDemo4/webapi/cities/updateCity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cityName }) // Ensure the payload matches server expectations
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Put response:', result);
        fetchData(); // Refresh data
    } catch (error) {
        console.error('Error updating data:', error);
        document.getElementById('output').textContent = 'Error updating data';
    }
}


async function deleteData() {
    const id = document.getElementById('deleteId').value;
    console.log('ID to delete:', id);
    try {
        const response = await fetch(`http://localhost:8080/jerseyDemo4/webapi/cities/deletecities/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('Delete response:', result);
        fetchData(); // Refresh data
    } catch (error) {
        console.error('Error deleting data:', error);
        document.getElementById('output').textContent = 'Error deleting data';
    }
}

function displayData(data) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = '';

    // Assuming data is an array of objects
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.textContent = JSON.stringify(item, null, 2);
        outputDiv.appendChild(itemDiv);
    });
}
