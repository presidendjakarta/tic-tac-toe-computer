var level = 1;
var xWin = 0;
var oWin = 0;
var Turn = 'X';

function nextLevel(x) {
	level++;
	$('#xLevel').text('Level ' + level);
}

function kuyMain() {
	Turn = 'X';
	var boardSize = 0;
	if (level > 1) {
		boardSize = 3 + level;
	} else {
		boardSize = 3;
	}
	const saveGame = new Array(boardSize * 2 + 2);
	saveGame.fill(0);
	let jalan = 0;
	const total = Math.pow(boardSize, 2);
	var papan = '';
	var kolom = 0;
	var row = 0;
	$('#papan').width(boardSize * 100 + 'px');
	for (i = 1; i <= total; i++) {
		if (kolom >= boardSize) kolom = 0;
		if (boardSize % 2 === 0) {
			const isEvenRow = Math.ceil(i / boardSize) % 2 == 0;
			const alternateBlock = i % 2 == isEvenRow;
			papan += (alternateBlock) ? "<li row='" + row + "' kolom='" + kolom + "' class='btn  block dark'></li>" : "<li row='" + row + "' kolom='" + kolom + "' class='btn  block light'></li>";
		} else {
			const blockStyle = (i % 2 === 0) ? 'dark' : 'light';
			papan += "<li row='" + row + "' kolom='" + kolom + "' class='btn  block " + blockStyle + "'></li>";
		}
		kolom++;
		if (i % boardSize === 0) row += 1;
	}
	$('#papan').html(papan);
	$('.block').each(function() {
		var $this = $(this);
		$this.on("click", function() {
			if ($('#xPlay').text() == 'restart') {
				var row = $this.attr('row');
				var kolom = $this.attr('kolom');
				if ($this.text() != '') {
					alert('Already selected');
				} else {
					jalan++;
					if (Turn == 'X') {
						$this.addClass('marked')
						$this.css("background-color", "#7FFFD4");
						$this.text('X');
						Turn = 'O';
						menang('x', row, kolom);
						var choose = $(".block:not(.marked)");
						rand = choose[Math.floor(Math.random() * choose.length)];
						$(rand).trigger('click');
					} else {
						$this.addClass('marked')
						$this.css("background-color", "#ADFF2F");
						$this.text('O');
						Turn = 'X';
						menang('o', row, kolom);
					}
				}
			}
		});
	});
	const menang = (player, rowx, kolom) => {
		var column = parseInt(kolom);
		var Bz = parseInt(boardSize);
		var row = parseInt(rowx);
		let point = (player === 'x') ? 1 : -1;
		saveGame[row] += point;
		saveGame[Bz + column] += point;
		// console.log(saveGame[Bz+column ] += point);
		if (row === column) {
			saveGame[2 * Bz] += point;
		}
		if (row + column === Bz - 1) {
			saveGame[2 * Bz + 1] += point;
		}
		const xWins = saveGame.indexOf(Bz);
		const oWins = saveGame.indexOf(-Bz);
		// console.log(saveGame);
		if (xWins >= 0) {
			alert('X has won!');
			$('#xPlay').text('next level');
			xWin++;
			$('#xWin').val(xWin);
			Turn = 'X';
			nextLevel();
			saveGame.fill(0);
			return true;
		} else if (oWins >= 0) {
			alert('O has won!');
			$('#xPlay').text('restart');
			oWin++;
			$('#oWin').val(oWin);
			Turn = 'X';
			saveGame.fill(0);
			return true;
		}
		if (jalan === total - 1) {
			alert("It's a draw!");
			Turn = 'X';
			saveGame.fill(0);
			return false;
		}
	}
}
$('#xPlay').click(function(event) {
	$this = $(this);
	var pText = $this.text();
	if (pText == 'play') {
		kuyMain();
		$this.text('restart');
	} else if (pText == 'next level') {
		kuyMain();
		$this.text('restart');
	} else if (pText == 'restart') {
		kuyMain();
		$this.text('restart');
	}
});;