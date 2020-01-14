const mongoose = require('./mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    present: { type: Boolean, required: false, default: false }
}, { timestamps: { updatedAt: 'updated_at', createdAt: 'created_at' } });

userSchema.methods.hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('User', userSchema);