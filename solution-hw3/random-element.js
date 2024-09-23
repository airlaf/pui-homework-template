//base price for cinnamon roll
const basePrice = 2.49;

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
