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
<<<<<<< HEAD

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

        
=======
>>>>>>> parent of 99a6794 (GOEDE VERSIE NOOIT WEGHALEN)
