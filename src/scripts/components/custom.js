var $ = require('jquery');

Component.define('custom', {

  events: {
    'keydown on %input': 'setKeyPressable',
    'input on %input': 'setChanged',
    'blur on %input': 'setKeyUnPressable',
    'click on %plus': 'createCustomTask'
  },

  init: function() {
    this.input = this.$('input');
    this.plus = this.$('.plus');

    this.isChanged = false;
    this.task = '';
  },

  setChanged: function() {
    this.isChanged = true;
    console.log(this.isChanged);
    this.task = this.input.val();
    this.plus.css({'cursor': 'pointer', 'opacity': 1});
  },

  createCustomTask: function() {
    if (this.isChanged == true) {
      this.plus.parent().before('<div class="form-row is-checked"><input class="checkbox" checked type="checkbox"><input class="text new" type="text" value="' + this.task + '"></div>');
      this.plus.closest('.repairs-tab').addClass('is-checked');
      this.plus.closest('.repairs-tabs').addClass('is-checked');
      this.plus.css({'cursor': 'default', 'opacity': 0.3});
      this.input.val("");
      this.input.isChanged = fasle;
    }
  },

  setKeyPressable: function() {
    var that = this;
    if (event.keyCode == 13) {
      event.preventDefault();
      that.createCustomTask();
    }
  },

  setKeyUnPressable: function() {
    console.log('choo-choo');
  }
});

$(document).ready(function() {

  $('#fullpage').fullpage({
    anchors:['main-anchor', 'rooms-anchor', 'tasks-anchor', 'ideas-anchor', 'tech-anchor'],
    scrollOverflow: false,
    verticalCentered: false,
    lockAnchors: true,
    afterLoad: function(anchor, index) {
      if (index == 3 || index == 4) {
        $.fn.fullpage.setAutoScrolling(false);
        var top = $(this).offset().top;
        console.log(top);
        var bottom = top + ($(this).next().offset().top - top);
        console.log(bottom);
      }
    },
    onLeave: function(index, nextIndex, direction) {
      if (index == 3 || index == 4 && nextIndex == 3 || nextIndex == 4 ) {
        console.log ('ok');
      } else {
        $.fn.fullpage.setAutoScrolling(true);
      }
    }

  });

  $('.checkbox').click(function() {
    if ($(this).prop('checked')) {
      $(this).parent().addClass('is-checked');
      $(this).closest('.repairs-tab').addClass('is-checked');
      $(this).closest('.repairs-tabs').addClass('is-checked');
    } else {
      $(this).parent().removeClass('is-checked');
      $(this).closest('.repairs-tab').removeClass('is-checked');
      $(this).closest('.repairs-tabs').removeClass('is-checked');
    }
  });

  $('a').click(function() {
    if ($(this).attr('href').match(/#/) == "#") {
      event.preventDefault();

      var id = $(this).attr('href');
      var top = $(id).offset().top;

      $('body, html').animate({scrollTop: top}, 1500);
    }
  });
});