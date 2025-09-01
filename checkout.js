
// جلب البيانات من localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// عناصر
let orderItems = document.getElementById("orderItems");
let finalTotal = document.getElementById("finalTotal");
let checkoutForm = document.getElementById("checkout-form");
let placeOrderBtn = document.getElementById("placeOrder");
let checkoutSection = document.getElementById("checkout-section");
let thankyouMsg = document.getElementById("thankyou");

// عرض الطلبات
function displayOrder() {
  orderItems.innerHTML = "";
  let totalPrice = 0;

  cart.forEach(item => {
    totalPrice += item.price * item.quantity;

    let div = document.createElement("div");
    div.classList.add("order-item");
    div.innerHTML = `
      <div class="order-item-details">
        <img src="${item.imgSrc}" alt="${item.name}" style="width:50px; border-radius:8px;">
        <p>${item.name} × ${item.quantity}</p>
      </div>
      <p>$${(item.price * item.quantity).toFixed(2)}</p>
    `;
    orderItems.appendChild(div);
  });

  finalTotal.innerText = `$${totalPrice.toFixed(2)}`;
}

// عند الضغط على زرار الدفع
checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  // لو الكارت فاضي
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  // التحقق من المدخلات
  let name = checkoutForm.querySelector('input[type="text"]').value.trim();
  let email = checkoutForm.querySelector('input[type="email"]').value.trim();
  let phone = checkoutForm.querySelector('input[type="tel"]').value.trim();
  let address = checkoutForm.querySelector('textarea').value.trim();
  let card = document.getElementById("cardNumber").value.trim();

  if (!name || !email || !phone || !address || !card) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  // تحقق من رقم الموبايل (11 رقم)
  if (!/^\d{11}$/.test(phone)) {
    alert("⚠️ Please enter a valid 11-digit phone number.");
    return;
  }

  // تحقق من البريد
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("⚠️ Please enter a valid email.");
    return;
  }

  // تحقق من الكارت (16 رقم)
  let cardDigits = card.replace(/\s/g, "");
  if (!/^\d{16}$/.test(cardDigits)) {
    alert("⚠️ Please enter a valid 16-digit card number.");
    return;
  }

  // ✅ لو كله تمام → عرض رسالة الشكر
  checkoutSection.style.display = "none";
  thankyouMsg.style.display = "block";

  // فضي الكارت
  localStorage.removeItem("cart");
});

// تشغيل عند تحميل الصفحة
displayOrder();
