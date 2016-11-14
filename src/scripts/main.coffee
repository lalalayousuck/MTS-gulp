window.jQuery = window.$ = require('jquery')
window.jade = require('./lib/pug-runtime')

attachFastClick = require('./lib/fastclick')

data = require('./data/posts')

skrollr = require('./lib/skrollr')


ga = require('./ga')
require('./lib/component')
require('./components/header')
require('./components/share-btn')
require('./components/custom')
require('./components/todo-list')


attachFastClick(document.body)

$(document).ready ->

  skrollr.init() if window.innerWidth > 960

  Component.vitalize()

  currentRoom = "Прихожая"
  room = data.room5

  renderPosts = (room) ->
    $('#ideas').html(Templates.ideas({posts: room}))

  renderPosts(room)

  setRoomData = (currentRoom) ->
    switch currentRoom
      when "Прихожая" then room = data.room5
      when "Кухня" then room = data.room1
      when "Спальня" then room = data.room3
      when "Гостиная" then room = data.room2
      when "Ванная" then room = data.room4
      when "Детская" then room = data.room6
      else data = data.room5

  addActive = (currentRoom) ->
    $('[data-room = "' + currentRoom + '"]').addClass('is-active')
    $('[data-room = "' + currentRoom + '"] > [data-repair="Планирование"]').addClass('is-active')
    $('.repairs-menu li[data-repair="Планирование"]').addClass('is-active')

  setRoom = () ->
    $('.is-active').removeClass('is-active')
    addActive(currentRoom)
    setRoomData(currentRoom)
    renderPosts(room)

  $('.room').click ->
    currentRoom = $(@).attr('data-room')
    setRoom()

  $('.room-menu li').click ->
    currentRoom = $(@).attr('data-room')
    setRoom()

  $('.repairs-menu li').click ->
    $('.repairs-menu li').removeClass('is-active')
    $(@).addClass('is-active')
    $('.repairs-tab').removeClass('is-active')
    $('.repairs-tabs[data-room = "' + currentRoom + '"] .repairs-tab[data-repair = "' + $(@).attr('data-repair') + '"]').addClass('is-active')

  $('.paragraph-toggler').click ->
    $(@).parent().parent().find('.repairs-tab_desc').toggleClass('is-visible')

  $('.btn_print').click ->
    window.print();