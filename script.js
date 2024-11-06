document,addEventListener('DOMContentLoaded', () => {

    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 59.99},
        {id: 3, name: "Product 3", price: 99.99},
    ];

    const cart = [];
    const productsList = document.getElementById('product-list');
    const cartItems = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById('cart-total');
    const totalPriceDisplay = document.getElementById('total-price');
    const checkOutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id='${product.id}'>Add to cart</button>
        `;
        productsList.appendChild(productDiv);
        
    });

    productsList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') {
           const productId = parseInt(e.target.getAttribute('data-id'));
           const product = products.find(p => p.id === productId);
           addtoCart(product);
            
            
        }
        
    })

    function addtoCart(product) {
        cart.push(product);
        renderCart();
        
    }

    function renderCart() {
        
        cartItems.innerText ="";

        let totalPrice = 0;

        if(cart.length > 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement('div');
                cartItem.innerHTML= `
                ${item.name} - $${item.price.toFixed(2)}

                `;
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `${totalPrice.toFixed(2)}`;
            });

        } else {
            cartItems.innerHTML = `<p id="empty-cart">Your cart is empty</p>`;
            cartTotalMessage.classList.add('hidden');

        }
    }

    checkOutBtn.addEventListener('click', () => {
        cart.length = 0;
        alert("Checkout Successfully");
        
        renderCart();

    })

});