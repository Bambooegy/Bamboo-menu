/* ================= DATA ================= */
const menuData = {
  "Coffee Boba":[
    ["Iced Latte Boba",150,180,"iced-latte-boba.jpg"],
    ["Dalgona Boba",170,195,"dalgona-boba.jpg"],
    ["Spanish Latte Boba",155,185,"spanish-latte-boba.jpg"]
  ],
  "Popping Boba":[
    ["Red Bull Popping Boba",150,175,"red-bull-popping-boba.jpg"],
    ["Popping Boba Fruit Tea",130,160,"popping-boba-fruit-tea.jpg"]
  ],
  "Milk Tea Boba":[
    ["Classic Boba",120,155,"classic-boba.jpg"],
    ["Brown Sugar Milk Boba",135,165,"brown-sugar-boba.jpg"]
  ],
  "Matcha Boba":[
    ["Matcha Boba",155,185,"matcha-boba.jpg"],
    ["Strawberry Matcha Latte Boba",175,190,"strawberry-matcha-boba.jpg"]
  ],
  "Milk Boba":[
    ["Red Velvet Milk Boba",160,195,"red-velvet-milk-boba.jpg"],
    ["Oreo Milk Boba",160,195,"oreo-milk-boba.jpg"]
  ],
  "Ice Cream":[
    ["Mix Flavor Ice Cream",[
      {label:"1 Scoop",price:55},
      {label:"2 Scoops",price:85},
      {label:"3 Scoops",price:115}
    ],"mix-flavor-one-ball.jpg"]
  ]
};

const bestSellers = ["Iced Latte Boba","Red Bull Popping Boba"];
const newItems = ["Red Velvet Milk Boba","Strawberry Matcha Latte Boba"];

const menu = document.getElementById("menu");
const tabs = document.getElementById("tabs");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");

let cart = JSON.parse(localStorage.getItem("bambooCart")) || [];

/* ================= MENU ================= */
function renderMenu(){
  const fragment = document.createDocumentFragment();

  for(const category in menuData){
    const section = document.createElement("section");
    section.innerHTML = `<h2>${category}</h2>`;

    menuData[category].forEach(item=>{
      const div = document.createElement("div");
      div.className="item";

      if(Array.isArray(item[1])){
        const [name,options,image]=item;
        div.innerHTML=`
          <img src="images/${image}" loading="lazy">
          <strong>${name}</strong>
          <div class="prices">
            ${options.map(o=>`<button onclick="addToCart('${name}',${o.price},'${o.label}')">${o.label} – ${o.price}</button>`).join("")}
          </div>`;
      } else {
        const [name,p1,p2,image]=item;
        div.innerHTML=`
          <img src="images/${image}" loading="lazy">
          <strong>${name}</strong>
          ${p2?`
            <div class="prices">
              <button onclick="addToCart('${name}',${p1},'M')">M – ${p1}</button>
              <button onclick="addToCart('${name}',${p2},'L')">L – ${p2}</button>
            </div>`:
            `<button onclick="addToCart('${name}',${p1},'')">${p1} EGP</button>`}
        `;
      }

      const title = div.querySelector("strong").textContent;
      if(bestSellers.includes(title))
        div.querySelector("strong").innerHTML+=`<span class="best-seller">⭐ Best</span>`;
      if(newItems.includes(title))
        div.innerHTML+=`<span class="new-badge">NEW</span>`;

      section.appendChild(div);
    });

    fragment.appendChild(section);
  }
  menu.appendChild(fragment);
}

/* ================= TABS ================= */
for(const cat in menuData){
  const t=document.createElement("div");
  t.className="tab";
  t.textContent=cat;
  t.onclick=()=>{
    document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.querySelectorAll("section").forEach(s=>{
      s.style.display=s.querySelector("h2").textContent===cat?"grid":"none";
    });
  };
  tabs.appendChild(t);
}
document.querySelector(".tab")?.click();

/* ================= CART ================= */
function addToCart(name,price,size){
  const item=cart.find(i=>i.name===name&&i.size===size);
  item?item.qty++:cart.push({name,price,size,qty:1});
  showToast("Added to cart 🧋");
  renderCart();
}

function renderCart(){
  cartItems.innerHTML="";
  let total=0;
  cart.forEach((i,idx)=>{
    total+=i.price*i.qty;
    cartItems.innerHTML+=`<li>${i.name} ${i.size} x${i.qty}<span onclick="removeItem(${idx})">✕</span></li>`;
  });
  cartTotal.textContent=`Total: ${total} EGP`;
  localStorage.setItem("bambooCart",JSON.stringify(cart));
}
function removeItem(i){cart.splice(i,1);renderCart();}

/* ================= TOAST ================= */
function showToast(t){
  const toast=document.getElementById("toast");
  toast.textContent=t;
  toast.classList.add("show");
  setTimeout(()=>toast.classList.remove("show"),2000);
}

/* ================= WHATSAPP ================= */
function sendWhatsApp(){
  if(!cart.length) return showToast("Cart is empty");
  let msg="Hello Bamboo Team 👋\n";
  cart.forEach(i=>msg+=`• ${i.name} ${i.size} x${i.qty}\n`);
  window.open(`https://wa.me/201019634984?text=${encodeURIComponent(msg)}`);
}

renderMenu();
renderCart();
