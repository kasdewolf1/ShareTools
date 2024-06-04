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

    function deleteProduct(id) {
        if (confirm('Weet je zeker dat je dit product wilt verwijderen?')) {
            $.ajax({
                url: `/tools/${id}`,
                type: 'DELETE',
                success: function(result) {
                    alert(result.message);
                    location.reload();
                },
                error: function(xhr, status, error) {
                    alert(xhr.responseText);
                }
            });
        }
    }
    
    function highlightProduct(element) {
        element.style.backgroundColor = "#F4F2F1";
        element.style.transition = "ease-in-out 0.2s";
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
            // Haal het ID van het product op uit het data-attribuut
            let productId = this.getAttribute('data-product-id');
            // Navigeer naar de productpagina
            goToProductPage(productId);
        });
    
        // Voeg mouseover en mouseout events toe voor highlight
        item.addEventListener('mouseover', function() {
            highlightProduct(this);
        });
    
        item.addEventListener('mouseout', function() {
            removeHighlight(this);
        });
    });


    // ZOEKBALK
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

    // STATUS KLEUREN
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
