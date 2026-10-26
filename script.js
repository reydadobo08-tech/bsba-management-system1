// Sample Transaction Data
const transactions = [
    { id: "2024-0012", name: "Maria Santos", type: "Tuition Fee Payment", details: "₱12,500.00", status: "Approved" },
    { id: "2024-0045", name: "Juan Dela Cruz", type: "Clearance Request", details: "Graduation Form", status: "Pending" },
    { id: "2024-0089", name: "Ana Reyes", type: "Lab Fee Deposit", details: "₱1,500.00", status: "Approved" },
    { id: "2024-0102", name: "Carlos Gomez", type: "Transcript Request", details: "Official Copy", status: "Pending" }
];

// Sample Room Data
const rooms = [
    { name: "BSBA Lab 101", capacity: "40 PCs", type: "Computer Lab", status: "Available" },
    { name: "Lecture Hall 202", capacity: "60 Seats", type: "Lecture Room", status: "Occupied" },
    { name: "Conference Room A", capacity: "20 Seats", type: "Meeting Room", status: "Available" }
];

const transactionTableBody = document.getElementById("transactionTableBody");
const searchTransaction = document.getElementById("searchTransaction");
const filterStatus = document.getElementById("filterStatus");
const roomGrid = document.getElementById("roomGrid");
const roomBookingForm = document.getElementById("roomBookingForm");
const bookingMessage = document.getElementById("bookingMessage");

// Render Transactions
function displayTransactions(data) {
    transactionTableBody.innerHTML = "";
    if (data.length === 0) {
        transactionTableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No transactions found.</td></tr>`;
        return;
    }

    data.forEach(tx => {
        const badgeClass = tx.status === "Approved" ? "badge-approved" : "badge-pending";
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${tx.id}</td>
            <td><strong>${tx.name}</strong></td>
            <td>${tx.type}</td>
            <td>${tx.details}</td>
            <td><span class="badge px-3 py-2 ${badgeClass}">${tx.status}</span></td>
        `;
        transactionTableBody.appendChild(row);
    });
}

displayTransactions(transactions);

// Filter and Search Transactions
function filterData() {
    const searchVal = searchTransaction.value.toLowerCase();
    const statusVal = filterStatus.value;

    const filtered = transactions.filter(tx => {
        const matchesSearch = tx.name.toLowerCase().includes(searchVal) || tx.id.toLowerCase().includes(searchVal);
        const matchesStatus = statusVal === "all" || tx.status === statusVal;
        return matchesSearch && matchesStatus;
    });

    displayTransactions(filtered);
}

searchTransaction.addEventListener("input", filterData);
filterStatus.addEventListener("change", filterData);

// Render Rooms
function displayRooms() {
    roomGrid.innerHTML = "";
    rooms.forEach(room => {
        const statusColor = room.status === "Available" ? "text-success" : "text-danger";
        const col = document.createElement("div");
        col.className = "col-md-4";
        col.innerHTML = `
            <div class="card h-100 border shadow-sm p-3">
                <div class="card-body">
                    <h5 class="card-title fw-bold">${room.name}</h5>
                    <p class="text-muted small mb-2">${room.type} • Capacity: ${room.capacity}</p>
                    <p class="fw-semibold">Status: <span class="${statusColor}">${room.status}</span></p>
                </div>
            </div>
        `;
        roomGrid.appendChild(col);
    });
}

displayRooms();

// Handle Room Reservation
roomBookingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("resName").value;
    const roomChoice = document.getElementById("resRoom").value;
    const timeSlot = document.getElementById("resTime").value;

    bookingMessage.textContent = `Success! ${roomChoice} has been reserved for ${name} during (${timeSlot}).`;
    bookingMessage.classList.remove("hidden");
    roomBookingForm.reset();
});