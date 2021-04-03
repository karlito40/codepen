import * as PIXI from 'pixi.js'
import { STROKE_NODE_WIDTH } from "../constants";

// should be resolve from measureText
const roundedRect = [0, 0, 200, 40, 10]

export default function Node ({ label }) {
  const prefab = new PIXI.Container()
  prefab.hitArea = new PIXI.RoundedRectangle(...roundedRect)
  
  const border = new PIXI.Graphics()
  border.lineStyle(STROKE_NODE_WIDTH, 0x000000);
  border.beginFill(0x3F4146)
  border.drawRoundedRect(...roundedRect)
  border.endFill()
  prefab.addChild(border)

  const text = new PIXI.Text(label, {
    fontFamily: 'Red Hat Text',
    fontSize: 18,
    fill: ['#DCDDDE']
  })
  // huhu 
  text.position.set(15, 9)
  prefab.addChild(text)

  return prefab
}