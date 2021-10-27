// Storage Controller



// Item Controller - IIFE
const ItemController = (function(){
    // creating Item constructor to create items 
    const Item = function(id, name, calories){
        this.id = id, 
        this.name = name, 
        this.calories = calories
    }
    // creating data structure / initial state (mimic react state)
    const state = {
        items: [

            // {id: 0, name: 'Steak Dinner', calories: 1200}, 
            // {id: 1, name: 'Ice cream sandwich', calories: 400}, 
            // {id: 2, name: 'Fried eggs', calories: 300}
        ], 
        currentItem: null, 
        totalCalories: 0
    }
    // public return values
    return {
        // returning items 
        getItems: function(){
            return state.items
        },
        addItem: function(name, calories){
            let ID
            //creating ID for each new item
            if(state.items.length > 0){
                // automatically incrementing new IDs based on the length of the array of items
                ID = state.items[state.items.length - 1].id + 1
            } else {
                ID = 0
            } 
            // converting the calorie input from string to number
            calories = parseInt(calories)
            // creating new item
            newItem = new Item(ID, name, calories)
            // adding that new item into the array of items 
            state.items.push(newItem)
            return newItem
        },
        getItemByID: function(id){
            let found = null
            // looping through all items
            state.items.forEach(function(item){
                // matching ID
                if(item.id === id){
                    found = item
                }
            })
            return found
        },
        updateItem: function(name, calories){
            // converting calories to number
            calories = parseInt(calories)

            let found = null
            state.items.forEach(function(item){
                if(item.id === state.currentItem.id){
                    item.name = name
                    item.calories = calories
                    found = item
                }
            })
            return found
        },
        deleteItem: function(id){
            // getting all IDs
            ids = state.items.map(function(item){
                return item.id
            })
            // getting the index 
            const index = ids.indexOf(id)
            // removing selected item by its id
            state.items.splice(index, 1)
        },
        clearAllItems: function(){
            state.items = []
        },
        setCurrentItem: function(item){
            state.currentItem = item
        }, 
        getCurrentItem: function(){
            return state.currentItem
        },
        getTotalCalories: function(){
            // loop through all items and add all calories together
            let total = 0
            state.items.forEach(function(item){
                total += item.calories 
            })
            // setting total calories in state 
            state.totalCalories = total
            // returning total 
            return state.totalCalories
        },
        // returning state 
        logState: function(){
            return state
        }
    } 
})()



// UI Controller - IIFE
const UIController = (function(){
    const UISelectors = {
        itemList: '#item-list', 
        listItems: '#items-list li',
        addButton: '.add-btn', 
        updateButton: '.update-btn', 
        deleteButton: '.delete-btn', 
        backButton: '.back-btn', 
        clearButton: '.clear-btn',
        itemNameInput: '#item-name', 
        itemCaloriesInput: '#item-calories', 
        totalCalories: '.total-calories'
    }
    return {
        populateItemList: function(items){
            // creating html and setting it to an empty string 
            let html = ''
            // looping through every item and adding it as a list item to html
            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `
            });
            // inserting list items 
            document.querySelector(UISelectors.itemList).innerHTML = html
        }, 
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value, 
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function(item){
            // showing the list 
            document.querySelector(UISelectors.itemList).style.display = 'block'
            // creating LI element to place new item in, assigning attributes to it
            const li = document.createElement('li')
            li.className = 'collection-item'
            li.id = `item-${item.id}`
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories</em>
            <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`
            // inserting item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li)
        },
        updateListItem: function(item){
            // retrieving list items from the DOM
            let listItems = document.querySelectorAll(UISelectors.listItems)
            // listItems gives a nodeList which must be converted into an array
            listItems = Array.from(listItems)
            listItems.forEach(function(listItem){
                const itemID = listItem.getAttribute('id')
                if(itemID === `item-${item.id}`){
                    document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>`
                }
            })
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`
            const item = document.querySelector(itemID)
            item.remove()
        },
        // creating a public method to retrieve UISelectors to use with AppController's loadEventListeners function
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '', 
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemController.getCurrentItem().name, 
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemController.getCurrentItem().calories, 
            UIController.showEditState()
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none'
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories
        },
        clearEditState: function(){
            UIController.clearInput()
            document.querySelector(UISelectors.updateButton).style.display = 'none'
            document.querySelector(UISelectors.deleteButton).style.display = 'none'
            document.querySelector(UISelectors.backButton).style.display = 'none'
            document.querySelector(UISelectors.addButton).style.display = 'inline'
        },
        showEditState: function(){
            document.querySelector(UISelectors.updateButton).style.display = 'inline'
            document.querySelector(UISelectors.deleteButton).style.display = 'inline'
            document.querySelector(UISelectors.backButton).style.display = 'inline'
            document.querySelector(UISelectors.addButton).style.display = 'none'
        },
        getSelectors: function(){
            return UISelectors
        }
    }
})()

// App Controller (main controller) - IIFE
// 
const AppController = (function(ItemController, UIController){
    // loading eventlisteners 
    const loadEventListeners = function(){
        // getting UI selectors
        const UISelectors = UIController.getSelectors()
        // adding a new item event
        document.querySelector(UISelectors.addButton).addEventListener('click', itemAddSubmit)
        // disabling submit button on enter in order to prevent accidental entries while in edit mode
        document.addEventListener('keypress', function(event){
            // check for which key was hit based on the keycode property
            if(event.keyCode === 13 || event.which === 13){
                // disabling the enter button
                event.preventDefault()
                return false 
            }
        })
        // edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick)
        // updating item event
        document.querySelector(UISelectors.updateButton).addEventListener('click', itemUpdateSubmit)
         // deleting item event
         document.querySelector(UISelectors.deleteButton).addEventListener('click', itemDeleteSubmit)
        // back button event to clear out edit mode in UI
        document.querySelector(UISelectors.backButton).addEventListener('click', UIController.clearEditState)
        // clearing items event
        document.querySelector(UISelectors.clearButton).addEventListener('click', clearAllItemsClick)
    }

    // adding items function
    const itemAddSubmit = function(event){
        // getting form input from UIController
        const input = UIController.getItemInput()
        // check for valid name and calorie inputs
        if(input.name !== '' && input.calories !== ''){
            // adding item
            const newItem = ItemController.addItem(input.name, input.calories)
            // adding new item to the UI
            UIController.addListItem(newItem)
            // get total calories
            const totalCalories = ItemController.getTotalCalories()
            // show total calories on UI
            UIController.showTotalCalories(totalCalories)
            // clearning input fields after adding new item 
            UIController.clearInput()
        }
        event.preventDefault()
    }

    // updating item submit
    const itemEditClick = function(event){
        if(event.target.classList.contains('edit-item')){
            // get the list item ID (item-0) (item-1)
            // because the edit button does not appear initially on the page, event delegation is used to select the right parent element and its id for interaction
            const listID = event.target.parentNode.parentNode.id
            // breaking the items into an array
            const listIDArray = listID.split('-')
            // getting the actual ID of that item
            const ID = parseInt(listIDArray[1])
            // getting the item based off its ID number
            const itemToEdit = ItemController.getItemByID(ID)
            // setting the current item
            ItemController.setCurrentItem(itemToEdit)
            // adding item to form
            UIController.addItemToForm()
         }
        event.preventDefault()
    }

    // updating the item itself 
    const itemUpdateSubmit = function(event){
        // getting item input
        const input = UIController.getItemInput()
        // updating the item
        const updatedItem = ItemController.updateItem(input.name, input.calories)
        UIController.updateListItem(updatedItem)
        const totalCalories = ItemController.getTotalCalories()
        UIController.showTotalCalories(totalCalories)
        UIController.clearEditState()
        event.preventDefault()
    }
    // deleting the selected item
    const itemDeleteSubmit = function(event){
        // getting the current item
        const currentItem = ItemController.getCurrentItem()
        // deleting the selected item from state
        ItemController.deleteItem(currentItem.id)
        // deleting from UI
        UIController.deleteListItem(currentItem.id)
        const totalCalories = ItemController.getTotalCalories()
        UIController.showTotalCalories(totalCalories)
        UIController.clearEditState()
        event.preventDefault()
    }

    // clearing all items event
    const clearAllItemsClick = function(){
        // deleting all items from state structure
        ItemController.clearAllItems()
    }

    // anything that needs to be run immediately will be in the initializer 
    // ie edit state must be clear, calories are 0, etc
    return {
        initialize: function(){
            // clearing edit state / setting initial state
            UIController.clearEditState()
            // creating function to grab all the items from ItemController upon starting app
            const items = ItemController.getItems()
            // populate list with those grabbed items
            if(items.length === 0){
               UIController.hideList()
            } else {
               UIController.populateItemList(items)
            }
            const totalCalories = ItemController.getTotalCalories()
            // show total calories on UI
            UIController.showTotalCalories(totalCalories)
            
            // loading all event listeners 
            loadEventListeners()
        }
    }

})(ItemController, UIController)

AppController.initialize()