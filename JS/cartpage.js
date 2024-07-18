document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items
    function displayCartItems() {
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
                    </div>
                `;
                total += item.price * item.quantity; // Calculate total based on item price and quantity
            });

            document.getElementById('cartItem').innerHTML = cartItemsHtml;
            document.getElementById('total').textContent = `₹ ${total.toFixed(2)}`; // Display total formatted to 2 decimal places
        }

        document.getElementById('count').textContent = cart.reduce((acc, item) => acc + item.quantity, 0); // Update cart item count
    }

    // Function to increase item quantity

    window.increaseQuantity = function (index) {
        cart[index].quantity++;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    };

    // Function to decrease item quantity
    window.decreaseQuantity = function (index) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            cart.splice(index, 1); // Remove item from cart if quantity is 1
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    };

    // Function to clear the cart
    window.clearCart = function () {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    };

    // Initial display of cart items
    displayCartItems();

    // Event listener for clearing the cart
    document.getElementById('clearCart').addEventListener('click', clearCart);
});

window.buynowfunc=function(){
    //TODO BY JOTHI Buy Now button from cart page. 
};
