import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import QuizCard from "./quiz_card";

const QuizList = ({ page, quizzes }) => {
  return (
    <>
      {quizzes && quizzes.length === 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
            <Typography variant="h6" color={"error"}>
              No quizzes found.
            </Typography>
          </Box>
        </>
      )}
      <Grid container>
        {quizzes &&
          quizzes.length > 0 &&
          quizzes.map((quiz) => (
            <Grid key={quiz._id} item lg={4}>
              <QuizCard quiz={quiz} page={page} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default QuizList;
