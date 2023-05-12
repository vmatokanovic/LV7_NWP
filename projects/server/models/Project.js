const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  jobsDone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  members: [
    {
      type: String,
      default: null,
    },
  ],
  manager: {
    type: String,
    required: true,
  },
  archived: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
