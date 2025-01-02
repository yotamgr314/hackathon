const API_URL = "https://hackathon-th5w.onrender.com";

let currentOrder = [];
let totalPrice = 0;

const fetchPizzas = async () => {
  const response = await fetch(`${API_URL}/api/inventory`);
  const inventory = await response.json();
  displayPizzas(inventory);
};

const displayPizzas = (inventory) => {
  const pizzaList = document.getElementById("pizza-list");
  pizzaList.innerHTML = "";

  const pizzas = [
    { name: "Olives Pizza", type: "olives", price: 10 },
    { name: "Mushrooms Pizza", type: "mushrooms", price: 12 },
    { name: "Pineapple Pizza", type: "pineapple", price: 15 },
  ];

  pizzas.forEach((pizza) => {
    const stock =
      inventory.find((item) => item.ingredient === pizza.type)?.quantity || 0;

    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">${pizza.name}</h5>
          <p class="card-text">Price: $${pizza.price}</p>
          <button class="btn btn-primary" ${
            stock <= 0 ? "disabled" : ""
          } onclick="addToOrder('${pizza.type}', ${pizza.price})">
            Add to Order
          </button>
        </div>
      </div>
    `;
    pizzaList.appendChild(card);
  });
};

const addToOrder = (type, price) => {
  currentOrder.push({ type, price });
  totalPrice += price;
  updateOrderList();
};

const updateOrderList = () => {
  const orderList = document.getElementById("current-order");
  orderList.innerHTML = "";
  currentOrder.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = `${item.type} - $${item.price}`;
    orderList.appendChild(listItem);
  });
  document.getElementById("total-price").textContent = `Total: $${totalPrice}`;
};

const confirmOrder = async () => {
  if (currentOrder.length === 0) return alert("No items in the order!");

  const response = await fetch(`${API_URL}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items: currentOrder }),
  });

  if (response.ok) {
    alert("Order confirmed!");
    currentOrder = [];
    totalPrice = 0;
    updateOrderList();
    fetchPizzas();
  } else {
    alert("Failed to confirm order.");
  }
};

document
  .getElementById("confirm-order")
  .addEventListener("click", confirmOrder);
fetchPizzas();
