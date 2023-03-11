import Page from "@/components/layout/page";
import QuizList from "@/components/quiz/quiz_list";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

export default function Home(props) {
  return (
    <Page title="Home">
      <Container sx={{ my: 3 }}>
        <Box sx={{ m: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Published Quizzes</Typography>
        </Box>
        <Divider />
        <QuizList page="Home" quizzes={props.publishedQuizzes} />
      </Container>
    </Page>
  );
}

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/published_quizzes`
  );
  const quizzes = await response.json();
  return {
    props: {
      publishedQuizzes: quizzes,
    },
  };
}
