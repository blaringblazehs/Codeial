const queue = require("../config/kue");
const commmentsMailer = require("../mailers/comments_mailers");
queue.process("emails", function (job, done) {
    console.log("emails worker is processing a job", job.data);
    commmentsMailer.newComment(job.data);
});
