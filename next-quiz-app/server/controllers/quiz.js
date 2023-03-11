const Quiz = require('../models/quiz.js');

const getPublishedQuizzes = async (req, res) => {
    try {
        const published_quizzes = await Quiz.find({ is_published: true });
        res.status(200).json(published_quizzes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quiz_id);
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getQuizByPermalink = async (req, res) => {
    try {
        let permalink = `http://localhost:3000/take_quiz/${req.params.quiz_permalink}`
        const quiz = await Quiz.findOne({ permalink: permalink });
        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getUserQuizzes = async (req, res) => {
    try {
        const user_quizzes = await Quiz.find({ created_by: req.body.email });
        res.status(200).json(user_quizzes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const addQuiz = async (req, res) => {
    try {
        const response = await Quiz.insertMany({
            created_by: req.body.email,
            title: req.body.title,
            questions: req.body.questions,
        })
        if (response) {
            res.status(201).json({ message: 'Quiz added successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const publishQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quiz_id);

        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }

        await quiz.updateOne({
            is_published: true,
            permalink: `http://localhost:3000/take_quiz/${Math.random().toString(36).slice(2, 8)}`,
        });

        res.status(201).json({ message: 'Quiz Published' })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const updateQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quiz_id);

        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        if (quiz && quiz.is_published) {
            res.status(304).json({ message: 'Cannot update published quiz' });
            return;
        }

        await quiz.updateOne({
            title: req.body.title || quiz.title,
            questions: req.body.questions || quiz.questions,
        });

        res.status(201).json({ message: 'Quiz Updated' })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.quiz_id);

        if (!quiz) {
            res.status(404).json({ message: 'Quiz not found' });
            return
        }

        await quiz.deleteOne();

        res.status(200).json({ message: 'Quiz Deleted' })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

module.exports = { getPublishedQuizzes, addQuiz, publishQuiz, updateQuiz, deleteQuiz, getUserQuizzes, getQuizById, getQuizByPermalink };