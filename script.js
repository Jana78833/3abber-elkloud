

let iconCart = document.querySelector('.icon-cart');
let cartTab = document.querySelector('.cartTab');
let closeBtn = document.querySelector('.close');
let checkOutBtn = document.querySelector('.checkOut');
let listCart = document.querySelector('.listCart');
let cartCounter = document.querySelector('.icon-cart span');

let cart = [];

// فتح الكارت
iconCart.addEventListener('click', () => {
  cartTab.classList.add('active');
});

// قفل الكارت
closeBtn.addEventListener('click', () => {
  cartTab.classList.remove('active');
});

// إضافة المنتج
let addCartBtns = document.querySelectorAll('.addCart');
addCartBtns.forEach(button => {
  button.addEventListener('click', function () {
    let productCard = this.closest('.card');
    let id = productCard.dataset.id;
    let name = productCard.querySelector('.name').innerText;
    let price = parseFloat(productCard.dataset.price); 
    let imgSrc = productCard.querySelector('img').src;
    let productImage = productCard.querySelector('img');

    let product = { id, name, price, imgSrc, quantity: 1 };

    let existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push(product);
    }
    updateCart();

    // أنيميشن
    flyToCart(productImage, iconCart);
  });
});

// تحديث الكارت
function updateCart() {
  listCart.innerHTML = '';
  let totalItems = 0;
  let totalPrice = 0;

  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.price * item.quantity;

    let cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.imgSrc}" alt="${item.name}">
      <div class="cart-details">
        <p>${item.name}</p>
        <p>$${item.price}</p>
        <div class="quantity">
          <button class="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="increase">+</button>
        </div>
      </div>
      <button class="remove">x</button>
    `;

    // زرار الإنقاص
    cartItem.querySelector('.decrease').addEventListener('click', () => {
      if (item.quantity > 1) {
        item.quantity--;
      } else {
        cart = cart.filter(p => p.id !== item.id);
      }
      updateCart();
    });

    // زرار الزيادة
    cartItem.querySelector('.increase').addEventListener('click', () => {
      item.quantity++;
      updateCart();
    });

    // زرار الحذف
    cartItem.querySelector('.remove').addEventListener('click', () => {
      cart = cart.filter(p => p.id !== item.id);
      updateCart();
    });

    listCart.appendChild(cartItem);
  });

  // عداد الكارت
  cartCounter.innerText = totalItems;

  // عرض الإجمالي تحت الكارت
  if (cart.length > 0) {
    let totalDiv = document.createElement('div');
    totalDiv.classList.add('total');
    totalDiv.innerHTML = `<h3>Total: $${totalPrice.toFixed(2)}</h3>`;
    listCart.appendChild(totalDiv);
  }
}


checkOutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
 
  localStorage.setItem("cart", JSON.stringify(cart));
  // روح للـ checkout
  window.location.href = "checkout.html";
});

//  دالة الأنيميشن (الصورة تطير للسلة)
function flyToCart(image, targetCart) {
    if (!image || !targetCart) return;

    let imgClone = image.cloneNode(true);
    let imgRect = image.getBoundingClientRect();
    let cartRect = targetCart.getBoundingClientRect();

    imgClone.style.position = "fixed";
    imgClone.style.top = imgRect.top + "px";
    imgClone.style.left = imgRect.left + "px";
    imgClone.style.width = imgRect.width + "px";
    imgClone.style.height = imgRect.height + "px";
    imgClone.style.zIndex = "1000";
    imgClone.style.transition = "all 1s ease-in-out";

    document.body.appendChild(imgClone);

    setTimeout(() => {
        imgClone.style.top = cartRect.top + "px";
        imgClone.style.left = cartRect.left + "px";
        imgClone.style.width = "20px";
        imgClone.style.height = "20px";
        imgClone.style.opacity = "0.5";
    }, 50);

    setTimeout(() => {
        imgClone.remove();
    }, 1000);
}

