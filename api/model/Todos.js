const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
	task: {
		type: String,
		required: true,
	},
	checked: {
		type: Boolean,
		required: true,
	},
	deviceId: {
		type: String,
		required: true,
	},
});

const Todos = mongoose.model('Todos', todosSchema);

module.exports = Todos;
