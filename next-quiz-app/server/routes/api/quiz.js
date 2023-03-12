const express = require("express");
const { getPublishedQuizzes, addQuiz, publishQuiz, updateQuiz, deleteQuiz, getUserQuizzes, getQuizById, getQuizByPermalink } = require("../../controllers/quiz.js")
const { isAuthorized } = require('../../utils/validators.js')

const quizRouter = express.Router();

quizRouter.get("/published_quizzes", getPublishedQuizzes);

quizRouter.get("/get_quiz_by_id/:quiz_id", getQuizById);

quizRouter.get("/get_quiz_by_permalink/:quiz_permalink", getQuizByPermalink);

quizRouter.post("/user_quizzes", isAuthorized, getUserQuizzes);

quizRouter.post("/add_quiz", isAuthorized, addQuiz);

quizRouter.put("/publish_quiz/:quiz_id", isAuthorized, publishQuiz);

quizRouter.put("/update_quiz/:quiz_id", isAuthorized, updateQuiz);

quizRouter.delete("/delete_quiz/:quiz_id", isAuthorized, deleteQuiz);

module.exports = quizRouter;
