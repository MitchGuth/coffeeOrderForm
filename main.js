var orderInput = document.querySelector('.coffee-order-form');
var coffeeOrder = document.querySelector(".order-field");
var flavorShot = document.querySelector('[name="flavor-shot"]');
var email = document.querySelector('.email-box');
var caffineRating = document.querySelector('.caffine-rating')
var newOrderList = document.querySelector(".order-list");
var currentOrders = [];

var displayOrders = function(currentOrders){
    currentOrders.forEach(function(item){
        var newOrder = item.coffeeOrder + " " + item.email + " " + item.coffeeSize + " " + item.flavorShot + " " + item.caffineRating;
        var newListItem = document.createElement('li');
        var newTextItem = document.createElement('p');
        newTextItem.textContent = newOrder;
        var addCheckBox = document.createElement("input");
        addCheckBox.setAttribute("type", "checkbox");
        addCheckBox.classList.add("li-checkbox");
        newListItem.appendChild(addCheckBox);
        newListItem.appendChild(newTextItem);
        newListItem.classList.add("list-item-container");
        newOrderList.appendChild(newListItem);
    })
}
var saveOrders = function(item){
    var stringifiedItem = JSON.stringify(item);
    localStorage.setItem('order', stringifiedItem);
};

var parseOrders = function(){
    var retrievedItem = localStorage.getItem('order');
    var parsedItem = JSON.parse(retrievedItem);
    currentOrders = parsedItem;
    return currentOrders;
};

parseOrders();
displayOrders(currentOrders);

orderInput.addEventListener('submit', function(event){
    event.preventDefault();
    var coffeeSize = document.querySelector('[name="size"]:checked');
    var newOrder = coffeeOrder.value + " " + email.value + " " + coffeeSize.value + " " + flavorShot.value + " " + caffineRating.value;
    var pendingOrder = {coffeeOrder: '', email: '', coffeeSize: '', flavorShot: '', caffineRating: ''};
    var newListItem = document.createElement('li');
    var newTextItem = document.createElement('p');
    newTextItem.textContent = newOrder;
    var addCheckBox = document.createElement("input");
    addCheckBox.setAttribute("type", "checkbox");
    addCheckBox.classList.add("li-checkbox");
    newListItem.appendChild(addCheckBox);
    newListItem.appendChild(newTextItem); 
    newListItem.classList.add("list-item-container")
    newOrderList.appendChild(newListItem);
    pendingOrder.coffeeOrder = coffeeOrder.value;
    pendingOrder.email = email.value;
    pendingOrder.coffeeSize = coffeeSize.value;
    pendingOrder.flavorShot = flavorShot.value;
    currentOrders.push(pendingOrder);
    saveOrders(currentOrders);
});

var removeChecked = document.querySelector(".remove-button");
removeChecked.addEventListener('submit', function(event){
    event.preventDefault();
    var checkedItems = document.querySelectorAll(".list-item-container");
    var checkedItemsArray = Array.from(checkedItems);
    var newCurrentOrders = [];
    checkedItemsArray.forEach(function(item, i){
        if (item.querySelector('.li-checkbox').checked){
            item.remove();
        }
        else{
            newCurrentOrders.push(currentOrders[i])
        }
    });
    currentOrders = newCurrentOrders;
    saveOrders(currentOrders);
});



