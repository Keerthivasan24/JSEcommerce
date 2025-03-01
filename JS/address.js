
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('continue-button').addEventListener('click', function () {
    const name = document.getElementById('name').value;
    const contactNumber = document.getElementById('contact-number').value;
    const houseName = document.getElementById('house-name').value;
    const roadName = document.getElementById('road-name').value;
    const pincode = document.getElementById('pincode').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const errorMessage = document.getElementById('error-message');

    if (name && contactNumber && houseName && roadName && pincode && city && state) {
      document.location.href = "payment.html";
    } else {
      errorMessage.style.display = "block";
    }
  });
});
window.onload = function buykerthi() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const productContainer = document.getElementById('product-container');

  if (cart.length > 0) {
      cart.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.className = 'product-item';

          productDiv.innerHTML = `
              <img src="${product.image}" alt="${product.title}" />
              <div class="product-details">
                  <h3>${product.title}</h3>
                  <p>${product.description}</p>
                  <p>Price: ₹${product.price}</p>
              </div>
          `;

          productContainer.appendChild(productDiv);
      });
  } else {
      productContainer.innerHTML = '<p>No products in cart.</p>';
  }
}



