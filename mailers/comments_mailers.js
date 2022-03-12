const nodeMailer = require("../config/nodemailer");

//this is another way of exporting a method
exports.newComment = (comment) => {
    console.log("inside newComment mailer", comment);
    nodeMailer.transporter.sendMail(
        {
            from: "g.himanshuss@gmail.com",
            to: comment.user.email,
            subject: "New comment published!",
            html: "<h1>your comment is now published</h1>",
        },
        (err, info) => {
            if (err) {
                console.log("error in sending mail", err);
                return;
            }
            console.log("Message sent", info);
            return;
        }
    );
};
