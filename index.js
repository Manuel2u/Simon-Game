var buttonColors = ["red", "blue", "green", "orange"]

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;



$(".btn").click(function() {

  var userChosenColour = $(this).attr('id');

  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);

});

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

$(document).keydown(function(event) {

  if (!started) {

    $("#level-title").text("Level " + level);

    nextSequence();

    started = true;
  }

});



$('button').click(function(event) {

  if (!started) {

    $("#level-title").text("Level " + level);

    nextSequence();

    started = true;
  }

});

if (screen.width < 480) {
  $("#level-title").text("Press the button to Start")
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else if (screen.width < 480) {
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();

    $("body").addClass('game-over');

    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);

    $("h1").text("Game Over, Press the button to Restart");

    startOver();
  } else {
    var gameOver = new Audio("sounds/wrong.mp3");
    gameOver.play();

    $("body").addClass('game-over');

    setTimeout(function() {
      $("body").removeClass('game-over');
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }

}

function playSound(name) {
  switch (name) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;

    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;

    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;

    case "orange":
      var orange = new Audio("sounds/orange.mp3");
      orange.play();
      break;

    default:
      console.log(name);
  }
}

function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');

  setTimeout(function() {
    $('.' + currentColour).removeClass('pressed');
  }, 100)

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
