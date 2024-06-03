    function herinneringPopup() {
        var huidigeDatum = new Date();
        var terugbrengDatum = new Date('2024-02-01');

        if (huidigeDatum > terugbrengDatum) {
            document.getElementById('reminderPopup').style.display = 'block';
        }
    }
    window.onload = herinneringPopup;

    document.addEventListener('DOMContentLoaded', function() {
        // Zoek de knop op basis van ID
        const terugKnop = document.getElementById('terugknop');
    
        // Voeg een event listener toe voor het klikken op de knop
        terugKnop.addEventListener('click', function() {
            // Navigeer naar de gewenste URL
            window.location.href = '/products';
        });
    });

    function highlightProduct(element) {
        element.style.backgroundColor = "lightgray";
    }
    
    function removeHighlight(element) {
        element.style.backgroundColor = "";
    }

    function goToProductPage(id) {
        window.location.href = "/tools/product/" + id;
    }

    // Voeg klikgebeurtenis toe aan elk product in de grid
    document.querySelectorAll('.product').forEach(item => {
        item.addEventListener('click', function() {
            // Haal het ID van het product op uit de data-attribuut
            let productId = this.getAttribute('data-product-id');
            // Navigeer naar de productpagina
            goToProductPage(productId);
        });
    });

    function filterTools() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const title = product.querySelector('h2').innerText.toLowerCase();
            const description = product.querySelector('p:nth-of-type(2)').innerText.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    function filterTools() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const products = document.querySelectorAll('.product');

        products.forEach(product => {
            const title = product.querySelector('h2').innerText.toLowerCase();
            const description = product.querySelector('p:nth-of-type(2)').innerText.toLowerCase();

            if (title.includes(searchValue) || description.includes(searchValue)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.getElementById('imageUpload').onchange = function(e) {
        const file = e.target.files[0];
        const imagePreview = document.getElementById('imagePreview');
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    
        // Controleer of een bestand is geselecteerd
        if (file) {
            // Maak een FileReader-object aan om de afbeelding te lezen
            const reader = new FileReader();
    
            // Wanneer het lezen van het bestand is voltooid
            reader.onload = function(e) {
                // Update de src van de <img> tag met de geüploade afbeelding
                imagePreview.src = e.target.result;
                // Toon de voorbeeldweergave van de afbeelding
                imagePreview.style.display = 'block';
            }
    
            // Lees het geselecteerde bestand als een data-URL
            reader.readAsDataURL(file);
        } else {
            // Verberg de voorbeeldweergave als er geen bestand is geselecteerd
            imagePreview.src = "#";
            imagePreview.style.display = 'none';
        }
    };


    $(document).ready(function() {
        setTimeout(function() {
            $('#successMessage').fadeOut('slow');
        }, 3000); // 3000 milliseconden = 3 seconden
    });


    document.addEventListener("DOMContentLoaded", function() {
        // Select all elements with the class 'product-status'
        let status = document.querySelectorAll('.product-status');

        // Iterate over each element and change the color based on the content
        status.forEach(function(element) {
                var statusText = element.textContent.trim();

            // Apply different colors based on the status text
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
        
    const searchInput = document.getElementById("search");
    
    searchInput.addEventListener("input", e => {
        const value = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll(".product");

        productCards.forEach(card => {
            const name = card.querySelector(".product-title").textContent.toLowerCase();
            const isVisible = name.includes(value);
            card.classList.toggle("hide", !isVisible); // Corrected to hide cards that do not match
        });
    });

    document.getElementById('imageUpload').onchange = function(e) {
        const file = e.target.files[0];
        const imagePreview = document.getElementById('imagePreview');
        const imagePreviewContainer = document.getElementById('imagePreviewContainer');
    
        // Controleer of een bestand is geselecteerd
        if (file) {
            // Maak een FileReader-object aan om de afbeelding te lezen
            const reader = new FileReader();
    
            // Wanneer het lezen van het bestand is voltooid
            reader.onload = function(e) {
                // Update de src van de <img> tag met de geüploade afbeelding
                imagePreview.src = e.target.result;
                // Toon de voorbeeldweergave van de afbeelding
                imagePreview.style.display = 'block';
            }
    
            // Lees het geselecteerde bestand als een data-URL
            reader.readAsDataURL(file);
        } else {
            // Verberg de voorbeeldweergave als er geen bestand is geselecteerd
            imagePreview.src = "#";
            imagePreview.style.display = 'none';
        }
    };

    document.querySelectorAll('.product').forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Verwijder de "Bekijk" knop
            this.querySelector('.btn-bekijk').style.display = 'none';
            // Laat het blokje oplichten
            this.style.backgroundColor = "lightgray";
        });
    
        item.addEventListener('mouseleave', function() {
            // Voeg de "Bekijk" knop weer toe wanneer de muis het element verlaat
            this.querySelector('.btn-bekijk').style.display = 'inline-block';
            // Verwijder de oplichtende kleur wanneer de muis het element verlaat
            this.style.backgroundColor = "";
        });
    
        // Navigeer naar de productpagina wanneer erop wordt geklikt
        item.addEventListener('click', function() {
            let productId = this.getAttribute('data-product-id');
            goToProductPage(productId);
        });
    });