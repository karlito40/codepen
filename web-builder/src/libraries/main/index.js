import Layer from './Layer';
import Screen from './Screen';

export default {
  namespace: 'Main',
  store: {
    [Layer.name]: Layer,
    [Screen.name]: Screen
  }
}