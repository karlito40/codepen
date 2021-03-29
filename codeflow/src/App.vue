<template>
  <div class="CodeFlow">
    <div 
      v-for="node in nodes"
      :key="node.id"
      :style="{ 
        top: 0,
        left: 0,
        transform: `translate3d(${node.x}px, ${node.y}px, 0)`
      }"
      :id="`node-${node.id}`"
      :data-nodeid="node.id"
      class="nodeflow"
    >
      {{ node.label }}
    </div>


  </div>
</template>

<script>
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { debounce, keyBy } from 'lodash-es'
import panzoom from 'panzoom'
import Draggable from "gsap/Draggable";
import { nodesMock } from './data'

const Storage = {
  getNodes () {
    const jsonNodes = localStorage.getItem('nodes') 
    return jsonNodes
      ? JSON.parse(jsonNodes)
      : nodesMock
  },

  saveNodes (nodes) {
    localStorage.setItem('nodes', JSON.stringify(nodes))
  }
}


export default defineComponent({
  setup () {
    const nodes = Storage.getNodes()
    const nodeMap = keyBy(nodes, (node) => node.id)

    let draggables, linesByNode, scene;
    // Obvisouly everything here sucks. It's not opti. I know
    onMounted(() => {
      linesByNode = nodes
        .filter((node) => node.childIds.length)
        .reduce((acc, nodeSource) => {
          const $source = document.getElementById(`node-${nodeSource.id}`)
          nodeSource.childIds
            .map((nodeId) => nodeMap[nodeId])
            .filter((nodeDest) => Boolean(nodeDest))
            .forEach((nodeDest) => {
              const $end = document.getElementById(`node-${nodeDest.id}`)
              if (!acc[nodeSource.id])  acc[nodeSource.id] = []
              if (!acc[nodeDest.id])    acc[nodeDest.id] = []
              const line = new LeaderLine($source, $end)

              acc[nodeSource.id].push(line)
              acc[nodeDest.id].push(line)
            })

          return acc
        }, {})
      let draggedLines;
      draggables = Draggable.create('.nodeflow', {
        onDragStart (e) {
          const nodeId = e.target.dataset.nodeid
          draggedLines = linesByNode[nodeId]
        },

        onDrag () {
          draggedLines && draggedLines.forEach((line) => line.position())
        },

        onDragEnd (e) {
          const node = nodeMap[e.target.dataset.nodeid]
          const { groups } = /translate3d\((?<x>.*?)px, (?<y>.*?)px, (?<z>.*?)px/.exec(e.target.style.transform);
          node.x = Math.floor(+groups.x)
          node.y = Math.floor(+groups.y)
          Storage.saveNodes(nodes)
          draggedLines = undefined
        }
      })

      const hideLines = () => Object.values(linesByNode)
        .flatMap(lineChunks => lineChunks)
        .forEach((line) => line.hide('none',{
          duration: 0
        }))

      const showLines = () => Object.values(linesByNode)
        .flatMap(lineChunks => lineChunks)
        .forEach((line) => {
          line.show()
          line.position()
        })

      scene = panzoom(document.querySelector('.CodeFlow'))
      scene.on('panstart', () => {
        hideLines()
      })
      scene.on('pan', debounce(() => {
        showLines()
      }, 300))

      let zoomStart = false
      scene.on('zoom', () => {
        if (!zoomStart) {
          hideLines()
        }

        zoomStart = true
      })

      scene.on('zoom', debounce(() => {
        showLines()
        zoomStart = false
      }, 300))
    })

    onBeforeUnmount(() => {
      draggables.forEach((draggable) => draggable.kill())

      scene.dispose()

      Object.values(linesByNode)
        .flatMap(lineChunks => lineChunks)
        .forEach((line) => {
          if (!line.isStopped) {
            line.isStopped = true
            line.remove()
          }
        })
    })
    
    return { nodes }
  }
  
})
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

body {
  font-family: 'Red Hat Text', sans-serif;
}
</style>

<style scoped>
.CodeFlow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #3F4146;
  color: #DCDDDE;
}
.nodeflow {
  position: absolute;
  padding: 10px;
  border: 2px solid black;
  border-radius: 10px;
  
}
</style>