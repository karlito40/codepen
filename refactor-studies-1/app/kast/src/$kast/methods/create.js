const { app } = require('micro');
const { random } = require('lodash');
const { Kast } = require('#/models');

// useless args destructuration with ts :/
// we are destructuring here to make everything more explicit
module.exports = async function create ({ title, color, userId }) {
  const imageId = random(1, 500);
  const kast = await Kast.create({ 
    title,
    color,
    userId,
    backgroundUrl: `https://picsum.photos/id/${imageId}/200/300`,
    slides: [
      { type: 'trivia', title: 'Mon trivia', color: 'indigo' },
      { type: 'ask', title: 'Mon autre activite', color: 'warning' },
      { type: 'ask', title: 'Wooo', color: 'pink darken-2' },
      { type: 'trivia', title: 'Slide 4', color: 'red lighten-1' },
      { type: 'trivia', title: 'Another trivia', color: 'deep-purple accent-4' },
    ]
  });

  app.emit('kast.created', kast);

  return kast;
};
