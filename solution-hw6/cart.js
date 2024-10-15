//shopping cart page display items and removal

//retrieve cart from local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

//display cart items
function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');

    //only run if cartItemsContainer exists 
    if (!cartItemsContainer || !totalPriceElement) {
        //return if doesn't exist
        return;
    }

    let totalPrice = 0;

    //clear existing cart items
    cartItemsContainer.innerHTML = '';

    //loop through each item in the cart and display it
    cart.forEach((roll, index) => {
        
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');  
        
        //create HTML structure for displayed items
        cartItemDiv.innerHTML = `
            <div class="cart-item-image-container">
                <img src="assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg" class="cart-item-image">
                <p class="remove-item" onclick="removeItem(${index})">Remove</p>
            </div>
            <div class="cart-item-text">
                <p>${roll.type} Cinnamon Roll</p>
                <p>${roll.glazing}</p>
                <p>Pack Size: ${roll.size}</p>
            </div>
            <div class="cart-item-price">
                <p class="cart-item-price">$${roll.basePrice.toFixed(2)}</p>
            </div>
        `;

        //append cart item to the container
        cartItemsContainer.appendChild(cartItemDiv);

        //calculate total price
        totalPrice += roll.basePrice;
    });

    //update total price in the DOM
    totalPriceElement.textContent = `${totalPrice.toFixed(2)}`;
}

//call displayCartItems to populate the cart, but only if the container exists
displayCartItems(cart);


//remove item from cart
function removeItem(index) {
    //remove item at the specified index
    cart.splice(index, 1);

    //update local storage with modified cart
    localStorage.setItem('cart', JSON.stringify(cart));

    //re-display the updated cart
    displayCartItems(cart);
}
