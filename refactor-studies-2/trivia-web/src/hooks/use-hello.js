import useMachine from './use-machine'
import Hello from '../machines/hello'

let machine;
export default function useHello () {
  return machine = machine || useMachine(Hello)
}