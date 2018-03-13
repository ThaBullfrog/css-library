$(document).ready(function() {
  var navBarbutton = document.querySelector('#navbar-button');

  if(navBarbutton != null) {
    function collapseSection(element) {
      element.style.height = null;
      navBarbutton.setAttribute('data-collapsed', 'true');
    }

    function expandSection(element) {
      var sectionHeight = element.scrollHeight;
      element.style.height = sectionHeight + 'px';
      navBarbutton.setAttribute('data-collapsed', 'false');
    }

    navBarbutton.addEventListener('click', function(e) {
      var section = document.querySelector('#navbar-collapse');
      var isCollapsed = navBarbutton.getAttribute('data-collapsed') === 'true';
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
