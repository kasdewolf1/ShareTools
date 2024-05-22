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