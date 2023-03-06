const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 4000;

mongoose.connect("mongodb+srv://guardoej18:darabz312@zuitt-bootcamp.d2vle2v.mongodb.net/project?retryWrites=true&w=majority",
		{
			useNewUrlParser : true,
			useUnifiedTopology : true,
		});

mongoose.connection.once("open", () => console.log('Now connected to MongoDB Atlas!'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use("/users", userRoutes);

app.listen(port, () => console.log(`Server is now running at localhost: ${port}`));
