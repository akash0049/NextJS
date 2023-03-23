const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    questions: {
        type: Array,
        required: true,
        validate: v => Array.isArray(v) && v.length > 0,
    },
    is_published: {
        type: Boolean,
        default: false
    },
    permalink: {
        type: String,
        default: ''
    },
    created_by: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

const Quiz = mongoose.model("Quizzes", quizSchema);

module.exports = Quiz;