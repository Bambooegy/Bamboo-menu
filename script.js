const menuData = {
  "Coffee Boba": [
    ["Iced Latte Boba", 150, 180],
    ["Dalgona Boba", 170, 195],
    ["Spanish Latte Boba", 155, 185]
  ],
  "Popping Boba": [
    ["Red Bull Popping Boba", 150, 180],
    ["Popping Boba Fruit Tea", 130, 160]
  ],
  "Milk Tea Boba": [
    ["Classic Boba", 120, 155],
    ["Brown Sugar Milk Boba", 135, 165]
  ],
  "Taro Boba": [
    ["Classic Taro", 150, 180],
    ["Brown Sugar Taro Boba", 160, 185]
  ],
  "Matcha Boba": [
    ["Matcha Boba", 155, 185],
    ["Brown Sugar Matcha", 165, 185],
    ["Strawberry Matcha Latte Boba", 175, 190]
  ],
  "Milk Boba": [
    ["Oreo Milk Boba", 160, 195],
    ["Lotus Milk Boba", 160, 195],
    ["Chocolate Milk Boba", 155, 190],
    ["Caramel Milk Boba", 155, 190],
    ["Red Velvet Milk Boba", 160, 195],
    ["Mango Milk Boba", 150, 180],
    ["Blueberry Milk Boba", 150, 180],
    ["Strawberry Milk Boba", 150, 180],
    ["Watermelon Milk Boba", 150, 180]
  ],
  "Ice-Cream": [
    ["Mix flavor", 55, ,85 ,115]
  ],
  "Milkshake": [
    ["Strawberry Milkshake", 140, 165],
    ["chocolate Milkshake", 140, 165],
    ["Vanilla Milkshake", 140, 165],
    ["Oreo Milkshake", 140, 165],
    ["Raspberry Milkshake", 140, 165],
    ["Blueberry yogurt Milkshake", 140, 165],
    ["Mango Milkshake", 140, 165]
  ],
  "Iced Coffee": [
    ["Iced Latte", 125],
    ["Iced Spanish Latte", 135],
    ["Iced Americano", 90]
  ],
  "Desserts": [
    ["Walnut and Caramel Cheesecake", 120],
    ["Lotus Cheesecake", 120],
    ["Blueberry Cheesecake", 120]
  ],
  "Hot Drinks": [
    ["Espresso", 65],
    ["Double Espresso", 85],
    ["Americano", 80],
    ["Cappuccino", 95],
    ["Caffè Latte", 95],
    ["Spanish Latte", 110],
    ["Macchiato", 95],
    ["Cortado", 95],
    ["French Coffee", 85],
    ["Hazelnut Coffee", 95],
    ["Tea With Milk", 75],
    ["Black Nescafe", 85],
    ["Flat White", 95],
    ["Mocha", 95],
    ["Turkish Coffee", 70],
    ["Double Turkish Coffee", 95],
    ["Black Tea", 55],
    ["Green Tea", 55],
    ["Hot Chocolate", 120]
  ],
  "Fresh Juices": [
    ["Fresh Mango", 85],
    ["Fresh Strawberry", 85],
    ["Orange Juice", 85],
    ["Lemon Mint", 85],
    ["Banana Milkshake", 85]
  ]
};

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
let cart = [];

/* Render Menu */
for (const category in menuData) {
  const section = document.createElement("section");
  section.innerHTML = `<h2>${category}</h2>`;

  menuData[category].forEach(item => {
    const [name, price1, price2] = item;
    const div = document.createElement("div");
    div.className = "item";

    if (price2) {
      div.innerHTML = `
        <strong>${name}</strong>
        <div class="prices">
          <button onclick="addToCart('${name}', ${price1}, 'Small')">
            Small – ${price1} EGP
          </button>
          <button onclick="addToCart('${name}', ${price2}, 'Large')">
            Large – ${price2} EGP
          </button>
        </div>
      `;
    } else {
      div.innerHTML = `
        <strong>${name}</strong>
        <button onclick="addToCart('${name}', ${price1}, '')">
          ${price1} EGP
        </button>
      `;
    }

    section.appendChild(div);
  });

  menu.appendChild(section);
}

/* Cart */
function addToCart(name, price, size) {
  cart.push({ name, price, size });
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} ${item.size ? "(" + item.size + ")" : ""} – ${item.price} EGP
      <span onclick="removeItem(${index})">✕</span>
    `;
    cartItems.appendChild(li);
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

/* WhatsApp */
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = "🧋 Bamboo Order%0A%0A";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} ${item.size ? "(" + item.size + ")" : ""} – ${item.price} EGP%0A`;
    total += item.price;
  });

  message += `%0A💰 Total: ${total} EGP`;

  const phone = "201019634984";
  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
}

