import * as PIXI from 'pixi.js';

export default function Board () {
  const scene = new PIXI.Container();
  
  const background = new PIXI.Graphics();
  background.beginFill(0xFFFFFF);
  background.drawRoundedRect(0, 0, 1024, 600, 10);

  const title = new PIXI.Text('Idées des axes majoritaires', {
    fontFamily : 'Arial',
    fontSize: 18,
    fontWeight: 'bold'
  });
  title.x = 30;
  title.y = 20;

  const subtitle = new PIXI.Text('05:32', {
    fontFamily : 'Arial',
    fontSize: 14,
  });

  subtitle.x = 30;
  subtitle.y = 50;

  scene.addChild(background);
  scene.addChild(title);
  scene.addChild(subtitle);

  const categoryContainer = new PIXI.Container();
  const categories = [
    {
      title: 'Réunion',
      width: 225,
      nbIdea: 4,
      color: 0x65CDB9
    },
    {
      title: 'Atelier',
      width: 225,
      nbIdea: 4,
      color: 0xF94F5E
    },
    {
      title: 'Formation',
      width: 225,
      nbIdea: 2,
      color: 0x4CA8EC
    },
    {
      title: 'Evenement',
      width: 225,
      nbIdea: 5,
      color: 0xFFA062
    },
  ];

  categories.forEach((category, i) => {
    const column = Column(category);
    const marginLeft = 20;
    column.x = (category.width * i) + marginLeft * i;
    categoryContainer.addChild(column);
  });

  categoryContainer.x = 30;
  categoryContainer.y = 110;
  scene.addChild(categoryContainer);


  const button = new PIXI.Container();
  button.x = 490;
  button.y = 540;
  button.interactive = true;
  button.buttonMode = true;
  
  button.on('pointerdown', () => {
    const $panel = document.querySelector('.right-panel');
    $panel.classList.toggle('is-open');
  });

  const backgroundBtn = new PIXI.Graphics();
  backgroundBtn.beginFill(0x6462EA);
  backgroundBtn.drawRoundedRect(0, 0, 100, 36, 10);
  
  const answerBtn = new PIXI.Text('Participer', {
    fontFamily : 'Arial',
    fontSize: 16,
    fontWeight: 'bold',
    fill: 0xFFFFFF
  });
  answerBtn.x = 14;
  answerBtn.y = 7;

  button.addChild(backgroundBtn);
  button.addChild(answerBtn);
  
  scene.addChild(button);

  return scene;
}


function Column({ title, width, nbIdea, color }) {
  const column = new PIXI.Container();

  const header = new PIXI.Text(title, {
    fontFamily : 'Arial',
    fontSize: 16,
    fontWeight: 'bold'
  });

  const separator = new PIXI.Graphics();
  separator.beginFill(color);
  separator.drawRect(0, 0, width, 3);
  separator.y = 25;

  column.addChild(header);
  column.addChild(separator);

  const ideaContainer = new PIXI.Container();
  ideaContainer.y = 30;

  const marginTop = 15;
  const heightIdea = 60;
  let lastBottomIdea = 0;

  for (let i=0; i<nbIdea; i++) {
    const idea = new PIXI.Graphics();

    idea.beginFill(0xF0F0F0);
    idea.drawRect(0, 0, width, heightIdea);
    idea.y = lastBottomIdea + marginTop;
    lastBottomIdea = idea.y + heightIdea;

    ideaContainer.addChild(idea);
  }

  column.addChild(ideaContainer);

  return column
}