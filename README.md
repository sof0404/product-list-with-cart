# Frontend Mentor - Product list with cart solution

This is a solution to the [Product list with cart challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- ✅ Add items to the cart and remove them
- ✅ Increase/decrease the number of items in the cart
- ✅ See an order confirmation modal when they click "Confirm Order"
- ✅ Reset their selections when they click "Start New Order"
- ✅ View the optimal layout for the interface depending on their device's screen size
- ✅ See hover and focus states for all interactive elements on the page

### Screenshot

![Product List with Cart Solution](./preview.jpg)

### Links

- Solution URL: [GitHub Repository](https://github.com/sof0404/product-list-with-cart)
- Live Site URL: [Live Demo](http://localhost:8000)

## My process

### Built with

- **Semantic HTML5 markup** - Proper structure and accessibility
- **CSS custom properties** - For consistent theming and easy customization
- **CSS Grid** - For responsive product layout
- **Flexbox** - For cart item alignment and button layouts
- **Mobile-first workflow** - Responsive design approach
- **Vanilla JavaScript (ES6+)** - Dynamic functionality without frameworks
- **Async/Await** - For loading product data from JSON
- **Google Fonts** - Red Hat Text font family
- **CSS Animations** - Smooth transitions and hover effects

### What I learned

This project was an excellent opportunity to practice modern web development techniques. Here are the key learnings:

#### 1. Dynamic Content Rendering
I learned how to dynamically render content from JSON data using JavaScript:

```javascript
function renderProducts() {
  productsGrid.innerHTML = products.map((product, index) => `
    <div class="product-card">
      <img src="${product.image.thumbnail}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" onclick="addToCart(${index})">
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
}
```

#### 2. State Management
Managing cart state without external libraries was a great learning experience:

```javascript
function addToCart(productIndex) {
  const product = products[productIndex];
  const existingItem = cart.find(item => item.id === productIndex);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productIndex,
      name: product.name,
      price: product.price,
      image: product.image.thumbnail,
      quantity: 1
    });
  }
  
  updateCart();
}
```

#### 3. Responsive CSS Grid
Creating a responsive grid that adapts to different screen sizes:

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}
```

#### 4. Modal Implementation
Building a modal from scratch with proper event handling:

```javascript
function confirmOrder() {
  confirmationModal.classList.add('show');
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && confirmationModal.classList.contains('show')) {
    closeModal();
  }
});
```

#### 5. Error Handling
Implementing graceful fallbacks for data loading:

```javascript
async function loadProducts() {
  try {
    const response = await fetch('./data.json');
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback to hardcoded data
    products = [/* fallback data */];
    renderProducts();
  }
}
```

### Continued development

For future projects, I plan to focus on:

1. **Performance Optimization** - Implement lazy loading for images and code splitting
2. **Accessibility** - Add ARIA labels and improve keyboard navigation
3. **Local Storage** - Persist cart state across browser sessions
4. **Testing** - Add unit tests for JavaScript functions
5. **Build Tools** - Learn Webpack or Vite for better development workflow
6. **TypeScript** - Add type safety to JavaScript code
7. **PWA Features** - Make the app installable and work offline

### Useful resources

- [CSS Grid Complete Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Excellent resource for understanding CSS Grid layout
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) - MDN documentation helped with cart operations
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) - Understanding CSS variables for theming
- [Frontend Mentor Community](https://www.frontendmentor.io/community) - Great place for feedback and inspiration
- [Google Fonts](https://fonts.google.com/) - Easy integration of Red Hat Text font

## Author

- Frontend Mentor - [@sof0404](https://www.frontendmentor.io/profile/sof0404)
- GitHub - [@sof0404](https://github.com/sof0404)
- LinkedIn - [Sofía]([https://linkedin.com/in/sof0404](https://www.linkedin.com/in/sof%C3%ADa-barboza-vargas-a6487a262/))

## Acknowledgments

- **Frontend Mentor** for providing this excellent challenge that helped me practice modern web development techniques
- **The Frontend Mentor community** for inspiration and the supportive learning environment
- **Google Fonts** for the beautiful Red Hat Text font that enhanced the design
- **MDN Web Docs** for comprehensive documentation that made development smoother
