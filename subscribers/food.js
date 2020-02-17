const axios = require("axios");
axios.defaults.headers.post['Content-Type'] = 'application/json';

const url = `https://api.nal.usda.gov/fdc/v1/search?api_key=${process.env.FOOD_KEY}`;

exports.searchFoods = async function(req, res, next){
  console.log("HIT ROUTE")
  const food = req.body.food;
  try {
    const response = await axios.post(url, {
      generalSearchInput: food,
      requireAllWords: true
    });
    for (let i = 0; i < 10; i++) { 
      console.log(response.data.foods[i]);
    } 
    //return response;
  } catch (err) {
    return next(err);
  }
}