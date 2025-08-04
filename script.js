// Estado global del carrito
let cart = [];
let products = [];

// Elementos del DOM
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const totalAmount = document.getElementById('total-amount');
const cartActions = document.getElementById('cart-actions');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const startNewOrderBtn = document.getElementById('start-new-order-btn');
const confirmationModal = document.getElementById('confirmation-modal');

// Cargar productos desde data.json
async function loadProducts() {
  try {
    const response = await fetch('./data.json');
    products = await response.json();
    renderProducts();
  } catch (error) {
    console.error('Error loading products:', error);
    // Fallback: usar datos hardcodeados si falla la carga
    products = [
      {
        image: { thumbnail: "./assets/images/image-waffle-thumbnail.jpg" },
        name: "Waffle with Berries",
        category: "Waffle",
        price: 6.50
      },
      {
        image: { thumbnail: "./assets/images/image-creme-brulee-thumbnail.jpg" },
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
      },
      {
        image: { thumbnail: "./assets/images/image-macaron-thumbnail.jpg" },
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00
      },
      {
        image: { thumbnail: "./assets/images/image-tiramisu-thumbnail.jpg" },
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50
      },
      {
        image: { thumbnail: "./assets/images/image-baklava-thumbnail.jpg" },
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00
      },
      {
        image: { thumbnail: "./assets/images/image-meringue-thumbnail.jpg" },
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00
      },
      {
        image: { thumbnail: "./assets/images/image-cake-thumbnail.jpg" },
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50
      },
      {
        image: { thumbnail: "./assets/images/image-brownie-thumbnail.jpg" },
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.50
      },
      {
        image: { thumbnail: "./assets/images/image-panna-cotta-thumbnail.jpg" },
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50
      }
    ];
    renderProducts();
  }
}

// Renderizar productos
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

// Agregar producto al carrito
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
  
  // Animación de feedback
  const button = event.target;
  button.textContent = 'Added!';
  button.style.background = 'hsl(159, 69%, 32%)';
  
  setTimeout(() => {
    button.textContent = 'Add to Cart';
    button.style.background = '';
  }, 1000);
}

// Actualizar carrito
function updateCart() {
  // Actualizar contador
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
  
  // Mostrar/ocultar elementos según el estado del carrito
  if (cart.length === 0) {
    cartItems.innerHTML = '<div class="empty-cart">Your added items will appear here</div>';
    cartTotal.style.display = 'none';
    cartActions.style.display = 'none';
  } else {
    renderCartItems();
    updateTotal();
    cartTotal.style.display = 'flex';
    cartActions.style.display = 'flex';
  }
}

// Renderizar items del carrito
function renderCartItems() {
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="item-info">
        <img src="${item.image}" alt="${item.name}" class="item-image">
        <div class="item-details">
          <h4>${item.name}</h4>
          <p class="item-price">$${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div class="item-quantity">
        <button class="quantity-btn" onclick="decreaseQuantity(${item.id})">-</button>
        <span class="quantity-display">${item.quantity}</span>
        <button class="quantity-btn" onclick="increaseQuantity(${item.id})">+</button>
      </div>
    </div>
  `).join('');
}

// Aumentar cantidad
function increaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += 1;
    updateCart();
  }
}

// Disminuir cantidad
function decreaseQuantity(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
    updateCart();
  }
}

// Actualizar total
function updateTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Confirmar pedido
function confirmOrder() {
  confirmationModal.classList.add('show');
}

// Cerrar modal
function closeModal() {
  confirmationModal.classList.remove('show');
}

// Iniciar nuevo pedido
function startNewOrder() {
  cart = [];
  updateCart();
  closeModal();
}

// Event listeners
confirmOrderBtn.addEventListener('click', confirmOrder);
startNewOrderBtn.addEventListener('click', startNewOrder);

// Cerrar modal al hacer clic fuera
confirmationModal.addEventListener('click', (e) => {
  if (e.target === confirmationModal) {
    closeModal();
  }
});

// Cerrar modal con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && confirmationModal.classList.contains('show')) {
    closeModal();
  }
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
}); 