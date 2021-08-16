// const data = require("../data.json")
class App {
  constructor() {
    this.itemList = getElement(".items-list");
    this.cartList = getElement(".cart-items");
    this.cartTotal = getElement(".cart-total");
    this.summary = getElement(".summary");
    this.summaryTotal = getElement(".summary-total");
    this.notification = getElement(".notification");
    this.noticeText = getElement(".notice-text");
    this.cartTax = getElement(".cart-tax");
    this.products = products;
    this.cart = [];
    this.tax = 5;
  }

  loadProducts = () => {
    let items = [];
    items = this.products.map((product) => {
      const { id, tag, image, name, price, price_org } = product;
      return `<div class="item">
                      <p class="tag">${tag}</p>
                      <img src="./assets/${image}" alt="">
                      <h3 class="name">${name}</h3>
                      <h5 class="price">KSH ${price} ${
        price_org !== undefined ? ` <span> KSH ${product.price_org}</span>` : ""
      }</h5>
                      <button data-id=${id} class="btn-add-to-cart"><i class="fa fa-cart-plus"></i>Add</button>
              </div>`;
    });
    for (let item in items) {
      this.itemList.innerHTML += items[item];
    }
    this.loadCart();
  };

  loadCart = () => {
    if (this.cart.length > 0) {
      this.summary.style.display = "flex";
      const carts = this.cart.map((cart) => {
        const { id, image, name, price, quantity } = cart;
        return `<div class="cart-item">
                        <img src="./assets/${image}" alt="">
                        <div class="cart-items-details">
                            <h3>${name}</h3>
                            <p>KSH ${price}</p>
                            <div class="cart-quantity">
                                <div data-id=${id} class="cart-quantity-minus">-</div>
                                <div class="cart-quantity-value">${quantity}</div>
                                <div data-id=${id} class="cart-quantity-plus">+</div>
                            </div>
                        </div>
                        <i data-id=${id} class="fa fa-trash"></i>
                    </div>`;
      });

      this.cartList.innerHTML = "";
      for (let item in carts) {
        this.cartList.innerHTML += carts[item];
      }
      this.calculateCartTotal();
    } else {
      this.summary.style.display = "none";
      this.cartList.innerHTML = `<h2 style="text-align: center;padding:20px; color: #494242;">Cart Is Empty</h2>`;
    }
  };

  addToCart = (element) => {
    const itemId = parseInt(element.dataset.id);
    const item = this.products.filter((product) => product.id === itemId)[0];
    const { id, image, name, price } = item;
    this.cart.push({ id, image, name, price, quantity: 1 });
    this.loadCart();
    this.showNotification("Item Added to cart");
  };

  removeFromCart = (element) => {
    const itemId = parseInt(element.dataset.id);
    console.log({itemId});
    const items = this.cart.filter((product) => product.id !== itemId);
    
    this.cart = items;
    this.loadCart();
    this.showNotification("Removed from cart");
  };

  calculateCartTotal = () => {
    const total = this.cart.reduce((acc, value) => {
      return acc + value.price * value.quantity;
    }, 0);
    const tax = Math.floor((this.tax / 100) * total);
    this.cartTotal.innerHTML = `Ksh ${total}`;
    this.cartTax.innerHTML = `Ksh ${tax}`;
    this.summaryTotal.innerHTML = `Ksh ${total + tax}`;
  };

  disableNotification = () => {
    this.notification.classList.remove("show");
    this.noticeText.innerHTML = "";
  };

  showNotification = (notice) => {
    this.noticeText.innerHTML = notice;
    this.notification.classList.add("show");

    setTimeout(() => {
      this.disableNotification();
    }, 3000);
  };

  decrementQuantity = (element) => {
    const itemId = parseInt(element.dataset.id);
    let tempCart = this.cart.map((c) => {
      if (c.id === itemId) {
        c.quantity > 1 && c.quantity--;
        return c;
      } else {
        return c;
      }
    });

    this.cart = tempCart;

    this.loadCart();
  };
  incrementQuantity = (element) => {
    const itemId = parseInt(element.dataset.id);
    let tempCart = this.cart.map((c) => {
      if (c.id === itemId) {
        c.quantity++;
        return c;
      } else {
        return c;
      }
    });

    this.cart = tempCart;

    this.loadCart();
  };
}

const eventListeners = () => {
  const app = new App();
  app.loadProducts();

  const itemsList = getElement(".items-list");
  const cartItems = getElement(".cart-items");
  const close = getElement(".close");

  close.addEventListener("click", () => {
    app.disableNotification();
  });

  itemsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-to-cart")) {
      app.addToCart(e.target);
    }
  });

  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("cart-quantity-minus")) {
      app.decrementQuantity(e.target);
    } else if (e.target.classList.contains("cart-quantity-plus")) {
      app.incrementQuantity(e.target);
    } else if (e.target.classList.contains("fa-trash")){
      app.removeFromCart(e.target);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  eventListeners();
});
