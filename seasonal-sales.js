var products = [];
var categories = [];

getCategories = (function(){
  var loader = new XMLHttpRequest();
  loader.addEventListener("load", function(){
    categories = JSON.parse(this.responseText).categories;
    getProducts();
  });
  loader.open("GET", "sale.json");
  loader.send();
})();

function getProducts (){
  var loader = new XMLHttpRequest();
  loader.addEventListener("load", function(){
    products = JSON.parse(this.responseText).products;
    populateDOM();
  });
  loader.open("GET", "item.json");
  loader.send();
}

function populateDOM(){
  var output = document.getElementById("output");
  var string = "";
    for (var i=0; i<products.length; i++){
      string += "<div class='card'><p>" + products[i].name + "</p>"; 
      string += "<p class='info'>" + categories[products[i].category_id - 1].name + "</p>"; 
      string += "<p class='price'>" + products[i].price + "</p>";
      string += "<p class='marketing'>Look for special savings during: <span class='season'>";
      string += categories[products[i].category_id - 1].season_discount + "</span></p></div></div>";
      originalPrice[i] = products[i].price;
    };
    output.innerHTML += string;
}

var originalPrice = [];
var discountedPrice = [];
var selectedSeason = document.getElementById("selector");

selectedSeason.addEventListener("change", applyDiscount);

function applyDiscount(){

  var theSeason = selectedSeason.value;
  var thePrice = document.getElementsByClassName("price");
  for (var i=0; i<products.length; i++){
    if (theSeason === categories[products[i].category_id - 1].season_discount) {
        discountedPrice = products[i].price - (products[i].price * categories[products[i].category_id - 1].discount);
        thePrice[i].innerHTML = discountedPrice.toFixed(2);  
    } else (thePrice[i].innerHTML = originalPrice[i]);
  }
};