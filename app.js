const express = require("express");

const cron = require("node-cron");
const nodemailer = require("nodemailer");

app = express();

//create mail transporter
let transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user:process.env.user,
		pass:process.env.password
	}
});

//sending emails at periodic intervals
cron.schedule("* * * * *", function(){
	console.log("Running Cron Job");
	let mailOptions = {
		from: process.env.user,
		to: process.env.to_user,
		subject: `CRON-JOB 001`,
		html: `<h1 style="text-align: center">CRON-JOB Message</h1>Hi there, this is a test email form our cron job.`
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			throw error;
		} else {
			console.log("Email sent successfully");
		}
	});
});

app.listen(8080, () => {
	console.info(`App listen on port 8080!`);
});

