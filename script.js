const menuData = {
  "Coffee Boba": [
    ["Iced Latte Boba", 150, 180],
    ["Dalgona Boba", 170, 195],
    ["Spanish Latte Boba", 155, 185]
  ],
  "Popping Boba": [
    ["Red Bull Popping Boba", 150, 180],
    ["Popping Boba Fruit Tea", 160]
  ]
};

const menu = document.getElementById("menu");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
let cart = [];

/* ==== Render Menu With Images ==== */
for (const category in menuData) {
  const section = document.createElement("section");
  section.innerHTML = `<h2>${category}</h2>`;

  const fragment = document.createDocumentFragment();

  menuData[category].forEach(item => {
    const [name, price1, price2] = item;
    const div = document.createElement("div");
    div.className = "item";

    const imageName = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-$/, "");

    const imagePath = `images/${imageName}.jpg`;

    if (price2) {
      div.innerHTML = `
        <img 
          src="${imagePath}" 
          alt="${name}" 
          loading="lazy"
          onerror="this.src='images/default.jpg'"
        >
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
        <img 
          src="${imagePath}" 
          alt="${name}" 
          loading="lazy"
          onerror="this.src='images/default.jpg'"
        >
        <strong>${name}</strong>
        <button onclick="addToCart('${name}', ${price1}, '')">
          ${price1} EGP
        </button>
      `;
    }

    fragment.appendChild(div);
  });

  section.appendChild(fragment);
  menu.appendChild(section);
}

/* ===== Cart ===== */
function addToCart(name, price, size) {
  // تحقق إذا المنتج موجود بالفعل
  const existing = cart.find(item => item.name === name && item.size === size);
  if (existing) {
    existing.quantity += 1;
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
      ${item.name} ${item.size ? "(" + item.size + ")" : ""} x${item.quantity} – ${item.price * item.quantity} EGP
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

/* ===== WhatsApp ===== */
function sendWhatsApp() {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  let message = `Hello Bamboo Team 👋\nI would like to place the following order:\n\n`;
  let total = 0;

  cart.forEach(item => {
    message += `• ${item.name} ${item.size ? "(" + item.size + ")" : ""} x${item.quantity} – ${item.price * item.quantity} EGP\n`;
    total += item.price * item.quantity;
  });

  message += `\nTotal: ${total} EGP`;
  const phone = "201019634984";
  const encodedMessage = encodeURIComponent(message);

  window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
}
