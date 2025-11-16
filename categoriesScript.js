document.addEventListener('DOMContentLoaded', () => {
    // API URL for categories
    const apiUrl = 'https://localhost:7096/api/Category';

    // Container where categories cards will be rendered
    const categoriesContainer = document.querySelector('.row.row-cols-1');

    // Fetch categories from API
    fetch(apiUrl)
      .then(response => response.json())
      .then(categories => {
        categoriesContainer.innerHTML = ''; // Clear existing static cards

        categories.forEach(category => {

          // Take first product's imageData if exists
          let productImageSrc = null;

          if (category.products && category.products.length > 0) {
            const product = category.products[0];
            if (product.imageData) {
              // Assuming imageData is base64-encoded string, prefix with data URI scheme
              productImageSrc = `data:image/png;base64,${product.imageData}`;
            }
          }
            
          // Create category card element
          const colDiv = document.createElement('div');
          colDiv.className = 'col';
          
          colDiv.innerHTML = `
          <a href="specificCategory.html?categoryId=${category.categoryId}" style="text-decoration:none; color:inherit;">
              <div class="card h-100 text-center shadow-sm">
                  <div class="card-body d-flex flex-column justify-content-center align-items-center">
                      <img src="${productImageSrc}" alt="${category.name}" style="width:64px;height:64px;">
                      <h5 class="mt-3 card-title">${category.name}</h5>
                  </div>
              </div>
          </a>
      `;

          categoriesContainer.appendChild(colDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        categoriesContainer.innerHTML = '<p class="text-danger text-center">Failed to load categories.</p>';
      });
  });