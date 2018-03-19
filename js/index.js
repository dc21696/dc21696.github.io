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





/* CONSOLE */ 

// Define room level

var lvl = 1;

// Focus
$('.console-input').focus();

// Output to Console
function output(print) {
  var cmd = $('.console-input').val();
  if(cmd==""){cmd="<span>null</span>";}
  $("#outputs").append("<span class='output-cmd'>" + cmd + "</span>");

  $.each(print, function(index, value) {
    cmd = " >";
    if (value == "") {
      value = "&nbsp;";
      cmd = "&nbsp;";
    }
    $("#outputs").append("<span class='output-text'>" + value + "</span>");
  });
  
  $('.console-input').val("");
  //$('.console-input').focus();
  $('.anim').animate({
    scrollTop: $('#outputs').height()
  }, 500);
}

// Break Value
var newLine = "<br/> &nbsp;";

// User Commands

var helpInfo = {
  "/connect":0,
  "/download":0,
  "/extract":0
};

var cmds = {
  
  "": function() {
  },
  
  "/reload": function() {
    window.location.replace(location.href);
  },
  
  "/rl": function(a) {
    output([lvl]);
  },

  "/clear": function() {
    $("#outputs").html("");
  },

  "/help": function() {

    var print = ["Commands:"];
    print = $.merge(print, Object.keys(helpInfo));

    output(print);
  },

  "/connect": function(a) {
    if(a === "saaNet"){
      output(['Connected to <b>' + a + '</b>']);
      $('#netConnected').addClass('triggered');
      lvl = 2;
    }
    else if(a === "list"){
      output(['Networks:' + '<li><span class="fa fa-signal" style="color:#1DD041;"></span> saaNet</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> Novistar_E831</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> OMO6218</li>' + '<li><span class="fa fa-signal" style="color:#FF5D5A;"></span> Yasstel_h501</li>']);
    }
    else {
      output(['Use /connect <b>[NETWORK/LIST]<b>']);
    }
  },
  
  "/download": function(a) {
    if(a === "fsociety/spectre.iso" && lvl === 2){
      output(['Downloading <b>"spectre.iso"</b> to C:/users/blackhood/desktop']);
      $('#spectreIso').addClass('download');
      lvl = 3;
    }
    /*else if(a !== null){
      output(['<div class="err">Can' + "'" +'t find <b>"' + a + '"</b> in the cloud</div>']);
    }*/
    else{
      output(['Use /download <b>[PATH]<b>']);
    }
  },
  
  "/extract": function(a) {
    if(lvl === 3 && a !== "C:/users/blackhood/desktop/spectre.iso" && a !== null){
      output(['<span class="err"> File not found</div>']);
    }
    else if(lvl === 3 && a === "C:/users/blackhood/desktop/spectre.iso"){
      output(['Extracting <b>"' + a + '"</b>']);
      $('#spectreExo').addClass('extract');
      lvl = 4;
    }
    else {
      output(['Use /extract <b>[PATH]<b>']);
    }
  }
};

// Get User Command
$('.console-input').on('keypress', function(event) {
  if (event.which === 13) {
    var str = $(this).val();
    var data = str.split(' '); data.shift(); data = data.join(' ');
    var cmd = str.split(' ')[0];
    
    if (typeof cmds[cmd] == 'function') {
      if(cmds[cmd].length > 0) {
        cmds[cmd](data);
      } else {
        cmds[cmd]();
      }
    } else {
      output(["<div class='err'>Command not found: '" + cmd + "'</div>", "Use '/help' for list of commands."]);
    }
    $(this).val("");
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