(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $(".dropdown-button").dropdown();
    $('.parallax').parallax();
    $('ul.tabs').tabs();
    $('.slider').slider({full_width: true});
    $('.collapsible').collapsible({
       accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
     });

     var options = [
      {selector: '#scroll-test1', offset: 50, callback: function(el) {
        Materialize.toast("This is our ScrollFire Demo!", 1500 );
      } },
      {selector: '#staggered-test', offset: 205, callback: function(el) {
        Materialize.toast("Please continue scrolling!", 1500 );
      } },

      {selector: '#scroll-test1', offset: 400, callback: function(el) {
        Materialize.showStaggeredList($(el));
      } },
      {selector: '#scroll-test2', offset: 400, callback: function(el) {
        Materialize.showStaggeredList($(el));
      } },
      {selector: '#scroll-test3', offset: 400, callback: function(el) {
        Materialize.showStaggeredList($(el));
      } },
      {selector: '#scroll-test4', offset: 400, callback: function(el) {
        Materialize.showStaggeredList($(el));
      } },
      {selector: '#image-test', offset: 500, callback: function(el) {
        Materialize.fadeInImage($(el));
      } },
    ];
    Materialize.scrollFire(options);



  }); // end of document ready
})(jQuery); // end of jQuery name space
