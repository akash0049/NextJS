import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";
import { useAuth } from "@/context/auth_context";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmationDialog from "./confirmation_dialog";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmationDialog = () => {
    setIsOpen(true);
  };

  return (
    <AppBar>
      <Toolbar sx={{ backgroundColor: "teal" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, ml: "10%" }}
        >
          <Link href="/" style={{ color: "white" }}>
            Quiz App
          </Link>
        </Typography>
        {currentUser && (
          <Box sx={{ mr: "10%" }}>
            <Button color="inherit" startIcon={<PersonIcon />}>
              <Link href="/user_profile" style={{ color: "white" }}>
                Profile
              </Link>
            </Button>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleConfirmationDialog}
            >
              Logout
            </Button>
          </Box>
        )}
        {!currentUser && (
          <Button sx={{ mr: "10%" }}>
            <Link href="/auth" style={{ color: "white" }}>
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
      <ConfirmationDialog
        action={"Logout"}
        isOpen={isOpen}
        handleClose={() => setIsOpen(false)}
        handleConfirm={async () => {
          await logout();
        }}
      />
    </AppBar>
  );
}
