import Page from "@/components/layout/page";
import CreateQuizForm from "@/components/quiz/create_quiz_form";

const EditQuiz = (props) => {
  const { quiz } = props;
  return (
    <Page title="Edit Quiz">
      <CreateQuizForm quiz={quiz} />
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

export default EditQuiz;
