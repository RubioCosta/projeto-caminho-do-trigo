const errorsCode = require("./errorsCode");

/**
 * Function to wait for a number of seconds
 * @param { number } seconds - Number of seconds to wait
 * @returns {Promise} - Promise object represents the end of the wait
 * @example
 * await sleep(5);
 */
function sleep(seconds) {
  return new Promise((resolve) => setTimeout(resolve, 1000 * seconds));
}

/**
 * Function to return an error response
 * @param { string } typeError - Type of error to be returned
 * @returns { object<{ httpStatusCode: number, code: string, message: string }> } - Object with the error response
 * @example
 * error('REQUIRED_FIELD_MISSING');
 */
function error(typeError = "") {
  return {
    httpStatusCode: errorsCode[typeError]?.httpStatusCode,
    code: errorsCode[typeError]?.code,
    message: errorsCode[typeError]?.message,
  };
}

module.exports = {
  sleep,
  error,
};
