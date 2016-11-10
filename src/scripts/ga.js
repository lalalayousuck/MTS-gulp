(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga')

ga('create', 'UA-86462147-1', 'auto');
ga('send', 'pageview');

setTimeout(function() {
  ga('send', 'event', 'timer', 'read');
}, 30000);

$(document).on('click', '.js-customPlus', function() {
  ga('send', 'event', 'azbuka-remonta', 'addCustom', 'addCustom');
})

$(document).on('click', '.share-btn__fb', function() {
  ga('send', 'event', 'azbuka-remonta', 'fb_share', 'fb_share');
})

$(document).on('click', '.share-btn__vk', function() {
  ga('send', 'event', 'azbuka-remonta', 'vk_share', 'vk_share');
})

$(document).on('click', '.share-btn__ok', function() {
  ga('send', 'event', 'azbuka-remonta', 'ok_share', 'ok_share');
})

$(document).on('click', '.js-todoListDownload', function() {
  ga('send', 'event', 'azbuka-remonta', 'download-list', 'download-list');
})

$(document).on('click', '.js-todoListPrint', function() {
  ga('send', 'event', 'azbuka-remonta', 'print-list', 'print-list');
})

$(document).on('click', '.section-tech_infoblock', function() {
  ga('send', 'event', 'azbuka-remonta', 'to-gpon-article', 'to-gpon-article');
})

$(document).on('click', '.footer-link', function() {
  ga('send', 'event', 'azbuka-remonta', 'to-gpon-article', 'to-gpon-article');
})