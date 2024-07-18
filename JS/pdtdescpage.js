import { product } from "./data.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let categories = [...new Set(product.map((item) => item))];

window.onload = function() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        document.getElementById('productImage').src = selectedProduct.image;
        document.getElementById('productTitle').textContent = selectedProduct.title;
        document.getElementById('productPrice').textContent = `$${selectedProduct.price}.00`;
        document.getElementById('productDescription').textContent = selectedProduct.description;
        document.getElementById('productDetails').style.display = 'block';
        document.getElementById('noResults').style.display = 'none';
    } else {
        document.getElementById('productDetails').style.display = 'none';
        document.getElementById('noResults').style.display = 'block';
    }
    updateCartCount();
};

function updateCartCount() {
    document.getElementById("count").innerHTML = cart.length;
}

window.addToCart = function () {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        cart.push(selectedProduct);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        console.log("Item added to cart");
    }
}

window.searchProducts = function () {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const filteredProducts = categories.filter(p => p.title.toLowerCase().includes(searchTerm));

    const productDetails = document.getElementById('productDetails');

    if (filteredProducts.length > 0) {
        const product = filteredProducts[0];
        document.getElementById('productImage').src = product.image;
        document.getElementById('productTitle').textContent = product.title;
        document.getElementById('productPrice').textContent = `$${product.price}.00`;
        document.getElementById('productDescription').textContent = product.description;
        productDetails.style.display = 'block';
        document.getElementById('noResults').style.display = 'none';
    } else {
        productDetails.style.display = 'none';
        document.getElementById('noResults').style.display = 'block';
    }
}


window.BuyNowHandle=function(){
    // TODO by Jothi Basu
}
updateCartCount();
