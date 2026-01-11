import { connectToDb } from "./src/db/db.js";
const port = process.env.PORT || 4000;
import app from "./src/app.js";

app.use(cors());
connectToDb();
app.listen(port, () => {
  console.log("server is running on port 3000");
});
