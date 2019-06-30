// import store from './store';

const { hostname } = window.location;
const url = `ws://${hostname}:8081`
const socket = new WebSocket(url)

socket.onopen = () => {
  console.log('Socket open')
}

socket.onerror = (error) => {
  console.log(`Socket error: ${error}`)
}

export default socket;