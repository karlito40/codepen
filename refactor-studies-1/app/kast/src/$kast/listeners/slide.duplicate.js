const { app } = require('micro');
const { Kast } = require('#/models');

// todo reject on error
module.exports = async function onDuplicateSlide ({ kastId, slideId }, done) {
  const kast = await Kast.findOneAndUpdate(
    { _id: kastId, 'slides._id': slideId },
    { $set: { 'slides.$.duplicating' : false } },
    { new: true }
 );

  const slide = kast.slides.find((s) => s._id.toString() === slideId);
  // puis avec des activités ....
  // await micro['$' + slide.type].duplicate(slide.activityId)
  app.emit('slide.updated', { kastId, slide });
  done();
};
