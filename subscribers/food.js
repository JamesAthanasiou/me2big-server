const axios = require("axios");
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';

exports.searchFoods = async function(req, res, next){
  const url = `https://api.nal.usda.gov/fdc/v1/search?api_key=${process.env.FOOD_KEY}`;
  const food = req.body.food;
  const pageNumber = req.body.pageNumber;
  try {
    const response = await axios.post(url, {
      generalSearchInput: food,
      requireAllWords: true,
      pageNumber: pageNumber
    });
    const responseList = [];
    for (let i = 0; i < 10; i++) { 
      responseList.push({
        food: response.data.foods[i].description,
        fdcId: response.data.foods[i].fdcId
      });
    } 
    console.log(responseList);
    return responseList;
  } catch (err) {
    return next(err);
  }
}

//427439
exports.getFoodData = async function(req, res, next){
  const fdcId = req.body.fdcId;
  const url = `https://api.nal.usda.gov/fdc/v1/${fdcId}?api_key=${process.env.FOOD_KEY}`;
  try {
    const response = await axios.get(url);
    const responseObj = {
      name: response.data.description,
      brandOwner: response.data.brandOwner,
      servingSize: response.data.servingSize,
      servingSizeUnit: response.data.servingSizeUnit,
      calories: response.data.labelNutrients.calories.value,
      carbohydrates: response.data.labelNutrients.carbohydrates.value,
      fat: response.data.labelNutrients.fat.value,
      protein: response.data.labelNutrients.protein.value,
      fdcId: response.data.fdcId
    }
    console.log(responseObj);
    return responseObj;
  } catch (err) {
    return next(err);
  }

}