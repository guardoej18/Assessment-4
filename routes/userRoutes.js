const express = require("express");
const router = express.Router();

const auth = require("../auth");
const userController = require("../controllers/userController");

// Route for registering a new user
router.post("/register", (req, res) => {

	userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for logging in an existing user
router.post("/login", (req, res) => {

	userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for creating contact list
router.post("/contacts", (req, res) => {

	userController.contactList(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for retrieving contact list
router.get("/check", auth.verify, (req, res) => {

	userController.checkContact().then(resultFromController => res.send(resultFromController));
});

// Route for adding a new chat message
router.post("/add-chat", auth.verify, (req, res) => {

	userController.createMessage(req.body).then(resultFromController => res.send(resultFromController));
});

// Route for getting chat history
router.get("/getchat", auth.verify, (req, res) => {

	userController.getMessage().then(resultFromController => res.send(resultFromController));
});

// Route for showing contact headers
router.get("/contact-headers", auth.verify, (req, res) => {

	res.set('Content-Type', 'text/plain');
	res.set('Cache-Control', 'no-cache');
	res.set('Access-Control-Allow-Origin', '*');
	res.send('Contact Headers');

	userController.showHeaders().then(resultFromController => res.send(resultFromController));
});

// Route for showing contact options
router.options("/contact-options", auth.verify, (req, res) => {
	res.set('Allow', 'GET, POST, PUT, DELETE');
	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	res.send();

	userController.showOptions().then(resultFromController => res.send(resultFromController));
});


// Route for sending notifications
router.post("/notifications", auth.verify, (req, res) => {

	userController.notifications(req.params, req.body).then(resultFromController => res.send(resultFromController));
});


module.exports = router;