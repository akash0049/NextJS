import React, { useState } from "react";
import Question from "./question";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { getResult } from "@/services/helpers/quiz";
import ConfirmationDialog from "../layout/confirmation_dialog";
import QuizResult from "./quiz_result";

const TakeQuizForm = ({ questions }) => {
  const [userAnswers, setUserAnswers] = useState(undefined);
  const [result, setResult] = useState(undefined);

  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmationDialog = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleSelectAnswer = (
    question_type,
    index,
    answer,
    checked = undefined
  ) => {
    let updatedUserAnswers = { ...userAnswers };
    if (question_type === "Single Choice Question") {
      updatedUserAnswers[index] = [answer];
      setUserAnswers(updatedUserAnswers);
    } else {
      if (!updatedUserAnswers[index]) updatedUserAnswers[index] = [];

      if (checked) {
        updatedUserAnswers[index].push(answer);
      } else {
        let i = updatedUserAnswers[index].indexOf(answer);
        updatedUserAnswers[index].splice(i, 1);
      }
      setUserAnswers(updatedUserAnswers);
    }
  };

  const handleSubmit = () => {
    const result = getResult(questions, userAnswers);
    setResult(result);
  };

  const resetResult = () => {
    setResult(undefined);
    setUserAnswers(undefined);
  };

  return (
    <>
      {result && <QuizResult result={result} onResetResult={resetResult} />}
      {!result && (
        <form onSubmit={handleConfirmationDialog}>
          {questions.map((question, index) => (
            <Question
              key={index}
              question={question}
              index={index}
              onSelectAnswer={handleSelectAnswer}
            />
          ))}
          <Stack direction="row" justifyContent={"center"} sx={{ my: 3 }}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Stack>
          <ConfirmationDialog
            action={"Submit"}
            isOpen={isOpen}
            handleClose={() => setIsOpen(false)}
            handleConfirm={handleSubmit}
          />
        </form>
      )}
    </>
  );
};

export default TakeQuizForm;
