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
    } else {
        cards.forEach(card => {
            card.style.height = '100%';
        });
    }
}

window.addEventListener('resize', handleResize);
handleResize(); 


handleResize(); // Initial call



// Price Filter// Price Filter
document.addEventListener("DOMContentLoaded", () => {
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

        // Convert minPrice and maxPrice to numbers or set to null if empty
        const min = minPrice ? parseFloat(minPrice) : null;
        const max = maxPrice ? parseFloat(maxPrice) : null;

        listings.forEach(listing => {
            const price = parseFloat(listing.getAttribute('data-price'));
            
            // Check price range conditions
            let priceMatch = true;
            if (min !== null && max !== null) {
                priceMatch = price >= min && price <= max;
            } else if (min !== null) {
                priceMatch = price >= min;
            } else if (max !== null) {
                priceMatch = price <= max;
            }

            listing.style.display = priceMatch ? 'block' : 'none';
        });

        // Reset filter condition: show all listings if both min and max are null
        if (min === null && max === null) {
            listings.forEach(listing => listing.style.display = 'block');
        }
    }
});
