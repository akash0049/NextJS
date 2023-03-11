import Page from "@/components/layout/page";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TakeQuizForm from "@/components/quiz/take_quiz_form";

const TakeQuiz = (props) => {
  const { quiz } = props;
  return (
    <Page title="Take Quiz">
      <Container sx={{ my: 3 }}>
        {quiz.message === "Quiz not found" && (
          <Box color="red" sx={{ textAlign: "center" }}>
            <Typography>No Quiz Found</Typography>
          </Box>
        )}
        {quiz && quiz.title && (
          <>
            <Box sx={{ m: 1 }}>
              <Typography variant="h5">Take Quiz</Typography>
              <Typography variant="body1">Quiz Title : {quiz.title}</Typography>
            </Box>
            <Divider />
            <TakeQuizForm questions={quiz.questions} />
          </>
        )}
      </Container>
    </Page>
  );
};

export async function getServerSideProps(context) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/get_quiz_by_id/${context.query.quiz_id}`
  );
  const quiz = await response.json();
  return {
    props: {
      quiz: quiz,
    },
  };
}

export default TakeQuiz;
