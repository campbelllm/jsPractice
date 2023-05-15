const shoppingForm = document.querySelector('.shopping');
const list = document.querySelector('.list');

//we need to hold state
let items = [];

function handleSubmit(e) {
	e.preventDefault();
	console.log('submitted');
    const name = e.currentTarget.item.value;
    if(!name) return
	const item = {
		name,
		id: Date.now(),
		complete: false,
	};
	items.push(item);
	//clear form
    e.target.reset();
   // custom event that will show that the items have been updated
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}



function displayItems() {
	const html = 
    items.map(  item => `<li class="shopping-item">
    <input
      value="${item.id}"
      type="checkbox"
      ${item.complete && 'checked'}
    >
    <span class="itemName">${item.name}</span>
    <button
      aria-label="Remove ${item.name}"
      value="${item.id}"
    >&times;</button>
</li>`)
		.join(``);
	list.innerHTML = html;
}

function mirrorToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function restoreFromLocalStorage() {
    const lsItems = JSON.parse(localStorage.getItem('items'))
    if (lsItems.length) {
        items.push(...lsItems)
        list.dispatchEvent(new CustomEvent('itemsUpdated'))
    }
}

function deleteItem(id) {
    //delete the item
    items = items.filter(item => item.id !== id)
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

function markAsComplete(id) {
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete
    list.dispatchEvent(new CustomEvent('itemsUpdated'))
}

shoppingForm.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage)

//event delegation: listening for an event on the list <ul>
//but then delegate the click over to the button when that is clicked

list.addEventListener('click', function (e) {
    if (e.target.matches('button')) {
        deleteItem(parseInt(e.target.value));
    }
    if (e.target.matches('input[type="checkbox"]')) {
        markAsComplete(parseInt(e.target.value))
    }
})
restoreFromLocalStorage()

