document.addEventListener('DOMContentLoaded', () => {
    // Get categoryId from querystring
    const params = new URLSearchParams(window.location.search);
    const categoryId = params.get('categoryId');

    // DOM references
    const categoryTitle = document.querySelector('h3.mb-4.text-center.text-danger');
    const productsContainer = document.querySelector('.row.row-cols-1, .row.row-cols-md-3');

    if (!categoryId) {
        categoryTitle.textContent = 'Category not found!';
        productsContainer.innerHTML = '';
        return;
    }

    // Fetch details for the given category
    fetch(`https://localhost:7096/api/Category/Details/${categoryId}`)
        .then(response => response.json())
        .then(data => {
            categoryTitle.textContent = `Category > ${data.name}`;

            productsContainer.innerHTML = ''; // Clear any static cards

            data.products.forEach(product => {
                // Optionally, set image from product.imageData if available
                let imgSrc = null; // fallback for laptops
                if (product.imageData) {
                    imgSrc = `data:image/png;base64,${product.imageData}`;
                }
                // You can set different fallback images based on category/product
                
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card h-100 text-center shadow-sm">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center">
                            <img src="${imgSrc}" alt="${product.name}" style="width:90px;height:90px;">
                            <h5 class="mt-3 card-title">${product.name}</h5>
                            <p class="card-text">SKU: ${product.sku}<br>Price: Rs ${product.price}</p>
                            <div class="d-flex justify-content-center gap-2 mt-3">
                                <a class="btn btn-info" href="specificProduct.html?productId=${product.productId}">View Details</a>
                                <button class="btn btn-primary">Buy</button>
                                <button class="btn btn-success">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(card);
            });
        })
        .catch(error => {
            categoryTitle.textContent = 'Failed to load category!';
            productsContainer.innerHTML = '<p class="text-danger text-center">Failed to load products.</p>';
        });
});
