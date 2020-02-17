const express = require("express");
const router = express.Router({mergeParams: true});
const { searchFoods, getFoodData } = require("../subscribers/food");
const { addFood } = require("../services/food");

// prefix = /api/user/

router.route("/searchfoods").post(searchFoods); 
//router.post("/addfood", addFood);

module.exports = router;