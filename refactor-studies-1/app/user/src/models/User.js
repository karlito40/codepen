const { mongoose } = require('micro/mods/Mongo');
const { model, Schema } = mongoose;

const schema = new Schema({
  pseudo: { type: String, required: true, unique: true },
  deletedAt: Date
}, { timestamps: true });

schema.set('toJSON', { virtuals: true });
schema.index({ deletedAt: 1 });

module.exports = model('User', schema);
