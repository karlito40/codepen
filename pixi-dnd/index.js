import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import startCanvas from './canvas';
import startOverlay from './overlay';

gsap.registerPlugin(Draggable); 

startCanvas();
startOverlay();
