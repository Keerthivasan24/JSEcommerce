
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const products = JSON.parse(urlParams.get('products') || '[]');

  const productContainer = document.getElementById('product-container');

  products.forEach(product => {
    const productDetails = document.createElement('div');
    productDetails.className = 'product-details';
    productDetails.innerHTML = `
  <img src="${product.image}" alt="Product Image">
  <p>Product Name: ${product.name}</p>
  <p>Price: $${product.price}</p>
  <p>Quantity: ${product.quantity}</p>
`;
    productContainer.appendChild(productDetails);
  });

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
      // errorMessage.innerHTML = "Please fill in all fields.";
      errorMessage.style.display = "block";
    }
  });
});