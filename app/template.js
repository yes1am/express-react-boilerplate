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
      var docEl = document.documentElement
      var dpr = window.devicePixelRatio || 1
    
      // adjust body font size
      function setBodyFontSize () {
        if (document.body) {
          document.body.style.fontSize = (12 * dpr) + 'px'
        }
        else {
          document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
      }
      setBodyFontSize();
    
      // set 1rem = viewWidth / 10
      function setRemUnit () {
        var rem = (docEl.clientWidth > 750 ? 750 : docEl.clientWidth) / 10
        docEl.style.fontSize = rem + 'px'
      }
    
      setRemUnit()
    
      // reset rem unit on page resize
      window.addEventListener('resize', setRemUnit)
      window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
          setRemUnit()
        }
      })
    
      // detect 0.5px supports
      if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
          docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
      }
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
