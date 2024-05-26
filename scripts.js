function showPopup(chartType) {
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    const ctx = document.createElement('canvas');
    ctx.id = 'chart';
    document.getElementById('chartContainer').appendChild(ctx);
    renderChart(chartType);
}

function hidePopup(event) {
    const popup = document.getElementById('popup');
    if (event.target === popup || event.target.classList.contains('popup-close')) {
        popup.style.display = 'none';
        const chartCanvas = document.getElementById('chart');
        if (chartCanvas) {
            chartCanvas.remove();
        }
    }
}

function renderChart(chartType) {
    const ctx = document.getElementById('chart').getContext('2d');
    const data = {
        labels: ['Active', 'Inactive'],
        datasets: [{
            label: 'Customer Status',
            data: [10, 5], // Example data, replace with actual data
            backgroundColor: ['green', 'red']
        }]
    };
    const config = {
        type: chartType,
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    enabled: true
                }
            }
        },
    };
    new Chart(ctx, config);
}

function openEditPopup(button) {
    const row = button.closest('tr');
    const userId = row.cells[0].innerText;
    const name = row.cells[1].innerText;
    const email = row.cells[2].innerText;
    const phone = row.cells[3].innerText;
    const status = row.cells[4].innerText.trim();

    document.getElementById('editUserId').value = userId;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPhone').value = phone;
    document.getElementById('editStatus').value = status;

    const editPopup = document.getElementById('editPopup');
    editPopup.style.display = 'flex';
}

function hideEditPopup() {
    const editPopup = document.getElementById('editPopup');
    editPopup.style.display = 'none';
}

function saveUser() {
    const userId = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const phone = document.getElementById('editPhone').value;
    const status = document.getElementById('editStatus').value;

    const rows = document.querySelectorAll('#userTable tr');
    rows.forEach(row => {
        if (row.cells[0].innerText === userId) {
            row.cells[1].innerText = name;
            row.cells[2].innerText = email;
            row.cells[3].innerText = phone;
            row.cells[4].innerText = status;
            row.cells[4].className = status === 'Active' ? 'status-active' : 'status-inactive';
        }
    });

    hideEditPopup();
}

document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', () => {
        openEditPopup(button);
    });
});

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', () => {
        // Logic for delete button
        alert('Delete button clicked!');
    });
});
