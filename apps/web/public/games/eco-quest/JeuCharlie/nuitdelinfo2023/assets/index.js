$( function() {
    $( "#draggable" ).draggable({ revert: "valid" });
    $( "#draggable2" ).draggable({ revert: "invalid" });
 
    $( "#droppable" ).droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );

            //ui.helper.hide();
        disappear( ui.helper );
      }
    });

    function disappear( draggableobject ) {
      draggableobject.effect( "scale", { percent: 0 }, 500, callback);
    };

    function callback() {
      setTimeout(function() {
        $( this ).removeAttr( "style" ).hide();
      }, 500 );
    }
  } );


  $(function () {
    // Position draggable2 in the middle of the screen
    var windowWidth = $(window).width();
    var draggable2Width = $("#draggable2").width();
    $("#draggable2").css("left", (windowWidth - draggable2Width) / 2);

    $("#draggable").draggable({ revert: "valid" });
    $("#draggable2").draggable({ revert: "invalid" });

    $("#droppable").droppable({
      classes: {
        "ui-droppable-active": "ui-state-active",
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function (event, ui) {
        $(this)
          .addClass("ui-state-highlight")
          .find("p")
          .html("Dropped!");

        disappear(ui.helper);
      }
    });

    function disappear(draggableobject) {
      draggableobject.effect("scale", { percent: 0 }, 500, callback);
    }

    function callback() {
      setTimeout(function () {
        $(this).removeAttr("style").hide();
      }, 500);
    }
  });