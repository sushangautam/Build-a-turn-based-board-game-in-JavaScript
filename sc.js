class Weapon {
	constructor(name,className,damage,weaponimg){
		this.name = name;
		this.className = className;
		this.damage = damage;
		this.weaponimg = weaponimg;
	}
}

class Player {
	constructor(name,className,weapon){
		this.name = name;
		this.className = className;
		this.health = Math.max(0,100);
		this.weapon = weapon;
		this.defendmode = false;
	}
		setPosition(x,y){
			this.x = x;
			this.y = y;
		}

		getPosition(){
			return [this.x,this.y];
		}
}

const rows = 12;
const cols = 12;
const numobstacle = Math.floor((12*12)*0.10);
let board = [];

const fist = new Weapon("fist","weapon0",3,"fist.png");
const sword = new Weapon("sword","weapon1",5,"weapon3.png");
const axe = new Weapon("axe","weapon2",10,"weapon44.png")
const gun = new Weapon("gun","weapon3",15,"weapon1.png");
const bomb = new Weapon("bomb","weapon4",20,"weapon22.png");
let weapons = [sword,axe,gun,bomb];

let player1;
let player2;
let player;
let currentplayer;

let movecount = 0;


function start(){
	let count = 0;
	player1 = new Player("Alis","player1",fist);
	player2 = new Player("Bob","player2",fist);
	currentplayer = player1;
	movecount = 0;

	player = [player1,player2];
	board = [];
	for(i=0;i<rows;i++){
    	board[i]=[];
		for(j=0;j<cols;j++){
			board[i].push("free");
		}
	}
	
	while(count < numobstacle){
		var x = generateRandom(rows);
		var y = generateRandom(cols);
		if(board[x][y]=="free"){
			board[x][y] = "obstacle";
			count++;
		}
	}

	count = 0;
	while(count < player.length){
		var x = generateRandom(rows);
		var y = generateRandom(cols);
		if(board[x][y]=="free"){
			board[x][y] = player[count].className;
			player[count].setPosition(x,y);
			count++;
		}
	}

	count = 0;
	while(count < weapons.length){
		var x = generateRandom(rows);
		var y = generateRandom(cols);
		if(board[x][y]=="free"){
			board[x][y] = weapons[count].className;
			count++;
		}
	}

	draw();
	updateScoreBoard();
}

function generateRandom(x){
	var a = Math.floor(Math.random()*x);
	return a;
}

function draw(){
	document.getElementById('wrapper').innerHTML = "";
	for(i=0;i<rows;i++){
    	for(j=0;j<cols;j++){
			var div = document.createElement('div');
			div.setAttribute('class', board[i][j]);
			document.getElementById('wrapper').appendChild(div);
		}
	}
}



function changePlayer(){
	if(currentplayer.className==player1.className)
		currentplayer = player2;
	else
		currentplayer = player1;
}

function otherPlayer(){
	if(currentplayer.className==player1.className)
		return player2;
	else
		return player1;
}

/*function pickWeapon(){
	[newx,newy] = currentplayer.getPosition();
	oldweapon = currentplayer.weapon.className;
	if(board[newx][newy]=="weapon2")
		currentplayer.weapon = sword;
	else if(board[newx][newy]=="weapon3")
		currentplayer.weapon = gun;
	else if(board[newx][newy]=="weapon4")
		currentplayer.weapon = bomb;

	board[newx][newy] = oldweapon;
	draw();
}*/

function updateScoreBoard(){
	document.getElementById('wl1').src = player1.weapon.weaponimg;
	document.getElementById('player1-weapondamage').innerHTML = player1.weapon.damage;
	document.getElementById('wl2').src = player2.weapon.weaponimg;
	document.getElementById('player2-weapondamage').innerHTML = player2.weapon.damage;

	if(currentplayer.className==player1.className){
		document.getElementById('pl2').style.border = "";
		document.getElementById('pl1').style.border = "thick groove #0000FF";
		document.querySelector('.sc-13').innerHTML = 3-movecount;
		document.querySelector('.sc-14').innerHTML = 0;
	}
	else{
		document.getElementById('pl1').style.border = "";
		document.getElementById('pl2').style.border = "thick groove #0000FF";
		document.querySelector('.sc-14').innerHTML = 3-movecount;
		document.querySelector('.sc-13').innerHTML = 0;
	}

}

function attack(){
	if(otherPlayer().defendmode){
		otherPlayer().health -= currentplayer.weapon.damage/2;
		otherPlayer().defendmode = false;
	}
	else{
		otherPlayer().health -= currentplayer.weapon.damage;
	}
	if(otherPlayer().health <= 0){
		$('#dialog').dialog("close");
		$('#dialog1').dialog("open");
		document.getElementById('won').innerHTML = currentplayer.name.toUpperCase() + " WON THE GAME !";
	}
	else{
		changePlayer();
		showhideButtons();
		updateWarScreen();
	}
}

function defend(){
	currentplayer.defendmode = true;
	changePlayer();
	showhideButtons();
	updateWarScreen();
}

function showhideButtons(){
	if(currentplayer.className==player1.className){
		$( "#pl1shoot" ).show();
		$( "#pl1defend" ).show();
		$( "#pl2shoot" ).hide();
		$( "#pl2defend" ).hide();
	}
	else{
		$( "#pl2shoot" ).show();
		$( "#pl2defend" ).show();
		$( "#pl1shoot" ).hide();
		$( "#pl1defend" ).hide();

	}
}

function restart(){
	$('#dialog1').dialog("close");
	$('#dialog').dialog("close");
	start();
}

function updateWarScreen(){
	document.getElementById('weaponpl1').src = player1.weapon.weaponimg;
	document.getElementById('weaponpl2').src = player2.weapon.weaponimg;
	document.getElementById('healthpl1').style.width = player1.health+'%';
	document.getElementById('healthpl2').style.width = player2.health+'%';
	if(player1.defendmode)
		document.getElementById('pl1mode').innerHTML = "Defend Mode On";
	else
		document.getElementById('pl1mode').innerHTML = "Defend Mode Off";
	if(player2.defendmode)
		document.getElementById('pl2mode').innerHTML = "Defend Mode On";
	else
		document.getElementById('pl2mode').innerHTML = "Defend Mode Off";

	

}

function checkWarCondition(newx,newy){
	let dir = [
		[newx+1,newy],[newx-1,newy],[newx,newy+1],[newx,newy-1]
	]
	dir = dir.filter(d => (d[0]>=0 && d[0]<rows && d[1]>=0 && d[1]<cols)).filter(d=>board[d[0]][d[1]]===otherPlayer().className);
	if(dir.length<=0){
		return false;
	}
	else{
		return true;
	}
}


//var oldweapon = "";
//var oldposition = "";
function move(dir){
	

	let [oldx,oldy] = currentplayer.getPosition();
	let newx,newy;

	if(dir=="left"){
		[newx,newy] = [oldx,oldy-1];
	}

	else if(dir=="right"){
		[newx,newy] = [oldx,oldy+1];
	}

	else if(dir=="up"){
		[newx,newy] = [oldx-1,oldy];
	}

	else if(dir=="down"){
		[newx,newy] = [oldx+1,oldy];
	}

	if(newx>=0 && newx<rows && newy>=0 && newy<cols){

			//if((weapons.map(student=>student.className)).includes(oldposition)){
				//board[newx][newy] = oldweapon;
				//draw();
			//}
			if(board[newx][newy] == "free"){
				currentplayer.setPosition(newx,newy);
				board[oldx][oldy] = "free";
				board[newx][newy] = currentplayer.className;
				movecount++;
			}

			else if((weapons.map(w=>w.className)).includes(board[newx][newy])){
				//oldposition = board[newx][newy];
				let oldweapon = currentplayer.weapon.className;
				let newweapon = weapons.filter(weapons=>weapons.className == board[newx][newy])[0];
				if(oldweapon==fist.className){
					board[oldx][oldy] = "free";
				}
				else{
					board[oldx][oldy] = oldweapon;
				}

				currentplayer.weapon = weapons.filter(weapons=>weapons.className == board[newx][newy])[0];
				currentplayer.setPosition(newx,newy);
				
				board[newx][newy] = currentplayer.className;
				movecount++;
			}
			//else if(weapon.filter(weapons=>weapons.className == board[newx][newy]){
				//console.log("HI");}
			if(checkWarCondition(newx,newy)){
				$("#dialog").dialog("open");
				showhideButtons();
				updateWarScreen();
			}
			else{
				if(movecount==3){
				//updateScoreBoard();
					changePlayer();
					movecount = 0;
				}
				updateScoreBoard();
				draw();
			}
			
		}
	
}

document.onkeydown = function(event) {
	event.preventDefault();
    switch (event.keyCode) {
       case 37:
       		move("left");
          break;
       case 38:
            move("up");
          break;
       case 39:
            move("right");
          break;
       case 40:
            move("down");
          break;
    }
};

start();