let tableBody = null;

// function  is passed a quantity and price and returns their product
function calculateTotal(quantity, price) {
    return quantity * price;
}

// function writes a table row and formats to two decimal places
function outputCartRow(item, total) {
    document.write("<tr>");
    document.write("<td><img src='images/" + item.product.filename + "'></td>");
    document.write("<td>" + item.product.title + "</td>");
    document.write("<td>" + item.quantity + "</td>");
    document.write("<td>$" + item.product.price.toFixed(2) + "</td>");
    document.write("<td>$" + total.toFixed(2) + "</td>");
    document.write("</tr>");
}