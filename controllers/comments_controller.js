const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function (req, res) {
    Post.findById(req.body.post, function (err, post) {
        if (post) {
            console.log("post available...");
            Comment.create(
                {
                    content: req.body.content,
                    post: req.body.post,
                    user: req.user._id,
                },
                function (err, comment) {
                    //handle error
                    if (err) {
                        console.log(err);
                        return;
                    }
                    post.comments.push(comment);
                    post.save();
                    return res.redirect("/");
                }
            );
        }
    });
};
