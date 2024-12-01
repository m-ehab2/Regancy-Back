const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: "ASobixKeZEqecsqKo7hyUVQ4w8MXI1lXC6T3Epzt2CHAVFo5H-ZasuzYJXUp7pA25ler0Ui5TgK0BjA1",
  client_secret: "EP9USfrz7eTySyirwYilnsp84AQXdF6Gr2T6F9GG5BWMV8udDWSQqlJaP8dHBUGMF5uPwPvsC5L2LUOY",
});

module.exports = paypal;
