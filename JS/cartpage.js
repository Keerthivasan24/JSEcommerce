document.addEventListener('DOMContentLoaded', function () {
    // Retrieve cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to display cart items
    function displayCartItems() {
        let cartItemsHtml = '';
        let total = 0;

        if (cart.length === 0) {
            document.getElementById('cartItem').innerHTML = 'Your Cart Is Empty';
            document.getElementById('total').textContent = '$ 0.00';
        } else {
            cart.forEach((item, index) => {
                cartItemsHtml += `
                    <div class="cart-item">
                        <div class="row-img">
                            <img class="rowimg" src="${item.image}">
                        </div>
                        <p>${item.title}</p>
                        <h2>$ ${item.price}.00</h2>
                        <button onclick="removeFromCart(${index})">Remove</button>
                    </div>
                `;
                total += item.price;
            });

            document.getElementById('cartItem').innerHTML = cartItemsHtml;
            document.getElementById('total').textContent = `$ ${total}.00`;
        }

        document.getElementById('count').innerHTML = cart.length;
    }

    // Function to remove item from cart
    window.removeFromCart = function (index) {
        cart.splice(index, 1);
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
