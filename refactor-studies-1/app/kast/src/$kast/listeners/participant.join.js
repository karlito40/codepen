const { app } = require('micro');
const { Kast } = require('#/models');

module.exports = async function onParticipantJoin({ kastId, userId }, done) {
  const kast = await Kast.findOneAndUpdate(
    { _id: kastId }, 
    { $inc: { nbParticipant: 1 } },
    { new: true }
  );
  
  app.emit('kast.updated', { 
    id: kast.id, 
    nbParticipant: kast.nbParticipant 
  });

  done();
}