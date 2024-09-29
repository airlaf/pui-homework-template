class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing = rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

//array to store selected items
const cart = [];

//add to cart 
document.querySelector('.add-to-cart').addEventListener('click', function() {
    const selectedGlazing = document.getElementById("glazing").value;
    const selectedPackSize = document.getElementById("pack-size").value;
    const basePrice = rolls[rollType].basePrice;

    //create new Roll object
    const newRoll = new Roll(rollType, selectedGlazing, selectedPackSize, basePrice);

    //add to cart array
    cart.push(newRoll);

    //print in console
    console.log(cart);
});
