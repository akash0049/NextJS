import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShareIcon from "@mui/icons-material/Share";
import CreateIcon from "@mui/icons-material/Create";
import QuizIcon from "@mui/icons-material/Quiz";

const WelcomeText = ({ action }) => {
  return (
    <>
      {action === "Login" ? (
        <Typography variant="h4">Welcome Back</Typography>
      ) : (
        <Typography variant="h4">Get Started</Typography>
      )}

      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <CreateIcon sx={{ color: "teal" }} />
          </ListItemIcon>
          <ListItemText primary="Create and publish your custom quizzes" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <ShareIcon sx={{ color: "teal" }} />
          </ListItemIcon>
          <ListItemText primary="Share your quizzes with others" />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <QuizIcon sx={{ color: "teal" }} />
          </ListItemIcon>
          <ListItemText primary="Take other published quizzes also" />
        </ListItem>
      </List>
    </>
  );
};

export default WelcomeText;
