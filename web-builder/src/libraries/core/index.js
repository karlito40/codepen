import Layer from './Layer';
import Screen from './Screen';
import ToolVisualizer from './ToolVisualizer';

export default {
  // namespace: 'Core',
  name: 'Core',
  store: {
    [Layer.name]: Layer,
    [Screen.name]: Screen,
    [ToolVisualizer.name]: ToolVisualizer,
  }
}