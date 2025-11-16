function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }
  
  async function loadProduct() {
    const productId = getQueryParam('productId');
    if (!productId) return;
  
    try {
      const response = await fetch(`https://localhost:7096/api/Product/Details/${productId}`);
      if (!response.ok) {
        console.error('Failed to fetch product details');
        return;
      }
  
      const product = await response.json();
  
      // Update title: {categoryName} > {productName}
      const productTitle = document.querySelector('h3');
      if (productTitle && product.category && product.category.name && product.name) {
        productTitle.textContent = `${product.category.name} > ${product.name}`;
      } else if (productTitle && product.name) {
        productTitle.textContent = product.name;
      }
  
      // Update price
      const priceElem = document.querySelector('.price');
      if (priceElem && product.price !== undefined) {
        priceElem.textContent = `Rs.${product.price}`;
      }
  
      // Load product image from imageData as base64 data url
      const productImg = document.querySelector('.product-img-big');
      if (
        productImg &&
        product.imageData // must be a base64 string!
      ) {
        // Use imageData directly—assume PNG, or use a more specific type if you have it, e.g. image/jpeg
        productImg.src = `data:image/png;base64,${product.imageData}`;
        productImg.alt = product.name || "Product Image";
      }
  
      // Optional: update .availability, etc.
    } catch (err) {
      console.error('Error loading product:', err);
    }
  }
  
  window.addEventListener('DOMContentLoaded', loadProduct);
  