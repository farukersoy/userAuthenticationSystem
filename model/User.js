const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: [true, 'Please enter firstName'] },
    lastName: { type: String, required: [true, 'Please enter lastName'] },
    email: { type: String, required: [true, 'Please enter email address'] },
    password: { type: String, required: [true, 'Please enter email address'] },
    mobile: { type: String },
    lastToken: { type: String }
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;