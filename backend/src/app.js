import express from "express";
import recipeRoutes from "../src/routes/recipe.routes.js";
import userRoutes from "./routes/userRoutes.js";
import videosRouter from './routes/videosRouter.js'
import corsMiddleware from './utils/cors.js'
// import userRecipeRoutes from './routes/userRecipes.route.js'

const app = express();
app.use(corsMiddleware);
app.options("*", corsMiddleware); // ✅ important for preflight


app.use(express.json());
app.use("/api", recipeRoutes);
app.use("/api", userRoutes);
app.use("/api", videosRouter);
// app.use("/api", userRecipeRoutes);

export default app;
