/***********************GLOBAL VARIABLES**********************/
var colorArray = ["green", "red", "yellow", "blue"];
var keyboardInput = "";
var mouseInput = "";
var newGame = true;


/***************************OBJECTS***************************/
var machineSequence = {
  elements:[],
  addElement: function(){
    var randomColor = colorArray[Math.floor(Math.random()*4)];
    this.elements.push(randomColor);
  },
  playLastElement: function(){
    var lastElement = this.elements.length - 1;
    pressButton(this.elements[lastElement]);
  },
  playAll: function(){
    var elements = this.elements;
    pressButton(elements[0]);
    var i=1;
    var interval = setInterval(function(){
                    pressButton(elements[i]);
                    i++;
                    if(i===elements.length){
                      clearInterval(interval);
                    }
                  },1000);
  },
  empty: function(){
    this.elements = [];
  }
};

var userSequence = {
  elements:[],
  addElement: function(newElement){
    this.elements.push(newElement);
  },
  empty: function(){
    this.elements = [];
  }
};


/***********************EVENT LISTENERS***********************/
$(this).keypress(function(event){
  keyboardInput = event.key;
  machineSequence.empty();
  machinePlays();
});

$(".btn").click(function(){
  if(!newGame){
    mouseInput = this.id;
    userSequence.addElement(mouseInput);
    checkUserAnswers();
  }
});


/**************************FUNCTIONS**************************/
function pressButton(color){
  var url = 'sounds/' + color + '.mp3';
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', url);
  audioElement.play();
  /**/
  var id = "#" + color;
  $(id).addClass("pressed");
  setTimeout(function(){
    $(id).removeClass("pressed");
  },100);
}

function machinePlays(){
  var delay = 500;
  if (newGame){
    delay = 100;
    newGame = false;
  }
  setTimeout(function(){
    machineSequence.addElement();
    machineSequence.playLastElement();
  }, delay);
}

function userIsRight(){
  var index = userSequence.elements.length - 1;
  var lastUserInput = userSequence.elements[index];
  var machineValue = machineSequence.elements[index];
  if (lastUserInput === machineValue){
    return true
  } else {
    return false
  }
}

function roundIsComplete(){
  if(userSequence.elements.length === machineSequence.elements.length){
    return true
  } else {
    return false
  }
}

function checkUserAnswers(){
  if(!userIsRight()){
    pressButton("wrong");
    gameOver();
  } else if (roundIsComplete()) {
    pressButton(mouseInput);
    userSequence.empty();
    machinePlays();
  } else {
    pressButton(mouseInput);
  }
}

function gameOverAnimation(){
  $("body").addClass("game-over");
  $("h1").text('Game Over!');
  setTimeout(function(){
    $("body").removeClass("game-over");
    $("h1").text('Press A Key to Start');
  },500);
}

function gameOver(){
  userSequence.empty();
  machineSequence.empty();
  gameOverAnimation();
  newGame = true;
}
