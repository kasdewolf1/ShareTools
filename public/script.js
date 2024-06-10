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


// FILTERBAR

document.getElementById('filterBtn').addEventListener('click', function() {
    document.getElementById('filterBar').classList.add('show');
});

document.getElementById('closeBtn').addEventListener('click', function() {
    document.getElementById('filterBar').classList.remove('show');
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
    // Elements
    const filterBar = document.getElementById("filterBar");
    const filtersToevoegenBtn = document.getElementById("filtersToevoegen");
    const selectedFiltersList = document.getElementById("selectedFiltersList");
  
    // Filter logic
    let selectedFilters = {
      groot: [],
      klein: [],
      favoriet: [],
      nietfavoriet: [],
      publiek: [],
      nietpubliek: [],
      beschikbaar: [],
      nietbeschikbaar: [],
      huidigestatus: []
    };
  
    const filterOptions = document.querySelectorAll('.dropdown-content input[type="checkbox"]');
  
    filterOptions.forEach(option => {
      option.addEventListener("change", function() {
        const filterCategory = option.name.replace("-", "");
        if (selectedFilters[filterCategory]) {
          if (this.checked) {
            selectedFilters[filterCategory].push(this.value);
          } else {
            selectedFilters[filterCategory] = selectedFilters[filterCategory].filter(val => val !== this.value);
          }
        } else {
          console.error(`Unknown filter category: ${filterCategory}`);
        }
      });
    });
  
    filtersToevoegenBtn.addEventListener("click", function() {
      applyFilters();
      displaySelectedFilters();
    });
  
    function applyFilters() {
      const products = document.querySelectorAll(".product");
      products.forEach(product => {
        const productTitle = product.querySelector(".product-title").innerText.toLowerCase();
        const productStatus = product.querySelector(".product-status").innerText.toLowerCase();
        const productBeschrijving = product.querySelector(".product-beschrijving").innerText.toLowerCase();
  
        const grootMatch = selectedFilters.groot.length === 0 || selectedFilters.groot.some(filter => productTitle.includes(filter.toLowerCase()));
        const kleinMatch = selectedFilters.klein.length === 0 || selectedFilters.klein.some(filter => productTitle.includes(filter.toLowerCase()));
        const favorietMatch = selectedFilters.favoriet.length === 0 || selectedFilters.favoriet.some(filter => productStatus.includes(filter.toLowerCase()));
        const nietFavorietMatch = selectedFilters.nietfavoriet.length === 0 || selectedFilters.nietfavoriet.some(filter => productStatus.includes(filter.toLowerCase()));
        const publiekMatch = selectedFilters.publiek.length === 0 || selectedFilters.publiek.some(filter => productBeschrijving.includes(filter.toLowerCase()));
        const nietPubliekMatch = selectedFilters.nietpubliek.length === 0 || selectedFilters.nietpubliek.some(filter => productBeschrijving.includes(filter.toLowerCase()));
        const beschikbaarMatch = selectedFilters.beschikbaar.length === 0 || selectedFilters.beschikbaar.some(filter => productStatus.includes(filter.toLowerCase()));
        const nietBeschikbaarMatch = selectedFilters.nietbeschikbaar.length === 0 || selectedFilters.nietbeschikbaar.some(filter => productStatus.includes(filter.toLowerCase()));
        const huidigestatusMatch = selectedFilters.huidigestatus.length === 0 || selectedFilters.huidigestatus.some(filter => productStatus.includes(filter.toLowerCase()));
  
        if (grootMatch && kleinMatch && favorietMatch && nietFavorietMatch && publiekMatch && nietPubliekMatch && beschikbaarMatch && nietBeschikbaarMatch && huidigestatusMatch) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }
  
    function displaySelectedFilters() {
      selectedFiltersList.innerHTML = "";
      for (const category in selectedFilters) {
        selectedFilters[category].forEach(filter => {
          const li = document.createElement("li");
          li.innerText = `${category}: ${filter}`;
          selectedFiltersList.appendChild(li);
        });
      }
    }
  });
  