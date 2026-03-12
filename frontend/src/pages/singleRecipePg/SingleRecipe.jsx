import React from "react";
import styles from "./SingleRecipe.module.css";
import { NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import { asyncAddToFavorite, getDetailRecipeAction, asyncIncrementRecipeViews } from "../../store/actions/recipeAction";
import { useEffect } from "react";
import { resetRecipes } from "../../store/reducers/recipeSlice";



const SingleRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const _id = id;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailRecipeAction(id))
    if (id) {
      dispatch(asyncIncrementRecipeViews(id));
    }
    return () => { dispatch(resetRecipes()) }

  }
    , [id, dispatch])
  const recipe = useSelector((state) => state.recipes.data[0])


  const user = useSelector((state) => state.users.data);
  const normalizeList = (value) => {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      const items = value
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);
      return items;
    }
    return [];
  };
  const ingredients = normalizeList(recipe?.ingredients);
  const instructions = normalizeList(recipe?.instructions);



  const favorite = (title) => {
    const favResult = !recipe.fav;
    dispatch(asyncAddToFavorite({ _id, favResult }));
    if (favResult == true) {
      toast.success(`${recipe.title} added to favorites!!!`);
    }
    if (favResult == false) {
      toast.success(`${recipe.title} Removed from favorites!!!`);
    }
    //test ends
  };

  const delItem = () => {
    toast.success(`recipe deleted successfully  !!`);
    const newItems = recipe.filter((f) => f.id !== params.id);

    setrecipe(newItems);

    navigate("/recipes");
  };


  return recipe ? (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* HERO */}
        <div className={styles.hero}>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className={styles.heroImage}
          />

          <div className={styles.heroContent}>
            <h1>{recipe.title}</h1>
            <p className={styles.description}>{recipe.description}</p>

            {/* META */}
            <div className={styles.meta}>
              <div className={styles.author}>
                <img
                  src={
                    recipe.createdBy?.avatar ||
                    `https://ui-avatars.com/api/?name=${recipe?.createdBy?.username || 'Anonymous'
                    }+User&background=2f7f6f&color=fff`
                  }
                  alt="author"
                />

                <div>
                  <span>Created by</span>
                  <strong>{recipe.createdBy?.username || 'Anonymous'
                  }</strong>
                </div>
              </div>

              <button className={styles.favBtn} onClick={favorite}>
                {recipe.fav ? "Remove from favorites" : "Add to favorites"}
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.content}>
          {/* INGREDIENTS */}
          <div className={styles.box}>
            <h3>Ingredients</h3>
            <ul>
              {ingredients.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {/* INSTRUCTIONS */}
          <div className={styles.box}>
            <h3>Instructions</h3>
            <ol>
              {instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  ) : <h1>Loading recipe...</h1>
};

export default SingleRecipe;
