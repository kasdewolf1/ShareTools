    function herinneringPopup() {
        var huidigeDatum = new Date();
        var terugbrengDatum = new Date('2024-02-01');

        if (huidigeDatum > terugbrengDatum) {
            document.getElementById('reminderPopup').style.display = 'block';
        }
    }
    window.onload = herinneringPopup;

    document.querySelectorAll('.product').forEach(item => {
        item.addEventListener('click', function() {
            // Haal het ID van het product op uit de data-attribuut
            let productId = this.getAttribute('data-product-id');
            // Navigeer naar de productpagina
            goToProductPage(productId);
        });
    });
 // JavaScript om bericht na 3 seconden te verbergen
 $(document).ready(function() {
    // Verberg het succesbericht na 3 seconden
    setTimeout(function() {
        $('#successMessage').fadeOut('slow');
    }, 3000); // 3000 milliseconden = 3 seconden
});

// Labels (Beschikbaar, Niet Beschikbaar, Huidige status) worden andere kleuren
document.addEventListener("DOMContentLoaded", function() {
    let status = document.querySelectorAll('.product-status');

    status.forEach(function(element) {
            var statusText = element.textContent.trim();

        switch (statusText) {
            case 'Beschikbaar':
                element.style.color = '#3FA85C';
                element.style.backgroundColor = 'rgb(63, 168, 92, 20%)';
                break;
            case 'Niet beschikbaar':
                element.style.color = '#5980BC';
                element.style.backgroundColor = 'rgb(89, 128, 188, 20%)';
                break;
            case 'Huidige status':
                element.style.color = '#613FA8';
                element.style.backgroundColor = 'rgb(97, 63, 168, 20%)';
                break;
            default:
                element.style.color = '#333333';
                element.style.backgroundColor = 'rgb(55, 55, 55, 20%)';
                break;
            }
        });
    });

// Zoekbalk  
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const productCards = document.querySelectorAll(".product");

    productCards.forEach(card => {
        const name = card.querySelector(".product-title").textContent.toLowerCase();
        const isVisible = name.includes(value);
        card.classList.toggle("hide", !isVisible);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const products = document.querySelectorAll('.product');
    products.forEach(function(product) {
        product.addEventListener('click', function() {
            const productId = product.getAttribute('data-product-id');
            window.location.href = productId;
        });
    });
});
