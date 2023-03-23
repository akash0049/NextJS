import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";

const Question = ({ question, index, onSelectAnswer }) => {
  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <Typography>
          Q.{index + 1} {question.title} ({question.type})
        </Typography>
        {question.type === "Single Choice Question" ? (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            sx={{ ml: 3 }}
          >
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio />}
                onChange={(e) =>
                  onSelectAnswer(question.type, index, e.target.value)
                }
                label={option}
              />
            ))}
          </RadioGroup>
        ) : (
          <FormGroup sx={{ ml: 3 }}>
            {question.options.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={
                  <Checkbox
                    onChange={(e) =>
                      onSelectAnswer(
                        question.type,
                        index,
                        e.target.value,
                        e.target.checked
                      )
                    }
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        )}
      </Box>
    </Container>
  );
};

export default Question;
