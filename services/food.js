// Todo:
// modify the daily nutrition category
// add support for non branded food that lack nutrition label data field

const db = require("../models");
const axios = require("axios");
// For now the api calls and the business logic will be in the same file.

// In the future, the api can be called to search for a food, 
// then the api can be called to query with a matching result, 
// then the api can be added into the daily food list and the frequent food list
// ensuring that nextime the frequent foodlist with be queried first before making the api call.

//prefix: /api/users/:id
exports.addFood = async function(req, res, next){
  // format of food object is the same as the one returned from getFoodData 
  const { name, brandOwner, servingSize, servingSizeUnit, calories, carbohydrate, fat, protein } = req.body.food;
  const servingSizeRatio = req.body.servingSizeRatio;
  const meal = req.body.meal;
  try {
    console.log('hit add food route');
    let newFood = {
      name,
      brandOwner,
      servingSize,
      servingSizeUnit,
      servingSizeRatio,
      calories,
      carbohydrate,
      fat,
      protein,
      meal
    };
    let foundUser = await db.User.findById(req.params.id);
    foundUser.dailyFoodList.push(newFood);
    await foundUser.save();
    return res.status(200).json(newFood);
  } catch (err) {
    return next(err);
  }
}


