import * as PIXI from 'pixi.js'
import { Viewport } from 'pixi-viewport'
// import { OutlineFilter } from '@pixi/filter-outline';
import { keyBy } from 'lodash-es'
import Draggable from '../libs/Draggable'
import Storage from '../libs/Storage'
import Engine from '../libs/Engine'
import * as Prefabs from '../prefabs'
import { STROKE_NODE_WIDTH } from '../constants'

export default class EditorScene {
  constructor (app) {
    this.app = app;
  }

  async load () {}

  build () {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      interaction: this.app.renderer.plugins.interaction // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
    })

    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate()

    const nodes = Storage.getNodes()
    this.nodeMap = keyBy(nodes, (node) => node.id)
    
    nodes.forEach((node) => {
      const $prefab = Prefabs.Node(node)
      $prefab.id = node.id
      $prefab.position.set(node.x, node.y)
      Engine.register($prefab)
      this.viewport.addChild($prefab)

      Draggable.create($prefab, {
        onDragStart: () => this._changeViewportState('pause'),
        onDragEnd: () => {
          node.x = $prefab.position.x
          node.y = $prefab.position.y
          Storage.saveNodes(nodes)

          this._changeViewportState('resume')
        }
      })

    });

    this.lines = nodes
        .filter((node) => node.childIds.length)
        .map((nodeSource) => {
          const $source = Engine.getElementById(nodeSource.id)
          // not opti... obviously
          return nodeSource.childIds
            .map((nodeId) => this.nodeMap[nodeId])
            .filter((nodeDest) => Boolean(nodeDest))
            .map((nodeDest) => {
              const $end = Engine.getElementById(nodeDest.id)
              
              const $line = new PIXI.Graphics()
              $line.paint = () => {
                $line.clear()
                const curvature = 0.4;
                const fromX = $source.position.x + $source.width
                const fromY = $source.position.y + $source.height / 2
                const toX = $end.position.x - STROKE_NODE_WIDTH
                const toY = $end.position.y + $end.height / 2

                const dx = Math.abs(toX - fromX) * curvature;
                const cpX = fromX + dx;
                const cpY = fromY;
                const cpX2 = toX - dx;
                const cpY2 = toY;
                
                $line.lineStyle(3, 0xffffff, 1.0)
                $line.moveTo(fromX, fromY)
                $line.bezierCurveTo(cpX, cpY, cpX2, cpY2, toX, toY)
              }

              $line.paint()
              this.viewport.addChild($line)

              return $line
            })
        })
        .flatMap((chunk) => chunk)

    return this.viewport    
  }

  tick () {
    // not opti obviously
    this.lines.forEach((line) => {
      line.paint()
    });
  }

  _changeViewportState (state) {
    this.viewport.plugins[state]('drag')
    this.viewport.plugins[state]('ping')
    this.viewport.plugins[state]('wheel')
    this.viewport.plugins[state]('decelerate')
  }
}