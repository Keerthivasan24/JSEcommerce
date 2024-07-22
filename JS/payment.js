// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('submit-button').addEventListener('click', function () {
//     const paymentOptions = document.getElementsByName('payment');
//     const errorMessage = document.getElementById('error-message');
//     const successMessage = document.getElementById('success-message');
//     const submitButton = document.getElementById('submit-button');
//     let isSelected = false;
  
//     for (let i = 0; i < paymentOptions.length; i++) {
//       if (paymentOptions[i].checked) {
//         isSelected = true;
//         break;
//       }
//     }
//     if (isSelected) {
//       errorMessage.style.display = "none";
//       successMessage.style.display = "block";
//       submitButton.style.display = "none"; // Hide the button
//       setTimeout(() => {
//         successMessage.style.display = "none";
//         submitButton.style.display = "block"; // Show the button again after 2 seconds
//       }, 2000);
//     } else {
//       errorMessage.style.display = "block";
//       successMessage.style.display = "none";
//     }
//   });
// });


  

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
