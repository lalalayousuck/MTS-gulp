var $ = require('jquery');

Component.define('custom', {

  events: {
    'input on %input': 'setChanged',
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
    this.task = this.input.val();
    this.plus.css({'cursor': 'pointer'});
  },

  createCustomTask: function() {
    if (this.isChanged == true) {
      console.log($(this));
      this.plus.parent().parent().append('<div class="form-row new-checkbox" data-component="custom"><div class="plus js-customPlus"></div><input class="text js-customInput" type="text" placeholder="Добавьте свою задачу"></div>');
      this.plus.parent().html('<input class="checkbox" checked type="checkbox"><input class="text new" type="text" value="' + this.task + '">');
      Component.vitalize();
    }
  }
});