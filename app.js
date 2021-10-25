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
})()

// UI Controller - IIFE
const UIController = (function(){

})()

// App Controller (main controller) - IIFE
// 
const AppController = (function(ItemController, UIController){

})(ItemController, UIController)