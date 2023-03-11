const express = require("express");
const { getPublishedQuizzes, addQuiz, publishQuiz, updateQuiz, deleteQuiz, getUserQuizzes, getQuizById, getQuizByPermalink } = require("../../controllers/quiz.js")

const quizRouter = express.Router();

quizRouter.get("/published_quizzes", getPublishedQuizzes);

quizRouter.get("/get_quiz_by_id/:quiz_id", getQuizById);

quizRouter.get("/get_quiz_by_permalink/:quiz_permalink", getQuizByPermalink);

quizRouter.post("/user_quizzes", getUserQuizzes);

quizRouter.post("/add_quiz", addQuiz);

quizRouter.put("/publish_quiz/:quiz_id", publishQuiz);

quizRouter.put("/update_quiz/:quiz_id", updateQuiz);

quizRouter.delete("/delete_quiz/:quiz_id", deleteQuiz);

module.exports = quizRouter;
