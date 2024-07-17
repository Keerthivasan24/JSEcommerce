import { product } from "./data.js";

let categories = [...new Set(product.map((item) => item))];
let i = 0;

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
                        <h2>$ ${price}.00</h2>
                        <button onclick='addtocart(${index})'>Add to cart</button>
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
    cart.push({ ...categories[index] });
    localStorage.setItem('cart', JSON.stringify(cart));
   
    document.getElementById("count").innerHTML = cart.length;
    console.log("Item added to cart");
}

window.displaycart = function () {
    
}

window.delElement = function (index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  
    document.getElementById("count").innerHTML = cart.length;
}

function CartCount() {
    document.getElementById("count").innerHTML = cart.length;
}


CartCount();

displayProducts(categories);

window.searchProducts = function () {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = categories.filter(product => product.title.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
}
