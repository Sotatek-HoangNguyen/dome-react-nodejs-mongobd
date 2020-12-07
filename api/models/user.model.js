const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    jobs_count: [Number, String],
    active: Boolean,
    slack_username: String
  })
);

module.exports = User;
