export const getResult = (questions, userAnswers) => {
    let result = {};
    let correct_answers = 0;
    let score = 0;
    let total_questions = questions.length;
    if (!userAnswers) {
        result = {
            total_questions: total_questions,
            attempted_questions: 0,
            correct_answers: correct_answers,
            wrong_answers: total_questions - correct_answers,
            score: score,
        }
    } else {
        let attempted_questions = Object.keys(userAnswers).length;
        for (let index of Object.keys(userAnswers)) {
            let userAnswer = userAnswers[index];
            let correct_answer = questions[index].answers;
            console.log(userAnswer, correct_answer)
            if (JSON.stringify(userAnswer) === JSON.stringify(correct_answer)) {
                correct_answers += 1;
            }
        }
        score = Math.round((correct_answers / total_questions) * 100);

        result = {
            total_questions: total_questions,
            attempted_questions: attempted_questions,
            correct_answers: correct_answers,
            wrong_answers: (total_questions - (total_questions - attempted_questions)) - correct_answers,
            score: score,
        }
    }

    return result;
}