const express = require('express');
const router = express.Router();
const Todos = require('../model/Todos');
const { version } = require('../package.json');

router.get('/', (req, res) => {
	res.send(
		`<h3 style="font-weight: 100; font-family: 'Century Gothic', 'Arial';" >Hello World!
      <br />
    - v${version}</h3>`,
	);
});

router.post('/add', async (req, res) => {
	try {
		const todo = new Todos(req.body);

		const response = await todo.save();
		res.json({ message: 'Task Added!', response });
	} catch (e) {
		res.send(500, { message: e.message });
	}
});

router.get('/get', async (req, res) => {
	const { id } = req.query;

	try {
		const todos = await Todos.find({ deviceId: id }).sort([['_id', -1]]).exec();
		res.json({ todos });
	} catch (e) {
		res.send(500, { message: e.message });
	}
});

router.put('/update', async (req, res) => {
	const { id } = req.body;

	try {
		await Todos.update({ _id: id }, req.body);
		res.json({ message: 'Task Updated' });
	} catch (e) {
		res.send({ message: e.message });
	}
});

router.delete('/delete', async (req, res) => {
	const { id } = req.body;
	
	try {
		await Todos.deleteOne({ _id: id });
		res.json({ message: 'Task Deleted' });
	} catch (e) {
		res.send({ message: e.message });
	}
});

module.exports = router;
