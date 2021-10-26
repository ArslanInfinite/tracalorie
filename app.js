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
        calories: 0
    }
    // public return values
    return {
        // returning items 
        getItems: function(){
            return state.items
        },
        addItem: function(name, calories){
            let ID
            //creaing ID for each new item
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
        addButton: '.add-btn', 
        updateButton: '.update-btn', 
        deleteButton: '.delete-btn', 
        backButton: '.back-btn', 
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
        // creating a public method to retrieve UISelectors to use with AppController's loadEventListeners function
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '', 
            document.querySelector(UISelectors.itemCaloriesInput).value = ''
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

    // anything that needs to be run immediately will be in the initializer 
    // ie edit state must be clear, calories are 0, etc
    return {
        initialize: function(){
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