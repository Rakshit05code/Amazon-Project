import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';  
import { formatCurrency } from '../utils/money.js';


export function renderPaymentSummary() {
  let productpricePaisa =0;
  let shippingPricePaisa =0;

  console.log("cart:", cart)
    cart.forEach((cartItem) => {
      console.log("Cart Item:", cartItem);
        const product = getProduct(cartItem.productId);
        productpricePaisa += product.pricePaisa * cartItem.quantity;
    
      const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
      shippingPricePaisa += deliveryOption.pricePaisa;
    
      });
  const totalBeforeTaxPaisa = productpricePaisa + shippingPricePaisa;
  const taxPaisa = totalBeforeTaxPaisa*0.1;
  const totalPaisa = totalBeforeTaxPaisa + taxPaisa;

  const paymentSummaryHTML = `
                <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">
            ₹${formatCurrency(productpricePaisa)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${formatCurrency(shippingPricePaisa)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">₹${formatCurrency(totalBeforeTaxPaisa)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">${formatCurrency(taxPaisa)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">${formatCurrency(totalPaisa)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  
  `;
      document.querySelector('.js-payment-summary')
      .innerHTML = paymentSummaryHTML;
}