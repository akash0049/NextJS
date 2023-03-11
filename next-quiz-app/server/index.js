const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const quizRoutes = require("./routes/api/quiz.js")

require("dotenv/config");

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => res.send("<b>Hello from Quizify team</b>"));

app.use("/api/quiz", quizRoutes);

//Database Connection
mongoose
    .connect(process.env.DB_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`server running on port ${process.env.PORT} and connected to mongoDB`);
        });
    })
    .catch((error) => {
        console.log(error.message);
    });