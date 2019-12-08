const { app } = require('micro');
const { omit, sample } = require('lodash');
const { Kast } = require('#/models');

const emojis = ["😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"];

module.exports = async function duplicate ({ kastId }) {
  const fromKast = await Kast.findOneOrThrow({ _id: kastId });
  const fromKastObject = fromKast.toObject();
  const data = {
    ...omit(fromKastObject, ['_id', 'id']),
    title: `${fromKastObject.title} ${sample(emojis)}`,
    slides: fromKastObject.slides.map((slide) => ({
      ...omit(slide, ['_id', 'id']),
      duplicating: true
    }))
  };
  
  const kast = await Kast.create(data);
  kast.slides.forEach((slide) => {
    app.emit('slide.duplicate', { kastId: kast.id, slideId: slide.id });
  });

  return kast;
};
