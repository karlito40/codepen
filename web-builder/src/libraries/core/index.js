import Layer from './Layer';
import ToolVisualizer from './ToolVisualizer';

export default {
  // namespace: 'Core',
  namespace: '',
  reserved: true,
  store: {
    [Layer.name]: Layer,
    [ToolVisualizer.name]: ToolVisualizer,
  }
}