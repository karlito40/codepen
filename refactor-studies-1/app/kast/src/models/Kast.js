const { mongoose, ObjectId } = require('micro/mods/Mongo');
const { model, Schema } = mongoose;

const slideSchema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  color: String,
  // we should use a Date instead for reconciliation [duplicatingdAt]
  duplicating: { type: Boolean, required: false, default: false },
});

slideSchema.set('toJSON', { virtuals: true });

const kastSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String, required: true },
  userId: { type: ObjectId, required: true },
  backgroundUrl: String,
  nbParticipant: { type: Number, default: 0 },
  slides: [slideSchema]
}, { timestamps: true });

kastSchema.set('toJSON', { virtuals: true });

kastSchema.index({ userId: 1 });
kastSchema.index({ deletedAt: 1 });

module.exports = model('Kast', kastSchema);
