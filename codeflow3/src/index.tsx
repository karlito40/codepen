import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import createEngine, { 
  DefaultLinkModel, 
  DefaultNodeModel,
  DiagramModel,
  DefaultDiagramState
} from '@projectstorm/react-diagrams';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { TSCustomNodeFactory } from './custom-node-ts/TSCustomNodeFactory';
import { TSCustomNodeModel } from './custom-node-ts/TSCustomNodeModel';

const engine = createEngine();
engine.getNodeFactories().registerFactory(new TSCustomNodeFactory())

const state = engine.getStateMachine().getCurrentState();
if (state instanceof DefaultDiagramState) {
  state.dragNewLink.config.allowLooseLinks = false;
}

const node1 = new DefaultNodeModel({
  name: 'Node 1',
  color: 'rgb(0,192,255)',
});
let port1 = node1.addOutPort('Out');
node1.setPosition(100, 100);

// node 2
const node2 = new DefaultNodeModel({
  name: 'Node 2',
  color: 'rgb(192,255,0)',
});
let port2 = node2.addInPort('In');
node2.setPosition(400, 100);

const node3 = new TSCustomNodeModel({ name: 'Toto', color: 'rgb(200,192,255)' });
node3.addInPort('In');
node3.addInPort('Out');
node3.setPosition(200, 400);


const link = port1.link<DefaultLinkModel>(port2);
link.addLabel('Hello World!');

const model = new DiagramModel();
model.addAll(node1, node2, node3, link);
engine.setModel(model);

ReactDOM.render(
  <DemoCanvasWidget>
    <CanvasWidget className="CanvasWidget" engine={engine} />
  </DemoCanvasWidget>
, document.getElementById('root'));
