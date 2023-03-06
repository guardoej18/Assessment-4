const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({

	name: {
		type: String,
		required: [true, "Name is required!"]
	},
	email: {
		type: String,
		required: [true, "Email is required!"]
	},
	mobileNo: {
		type: String,
		required: [true, "Mobile Number is required!"]
	}
});

module.exports = mongoose.model('Contacts', contactsSchema);