const menuData = {
  "Coffee Boba": [
    ["Iced Latte Boba", 150, 180, "iced-latte-boba.jpg"],
    ["Dalgona Boba", 170, 195, "dalgona-boba.jpg"],
    ["Spanish Latte Boba", 155, 185, "spanish-latte-boba.jpg"]
  ],
  "Popping Boba": [
    ["Red Bull Popping Boba", 150, 180, "red-bull-popping-boba.jpg"],
    ["Popping Boba Fruit Tea", 160, null, "popping-boba-fruit-tea.jpg"]
  ]
};

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

/* Render Menu */
function renderMenu() {
  for (const category in menuData) {
    const section = document.createElement("section");
    section.innerHTML = `<h2>${category}</h2>`;

    menuData[category].forEach(item => {
      const [name, price1, price2, image] = item;
      const div = document.createElement("div");
      div.className = "item";

      const imagePath = `images/${image || "default.jpg"}`;

      div.innerHTML = `
        <img src="${imagePath}" alt="${name}" onerror="this.src='images/default.jpg'">
        <strong>${name}</strong>
        ${
          price2
          ? `<div class="prices">
              <button onclick="addToCart('${name}', ${price1}, 'Small')">
                Small – ${price1} EGP
              </button>
              <button onclick="addToCart('${name}', ${price2}, 'Large')">
                Large – ${price2} EGP
              </button>
            </div>`
          : `<button onclick="addToCart('${name}', ${price1}, '')">
              ${price1} EGP
            </button>`
        }
      `;
      section.appendChild(div);
    });

    menu.appendChild(section);
  }
}

/* Cart */
function addToCart(name, price, size) {
  const existing = cart.find(i => i.name === name && i.size === size);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, size, quantity: 1 });
  }
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} ${item.size ? "(" + item.size + ")" : ""} x${item.quantity}
      <span onclick="removeItem(${index})">✕</span>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `Total: ${total} EGP`;
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

  let message = "Hello Bamboo Team 👋\nI would like to order:\n\n";
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} ${item.size ? "(" + item.size + ")" : ""} x${item.quantity}\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: ${total} EGP`;

  const phone = "201019634984";
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

renderMenu();
