//Curseur zone 1
  document.addEventListener('DOMContentLoaded', function () {
    const linkOverlay = document.querySelector('.link-overlay');

    linkOverlay.addEventListener('mouseover', function () {
      linkOverlay.style.cursor = 'crosshair';
      linkOverlay.style.cursorColor = 'red'; 
    });

    linkOverlay.addEventListener('mouseout', function () {
      linkOverlay.style.cursor = 'default';
    });
  });
//Curseur zone2
  document.addEventListener('DOMContentLoaded', function () {
    const linkOverlay2 = document.querySelector('.link-overlay2');

    linkOverlay2.addEventListener('mouseover', function () {
      linkOverlay2.style.cursor = 'crosshair';
      linkOverlay2.style.cursorColor = 'red'; 
    });

    linkOverlay2.addEventListener('mouseout', function () {
      linkOverlay2.style.cursor = 'default';
    });
  });

  