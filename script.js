let cart = 0;

// 🛒 Add to cart
function addToCart(carName) {
    cart++;
    document.getElementById("cartCount").innerText = cart;
    alert(carName + " added to cart 🚗");
}

// 🔍 Search function
function searchCars() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cars = document.getElementsByClassName("car");

    for (let i = 0; i < cars.length; i++) {
        let title = cars[i].getElementsByTagName("h2")[0].innerText.toLowerCase();

        if (title.includes(input)) {
            cars[i].style.display = "block";
        } else {
            cars[i].style.display = "none";
        }
    }
}