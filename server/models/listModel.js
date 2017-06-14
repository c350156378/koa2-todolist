const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    user_id: String,
    content: String,
    status: Boolean
});

module.exports = mongoose.model('List', ListSchema);