const menuData = [
    { id: 1, name: 'Masala Papad', category: 'Starter', price: 59, popularity: 4, totalQuantity: 1 },
    { id: 2, name: 'Veg Toofani', category: 'main-course', price: 278, popularity: 3, totalQuantity: 1 },
    { id: 3, name: 'Butter Roti', category: 'main-course', price: 288, popularity: 3, totalQuantity: 1},
    { id: 4, name: 'Mango Juice', category: 'Desert', price: 80, popularity: 2, totalQuantity: 1 },
    { id: 5, name: 'Chicken biryani', category: 'Non-veg', price: 80, popularity: 1, totalQuantity: 1 },
    // Add more menu items as needed
];

const orderList = document.getElementById('order-list');
var totalAmount = 0;

function getImageUrl(itemid) {
    if (itemid == 1){
        return './docs/images/masala papad.webp';
    }
    else if (itemid == 2){
        return './docs/images/vegtoofani.jpg';
    }
    else if (itemid == 3){
        return './docs/images/butterroti.jpg';
    }
    else if (itemid == 4){
    return './docs/images/mangojuice.jpg';
    }
    return './docs/images/biryani.jpg'
}


// Function to render menu items
function renderMenuItems(items) {
    const menuContainer = document.getElementById('menu_container');
    menuContainer.innerHTML = '';
    var i = 1;
    items.forEach(item => {
        const menuItem = document.createElement('tr');
        menuItem.className = 'menu-item';
        menuItem.innerHTML = `<td>
            <img src='${getImageUrl(item.id)}'></td>
            <td>
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p><br>
            <p>Price: Rs.${item.price}</p>
            </td>
            <td>
            <div>
                <button onclick="addToOrder(${item.id})">Add to Cart</button>
            </div>
            </td>
        `;
        menuContainer.appendChild(menuItem);
        i = i + 1;
    });
}

// Initial rendering of menu
renderMenuItems(menuData);

// Event listener for search input
document.getElementById('search').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredItems = menuData.filter(item =>
        item.name.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    renderMenuItems(filteredItems);
});

// Event listener for sorting select
document.getElementById('sort').addEventListener('change', function () {
    const sortBy = this.value;
    const sortedItems = [...menuData].sort((a, b) => a[sortBy] - b[sortBy]);
    renderMenuItems(sortedItems);
});

// Function to add items to the order
function addToOrder(itemId) {
    const menuItem = menuData.find(item => item.id === itemId);
    if (menuItem) {
        // Check if the item is already in the order
        const existingItem = [...orderList.children].find(item => item.dataset.itemId === `${itemId}`);
        
        if (existingItem) {
            // If the item is already in the order, update the totalQuantity
            menuItem.totalQuantity += 1;
            existingItem.querySelector('.quantity').textContent = menuItem.totalQuantity;
        } else {
            // If the item is not in the order, create a new row
            const listItem = document.createElement('tr');
            listItem.dataset.itemId = `${itemId}`;
            listItem.innerHTML = `
                <td><strong>${menuItem.name}</strong></td>
                <td><span class="quantity">${menuItem.totalQuantity}</span> x Rs.${menuItem.price}</td>
                <td><button onclick="removeFromOrder(${itemId})">Remove</button></td>
            `;
            orderList.appendChild(listItem);
        }
        totalAmount += menuItem.price;
        document.getElementById('total-amount').innerHTML = `<h4>Total Amount: Rs.${totalAmount}</h4>`;
    }
}

// Function to remove items from the order
function removeFromOrder(itemId) {
    const menuItem = menuData.find(item => item.id === itemId);
    const listItemToRemove = [...orderList.children].find(item => item.dataset.itemId === `${itemId}`);
    
    if (menuItem.totalQuantity > 1) {
        // If the total quantity is greater than 1, decrement the quantity
        menuItem.totalQuantity -= 1;
        listItemToRemove.querySelector('.quantity').textContent = menuItem.totalQuantity;
    } else if (menuItem.totalQuantity === 1) {
        // If the total quantity is 1, remove the item from the order list
        orderList.removeChild(listItemToRemove);
    }

    // Update the total amount
    totalAmount -= menuItem.price;
    document.getElementById('total-amount').innerHTML = `<h4>Total Amount: Rs ${totalAmount}</h4>`;

}

