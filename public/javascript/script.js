(() => {
    'use strict'


    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

<<<<<<< HEAD

//include tax switch
=======
//include tax switch

>>>>>>> 581ccff (Deleted index.js, updated script.js and index.ejs, added app.js)
const switchButton = document.getElementById("flexSwitchCheckDefault");
const priceElements = document.querySelectorAll(".price");
const taxInfos = document.querySelectorAll(".tax-info");

switchButton.addEventListener("change", (e) => {
    priceElements.forEach((priceElement, index) => {
        const originalPrice = parseFloat(priceElement.getAttribute("data-original-price"));
        const taxInfo = taxInfos[index];

        if (e.target.checked) {
            const priceWithTax = originalPrice * 1.18;
            priceElement.textContent = `₹ ${priceWithTax.toLocaleString("en-in")} / Night`;
            taxInfo.style.visibility = "visible";
        } else {
            priceElement.textContent = `₹ ${originalPrice.toLocaleString("en-in")} / Night`;
            taxInfo.style.visibility = "hidden";
        }
    });
});

// Responsive collapse behavior for smaller screens
function handleResize() {
    const cards = document.querySelectorAll('.collapse-card');
    if (window.innerWidth < 768) { // Collapse on mobile
        cards.forEach(card => {
            card.style.transition = 'height 0.3s ease';
            card.style.height = 'auto';
        });
<<<<<<< HEAD
    } else { 
=======
    } else { // Expand on desktop
>>>>>>> 581ccff (Deleted index.js, updated script.js and index.ejs, added app.js)
        cards.forEach(card => {
            card.style.height = '100%';
        });
    }
}

window.addEventListener('resize', handleResize);
<<<<<<< HEAD
handleResize(); 


=======
handleResize(); // Initial call


//filter
// Price Filter
>>>>>>> 581ccff (Deleted index.js, updated script.js and index.ejs, added app.js)
// Price Filter
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const minPrice = this.getAttribute('data-min');
        const maxPrice = this.getAttribute('data-max');
        filterListings(minPrice, maxPrice);
    });
});

function filterListings(minPrice, maxPrice) {
    const listings = document.querySelectorAll('.listing-item');

    // Show all if Clear Filter is clicked
    if (minPrice === '' && maxPrice === '') {
        listings.forEach(listing => listing.style.display = 'block');
        return; // Exit early if no filter
    }

    listings.forEach(listing => {
        const price = parseFloat(listing.getAttribute('data-price'));

        // Price filter condition
        let priceMatch = true;
        if (minPrice !== '' && maxPrice !== '') {
            priceMatch = price >= parseFloat(minPrice) && price <= parseFloat(maxPrice);
        } else if (minPrice !== '' && maxPrice === '') {
            priceMatch = price >= parseFloat(minPrice);
        }

        // Show/hide listing based on price condition
        if (priceMatch) {
            listing.style.display = 'block';
        } else {
            listing.style.display = 'none';
        }
    });
}
