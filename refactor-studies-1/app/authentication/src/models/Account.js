const { mongoose } = require('micro/mods/Mongo');
const { model, Schema } = mongoose;

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  deletedAt: Date
}, { timestamps: true });

schema.set('toJSON', { virtuals: true });
schema.index({ deletedAt: 1 });
schema.index({ token: 1 });

module.exports = model('Account', schema);
