document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const emptyCartMessage = document.getElementById('empty-cart');
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    let products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 59.99},
        {id: 3, name: "Product 3", price: 99.99},
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    displayCart();

    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add("product");
        div.innerHTML = `<span>${product.name} - $${product.price}</span>
        <button data-id=${product.id}>Add to cart</button>`;
        productList.appendChild(div);
    });
    
    productList.addEventListener('click', (e) => {
        if(e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const selectedProduct = products.find(p => p.id === productId);
           
            addToCart(selectedProduct);
            
        }
        
    })

    function addToCart(selectedProduct) {
        const productWithCartID = { ...selectedProduct, cartID: Date.now() };
        cart.push(productWithCartID);
        saveCart();
        displayCart();
    }

    function displayCart() {

       

        if(cart.length> 0) {
            emptyCartMessage.classList.add('hidden');
            cartTotalMessage.classList.remove('hidden');
            cartItems.innerText= ``;
            let total = 0;
            cart.forEach(prod => {
                const cartDiv = document.createElement('div');
                cartDiv.classList.add("cartItem");
                cartDiv.innerHTML = `<span>${prod.name} - $${prod.price}</span>
                <button data-id=${prod.cartID}>Remove</button>`;
                cartItems.appendChild(cartDiv);
                total += prod.price;
            });

            totalPriceDisplay.textContent = `${total}`;
            console.log(total);

        } else {
            cartItems.innerHTML= `<p id="empty-cart">Your cart is empty</p>`;
            cartTotalMessage.classList.add('hidden');
        }
        
    }

    cartItems.addEventListener('click', (e) => {
        e.stopPropagation();
        if(e.target.tagName === "BUTTON") {
            const cID = parseInt(e.target.getAttribute('data-id'));
            console.log(cID);
            
            cart= cart.filter(i => i.cartID !== cID);
            console.log(cart);
            saveCart();
            displayCart();
            
            
        }
        
    });

    checkoutButton.addEventListener('click', () => {
        cart.length = 0;
        saveCart();
        displayCart();
        alert("Checkout Successful");

    });


    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }



});




