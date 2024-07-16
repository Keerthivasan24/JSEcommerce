import { product } from "./data.js";

let categories = [...new Set(product.map((item) => item))];
let i = 0;

// Initialize cart array, retrieve from localStorage if it exists
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('root').innerHTML = categories.map((item) => {
    var { image, title, price } = item;
    return (
        `<div class='box'>
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div> 
            <div class='bottom'>
                <p>${title}</p>
                <h2>$ ${price}.00</h2>` +
        `<button onclick='addtocart(${i++})'>Add to cart</button>` +
        `</div>
        </div>`
    );
}).join('');

window.addtocart = function (a) { // Using window to make the function globally accessible
    cart.push({ ...categories[a] });
    localStorage.setItem('cart', JSON.stringify(cart));
    displaycart();
    console.log("Item added to cart");
}

window.displaycart = function () {
    let j = 0, total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById("cartItem").innerHTML = "Your Cart Is Empty";
        document.getElementById("total").innerHTML = "$ 0.00";
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((items) => {
            var { image, title, price } = items;
            total += price;
            return (
                `<div class='cart-item'> 
                <div class='row-img'>
                    <img class='rowimg' src=${image}>
                </div>
                <p style='font-size:12px;'>${title}</p>
                <h2 style='font-size: 15px;'>$ ${price}.00</h2>` +
                `<i class='fa-solid fa-trash' onclick='delElement(${j++})'></i></div>`
            );
        }).join('');
        document.getElementById("total").innerHTML = `$ ${total}.00`;
    }
}

window.delElement = function (index) {
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
    displaycart(); // Update displayed cart items
}

// Initial display of cart items and total
displaycart();
