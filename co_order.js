"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author:leeman 
   Date:4/4/2023   
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

window.addEventListener("load", function() {
    var orderForm = document.forms.orderForm;
    orderForm.elements.orderDate.value = new Date().toDateString();
    orderForm.elements.model.focus();

    calcOrder();

    orderForm.elements.model.onchange = calcOrder;
    orderForm.elements.qty.onchange = calcOrder;

    var planOptions = document.querySelectorAll('input[name="protection"]');
    for (var i = 0; i < planOptions.length; i++) {
        planOptions[i].onclick = calcOrder;
    }
});
function calcOrder() {
    var orderForm = document.forms.orderForm;

    var mIndex = orderForm.elements.model.selectedIndex;
    var mCost = orderForm.elements.model.options[mIndex].value;
    var qIndex = orderForm.elements.qty.selectedIndex;
    var quantity = orderForm.elements.qty[qIndex].value;

    var initialCost = mCost*quantity;
    orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

    var pCost = document.querySelector('input[name="protection"]:checked').value*quantity;
    orderForm.elements.protectionCost.value = formatNumber(pCost, 2);

    orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

    var salesTax = 0.05*(initialCost + pCost);
    orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

    var totalCost = initialCost + pCost + salesTax;
    orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

    orderForm.elements.modelName.value = 
        orderForm.elements.model.options[mIndex].text;
    orderForm.elements.protectionName.value = 
        document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}
function formatNumber(val, decimals) {
    return val.toLocaleString(undefined,
        {
            minimumFractionDigits: decimals,
         maximumFractionDigits: decimals
        });
}
function formatUSCurrency(val) {
    return val.toLocaleString('en-US',
        {style: "currency", currency: "USD"});
}