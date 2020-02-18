const express = require("express");
const router = express.Router({mergeParams: true});
const { searchFoods, getFoodData } = require("../subscribers/food");
const { addFood } = require("../services/food");

// prefix = /api/user/:id

router.route("/searchfoods").post(searchFoods); 
router.route("/getfooddata").post(getFoodData);
router.route("/addfood").post(addFood);

module.exports = router;