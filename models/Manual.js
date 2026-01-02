import mongoose from "mongoose";

const mainPointSchema = new mongoose.Schema({
  title: String,
  description: String,
  references: [String]
}, { _id: false });

const manualSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  theme: String,
  week: Number,
  date: String,
  memoryVerse: String,
  text: String,
  introduction: String,
  mainPoints: [mainPointSchema],
  classDiscussion: String,
  conclusion: String,
  imageUrl: String,
  subTopic: String,
  subTopics: [String],
  coverBannerImg: String,
  declaration: String,
  recommendedBooks: [String],
  feedbackLink: String,

  month: {
    type: String,
    enum: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    required: true
  },

  order: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.models.Manual || mongoose.model('Manual', manualSchema);