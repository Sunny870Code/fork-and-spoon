const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    permissions: {
        type: [String],
        required: true
    }
});

const RoleModel = mongoose.model("Role", roleSchema);

module.exports = RoleModel;