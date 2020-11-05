(function ($, Drupal) {
  Drupal.behaviors.conference_menu = {
    attach: function (context, settings) {
      $(document, context).once('conference_menu').each( function() {

        var acc = document.getElementsByClassName("cuba-accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function () {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");


          });
        }
      });
    }
  };
})(jQuery, Drupal);
