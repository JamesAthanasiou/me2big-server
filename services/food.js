const db = require("../models");
const axios = require("axios");
// For now the api calls and the business logic will be in the same file.
// All that is done is the api is called and the returned food is added
// In the future, the api can be called to search for a food, 
// then the api can be called to query with a matching result, 
// then the api can be added into the daily food list and the frequent food list
// ensuring that nextime the frequent foodlist with be queried first before making the api call.

// This will be revised in the future

// api/food

exports.addFood = async function(req, res, next){
  try {

  
  } catch (err) {
    return next(err);
  }
}


