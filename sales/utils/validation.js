
/**
 * Check if the given payment method is valid.
 * @param {string} paymentMethod 
 * @returns {boolean}
 * @example
 * isValidPaymentMethod('credit');
 */
function isValidPaymentMethod(paymentMethod) {
  return ['credit', 'debit', 'cash'].includes(paymentMethod);
}

/**
 * Check if the given type sale is valid.
 * @param {string} typeSale
 * @returns {boolean}
 * @example
 * isValidTypeSale('physical');
 */
function isValidTypeSale(typeSale) {
  return ['physical', 'online'].includes(typeSale);
}

/**
 * Check if the given order status is valid.
 * @param {string} status
 * @returns {boolean}
 * @example
 * isValidOrderStatus('open');
 */
function isValidOrderStatus(status) {
  return ['open', 'closed'].includes(status);
}

module.exports = {
  isValidPaymentMethod,
  isValidTypeSale,
  isValidOrderStatus,
};
