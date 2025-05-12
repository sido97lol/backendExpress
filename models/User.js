const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    //trim: true => username="Sid Ali" => username=> "SidAli" #Ignoring and removing spaces in the String
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password
UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
