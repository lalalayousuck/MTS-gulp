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
      this.plus.parent().parent().append('<div class="form-row new-checkbox" data-component="custom"><div class="plus js-customPlus"></div><input class="text js-customInput" type="text" placeholder="Добавьте свою задачу"></div>');
      this.plus.parent().addClass('is-checked');
      this.plus.closest('.repairs-tab').addClass('is-checked');
      this.plus.closest('.repairs-tabs').addClass('is-checked');
      this.plus.parent().html('<input class="checkbox" checked type="checkbox"><input class="text new" type="text" value="' + this.task + '">');
      Component.vitalize();
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
});