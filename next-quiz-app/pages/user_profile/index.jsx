import Page from "@/components/layout/page";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import QuizList from "@/components/quiz/quiz_list";
import { useAuth } from "@/context/auth_context";
import Link from "next/link";

const UserProfile = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [userQuizzes, setUserQuizzes] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      router.replace("/auth");
    }
  }, [currentUser]);

  useEffect(() => {
    async function getUserQuizzes() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/user_quizzes`,
        {
          method: "POST",
          body: JSON.stringify({ email: currentUser.email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setUserQuizzes(data);
    }

    getUserQuizzes();
  }, []);
  console.log(userQuizzes);
  return (
    <Page title="User Profile">
      <Container sx={{ my: 3, display: "flex", justifyContent: "center" }}>
        <Avatar sx={{ width: 200, height: 200 }} />
      </Container>
      <Container sx={{ my: 3, display: "flex", justifyContent: "center" }}>
        <Typography variant="h6">
          {currentUser && currentUser.email.toUpperCase()}
        </Typography>
      </Container>
      {userQuizzes && (
        <>
          <Divider />
          <Container sx={{ my: 3 }}>
            <Box
              sx={{ m: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">My Quizzes</Typography>
              <Link href="/user_profile/create_quiz">
                <Button variant="outlined" sx={{ color: "teal" }}>
                  Create Quiz
                </Button>
              </Link>
            </Box>
            <Divider />
            <QuizList quizzes={userQuizzes} />
          </Container>
        </>
      )}
    </Page>
  );
};

export default UserProfile;
