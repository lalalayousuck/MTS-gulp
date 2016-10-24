Component.define 'todoList',
  events:
    'click on %download': 'onDownload'

  onDownload: ->
    $.ajax(
      url: 'https://inmyroom.ru/front_api/mts/pdf',
      method: 'POST'
      data: { rooms: @serialize() }
    ).done((response) ->
      document.location.href = "data:application/pdf;base64, " + response;
    )

  serialize: ->
    @$('[data-room]').map(->
      {
        name: $(@).data('room')
        repairs: $(@).find('[data-repair]').map(->
          {
            name: $(@).data('repair')
            items: $(@).find(':checked').map(->
              $(@).next().text()
            ).get()
          }
        ).get()
      }
    ).get()

