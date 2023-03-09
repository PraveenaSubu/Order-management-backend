const mongoose = required("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 20,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        trim: true,
    },
});

module.exports = mongoose.model("Users", userSchema);