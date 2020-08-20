const index = (req, res) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>express-react-dev-template</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="description" content="">
    <script>
    (function flexible (window, document) {
      function setRemUnit () {
        var html = document.getElementsByTagName('html')[0]; 
        //屏幕的宽度（兼容处理）
        var w = document.documentElement.clientWidth || document.body.clientWidth;
        //750这个数字是根据你的设计图的实际大小来的，所以值具体根据设计图的大小
        html.style.fontSize = (w > 750 ? 750 : w)  / 750 + "px";
      }
    
      setRemUnit()
    
      // reset rem unit on page resize
      window.addEventListener('resize', setRemUnit)
      window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          setRemUnit()
        }
      })
    }(window, document))
    </script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script type="text/javascript" src='/assets/app.js'></script>
</html>`
}

module.exports = {
  index
}
