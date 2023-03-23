import { Fragment } from "react";
import { useFormik, FieldArray, FormikProvider, getIn } from "formik";
import { quizSchema } from "@/schemas/quiz_schema";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import { useAuth } from "@/context/auth_context";

const CreateQuizForm = ({ quiz }) => {
  const { currentUser } = useAuth();
  const questionData = {
    title: "",
    type: "",
    no_of_options: "",
    options: [],
    answers: [],
  };

  const initialValues = {
    quiz_title: (quiz && quiz.title) || "",
    questions: (quiz && quiz.questions) || [questionData],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: quizSchema,
    onSubmit: async (values, action) => {
      let url = `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/add_quiz`;
      let method = "POST";
      if (quiz) {
        url = `${process.env.NEXT_PUBLIC_SERVER_API}/quiz/update_quiz/${quiz._id}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        body: JSON.stringify({
          email: currentUser.email,
          title: values.quiz_title,
          questions: values.questions,
        }),
        headers: {
          "Content-Type": "application/json",
          access_token: currentUser.accessToken,
        },
      });
      const data = await response.json();
      if (!quiz && data.message === "Quiz added successfully") {
        alert("Quiz added successfully");
        action.resetForm();
      }
      if (quiz && data.message === "Quiz Updated") {
        alert("Quiz updated");
      }
    },
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  return (
    <>
      <Container>
        <Box sx={{ m: 2, display: "flex", justifyContent: "center" }}>
          <Typography variant="h4">
            {values.quiz_title || "New Quiz"}
          </Typography>
        </Box>
      </Container>
      <Container>
        <Box sx={{ mx: 25, my: 4 }}>
          <FormikProvider value={formik}>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <FormControl fullWidth>
                  <TextField
                    id="quiz_title"
                    name="quiz_title"
                    label="Quiz Title"
                    placeholder="Enter Quiz Title"
                    value={values.quiz_title}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={
                      touched.quiz_title && errors.quiz_title ? true : false
                    }
                    helperText={
                      touched.quiz_title &&
                      errors.quiz_title &&
                      errors.quiz_title
                    }
                  />
                </FormControl>

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="h6">Enter questions data</Typography>
                  </Box>

                  <FieldArray name="questions" id="questions">
                    {(fieldArrayProps) => {
                      const { push, remove } = fieldArrayProps;
                      const { questions } = values;

                      const getError = (name, type) => {
                        const error = getIn(errors, name);
                        const touch = getIn(touched, name);
                        return type === "error"
                          ? touch && error
                            ? true
                            : false
                          : touch && error
                          ? error
                          : null;
                      };

                      return (
                        <Fragment>
                          {questions.map((_, index) => (
                            <Box
                              key={index}
                              sx={{ border: 0.2, padding: 2, borderRadius: 1 }}
                            >
                              <Grid container columnSpacing={2} rowSpacing={2}>
                                <Grid item xs={10}>
                                  <Typography>Question {index + 1}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                  {values.questions.length > 1 && (
                                    <Button
                                      onClick={() => remove(index)}
                                      color="error"
                                      startIcon={<DeleteIcon />}
                                    >
                                      Delete
                                    </Button>
                                  )}
                                </Grid>
                                <Grid item xs={12}>
                                  <FormControl fullWidth>
                                    <TextField
                                      id={`questions[${index}].title`}
                                      name={`questions[${index}].title`}
                                      label="Question Title"
                                      placeholder="Enter Question Title"
                                      value={values.questions[index].title}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      error={getError(
                                        `questions[${index}].title`,
                                        "error"
                                      )}
                                      helperText={getError(
                                        `questions[${index}].title`
                                      )}
                                    />
                                  </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                  <FormControl fullWidth>
                                    <InputLabel
                                      id="question-type"
                                      sx={{
                                        color:
                                          getError(
                                            `questions[${index}].type`
                                          ) && "red",
                                      }}
                                    >
                                      Question Type
                                    </InputLabel>
                                    <Select
                                      labelId="question-type"
                                      id={`questions[${index}].type`}
                                      name={`questions[${index}].type`}
                                      label="Question Type"
                                      value={values.questions[index].type}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      error={getError(
                                        `questions[${index}].type`,
                                        "error"
                                      )}
                                    >
                                      {[
                                        "Single Choice Question",
                                        "Multiple Choice Question",
                                      ].map((type) => (
                                        <MenuItem
                                          key={type}
                                          value={type}
                                          onClick={() =>
                                            (values.questions[index].answers =
                                              [])
                                          }
                                        >
                                          {type}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <FormHelperText sx={{ color: "red" }}>
                                      {getError(`questions[${index}].type`)}
                                    </FormHelperText>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={6}>
                                  <FormControl fullWidth>
                                    <InputLabel
                                      id="no-of-options"
                                      sx={{
                                        color:
                                          getError(
                                            `questions[${index}].no_of_options`
                                          ) && "red",
                                      }}
                                    >
                                      Select number of options
                                    </InputLabel>
                                    <Select
                                      labelId="no-of-options"
                                      id={`questions[${index}].no_of_options`}
                                      name={`questions[${index}].no_of_options`}
                                      label="Select number of options"
                                      value={
                                        values.questions[index].no_of_options
                                      }
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                      error={getError(
                                        `questions[${index}].no_of_options`,
                                        "error"
                                      )}
                                    >
                                      {["2", "3", "4", "5"].map((type) => (
                                        <MenuItem
                                          key={type}
                                          value={type}
                                          onClick={() => {
                                            values.questions[index].options =
                                              [];
                                            for (
                                              let i = 0;
                                              i < parseInt(type);
                                              i++
                                            ) {
                                              values.questions[
                                                index
                                              ].options.push("");
                                            }
                                          }}
                                        >
                                          {type}
                                        </MenuItem>
                                      ))}
                                    </Select>
                                    <FormHelperText sx={{ color: "red" }}>
                                      {getError(
                                        `questions[${index}].no_of_options`
                                      )}
                                    </FormHelperText>
                                  </FormControl>
                                </Grid>
                                {values.questions[index].options.length > 0 && (
                                  <Grid item xs={12}>
                                    <Box>
                                      <Typography>
                                        Enter Options data
                                      </Typography>
                                    </Box>
                                  </Grid>
                                )}
                                {values.questions[index].options.map((_, i) => (
                                  <Grid item xs={6} key={i}>
                                    <FormControl fullWidth>
                                      <TextField
                                        id={`questions[${index}].options[${i}]`}
                                        name={`questions[${index}].options[${i}]`}
                                        label={`Option ${i + 1}`}
                                        placeholder={`Enter Option ${i + 1}`}
                                        value={
                                          values.questions[index].options[i]
                                        }
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        error={getError(
                                          `questions[${index}].options[${i}]`,
                                          "error"
                                        )}
                                        helperText={getError(
                                          `questions[${index}].options[${i}]`
                                        )}
                                      />
                                    </FormControl>
                                  </Grid>
                                ))}
                                {values.questions[index] &&
                                  values.questions[index].options.filter(
                                    (i) => i
                                  ).length > 0 && (
                                    <>
                                      <Grid item xs={12}>
                                        <Box>
                                          <Typography>
                                            Select Answer(s)
                                          </Typography>
                                        </Box>
                                      </Grid>
                                      <Grid item xs={12}>
                                        {values.questions[index].type ===
                                        "Single Choice Question" ? (
                                          <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="female"
                                            name="radio-buttons-group"
                                          >
                                            <Grid
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                              }}
                                            >
                                              {values.questions[
                                                index
                                              ].options.map((option, i) => (
                                                <Grid
                                                  key={i}
                                                  item
                                                  xs={
                                                    12 /
                                                    values.questions[index]
                                                      .options.length
                                                  }
                                                >
                                                  <FormControlLabel
                                                    name={`questions[${index}].answers`}
                                                    value={option}
                                                    control={<Radio />}
                                                    onBlur={handleBlur}
                                                    onChange={(e) => {
                                                      setFieldValue(
                                                        `questions[${index}].answers[0]`,
                                                        e.target.value
                                                      );
                                                    }}
                                                    label={option}
                                                  />
                                                </Grid>
                                              ))}
                                            </Grid>
                                            <FormHelperText
                                              sx={{ color: "red" }}
                                            >
                                              {getError(
                                                `questions[${index}].answers`
                                              )}
                                            </FormHelperText>
                                          </RadioGroup>
                                        ) : values.questions[index].type ===
                                          "Multiple Choice Question" ? (
                                          <>
                                            <Box
                                              sx={{
                                                display: "flex",
                                                justifyContent: "space-evenly",
                                              }}
                                            >
                                              {values.questions[
                                                index
                                              ].options.map((option, i) => (
                                                <Grid
                                                  key={i}
                                                  item
                                                  xs={
                                                    12 /
                                                    values.questions[index]
                                                      .options.length
                                                  }
                                                >
                                                  <FormControlLabel
                                                    value={option}
                                                    control={
                                                      <Checkbox
                                                        name={`questions[${index}].answers`}
                                                        onBlur={handleBlur}
                                                        onChange={(e) => {
                                                          if (
                                                            e.target.checked
                                                          ) {
                                                            setFieldValue(
                                                              `questions[${index}].answers[${i}]`,
                                                              e.target.value
                                                            );
                                                          } else {
                                                            let ans_index =
                                                              values.questions[
                                                                index
                                                              ].answers.indexOf(
                                                                e.target.value
                                                              );
                                                            let answers =
                                                              values.questions[
                                                                index
                                                              ].answers;
                                                            answers.splice(
                                                              ans_index,
                                                              1
                                                            );
                                                            values.questions[
                                                              index
                                                            ].answers =
                                                              answers.filter(
                                                                Boolean
                                                              );
                                                          }
                                                        }}
                                                      />
                                                    }
                                                    label={option}
                                                  />
                                                </Grid>
                                              ))}
                                            </Box>
                                            <FormHelperText
                                              sx={{ color: "red" }}
                                            >
                                              {getError(
                                                `questions[${index}].answers`
                                              )}
                                            </FormHelperText>
                                          </>
                                        ) : (
                                          <FormHelperText sx={{ color: "red" }}>
                                            Select Question Type
                                          </FormHelperText>
                                        )}
                                      </Grid>
                                    </>
                                  )}
                              </Grid>
                            </Box>
                          ))}

                          <Stack
                            direction="row"
                            sx={{
                              display: "flex",
                              justifyContent: "end",
                            }}
                          >
                            <Button
                              onClick={() => push(questionData)}
                              startIcon={<AddIcon />}
                              sx={{ color: "teal" }}
                            >
                              Add
                            </Button>
                          </Stack>
                        </Fragment>
                      );
                    }}
                  </FieldArray>
                </Stack>
              </Stack>

              <Stack direction="row" justifyContent={"center"} sx={{ my: 3 }}>
                <Button type="submit" variant="outlined" sx={{ color: "teal" }}>
                  Submit
                </Button>
              </Stack>
            </form>
          </FormikProvider>
        </Box>
      </Container>
    </>
  );
};

export default CreateQuizForm;
