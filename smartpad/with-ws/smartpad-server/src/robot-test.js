var robot = require("robotjs");

// Speed up the mouse.
robot.setMouseDelay(2);

// robot.moveMouse(10, 4);
// robot.mouseClick();

var twoPI = Math.PI * 2.0;
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;

for (var x = 0; x < width; x++)
{
	y = height * Math.sin((twoPI * x) / width) + height;
	console.log(x, ':', y)
	robot.moveMouse(x, y);
}