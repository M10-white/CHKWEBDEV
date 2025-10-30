$(function() {
  $(".draggable").draggable({revert: "invalid"});
 
  var scoreTrue = 0;
  var scoreFalse = 0;
 
  function updateScoreDisplay() {
    $("#score-true").text(scoreTrue);
    $("#score-false").text(scoreFalse);
  }
 
  function handleDrop(event, ui, expectedValue) {
    var value = ui.draggable.data("value");
    var $this = $(this);
                   // Réinitialiser la position de l'élément draggable
                   disappear(ui.helper);
    if (value === expectedValue) {
      $this.addClass("ui-state-highlight").css('background-color', 'green');
      scoreTrue++;
    } else {
      $this.addClass("ui-state-error").css('background-color', 'red');
      scoreFalse++;
      if (scoreFalse == 3) {
            alert("C'est Perdu, Bravo!");
            sessionStorage.setItem("scoreTrue", scoreTrue);
            document.location.href="GameOver.html";
            clearInterval(interval);

      }
    }
    $this.find("p").html("Dropped! Value: " + value);
    updateScoreDisplay();
  }
 
  $("#droppable-true").droppable({
    drop: function(event, ui) {
      handleDrop.call(this, event, ui, 1);
    }
  });
 
  $("#droppable-false").droppable({
    drop: function(event, ui) {
      handleDrop.call(this, event, ui, 0);
    }
 
 
  });
 
});

    function disappear( draggableobject ) {
        draggableobject.effect( "scale", { percent: 0 }, 500, callback);
      };
  
      function callback() {
        setTimeout(function() {
          $( this ).removeAttr( "style" ).hide();
        }, 500 );
      }
  
  function transitionToRight() {
    document.querySelector('body').style.transform = 'translateX(-50%)';
}

function transitionToLeft() {
    document.querySelector('body').style.transform = 'translateX(0)';
}

