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


// Dans le cas où on aurait peur d'avoir une queue full...
// ou si on fait plusieurs update/insertion en db sans transaction
// and so on ... we can exec done() as early as possible
// and put this shit in an agenda
/*
const subMinutes = require('date-fns/sub_minutes')

module.exports.reconciliate = async function reconciliate () {
  // not opti (we need to limit shit and chunk stuffà
  const kasts = await Kast.find({ duplicatingAtAt: { $lt: subMinutes(new Date, 10) }});
  kasts....slides.map(() => app.publish('slide.updated', { kastId, slideId }))
}
*/