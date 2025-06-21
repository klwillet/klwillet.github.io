// get user input
const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

// loop to populate cart rows
for (let i = 0; i < cart.length; i++) {
   let item = cart[i];
   let total = calculateTotal(item.quantity, item.product.price);
   outputCartRow(item, total);
}

// Calculate subtotal
let subtotal = 0;
for (let item of cart) {
   subtotal += calculateTotal(item.quantity, item.product.price);
}

// Calculate tax, shipping, and grand total
let tax = subtotal * tax_rate;
let shipping = subtotal > shipping_threshold ? 0 : 40;
let grandTotal = subtotal + tax + shipping;

// Write totals below the cart table using document.write()
document.write("<tfoot>");
document.write("<tr><td colspan='4'>Subtotal:</td><td>$" + subtotal.toFixed(2) + "</td></tr>");
document.write("<tr><td colspan='4'>Tax:</td><td>$" + tax.toFixed(2) + "</td></tr>");
document.write("<tr><td colspan='4'>Shipping:</td><td>$" + shipping.toFixed(2) + "</td></tr>");
document.write("<tr><td colspan='4'><strong>Grand Total:</strong></td><td><strong>$" + grandTotal.toFixed(2) + "</strong></td></tr>");
document.write("</tfoot>");