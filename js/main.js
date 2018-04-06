$(document).ready(function() {
  var navbarButton = document.querySelector('#navbar-button');

  if(navbarButton != null) {
    function collapseSection(element) {
      element.style.height = null;
      navbarButton.setAttribute('data-collapsed', 'true');
    }

    function expandSection(element) {
      var sectionHeight = element.scrollHeight;
      element.style.height = sectionHeight + 'px';
      navbarButton.setAttribute('data-collapsed', 'false');
    }

    navbarButton.addEventListener('click', function(e) {
      var section = document.querySelector('#navbar-collapse');
      var isCollapsed = navbarButton.getAttribute('data-collapsed') === 'true';
      $('#navbar-button').toggleClass('close');
      if(isCollapsed) {
        expandSection(section);
      } else {
        collapseSection(section)
      }
      e.preventDefault();
    });
  }
});

// // Rails only. Keeps animations from firing in turbolinks preview.
// $( document ).on('turbolinks:render', function() {
//   if (document.documentElement.hasAttribute("data-turbolinks-preview")) {
//     var $animated = $(".animated");
//     $animated.addClass('dont-animate-yet');
//   }
// });

var animation_elements = $('.animated');
var animation_elements_positions = [];
var win = $(window);

function update_animation_elements_positions() {
  animation_elements_positions = [];
  $.each(animation_elements, function() {
    var element = $(this);
    animation_elements_positions.push({
      elem: element, 
      position: element.offset().top + element.outerHeight() * 0.3
    });
  });
}

$(document).ready(function() {
  animation_elements = $(".animated");
  animation_elements.addClass('dont-animate-yet');
  $(".animated-child").addClass('dont-animate-yet');
  update_animation_elements_positions();
  check_if_in_view();
});

function check_if_in_view() {
  var window_height = win.height();
  var window_top_position = win.scrollTop();
  var window_bottom_position = (window_top_position + window_height);
  var array_length = animation_elements_positions.length;
  for (var i = 0; i < array_length; i++) {
    var info = animation_elements_positions[i];

    //check to see if this current container is within viewport
    if ((info.position <= window_bottom_position)) {
      info.elem.removeClass('dont-animate-yet');
    }
  }
}

win.on('scroll', check_if_in_view);
win.on('resize', function() {
  update_animation_elements_positions();
  check_if_in_view();
});
