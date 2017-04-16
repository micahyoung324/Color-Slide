const defColor = "#222";
const blue = "#3AF";
const red = "#D13";

const defaultGrid = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const rotateClockwise = [4, 1, 2, 7, 5, 3, 8, 9, 6];
const rotateCounterClockwise = [2, 3, 6, 1, 5, 9, 4, 7, 8];
const slideLeft = [2, 3, 1, 5, 6, 4, 8, 9, 7];
const slideRight = [3, 1, 2, 6, 4, 5, 9, 7, 8];
const slideDown = [7, 8, 9, 1, 2, 3, 4, 5, 6];
const slideUp = [4, 5, 6, 7, 8, 9, 1, 2, 3];

$(document).ready(function(){
	$(document).bind('keypress', pressed);
	reset();
});

var disable = false;

function reset() {
	disable = false;
	document.getElementById('YouWin').style.visibility = "hidden";
	var color;
	var colors = [
		defColor, defColor, defColor, defColor, defColor, defColor, defColor, defColor,
		blue
	];
	colors = shuffle(colors);
	console.log(colors);
	var newpuzzle = secretmove();
	for (var i = 0; i < 9; i++) {
		color = colors.pop();
		document.getElementById('cell' + newpuzzle[i]).style.backgroundColor = color;
		document.getElementById('target' + defaultGrid[i]).style.backgroundColor = color;
	}
}

function move(grid) {
	if (!disable) {
		var color = [];
		for (var i = 0; i < 9; i++) {
			color.push(document.getElementById('cell' + grid[i]).style.backgroundColor);
		}

		for (var i = 0; i < 9; i++) {
			document.getElementById('cell' + defaultGrid[i]).style.backgroundColor = color[i];
		}
		isWinner(check());
	}
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

function secretmove() {
	var grid = [...defaultGrid];
	var newGrid;
	var moves = [slideUp, slideDown, rotateCounterClockwise, rotateCounterClockwise, rotateClockwise, slideLeft, slideRight];
	for (var i = 0; i < 25; i++) {
		newGrid = [];
		var r = Math.round(Math.random() * 6);
		for (var j = 0; j < 9; j++) {
			newGrid.push(grid[(moves[r])[j]-1]);
		}
		grid = newGrid;
	}
	return grid;
}

function check() {
	for (var i = 0; i < 9; i++) {
		if (document.getElementById('cell' + defaultGrid[i]).style.backgroundColor !== document.getElementById('target' + defaultGrid[i]).style.backgroundColor)
			return false;
	}
	return true;
}

function isWinner(bool) {
	if (bool) {
		document.getElementById('YouWin').style.visibility = "visible";
		disable = true;
	}
}

function pressed(e) {
	var key = e.which || e.keyCode;
	if (!disable) {
		switch (key) {
			case 113: // Q
				move(rotateCounterClockwise);
				break;
			case 119: // W
				move(slideUp);
				break;
			case 101: // E
				move(rotateClockwise);
				break;
			case 97:  // A
				move(slideLeft);
				break;
			case 115: //S
				move(slideDown);
				break;
			case 100: // D
				move(slideRight);
				break;
		}
	}
	if (key === 13) { // Enter
		reset();
	}
}
