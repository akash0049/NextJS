import { useState } from "react";
import { useFormik } from "formik";
import { loginSchema } from "@/schemas/login_schema";
import {
  TextField,
  Stack,
  InputAdornment,
  IconButton,
  FormControl,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginForm = ({ action, login, signUp }) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      if (action === "Login") {
        const response = await login(values.email, values.password);
        if (response.user) {
          alert("Login Successful");
          router.replace("/user_profile");
        }
        if (response.code === "auth/user-not-found") {
          alert("User is not registered");
        }
        if (response.code === "auth/wrong-password") {
          alert("Incorrect Password");
        }
      } else {
        const response = await signUp(values.email, values.password);
        if (response.user) {
          alert("Signup Successful");
          router.replace("/user_profile");
        }
        if (response.code === "auth/invalid-email") {
          alert("Invalid Email");
        }
        if (response.code === "auth/weak-password") {
          alert("Password should be at least 6 characters");
        }
        if (response.code === "auth/email-already-in-use") {
          alert("User with this email is already registerd");
        }
      }
      setIsLoading(false);
    },
  });

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Typography variant="h6">Enter your details below</Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {action === "Login" ? "Login to continue" : "Register yourself"}
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <FormControl fullWidth>
            <TextField
              id="email"
              name="email"
              label="Email"
              placeholder="Enter Email Address"
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && errors.email}
              helperText={touched.email && errors.email && errors.email}
            />
          </FormControl>

          <FormControl fullWidth>
            <TextField
              id="password"
              name="password"
              label="Password"
              placeholder="Enter Password"
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={touched.password && errors.password}
              helperText={
                touched.password && errors.password && errors.password
              }
            />
          </FormControl>
        </Stack>

        <Stack direction="row" justifyContent={"center"} sx={{ my: 3 }}>
          <Button
            disabled={isSubmitting}
            type="submit"
            variant="outlined"
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {action === "Login"
              ? isSubmitting
                ? "Loading..."
                : "Login"
              : isSubmitting
              ? "Loading..."
              : "SignUp"}
          </Button>
        </Stack>
        <Stack direction="row" justifyContent={"center"} sx={{ my: 2 }}>
          <Typography>
            <Link
              href={action === "Login" ? "/auth/signup" : "/auth"}
              style={{ color: "teal" }}
            >
              {action === "Login"
                ? "Don't have an account? SignUp"
                : "Already have an account?Login"}
            </Link>
          </Typography>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
