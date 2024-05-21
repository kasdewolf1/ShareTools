    function herinneringPopup() {
        var huidigeDatum = new Date();
        var terugbrengDatum = new Date('2024-02-01');

        if (huidigeDatum > terugbrengDatum) {
            document.getElementById('reminderPopup').style.display = 'block';
        }
    }
    window.onload = herinneringPopup;

    function deleteProduct(productId) {
        // Send an HTTP DELETE request to delete the product
        $.ajax({
            url: `/tools/${productId}`,
            type: 'DELETE',
            success: function(response) {
                // On successful deletion, show a success message
                $('#successMessage').text(response.message).fadeIn();
            },
            error: function(error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        });
    }
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

    const imageUrl = `/uploads/${req.file.filename}`;