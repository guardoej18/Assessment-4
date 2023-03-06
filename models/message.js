const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

	message: {
		type: String,
		required: [true, "Message is required!"]
	}
});

module.exports = mongoose.model('Message', messageSchema);