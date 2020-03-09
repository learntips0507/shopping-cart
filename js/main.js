// Item Price
function itemPrice(inputUpdate){
  const price = event.target.parentElement.parentElement.previousElementSibling.children[0].innerText;
  const priceUpdate = parseFloat(price) * inputUpdate;
  event.target.parentElement.parentElement.nextElementSibling.children[0].innerText = priceUpdate;
}

// Add quantity
const btnPlus = document.querySelectorAll(".btnPlus");
btnPlus.forEach(function(btnP){
  btnP.addEventListener("click", function(event){
      if(event.target.parentElement.classList.contains("btnPlus")){
          let input = event.target.parentElement.previousElementSibling.value;
          if(input == false){ input = 1; }

          const inputUpdate = parseFloat(input) + 1;
          event.target.parentElement.previousElementSibling.value = inputUpdate;

          itemPrice(inputUpdate);
          showTotal();
      }
  });
});

// Remove quantity
const btnMinus = document.querySelectorAll(".btnMinus");
btnMinus.forEach(function(btnM){
  btnM.addEventListener("click", function(event){
      if(event.target.parentElement.classList.contains("btnMinus")){
          let input = event.target.parentElement.nextElementSibling.value;
          if(input == false){ input = 1; }

          if(input > 1){
              const inputUpdate = parseFloat(input) - 1;
              event.target.parentElement.nextElementSibling.value = inputUpdate;

              itemPrice(inputUpdate);
              showTotal();
          }
      }
  });
});

// Close cart item
const removeItem = document.querySelectorAll(".remove-item");
removeItem.forEach(function(itRemove){
  itRemove.addEventListener("click", function(event){
      const cartItem = event.target.parentElement.parentElement.parentElement;
      cartItem.remove();

      showTotal();
  });
});

// Show total fn
function showTotal(){
  const subPrices = [];

  const itemTotalPrice = document.querySelectorAll(".itemTotalPrice");
  itemTotalPrice.forEach(function(item){
      subPrices.push(parseFloat(item.innerText));
  });

  subTotalPrice = subPrices.reduce(function(subPrices, item){
      subPrices += item;
      return subPrices;
  }, 0);

  // Sub Total
  document.getElementById("subTotal").innerText = subTotalPrice.toFixed(2);

  // Tax
  const taxInput = document.getElementById("taxInput").value;
  if(taxInput == false){ taxInput = 0; }
  const taxCalc = parseFloat(taxInput) / 100 * subTotalPrice;
  document.getElementById("taxTotal").innerHTML = taxCalc.toFixed(2);

  // Grand total
  const grandTotal = subTotalPrice + taxCalc;
  document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
}
showTotal();

// Update tax and grand total on tax change
function updateTaxInput(value){
  // Tax
  if(value == false){ value = 0; }
  const taxCalc = parseFloat(value) / 100 * subTotalPrice;
  document.getElementById("taxTotal").innerHTML = taxCalc.toFixed(2);

  // Grand total
  const grandTotal = subTotalPrice + taxCalc;
  document.getElementById("grandTotal").innerHTML = grandTotal.toFixed(2);
}
