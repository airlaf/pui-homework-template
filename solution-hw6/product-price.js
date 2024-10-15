//updating price on product detail page + add to cart

//glazing options and price changes
const glazingOptions = {
    "original": 0.00,
    "sugar-milk": 0.00,
    "vanilla-milk": 0.50,
    "double-chocolate": 1.50
};

//pack size options and price changes
const packSizeOptions = {
    "1": 1,
    "3": 3,
    "6": 5,
    "12": 10
};

//glazing change
function glazingChange() {
    updatePrice();
}

//pack size change
function packSizeChange() {
    updatePrice();
}

//update price based on selected options
function updatePrice() {
    //get selected glazing and pack size
    const selectedGlazing = document.getElementById("glazing").value;
    const selectedPackSize = document.getElementById("pack-size").value;

    //get the base price from rollsData.js
    const basePrice = rolls[rollType].basePrice;

    //updated price
    const glazingPrice = glazingOptions[selectedGlazing];
    const packMultiplier = packSizeOptions[selectedPackSize];
    const finalPrice = (basePrice + glazingPrice) * packMultiplier;

    //update price in the DOM
    const priceElement = document.querySelector(".product-price span");
    priceElement.textContent = `$${finalPrice.toFixed(2)}`;
}

//add event listeners to dropdowns
document.getElementById("glazing").addEventListener("change", glazingChange);
document.getElementById("pack-size").addEventListener("change", packSizeChange);

//price calculation
document.addEventListener("DOMContentLoaded", updatePrice);

//retrieve cart from local storage or create an empty array if it doesn't exist
cart = JSON.parse(localStorage.getItem('cart')) || [];

//roll class declaration
class Roll {
    constructor(rollType, rollGlazing, packSize, rollPrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = rollPrice;
    }
}

//get roll type from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//roll data 
const rolls = {
    "Original": { "basePrice": 2.49, "imageFile": "original-cinnamon-roll.jpg" },
    "Apple": { "basePrice": 3.49, "imageFile": "apple-cinnamon-roll.jpg" },
    "Raisin": { "basePrice": 2.99, "imageFile": "raisin-cinnamon-roll.jpg" },
    "Walnut": { "basePrice": 3.49, "imageFile": "walnut-cinnamon-roll.jpg" },
    "Double-Chocolate": { "basePrice": 3.99, "imageFile": "double-chocolate-cinnamon-roll.jpg" },
    "Strawberry": { "basePrice": 3.99, "imageFile": "strawberry-cinnamon-roll.jpg" }
};

//check if roll type exists in the rolls data
if (rolls[rollType]) {
    const roll = rolls[rollType];

    //update page content with roll details
    const heading = document.querySelector('h1');
    heading.textContent = `${rollType} Cinnamon Roll`;

    const image = document.querySelector('.product-detail-image');
    image.src = `assets/products/${roll.imageFile}`;

    const basePriceElement = document.querySelector(".product-price span");
    basePriceElement.textContent = `$${roll.basePrice.toFixed(2)}`;
}

function addToCart() {
    //get user selections for glazing and pack size
    const glazingSelect = document.getElementById("glazing");
    const selectedGlazing = glazingSelect.options[glazingSelect.selectedIndex].text; //retrieve full text for glazing

    const selectedPackSize = document.getElementById("pack-size").value;
    const rollPrice = parseFloat(document.querySelector(".product-price span").textContent.slice(1));

    //create a new Roll instance
    const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, rollPrice);

    //add the new roll to cart
    cart.push(newRoll);

    //save the updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    //log to console
    console.log("Cart contents:", JSON.parse(localStorage.getItem('cart')));
}

//add event listener to add to cart button
document.getElementById("add-to-cart-btn").addEventListener("click", addToCart);
