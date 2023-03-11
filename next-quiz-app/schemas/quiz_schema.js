import * as Yup from "yup";

export const quizSchema = Yup.object({
    quiz_title: Yup.string().required("Quiz Title is required"),
    questions: Yup
        .array()
        .of(
            Yup.object().shape({
                title: Yup.string().required('Question Title is required'),
                type: Yup.string().required('Question Type is required'),
                no_of_options: Yup.string().required('Number of options is required'),
                options: Yup.array().of(
                    Yup.string().required('Option is required'),
                ),
                answers: Yup.array().min(1, 'Atleast select one answer')
            })
        )
});