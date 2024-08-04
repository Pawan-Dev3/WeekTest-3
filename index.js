const Products = [
  { id: 1, name: "Product-1", price: 100 },
  { id: 2, name: "Product-2", price: 200 },
  { id: 3, name: "Product-3", price: 300 },
];

const productsContainer = document.getElementById("products-container");
const cartContainer = document.getElementById("cart-container");
const cartItemsContainer = document.getElementById("cart-items-container");
const emptyCartText = document.getElementById("empty-cart-text");

window.onload = function () {
  Products.forEach((product) => {
    const productDiv = document.createElement("div");
    const productName = document.createElement("span");
    const productPrice = document.createElement("span");
    const quantityDiv = document.createElement("div");
    const increment = document.createElement("button");
    const decrement = document.createElement("button");
    const quantity = document.createElement("span");

    productName.innerText = product.name;
    productPrice.innerText = product.price;
    increment.innerText = "+";
    decrement.innerText = "-";
    quantity.innerText = "0";

    quantityDiv.appendChild(increment);
    quantityDiv.appendChild(quantity);
    quantityDiv.appendChild(decrement);

    quantityDiv.className = "quantity-container";

    productDiv.appendChild(productName);
    productDiv.appendChild(productPrice);
    productDiv.appendChild(quantityDiv);

    productDiv.className = "product";
    productDiv.id = `product-${product.id}`;
    increment.id = `increment-${product.id}`;
    decrement.id = `decrement-${product.id}`;
    quantity.id = `quantity-${product.id}`;

    increment.addEventListener("click", (e) =>
      incrementQuantity(quantity.id, product.name, product.price, product.id)
    );
    decrement.addEventListener("click", (e) =>
      decrementQuantity(quantity.id, product.id)
    );

    productsContainer.appendChild(productDiv);
  });
};

function incrementQuantity(quantityId, prodName, prodPrice, prodId) {
  const currQuantity = document.getElementById(quantityId);
  currQuantity.innerText = (Number(currQuantity.innerText) + 1).toString();

  const cartItemId = `cart-${prodId}`;
  const cartItemDiv = document.getElementById(cartItemId);
  if (!cartItemDiv) {
    const divElement = document.createElement("div");
    const productName = document.createElement("span");
    const priceDiv = document.createElement("div");
    const quantity = document.createElement("span");
    const multiply = document.createElement("span");
    const price = document.createElement("span");

    productName.innerText = prodName;
    quantity.innerText = currQuantity.innerText;
    multiply.innerText = "x";
    price.innerText = prodPrice;

    priceDiv.appendChild(quantity);
    priceDiv.appendChild(multiply);
    priceDiv.appendChild(price);

    quantity.id = `cart-quantity-${prodId}`;

    divElement.appendChild(productName);
    divElement.appendChild(priceDiv);

    divElement.className = "cart-item";
    divElement.id = cartItemId;

    cartItemsContainer.appendChild(divElement);

    emptyCartText.style.display = "none";
  } else {
    const cartProdQuantity = document.getElementById(`cart-quantity-${prodId}`);
    cartProdQuantity.innerText = currQuantity.innerText;
  }

  const total = document.getElementById("total-price");
  let totalPrice = 0;

  Products.forEach((prod) => {
    const cartQuant = document.getElementById(`cart-quantity-${prod.id}`);
    const cartPrice = prod.price;

    if (cartQuant) totalPrice += Number(cartQuant.innerText) * cartPrice;
  });

  total.innerText = totalPrice.toString();
}

function decrementQuantity(quantityId, prodId) {
  const currQuantity = document.getElementById(quantityId);
  if (currQuantity.innerText !== "0") {
    currQuantity.innerText = (Number(currQuantity.innerText) - 1).toString();

    const cartItemQuantity = document.getElementById(`cart-quantity-${prodId}`);
    cartItemQuantity.innerText = currQuantity.innerText;

    if (currQuantity.innerText === "0") {
      const cartItem = document.getElementById(`cart-${prodId}`);
      if (cartItem) cartItemsContainer.removeChild(cartItem);

      if (document.getElementsByClassName("cart-item").length === 0)
        emptyCartText.style.display = "inline-block";
    }
  } else {
    if (document.getElementsByClassName("cart-item").length === 0)
      emptyCartText.style.display = "inline-block";
  }

  const total = document.getElementById("total-price");
  let totalPrice = 0;

  Products.forEach((prod) => {
    const cartQuant = document.getElementById(`cart-quantity-${prod.id}`);
    const cartPrice = prod.price;

    if (cartQuant) totalPrice += Number(cartQuant.innerText) * cartPrice;
  });

  total.innerText = totalPrice.toString();
}
