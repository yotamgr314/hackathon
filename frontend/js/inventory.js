const API_URL = "https://hackathon-th5w.onrender.com";

const fetchInventory = async () => {
  const response = await fetch(`${API_URL}/api/inventory`);
  const inventory = await response.json();
  displayInventory(inventory);
};

const fetchOrderHistory = async () => {
  const response = await fetch(`${API_URL}/api/orders`);
  const orders = await response.json();
  displayOrderHistory(orders);
};

const displayInventory = (inventory) => {
  const inventoryList = document.getElementById("inventory-list");
  inventoryList.innerHTML = "<ul class='list-group'>";
  inventory.forEach((item) => {
    inventoryList.innerHTML += `<li class='list-group-item'>${item.ingredient}: ${item.quantity}</li>`;
  });
  inventoryList.innerHTML += "</ul>";
};

const displayOrderHistory = (orders) => {
  const orderHistory = document.getElementById("order-history");
  orderHistory.innerHTML = "";
  orders.forEach((order) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `Order - $${
      order.totalPrice
    }, Created at: ${new Date(order.createdAt).toLocaleString()}`;
    orderHistory.appendChild(listItem);
  });
};

document.getElementById("refresh").addEventListener("click", () => {
  fetchInventory();
  fetchOrderHistory();
});

fetchInventory();
fetchOrderHistory();
