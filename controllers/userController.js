const User = require("../models/User");
const Contacts = require("../models/Contacts");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");
const auth = require("../auth");

// Registers a new user
module.exports.registerUser = (reqBody) => {

	let newUser = new User({
		username: reqBody.username,
		firstName: reqBody.firstName,
		lastName: reqBody.lastName,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo,
		password: bcrypt.hashSync(reqBody.password, 10)
	});

	return newUser.save().then((user, error) => {
		if (error) {
			return false;
		} else {
			return (`User ${reqBody.firstName} ${reqBody.lastName} registered successfully.`);
		};
	});
};

// Login for existing users
module.exports.loginUser = (reqBody) => {

	return User.findOne({username: reqBody.username}).then(result => {

		if (result == null){
			return false;

		} else {

			const isPasswordCorrect = bcrypt.compareSync(reqBody.password, result.password);

			if (isPasswordCorrect){

				return { access : auth.createAccessToken(result)};
			} else {
				return false;
			};
		};
	});
};

// Adding contacts
module.exports.contactList = (reqBody) => {

	let newContacts = new Contacts({
		name: reqBody.name,
		email: reqBody.email,
		mobileNo: reqBody.mobileNo
	});

	return newContacts.save().then((contacts, error) => {
		if (error) {
			return false;
		} else {
			return (`You have successfully added ${reqBody.name} in your contact list`);
		};
	});
};

// Checking contacts
module.exports.checkContact = () => {

	return Contacts.find({}).then(result => {
		return result;
	});
};

// Adding a chat message
module.exports.createMessage = (reqBody) => {

	let newMessage = new Message({
		message: reqBody.message
	});

	return newMessage.save().then((message, error) => {
		if (error) {
			return false;
		} else {
			return message;
		};
	});
};

// Checking chat history
module.exports.getMessage = () => {

	return Message.find({}).then(result => {
		return result;
	});
};

// Show contact headers
module.exports.showHeaders = (result) => {
	return result;
};

// Show contact options
module.exports.showOptions = (result) => {
	return result;
};

// Getting new notifications
module.exports.notifications = (reqParams, reqBody) => {

	return User.find({email: reqBody.email}).then((result, error) => {
		
		let messageCount = 0;
		const message = {message: reqBody.message};
		messageCount++;

		if (error) {
			return false;
		} else {
			return `Received ${messageCount} messages.`;
		};
	});
};
