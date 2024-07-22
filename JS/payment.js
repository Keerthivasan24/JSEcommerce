window.onload = function() {
    const buyNowCart = JSON.parse(localStorage.getItem('buyNowCart'));
    if (buyNowCart && buyNowCart.length > 0) {
        let productContainerHtml = '';
        let total = 0;
        buyNowCart.forEach((item, index) => {
            productContainerHtml += `
                <div class="product-item">
                    <img src="${item.image}" alt="${item.title}" />
                    <p>${item.title}</p>
                    <p id="productPrice${index}">₹ ${item.price * item.quantity}.00</p>
                    <p>${item.description}</p>
                    <div>
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <span id="productQuantity${index}">${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                </div>
            `;
            total += item.price * item.quantity;
        });
        document.getElementById('product-container').innerHTML = productContainerHtml;
        document.getElementById('total').textContent = `₹ ${total.toFixed(2)}`;
    } else {
        document.getElementById('product-container').innerHTML = 'No product details available.';
    }

    document.getElementById('submit-button').addEventListener('click', function() {
        alert('Order confirmed!');
        // Additional payment processing code can go here
    });
};

function increaseQuantity(index) {
    let buyNowCart = JSON.parse(localStorage.getItem('buyNowCart'));
    buyNowCart[index].quantity++;
    localStorage.setItem('buyNowCart', JSON.stringify(buyNowCart));
    updateProductDetails(index);
}

function decreaseQuantity(index) {
    let buyNowCart = JSON.parse(localStorage.getItem('buyNowCart'));
    if (buyNowCart[index].quantity > 1) {
        buyNowCart[index].quantity--;
    } else {
        buyNowCart.splice(index, 1);
    }
    localStorage.setItem('buyNowCart', JSON.stringify(buyNowCart));
    updateProductDetails(index);
}

function updateProductDetails(index) {
    const buyNowCart = JSON.parse(localStorage.getItem('buyNowCart'));
    const item = buyNowCart[index];
    document.getElementById(`productQuantity${index}`).textContent = item.quantity;
    document.getElementById(`productPrice${index}`).textContent = `₹ ${item.price * item.quantity}.00`;
    let total = buyNowCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById('total').textContent = `₹ ${total.toFixed(2)}`;
}
