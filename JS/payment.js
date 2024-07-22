document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submit-button').addEventListener('click', function () {
    const paymentOptions = document.getElementsByName('payment');
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');
    const submitButton = document.getElementById('submit-button');
    let isSelected = false;
  
    for (let i = 0; i < paymentOptions.length; i++) {
      if (paymentOptions[i].checked) {
        isSelected = true;
        break;
      }
    }
    if (isSelected) {
      errorMessage.style.display = "none";
      successMessage.style.display = "block";
      submitButton.style.display = "none"; // Hide the button
      setTimeout(() => {
        successMessage.style.display = "none";
        submitButton.style.display = "block"; // Show the button again after 2 seconds
      }, 2000);
    } else {
      errorMessage.style.display = "block";
      successMessage.style.display = "none";
    }
  });
});


  

// Function to load cart items from localStorage and display them in the price details section
function loadPriceDetails() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productContainer = document.getElementById('product-container');
  let totalAmount = 0;

  if (cart.length > 0) {
    cart.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product-item';

      productDiv.innerHTML = `
        <div class="product-details">
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>Price: ₹${product.price}</p>
          <p>Quantity: ${product.quantity}</p>
        </div>
      `;

      totalAmount += product.price * product.quantity;
      productContainer.appendChild(productDiv);
    });

    // Append the total amount to the product container
    const totalDiv = document.createElement('div');
    totalDiv.className = 'total-amount';
    totalDiv.innerHTML = `<h3>Total Amount: ₹${totalAmount}</h3>`;
    productContainer.appendChild(totalDiv);
  } else {
    productContainer.innerHTML = '<p>No products in cart.</p>';
  }
}
