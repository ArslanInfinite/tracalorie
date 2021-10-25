// Storage Controller

// Item Controller - IIFE
const ItemController = (function(){

})()

// UI Controller - IIFE
const UIController = (function(){

})()

// App Controller (main controller) - IIFE
// 
const AppController = (function(ItemController, UIController){

})(ItemController, UIController)