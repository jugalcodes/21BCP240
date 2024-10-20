const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    todoName: {
        type: String,
        required: true
    },

    isDone: {
        type: Boolean,
        required: true
    }
})

const todoModel = mongoose.model('TodoCollection', todoSchema);  // mention the collection name here
module.exports = todoModel;
