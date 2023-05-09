const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
});


userSchema.methods.isValidPassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

userSchema.virtual('password').set(function (password) {
    this.passwordHash = bcrypt.hashSync(password, 10);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
