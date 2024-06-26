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


// STATUS KLEUREN
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
              element.style.color = '#BC3030';
              element.style.backgroundColor = 'rgb(188, 48, 48, 20%)';
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



    // ZOEKBALK
    const searchInput = document.getElementById("search");

    function toggleProductVisibility(products, isVisible) {
      products.forEach(product => {
          if (isVisible) {
              product.style.display = "block";
          } else {
              product.style.display = "none";
          }
      });
    }

    searchInput.addEventListener("input", e => {
      const value = e.target.value.toLowerCase().trim();
      const productCards = document.querySelectorAll(".product");
  
      productCards.forEach(card => {
          const name = card.querySelector(".product-title").textContent.toLowerCase();
          const isVisible = name.includes(value);
          card.style.display = isVisible ? "block" : "none";
      });
  });
  

// FILTERBAR
document.getElementById('filterBtn').addEventListener('click', function() {
    document.getElementById('filterBar').classList.add('show');
    document.getElementById('filterBackground').style.display = 'block';
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('filterBar').classList.remove('show');
    document.getElementById('filterBackground').style.display = 'none';
});
document.getElementById('filtersToevoegen').addEventListener('click', function() {
  document.getElementById('filterBar').classList.remove('show');
  document.getElementById('filterBackground').style.display = 'none';
});


document.querySelectorAll('.expand-btn').forEach(function(button) {
  button.addEventListener('click', function() {
    var listCombined = this.nextElementSibling;
    var dropdownIcon = this.querySelector('img');

    if (listCombined.style.visibility === 'visible') {
        listCombined.style.visibility = 'hidden';
        listCombined.style.maxHeight = '0'
        dropdownIcon.src = 'img/dropdown-closed.svg';
    } else {
        listCombined.style.visibility = 'visible';
        listCombined.style.maxHeight = '100%';
        listCombined.style.opacity = '1'
        dropdownIcon.src = 'img/dropdown-open.svg';
    }
  });
});


document.addEventListener("DOMContentLoaded", function() {
  const filtersToevoegenBtn = document.getElementById("filtersToevoegen");

  let selectedFilters = {
    afmetingen: [],
    favoriet: [],
    publiek: [],
    status: []
  };

  const filterOptions = document.querySelectorAll('.dropdown-content input[type="checkbox"]');

  filterOptions.forEach(checkbox => {
    checkbox.addEventListener("change", (event) => {
        const category = event.target.name;
        if (event.target.checked) {
            selectedFilters[category].push(event.target.value);
        } else {
            selectedFilters[category] = selectedFilters[category].filter(value => value !== event.target.value);
        }
        applyFilters(); // Roep applyFilters aan na elke filterwijziging
    });
});

  document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('filterBar').classList.remove('show');
    document.getElementById('filterBackground').style.display = 'none';
    applyFilters(); // Roep applyFilters aan na het sluiten van de filterbalk
  });

  function applyFilters() {
    const products = document.querySelectorAll(".product");
    products.forEach(product => {
      const productAfmeting = product.querySelector(".product-afmeting")?.innerText.toLowerCase() || '';
      const productFavoriet = product.querySelector(".favoriet-icon") ? 'favoriet' : '';
      const productStatus = product.querySelector(".product-status")?.innerText.toLowerCase() || '';
      const productPubliek = product.querySelector(".product-publiek")?.innerText.toLowerCase() || '';

      const afmetingenMatch = selectedFilters.afmetingen.length === 0 || selectedFilters.afmetingen.some(filter => productAfmeting.includes(filter.toLowerCase()));
      const favorietMatch = selectedFilters.favoriet.length === 0 || (selectedFilters.favoriet.includes("Favoriet") && productFavoriet === 'favoriet') || (selectedFilters.favoriet.includes("Niet Favoriet") && productFavoriet === '');
      const publiekMatch = selectedFilters.publiek.length === 0 || selectedFilters.publiek.some(filter => productPubliek === filter.toLowerCase());
      const statusMatch = selectedFilters.status.length === 0 || selectedFilters.status.some(filter => productStatus === filter.toLowerCase());

      if (afmetingenMatch && favorietMatch && publiekMatch && statusMatch) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  }
});


// TO EDIT A PAGE
function goToEditPage(id) {
    window.location.href = "/tools/bewerken/" + id;
  }

  document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.btn-bewerken');
    if (editButton) {
      editButton.addEventListener('click', function() {
        const productIdForEdit = this.getAttribute('data-product-id');
        goToEditPage(productIdForEdit);
      });
    }
  });

    
  function goToProductPage(id) {
    window.location.href = "/tools/product/" + id;
}

document.addEventListener('DOMContentLoaded', function() {
    const editButton = document.querySelector('.btn-terug');
    if (editButton) {
      editButton.addEventListener('click', function() {
        const productIdForEdit = this.getAttribute('data-product-id');
        goToProductPage(productIdForEdit);
      });
    }
  });
