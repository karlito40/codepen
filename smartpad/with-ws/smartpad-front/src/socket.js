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

socket.onmessage = (e) => {
  const { subject } = JSON.parse(e.data);
  if(subject === 'mouse:down') {
    window.navigator.vibrate(50);
  }
}

export default socket;