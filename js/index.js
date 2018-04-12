// Window size
$(function() {
    


  var zIndex = 1;

  var fullHeight = $(window).height(),
      fullWidth  = $(window).width();
 
  
  $(window).resize(function() {
    fullHeight = $(window).height();
    fullWidth = $(window).width();
  });
  
// Window & taskbar actions
  $(function() {
    $('.window:visible').each(function() {
      var appName = $(this).data('window');
      
      $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--open');
    });
  });
  
  $(function() {
    var initialActive = $('.window').first();
    var appName = $(initialActive).data('window');
    
   $(initialActive).addClass('window--active').css({'z-index' : zIndex++});
   $('.taskbar__item[data-window="' + appName + '"]').addClass('taskbar__item--active');
  });

  
  $('.window').click(function() {
    $('.window').removeClass('window--active');
    
    $(this).addClass('window--active');
    $(this).css({'z-index' : zIndex++});
  });
  
  $('.window').resizable({
    stop: function() {
     var initialHeight = $(this).height(),
     initialWidth = $(this).width(),
     initialTop = $(this).position().top,
     initialLeft = $(this).position().left; }
   });

  $('.window').draggable({    
    handle: '.window__titlebar',
    stop: function() {
    var initialHeight = $(this).height(),
        initialWidth = $(this).width(),
        initialTop = $(this).position().top,
        initialLeft = $(this).position().left; 
    },
    start: function(event, ui) {
      $('.window').removeClass('window--active');
      
      $(this).addClass('window--active');
      $(this).css({'z-index' : zIndex++});

      if ( $(this).hasClass('window--maximized') ) {
        $(this).removeClass('window--maximized');
        
        $(this).css({ 'height' : initialHeight,
                      'width'  : initialWidth,
                      'top'    : 0,
                      'left'   : '50%' });        
      }            
    }
  });

  function openApp(e) {
    var appName = $(this).data('window');
    var targetWindow = $('.window[data-window="' + appName + '"]');
    var targetTaskbar = $('.taskbar__item[data-window="' + appName + '"]');
    
    e.preventDefault();
    $('.taskbar__item').removeClass('taskbar__item--active');
    
    if ( targetWindow.is(':visible') ) {
      if ( targetWindow.hasClass('window--active') ) {
        $(targetWindow).toggleClass('window--minimized');

        if ( !targetWindow.hasClass('window--minimized') ) {
          var initialHeight = $(targetWindow).height(),
               initialWidth = $(targetWindow).width(),
               initialTop = $(targetWindow).position().top,
               initialLeft = $(targetWindow).position().left; 
          
          $('.window').removeClass('window--active');

         $(targetWindow).addClass('window--active').css({ 
            'z-index' : zIndex++
          });
          
          $(targetTaskbar).addClass('taskbar__item--active');
        }
      } else {
        $('.window').removeClass('window--active');
        $(targetWindow).addClass('window--active').css({'z-index' : zIndex++});
        
        $(targetTaskbar).addClass('taskbar__item--active');
      }
    } else {
      $('.window').removeClass('window--active');
      
      $('.window[data-window="' + appName + '"]').fadeIn().addClass('window--active').css({ 'z-index' : zIndex++ });
      
      setTimeout(function() {
        $('.window[data-window="' + appName + '"]').removeClass('window--opening');
      }, 0);
      
      $(targetTaskbar).addClass('taskbar__item--active').addClass('taskbar__item--open');
    } 
  }
  
  $('.taskbar__item').click(openApp);  
  
// Window controls  
  
  $('.window__controls').each(function() {
    var parentWindow = $(this).closest('.window'); 
    
    $(this).find('a').click(function(e) {
      e.preventDefault();
    });
    
    $(this).find('.window__close').click(function(e) {
      $(parentWindow).addClass('window--closing');
      
      setTimeout(function() {
        $(parentWindow).hide().removeClass('window--closing').addClass('window--opening');
      }, 500);
      
      var appName = $(parentWindow).data('window');
      
      $('.taskbar__item[data-window="' + appName + '"]').removeClass('taskbar__item--open taskbar__item--active');
    });
    
    $(this).find('.window__minimize').click(function(e) {
      $(parentWindow).addClass('window--minimized');
    });
    
    $(this).find('.window__maximize').click(function(e) {

      $(parentWindow).toggleClass('window--maximized');

      if ( !$(parentWindow).hasClass('window--maximized') ) {
        $(parentWindow).css({ 'height' : initialHeight,
                              'width'  : initialWidth,
                              'top'    : initialTop,
                              'left'   : initialLeft});
      } else {
        initialHeight = $(parentWindow).height();
        initialWidth = $(parentWindow).width();
        initialTop = $(parentWindow).position().top;
        initialLeft = $(parentWindow).position().left;

        $(parentWindow).css({ 'height' : fullHeight,
                              'width'  : fullWidth,
                              'top'    : 0,
                              'left'   : 0 });
      }
    });
  });
}); 


// Unfocus windows when desktop is clicked
$('.desktop').click(function(e) {
  if ( $('.desktop').has(e.target).length === 0 ) {
  $('.window').removeClass('window--active');
  }
});

// Prevent "open" class on start
$(function() {
  $('.taskbar__item--start').click(function() {
    $(this).removeClass('taskbar__item--open taskbar__item--active');
  });
});

/* RIGHT CLICK */

$(document).bind("contextmenu", function(event) {
    event.preventDefault();
    $(".context")
        .show()
        .css({top: event.pageY + 0, left: event.pageX + 0});
});

$(document).click(function() {
  isHovered = $(".context").is(":hover");
  if (isHovered == true) {
  } else {
    $(".context").fadeOut(90);
  }
});






/* VIDEO */

var video=document.getElementById("video");

function playPause()
{
if (video.paused)
  video.play();
else
  video.pause();
}



	var currentTime = new Date(),
      hours = currentTime.getHours(),
      minutes = currentTime.getMinutes();

	if (minutes < 10) {
	 minutes = "0" + minutes;
  }
document.getElementById('timer').innerHTML =hours + ":" + minutes;




setTimeout(function(){
  $('#intro').remove();
}, 5000);
