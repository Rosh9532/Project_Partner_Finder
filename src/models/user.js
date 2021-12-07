const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    L_Url: {
      type: String,
    },
  },
  { timestamps: true }
);

//instance methods
userSchema.methods = {
  authenticate: async function (password) {
    return await bcrypt.compareSync(password, this.Password); //true or false
  },
};

module.exports = mongoose.model("User", userSchema);
