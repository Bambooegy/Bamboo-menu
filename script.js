/* ================= MENU DATA ================= */
const menuData = {

  "BAMBOO Signature":[
    ["COCO Mango",170,195,"coco-mango.jpg"],
    ["Tropical Rainbow",170,195,"tropical-rainbow.jpg"],
    ["Pink guava revive",170,195,"Pink-guava-revive.jpg"]
  ],

  "LEMONADE Series":[
    ["Pink LEMONADE",165,180,"pink-lemonade.jpg"],
    ["Golden LEMONADE",165,180,"Golden-lemonade.jpg"],
    ["Royal Blue LEMONADE",168,180,"royal-blue-lemonade.jpg"]
  ],

  "Coffee Boba":[
    ["Iced Latte Boba",150,180,"iced-latte-boba.jpg"],
    ["Dalgona Boba",170,195,"dalgona-boba.jpg"],
    ["Spanish Latte Boba",155,185,"spanish-latte-boba.jpg"]
  ],
  "Popping Boba":[
    ["Red Bull Popping Boba",150,180,"red-bull-popping-boba.jpg"],
    ["Popping Boba Fruit Tea",130,160,"popping-boba-fruit-tea.jpg"]
  ],
  "Milk Tea Boba":[
    ["Classic Boba",120,155,"classic-boba.jpg"],
    ["Brown Sugar Milk Boba",135,165,"brown-sugar-boba.jpg"]
  ],
  "Taro Boba":[
    ["Classic Taro",150,180,"classic-taro.jpg"],
    ["Brown Sugar Taro Boba",160,185,"brown-sugar-taro-boba.jpg"]
  ],
  "Matcha Boba":[
    ["Matcha Boba",155,185,"matcha-boba.jpg"],
    ["Brown Sugar Matcha",165,185,"brown-sugar-matcha.jpg"],
    ["Strawberry Matcha Latte Boba",175,190,"strawberry-matcha-latte-boba.jpg"]
  ],
  "Milk Boba":[
    ["Oreo Milk Boba",160,195,"oreo-milk-boba.jpg"],
    ["Lotus Milk Boba",160,195,"lotus-milk-boba.jpg"],
    ["Chocolate Milk Boba",155,190,"chocolate-milk-boba.jpg"],
    ["Caramel Milk Boba",155,190,"caramel-milk-boba.jpg"],
    ["Red Velvet Milk Boba",160,195,"red-velvet-milk-boba.jpg"],
    ["Mango Milk Boba",150,180,"mango-milk-boba.jpg"],
    ["Blueberry Milk Boba",150,180,"blueberry-milk-boba.jpg"],
    ["Strawberry Milk Boba",150,180,"strawberry-milk-boba.jpg"],
    ["Mango Coconut Milk Boba",180,210,"mango-coconut-milk-boba.jpg"],
    ["Watermelon Milk Boba",150,180,"watermelon-milk-boba.jpg"]
  ],

  "Ice Cream":[
    ["Mix Flavor Ice Cream",[
      { label:"1 Scoop", price:65 },
      { label:"2 Scoops", price:100 },
      { label:"3 Scoops", price:140 }
    ],"mix-flavor-one-ball.jpg"]
  ],
  "Milkshake":[
  ["Strawberry Milkshake",165,185,"strawberry-milkshake.jpg"],
  ["Chocolate Milkshake",165,185,"chocolate-milkshake.jpg"],
  ["Vanilla Milkshake",165,185,"vanilla-milkshake.jpg"],
  ["Oreo Milkshake",165,185,"oreo-milkshake.jpg"],
  ["Caramel Milkshake",165,185,"caramel-milkshake.jpg"],
  ["Raspberry Milkshake",165,185,"raspberry-milkshake.jpg"],
  ["Yogurt Berry Milkshake",165,185,"yogurt-berry-milkshake.jpg"],
  ["Mango Milkshake",165,185,"mango-milkshake.jpg"]
  ],
  "Iced Coffee":[
    ["Iced Latte",145,165,"iced-latte.jpg"],
    ["Iced Spanish Latte",155,185,"iced-spanish-latte.jpg"],
    ["Frappe Caramel",165,195,"frappe-caramel.jpg"],
    ["Frappe Chocolate",165,195,"frappe-chocolate.jpg"],
    ["Iced Americano",110,140,"iced-americano.jpg"]
  ],
  "Hot Drinks":[
    ["Espresso",65,null,"espresso.jpg"],
    ["Double Espresso",85,null,"double-espresso.jpg"],
    ["Americano",80,null,"americano.jpg"],
    ["Cappuccino",95,null,"cappuccino.jpg"],
    ["Caffè Latte",95,null,"latte.jpg"],
    ["Spanish Latte",110,null,"spanish-latte.jpg"],
    ["Macchiato",95,null,"macchiato.jpg"],
    ["Cortado",95,null,"cortado.jpg"],
    ["French Coffee",85,null,"french-coffee.jpg"],
    ["Hazelnut Coffee",95,null,"Hazelnut-Coffee.jpg"],
    ["Flat White",85,null,"flat-white.jpg"],
    ["Mocha",95,null,"mocha.jpg"],
    ["Turkish Coffee",70,null,"turkish-coffee.jpg"],
    ["Black Tea",55,null,"black-tea.jpg"],
    ["Milk Tea",75,null,"Milk-Tea.jpg"],
    ["Karak Tea",85,null,"karak-tea.jpg"],
    ["Sahlab",85,null,"sahlab.jpg"], 
    ["Green Tea",55,null,"green-tea.jpg"],
    ["Hot Chocolate",120,160,"hot-chocolate.jpg"]
  ],
  "Fresh Juices":[
    ["Fresh Mango",100,null,"fresh-mango.jpg"],
    ["Fresh Strawberry",100,null,"fresh-strawberry.jpg"],
    ["Orange Juice",100,null,"orange-juice.jpg"],
    ["Lemon Mint",85,null,"lemon-mint.jpg"],
    ["Banana With Milk",100,null,"banana-milkshake.jpg"]
  ]
};

/* ================= BADGES ================= */
const bestSellers = [
  "Iced Latte Boba",
  "Red Bull Popping Boba",
  "Strawberry Milkshake"
];

const newItems = [
  "Strawberry Matcha Latte Boba",
  "Red Velvet Milk Boba"
];

/* ================= ELEMENTS ================= */
const menu = document.getElementById("menu");
const tabsContainer = document.getElementById("tabs");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("bambooCart")) || [];

/* ================= RENDER MENU ================= */
function renderMenu(){
  const fragment = document.createDocumentFragment();

  for(const category in menuData){
    const section = document.createElement("section");
    section.innerHTML = `<h2>${category}</h2>`;

    menuData[category].forEach(item=>{
      const div = document.createElement("div");
      div.className = "item";

      if(Array.isArray(item[1])){
        const [name, options, image] = item;
        div.innerHTML = `
          <img src="images/${image}" loading="lazy" onerror="this.src='images/default.jpg'">
          <strong>${name}</strong>
          <div class="prices">
            ${options.map(o=>`
              <button onclick="addToCart('${name}',${o.price},'${o.label}')">
                ${o.label} – ${o.price} EGP
              </button>
            `).join("")}
          </div>
        `;
      } else {
        const [name,p1,p2,image] = item;
        div.innerHTML = `
          <img src="images/${image}" loading="lazy" onerror="this.src='images/default.jpg'">
          <strong>${name}</strong>
          ${
            p2
              ? `<div class="prices">
                  <button onclick="addToCart('${name}',${p1},'Medium')">Medium – ${p1}</button>
                  <button onclick="addToCart('${name}',${p2},'Large')">Large – ${p2}</button>
                </div>`
              : `<button onclick="addToCart('${name}',${p1},'')">${p1} EGP</button>`
          }
        `;
      }

      const title = div.querySelector("strong");
      if(bestSellers.includes(title.textContent))
        title.innerHTML += `<span class="best-seller">⭐ Best Seller</span>`;

      if(newItems.includes(title.textContent))
        div.insertAdjacentHTML("beforeend", `<span class="new-badge">NEW</span>`);

      section.appendChild(div);
    });

    fragment.appendChild(section);
  }

  menu.appendChild(fragment);
}

/* ================= TABS ================= */
function renderTabs() {
  const allCategories = ["Best Seller","New", ...Object.keys(menuData)];

  allCategories.forEach(category=>{
    const tab = document.createElement("div");
    tab.className = "tab";
    tab.textContent = category;

    tab.onclick = ()=>{
      document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
      tab.classList.add("active");

      document.querySelectorAll("section").forEach(sec=>{
        if(category === "Best Seller"){
          sec.style.display = [...sec.querySelectorAll(".item")].some(i=>{
            return bestSellers.includes(i.querySelector("strong").childNodes[0].nodeValue.trim());
          }) ? "grid" : "none";
        } else if(category === "New"){
          sec.style.display = [...sec.querySelectorAll(".item")].some(i=>{
            return newItems.includes(i.querySelector("strong").childNodes[0].nodeValue.trim());
          }) ? "grid" : "none";
        } else {
          sec.style.display = sec.querySelector("h2").textContent === category ? "grid" : "none";
        }
      });
    };

    tabsContainer.appendChild(tab);
  });

  document.querySelector(".tab")?.click();
}



/* ================= CART ================= */
function addToCart(name,price,size){
  const item = cart.find(i=>i.name===name && i.size===size);
  item ? item.qty++ : cart.push({name,price,size,qty:1});
  showToast("Added to cart 🧋");
  renderCart();
}

function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((i,idx)=>{
    total += i.price * i.qty;
    cartItems.innerHTML += `
      <li>
        ${i.name} ${i.size ? `(${i.size})` : ""} x${i.qty}
        <span onclick="removeItem(${idx})">✕</span>
      </li>`;
  });
  cartTotal.textContent = `Total: ${total} EGP`;
  localStorage.setItem("bambooCart", JSON.stringify(cart));
}

function removeItem(i){
  cart.splice(i,1);
  renderCart();
}

/* ================= TOAST ================= */
function showToast(text){
  const toast = document.getElementById("toast");
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2000);
}

/* ================= WHATSAPP ================= */
function sendWhatsApp(){
  if(!cart.length) return showToast("Your cart is empty");
  let msg="Hello Bamboo Team 👋\nI would like to order:\n\n";
  cart.forEach(i=>{
    msg += `• ${i.name} ${i.size?`(${i.size})`:""} x${i.qty}\n`;
  });
  window.open(`https://wa.me/201019634984?text=${encodeURIComponent(msg)}`,"_blank");
}

/* ================= INIT ================= */
renderMenu();
renderCart();











