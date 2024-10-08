//roll data
const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

//get roll type from URL
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');

//check if roll type exists 
if (rolls[rollType]) {
    const roll = rolls[rollType];

    //update heading
    const heading = document.querySelector('h1');
    heading.textContent = `${rollType} Cinnamon Roll`;

    //update image
    const image = document.querySelector('.product-detail-image');
    image.src = `assets/products/${roll.imageFile}`;

    //set base price
    const basePriceElement = document.querySelector(".product-price span");
    basePriceElement.textContent = `$${roll.basePrice.toFixed(2)}`;
}
