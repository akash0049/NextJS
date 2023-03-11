import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const QuizResult = ({ result, onResetResult }) => {
  let color_picker =
    result.score === 100
      ? "#00ac46"
      : result.score >= 70 && result.score < 100
      ? "#780000"
      : result.score >= 50 && result.score < 70
      ? "#dc0000"
      : result.score >= 30 && result.score < 50
      ? "#fd8c00"
      : "grey";

  return (
    <Container>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "inline-flex",
          }}
        >
          <CircularProgress
            variant="determinate"
            value={result.score === 0 ? 100 : result.score}
            size={150}
            style={{
              color: color_picker,
            }}
          />

          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4" color={color_picker}>
              {`${Math.round(result.score)}%`}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: color_picker,
          }}
        >
          {result.score === 100
            ? "Perfect !!"
            : result.score >= 70 && result.score < 100
            ? "Execellent !!"
            : result.score >= 50 && result.score < 70
            ? "Very Good !!"
            : result.score >= 30 && result.score < 50
            ? "Good !!"
            : "Try Again !!"}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Correct Answers : {result.correct_answers}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Wrong Answers : {result.wrong_answers}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Attempted Questions : {result.attempted_questions}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">
          Total Questions : {result.total_questions}
        </Typography>
      </Box>
      <Box
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="outlined" onClick={onResetResult}>
          Try Again
        </Button>
      </Box>
    </Container>
  );
};

export default QuizResult;
