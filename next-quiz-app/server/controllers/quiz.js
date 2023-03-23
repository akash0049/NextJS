const Quiz = require('../models/quiz.js');

const getPublishedQuizzes = async (req, res) => {
    try {
        const response = await Quiz.find({ is_published: true });
        let published_quizzes = response.map(quiz => ({
            _id: quiz._id,
            title: quiz.title,

            is_published: quiz.is_published,
            permalink: quiz.permalink,
        }));
        res.status(200).json(published_quizzes);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getQuizById = async (req, res) => {
    try {
        const response = await Quiz.findById(req.params.quiz_id);
        if (!response) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        let quiz = response;
        quiz['questions'] = quiz.questions.map(q => ({
            title: q.title,
            type: q.type,
            options: q.options
        }));
        res.status(200).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const getQuizByPermalink = async (req, res) => {
    try {
        let permalink = `http://localhost:3000/take_quiz/${req.params.quiz_permalink}`
        const response = await Quiz.findOne({ permalink: permalink });
        if (!response) {
            res.status(404).json({ message: 'Quiz not found' });
            return;
        }
        let quiz = response;
        quiz['questions'] = quiz.questions.map(q => ({
            title: q.title,
            type: q.type,
            options: q.options
        }));
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

const getQuizResult = async (req, res) => {
    try {
        let userAnswers = req.body.userAnswers;
        let correct_answers = 0;
        let score = 0;
        let attempted_questions = 0
        const quiz = await Quiz.findById(req.params.quiz_id);
        let total_questions = quiz.questions.length;

        if (userAnswers) {
            attempted_questions = Object.keys(userAnswers).length;
            for (let index of Object.keys(userAnswers)) {
                let userAnswer = userAnswers[index];
                let correctAnswer = quiz.questions[index].answers.filter(i => i);
                if (checkAnswer(userAnswer, correctAnswer)) {
                    correct_answers += 1;
                }
            }
            score = Math.round((correct_answers / total_questions) * 100);
        }
        let result = {
            total_questions,
            attempted_questions,
            correct_answers,
            wrong_answers: total_questions - correct_answers,
            score,
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

const checkAnswer = (userAnswer, correct_answer) => {
    for (let answer of correct_answer) {
        if (!userAnswer.includes(answer)) {
            return false;
        }
    }
    return true
}

module.exports = { getPublishedQuizzes, addQuiz, publishQuiz, updateQuiz, deleteQuiz, getUserQuizzes, getQuizById, getQuizByPermalink, getQuizResult };