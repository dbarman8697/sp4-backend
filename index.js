const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRouter } = require("./routes/User.route");
const { Auth } = require("./middleware/auth");
const { postRouter } = require("./routes/Post.route");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use(Auth);
app.use("/posts", postRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connect to DB!");
    console.log(`Server is running on port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
    console.log("Something wrong!");
  }
});
