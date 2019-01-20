const mongoose = require('mongoose');
mongoose.connect(
	'mongodb://admin:admin123@ds161104.mlab.com:61104/todos',
	{ useNewUrlParser: true },
);
// mongodb://<dbuser>:<dbpassword>@ds161104.mlab.com:61104/todos
module.exports = mongoose;
