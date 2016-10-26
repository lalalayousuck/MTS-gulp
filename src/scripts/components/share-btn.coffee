cache = {}

Component.define 'shareBtn',
  events:
    'click': 'openShareWindow'

  init: ->
    console.log('sharebtn')
    @setShareUrl()

    return if @$block.data('type') == 'tw' #https://blog.twitter.com/2015/hard-decisions-for-a-sustainable-platform

    if @url = @$block.data('url')
      @fetchCounter()
    else
      @show()

  setShareUrl: ->
    type        = @$block.data('type')
    title       = @$block.data('title')
    url         = @$block.data('url')
    image       = @$block.data('image')
    description = @$block.data('description')
    redirectUrl = 'http://ideal.kitchenmag.ru'

    if type == 'tw'
      url = "https://twitter.com/intent/tweet?text=#{ @$block.data('twitter-title') } #{ url }"

    if type == 'fb'
      params =
        app_id: 239854476109563
        display: 'popup'
        link: 'http://promostaging.inmyroom.ru'
        redirect_uri: 'http://promostaging.inmyroom.ru'

      params.caption     = 'АЗБУКА РЕМОНТА'
      params.picture     = 'https://pu.vk.com/c539223/upload.php?act=proxy_img&url=http%3A%2F%2Fwww.inmyroom.ru%2Flanding%2Fmtsazbukaremonta%2Fimages%2Fshare.jpg&hash=fb6d7f01cb7ca4a7af89a977b035cb27'
      params.description = 'Хотите обновить интерьер и ждете впечатляющие результаты в короткие сроки? Чтобы ремонт не затягивался, важно предусмотреть всё. Воспользуйтесь списками дел и рекомендациями профессионалов.'

      url = 'https://www.facebook.com/dialog/feed?' + $.param(params)

    if type == 'vk'
      url = "http://vk.com/share.php?" + $.param(url: 'http://promostaging.inmyroom.ru', title: 'АЗБУКА РЕМОНТА', description: 'Хотите обновить интерьер и ждете впечатляющие результаты в короткие сроки? Чтобы ремонт не затягивался, важно предусмотреть всё. Воспользуйтесь списками дел и рекомендациями профессионалов.', image: 'https://pu.vk.com/c539223/upload.php?act=proxy_img&url=http%3A%2F%2Fwww.inmyroom.ru%2Flanding%2Fmtsazbukaremonta%2Fimages%2Fshare.jpg&hash=fb6d7f01cb7ca4a7af89a977b035cb27') 
      
    if type == 'ok'
      url = "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl='http://promostaging.inmyroom.ru'"

    @$block.data('share-url', url)

  openShareWindow: (e) ->
    window.open(@$block.data('share-url'), 'displayWindow', 'width=700,height=400,left=200,top=100,location=no,directories=no,status=no,toolbar=no,menubar=no')

  fetchCounter: ->
    type = @$block.data('type')
    @id  = type + @url
    if d = cache[@id]
      d.done(@updateCounter.bind(@))
    else
      cache[@id] = $.Deferred()
      @["get#{type.toUpperCase()}Count"](@url, @updateCounter.bind(@))

  updateCounter: (count)->
    @show()
    @$('%counter').text(count)
    cache[@id].resolve(count) if cache[@id]

  show: ->
    @$('%counter').removeClass('is-loading')

  # Api

  getFBCount: (url, callback) ->
    $.getJSON "https://graph.facebook.com/?id=#{url}", (data) ->
      callback(data?.share?.share_count || 0)

  getVKCount: (url, callback) ->
    window.VK = Share: {}
    window.VK.Share.count = (index, count) -> callback(count)

    $.getJSON "http://vkontakte.ru/share.php?act=count&index=1&url=#{ url }&format=json&callback=?"

  getTWCount: (url, callback) ->
    $.getJSON "http://cdn.api.twitter.com/1/urls/count.json?url=#{ url }&callback=?", (data) ->
      callback data.count

  getOKCount: (url, callback) ->
    window.ODKL = {}
    window.ODKL.updateCount = (idx, number) ->
      callback(number)

    $.getScript "http://connect.ok.ru/dk?st.cmd=extLike&ref=#{ url }&uid=0"
