
import { product } from "./data.js";

let categories = [...new Set(product.map((item) => item))];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayProducts(products) {
    const root = document.getElementById('root');
    if (products.length > 0) {
        root.innerHTML = products.map((item, index) => {
            var { image, title, price } = item;
            return (
                `<div class='box'>
                    <div class='img-box'>
                        <img class='images' src=${image} alt='${title}' />
                    </div> 
                    <div class='bottom'>
                        <p>${title}</p>
                        <h2>₹ ${price}.00</h2>
                        <button onclick='addtocart(${index})'>Add to cart</button>
                        <button onclick='viewinfo(${index})'>view info</button>
                    </div>
                </div>`
            );
        }).join(" ");
        document.getElementById('noResults').style.display = 'none';
    } else {
        root.innerHTML = '';
        document.getElementById('noResults').style.display = 'block';
    }
}

window.addtocart = function (index) {
    let itemInCart = cart.find(item => item.title === categories[index].title);

    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ ...categories[index], quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("count").innerHTML = cart.reduce((total, item) => total + item.quantity, 0);
    console.log("Item added to cart");
}

window.viewinfo =function(index){
    localStorage.setItem('selectedProduct', JSON.stringify(categories[index]));
    window.location.href='pdtdescpage.html';
}

window.displaycart = function () {
    let cartItemsHtml = '';
    let total = 0;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = 'Your Cart Is Empty';
        document.getElementById('total').textContent = '₹ 0.00';
    } else {
        cart.forEach((item, index) => {
            cartItemsHtml += `
                <div class="cart-item">
                    <div class="row-img">
                        <img class="rowimg" src="${item.image}">
                    </div>
                    <p>${item.title}</p>
                    <h2>₹ ${item.price}.00</h2>
                    <div class="quantity-controls">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            total += item.price * item.quantity;
        });

        document.getElementById('cartItem').innerHTML = cartItemsHtml;
        document.getElementById('total').textContent = `₹ ${total.toFixed(2)}`;
    }

    document.getElementById('count').textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

window.increaseQuantity = function (index) {
    cart[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

window.decreaseQuantity = function (index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

window.removeFromCart = function (index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

window.clearCart = function () {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
}

function CartCount() {
    document.getElementById("count").innerHTML = cart.reduce((total, item) => total + item.quantity, 0);
}

CartCount();

displayProducts(categories);

window.searchProducts = function () {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = categories.filter(product => product.title.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}

document.getElementById('clearCart').addEventListener('click', clearCart);
