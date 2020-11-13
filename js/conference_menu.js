(function ($, Drupal) {
  Drupal.behaviors.conference_menu = {
    attach: function (context, settings) {

      $(document).ready(function(){

        $(document, context).once('conference_menu').each( function() {

          acc = document.getElementsByClassName("cuba-accordion");

          for (i = 0; i < acc.length; i++) {

            acc[i].addEventListener("click", function (acc_clicked) {

              /* Toggle between adding and removing the "active" class,
              to highlight the button that controls the panel */
              this.classList.toggle("active");
            });
          }
        });
      });
    }
  };
})(jQuery, Drupal);
