    function herinneringPopup() {
    var huidigeDatum = new Date();
    var terugbrengDatum = new Date('2024-02-01');

    if (huidigeDatum > terugbrengDatum) {
        document.getElementById('reminderPopup').style.display = 'block';
    }
}
window.onload = herinneringPopup;



document.addEventListener('DOMContentLoaded', function() {
    // Select the grid-div
    const productGrid = document.getElementById('productGrid');

    // Add a click event listener to the grid-div
    productGrid.addEventListener('click', function(event) {
        // Check if a productdiv was clicked
        if (event.target.classList.contains('product')) {
            // Get the product ID from the data attribute
            let productId = event.target.getAttribute('data-product-id');
            // Store the product ID in localStorage
            localStorage.setItem('productId', productId);
            // Redirect to the productinfo page with the product ID as a query parameter
            window.location.href = `/productinfo?productId=${productId}`;
        }
    });
});


        // Add mouse enter event listener to highlight the product
        item.addEventListener('mouseenter', function() {
            this.querySelector('.btn-bekijk').style.display = 'none'; // Remove the "Bekijk" button
            this.style.backgroundColor = "lightgray"; // Highlight the product
        });

        // Add mouse leave event listener to remove highlight
        item.addEventListener('mouseleave', function() {
            this.querySelector('.btn-bekijk').style.display = 'inline-block'; // Add back the "Bekijk" button
            this.style.backgroundColor = ""; // Remove the highlight
        });


    let imageUpload = document.getElementById('imageUpload');
    let imagePreview = document.getElementById('imagePreview');

    // Image preview functionality
    imageUpload.onchange = function(e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = 'block';
            }

            reader.readAsDataURL(file);
        } else {
            imagePreview.src = "#";
            imagePreview.style.display = 'none';
        }
    };

    // Fade out success message after 3 seconds
    setTimeout(function() {
        $('#successMessage').fadeOut('slow');
    }, 3000);

    // Change color of product status based on content
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
