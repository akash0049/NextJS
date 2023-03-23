import { styled } from "@mui/material/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  IconButton,
  Typography,
} from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <Typography>
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          ></IconButton>
        ) : null}
      </DialogTitle>
    </Typography>
  );
}

const ConfirmationDialog = ({
  children,
  action,
  isOpen,
  handleClose,
  handleConfirm,
}) => {
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          {action} Confirmation
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            <Typography>
              Are you sure you want to {action.toLowerCase()}?
            </Typography>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleConfirm();
              handleClose();
            }}
            sx={{ color: "teal" }}
          >
            <Typography>Yes</Typography>
          </Button>
          <Button autoFocus onClick={handleClose} sx={{ color: "teal" }}>
            <Typography>No</Typography>
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default ConfirmationDialog;
