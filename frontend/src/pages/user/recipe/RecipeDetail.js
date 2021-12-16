import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RECIPES_DATA } from "utils/dummyData";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const recipeID = params.get("id");
    if (!recipeID) {
      return;
    }
    setRecipe(RECIPES_DATA.find((item) => item._id === params.get("id")));
  }, []);

  console.log({ recipe });
  return <div className="recipe-detail-container">Recipe detail</div>;
};
export default RecipeDetail;
