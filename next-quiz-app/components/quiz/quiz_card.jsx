import { useState } from "react";
import { useAuth } from "@/context/auth_context";

import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PublishIcon from "@mui/icons-material/Publish";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import ConfirmationDialog from "../layout/confirmation_dialog";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";

const QuizCard = ({ quiz, page }) => {
  const { currentUser } = useAuth();

  const [action, setAction] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const publishQuiz = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/publish_quiz/${quiz._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.message === "Quiz Published") {
      window.location.reload();
      alert("Quiz Published");
    }
  };

  const deleteQuiz = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/delete_quiz/${quiz._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.message === "Quiz Deleted") {
      window.location.reload();
      alert("Quiz Deleted");
    }
  };

  const handleConfirmationDialog = (action) => {
    setIsOpen(true);
    setAction(action);
  };

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 330, m: 1 }}>
        <Image
          src={"/images/quiz_logo.png"}
          alt={"Quiz Logo"}
          width={330}
          height={140}
        />
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">{quiz.title}</Typography>
            {quiz.permalink && (
              <IconButton
                onClick={() => {
                  navigator.share({
                    title: "Sare Quiz using permalink",
                    url: quiz.permalink,
                    text: quiz.permalink,
                  });
                }}
              >
                <ShareIcon />
              </IconButton>
            )}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{ color: quiz.is_published ? "green" : "grey" }}
          >
            {quiz.is_published ? "Published" : "Not Published"}
          </Typography>
        </CardContent>
        <CardActions>
          {page !== "Home" &&
            currentUser &&
            currentUser.email === quiz.created_by &&
            !quiz.is_published && (
              <>
                <Button
                  variant="outlined"
                  size="small"
                  color="primary"
                  startIcon={<EditIcon sx={{ mb: 0.5 }} />}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  startIcon={<PublishIcon sx={{ mb: 0.5 }} />}
                  onClick={() => handleConfirmationDialog("Publish")}
                >
                  Publish
                </Button>
              </>
            )}
          {page !== "Home" ? (
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteIcon sx={{ mb: 0.5 }} />}
              onClick={() => handleConfirmationDialog("Delete")}
            >
              Delete
            </Button>
          ) : (
            <Link href={`/${quiz._id}`}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<RocketLaunchIcon sx={{ mb: 0.5 }} />}
              >
                Take Quiz
              </Button>
            </Link>
          )}
        </CardActions>
      </Card>
      <ConfirmationDialog
        action={action}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleConfirm={action === "Delete" ? deleteQuiz : publishQuiz}
      />
    </>
  );
};

export default QuizCard;
