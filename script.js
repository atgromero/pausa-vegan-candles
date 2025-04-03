"use strict";

const candlesDiv = document.getElementById("candles-div");
const cartBtn = document.getElementById("cart-btn");
const showHide = document.getElementById("show-hide");
const modal = document.getElementById("modal");
const clearBtn = document.getElementById("clear-btn");
const cartItems = document.getElementById("cart-items");
const totalItemsSpan = document.getElementById("total-items");
const subtotalSpan = document.getElementById("subtotal");
const taxesSpan = document.getElementById("taxes");
const totalSpan = document.getElementById("total");

let isCartShowing = false;

const candles = [
  {
    id: 101,
    title: "Memories",
    descr:
      "Light whispers of lavander, fresh linen and aged leather with delicate notes of nostalgia.",
    price: 15.99,
    src: "pictures/2_vela_4.jpg",
  },
  {
    id: 102,
    title: "Zen",
    descr:
      "Bamboo forest with hints of green tea, jasmine blossoms, and a touch of eucalyptus.",
    price: 14.99,
    src: "pictures/2_vela_1.jpg",
  },
  {
    id: 103,
    title: "The Dark",
    descr:
      "Blend of smoky cedarwood, dark patchouli, and black orchid, touched by the essence of moonlight.",
    price: 18.99,
    src: "pictures/2_vela_3.jpg",
  },
  {
    id: 104,
    title: "Desire",
    descr: "Freshly baked vanilla cupcakes kissed with cinnamon and tulips.",
    price: 15.99,
    src: "pictures/2_vela_2.jpg",
  },
  {
    id: 105,
    title: "Magic",
    descr:
      "Exotic spices, patchouli, and a hint of citrus, cast by an alluring spell from space.",
    price: 20.99,
    src: "pictures/2_vela_5.jpg",
  },
];

candles.forEach(({ id, title, descr, price, src }, index) => {
  candlesDiv.innerHTML += `<div class="candle-container" id="${id}">
    <img src='${src}' alt="candle ${
    index + 1
  }" class="candle-img" loading="lazy"/><div class="candle-text"><h3>${title}</h3>
          <p>${descr}</p>
          <p>€${price}</p>
          <button id="${id}" class="add-btn">Add to cart</button>
          </div>
          </div>`;
});

class ShoppingCart {
  constructor() {
    (this.items = []), (this.tax = 23), (this.total = 0);
  }

  addItems(id, products) {
    let count = 0;
    const item = products.find((item) => item.id === id);
    const { title, price } = item;
    this.items.push(item);

    const countCandles = {};
    this.items.forEach((candle) => {
      countCandles[candle.id] = (countCandles[candle.id] || 0) + 1;
    });

    const currentCount = countCandles[id];
    const currentCountSpan = document.getElementById(`counter-${id}`);
    const cartPrice = document.getElementById(`price-${id}`);

    if (currentCount > 1) {
      currentCountSpan.textContent = `${currentCount}x Candles `;
      cartPrice.textContent = `€${price * currentCount}`;
    } else {
      cartItems.innerHTML += `<div id="cart-${id}" class="cart-candle"><p><span id="counter-${id}">Candle </span><span class="italics">${title}</span></p><p id="price-${id}" class="cart-price">€${price}</p>
      </div>`;
    }
  }

  calculateTaxes(amount) {
    return parseFloat(((this.tax / 100) * amount).toFixed(2));
  }

  updateTotals() {
    const totalItems = this.items.length;
    totalItemsSpan.textContent = totalItems;

    const subtotal = this.items.reduce((acc, item) => acc + item.price, 0);
    subtotalSpan.textContent = `€${subtotal.toFixed(2)}`;

    const taxes = this.calculateTaxes(subtotal);
    taxesSpan.textContent = `€${taxes.toFixed(2)}`;

    this.total = subtotal + taxes;
    totalSpan.textContent = `€${this.total.toFixed(2)}`;
  }

  clearCart() {
    if (!this.items.length) {
      alert("Your shopping cart is already empty.");
      return;
    }

    const areYouSure = confirm(
      "Are you sure you want to clear all items from your shopping cart?"
    );
    if (areYouSure) {
      this.items = [];
      this.total = 0;

      cartItems.innerHTML = "";
      totalItemsSpan.textContent = "0";
      subtotalSpan.textContent = "€0";
      taxesSpan.textContent = "€0";
      totalSpan.textContent = "€0";
    }
  }
}

const cart = new ShoppingCart();
const addBtns = document.getElementsByClassName("add-btn");

[...addBtns].forEach((btn) =>
  btn.addEventListener("click", (e) => {
    cart.addItems(Number(e.target.id), candles);
    cart.updateTotals();
  })
);

cartBtn.addEventListener("click", () => {
  isCartShowing = !isCartShowing;
  modal.style.display = isCartShowing ? "block" : "none";
  showHide.textContent = isCartShowing ? "Hide Cart" : "Show Cart";
});

clearBtn.addEventListener("click", cart.clearCart.bind(cart));
