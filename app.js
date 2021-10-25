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
    // public return value
    return {
        logState: function(){
            return state
        }
    } 
})()



// UI Controller - IIFE
const UIController = (function(){

})()



// App Controller (main controller) - IIFE
// 
const AppController = (function(ItemController, UIController){
    // anything that needs to be run immediately will be in the initializer 
    // ie edit state must be clear, calories are 0, etc
    return {
        init: function(){
            console.log('hello')
        }
    }

})(ItemController, UIController)

AppController.init()