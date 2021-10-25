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
            {id: 0, name: 'Steak Dinner', calories: 1200}, 
            {id: 1, name: 'Ice cream sandwich', calories: 400}, 
            {id: 2, name: 'Fried eggs', calories: 300}
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
        itemNameInput: '#item-name', 
        itemCaloriesInput: '#item-calories'
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
        // creating a public method to retrieve UISelectors to use with AppController's loadEventListeners function
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
            console.log(123)
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
        UIController.populateItemList(items)
        // loading all event listeners 
        loadEventListeners()
        }
    }

})(ItemController, UIController)

AppController.initialize()