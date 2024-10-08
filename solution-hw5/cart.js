//roll class
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
        this.price = this.calculatePrice();
    }

    //calculate price based on pack size and glazing
    calculatePrice() {
        const packSizeMultiplier = {
            1: 1,
            3: 3,
            6: 5, 
            12: 10 
        };

        const glazingPrice = {
            "Sugar Milk": 0,  
            "Vanilla Milk": 0.50,  //extra charge for vanilla glazing
            "Original": 0  
        };

        //(base price + glazing price)*pack size
        const finalPrice = (this.basePrice + glazingPrice[this.glazing]) * packSizeMultiplier[this.size];
        return finalPrice;
    }
}

//initialize the shopping cart
const cart = [
    new Roll('Original', 'Sugar Milk', 1, 2.49),
    new Roll('Walnut', 'Vanilla Milk', 12, 3.49),
    new Roll('Raisin', 'Sugar Milk', 3, 2.99),
    new Roll('Apple', 'Original', 3, 3.49)
];


//display cart items on the shopping cart page
function displayCartItems(cart) {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    //clear any existing cart items before displaying
    cartItemsContainer.innerHTML = '';

    //loop through cart and display each item
    cart.forEach((roll, index) => {
        //create a div element for the cart item
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        //set innerHTML for the cart item
        cartItemDiv.innerHTML = `
            <div class="cart-item-image-container">
                <img src="assets/products/${roll.type.toLowerCase()}-cinnamon-roll.jpg" class="cart-item-image">
                <p class="remove-item" onclick="removeItem(${index})">Remove</p>
            </div>
            <div class="cart-item-text">
                <p>${roll.type} Cinnamon Roll</p>
                <p>Glazing: ${roll.glazing}</p>
                <p>Pack Size: ${roll.size}</p>
            </div>
            <p class="cart-item-price">$${roll.price.toFixed(2)}</p>
        `;

        //append cart item div to the cart items container
        cartItemsContainer.appendChild(cartItemDiv);

        //update total price
        totalPrice += roll.price;
    });

    //update total price element 
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

//remove item from the cart 
function removeItem(index) {
    //remove item from the cart array
    cart.splice(index, 1);
    
    //re-display updated cart
    displayCartItems(cart);
}

//call displayCartItems when the page loads
window.onload = function() {
    displayCartItems(cart);
};
