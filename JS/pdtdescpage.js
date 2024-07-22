import { product } from "./data.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let categories = [...new Set(product.map((item) => item))];

window.onload = function() {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        document.getElementById('productImage').src = selectedProduct.image;
        document.getElementById('productTitle').textContent = selectedProduct.title;
        document.getElementById('productPrice').textContent = `₹ ${selectedProduct.price}.00`;
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
    const countElement = document.getElementById("count");
    if (countElement) {
        countElement.innerHTML = cart.reduce((total, item) => total + item.quantity, 0) || 0;
    }
}

window.addToCart = function () {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        let itemInCart = cart.find(item => item.title === selectedProduct.title);

        if (itemInCart) {
            itemInCart.quantity += 1;
        } else {
            cart.push({ ...selectedProduct, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount(); // Update cart count in header
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
        document.getElementById('productPrice').textContent = `₹ ${product.price}.00`;
        document.getElementById('productDescription').textContent = product.description;
        productDetails.style.display = 'block';
        document.getElementById('noResults').style.display = 'none';
    } else {
        productDetails.style.display = 'none';
        document.getElementById('noResults').style.display = 'block';
    }
}

window.BuyNowHandle = function () {
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (selectedProduct) {
        // Store product details in localStorage
        localStorage.setItem('buyNowProduct', JSON.stringify(selectedProduct));
        // Redirect to payment page
        window.location.href = 'payment.html';
    }
}

updateCartCount();
