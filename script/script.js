// NOTE: elements
let prevThread;
let isActive = localStorage.getItem('mns-active') === 'true'

let observer = new MutationObserver( (records) => {
  try {
    const thread = document.getElementsByClassName(CLASS_OBJ.thread)[0]

    if ( prevThread != undefined && thread.isEqualNode(prevThread) ) return
    if ( thread.getElementsByClassName('gYckH').length == 1 ) return
    if ( !isActive ) return

    prevThread = thread.cloneNode(true)
    const messages = thread.getElementsByClassName(CLASS_OBJ.messages)
    const message = messages[messages.length - 1].innerText

    // FIXME: スクリーンオブジェクトでかい‥。
    let screen = document.body
    let screenHeight = screen.offsetHeight
    let screenWidth = screen.offsetWidth

    let comment = document.createElement('span')

    console.log('message', message)

    comment.textContent = message
    document.getElementsByTagName('body')[0].appendChild(comment)

    // TODO: size設定
    let letterSize = screenHeight * 0.05
    // TODO: 色設定
    comment.setAttribute('class', 'comment')

    const footerHeight = 88
    let topPosition = Math.floor((screenHeight - letterSize - footerHeight) * Math.random())
    let commentStyle = {
      left: `${screenWidth}px`,
      top: `${topPosition}px`,
      fontSize: `${letterSize}px`,
    }
    for(let prop in commentStyle) {
      comment.style[prop] = commentStyle[prop]
    }


    $(comment).animate(
      {
        'left': `${-comment.offsetWidth}px`
      },
      {
        'duration': 6000,
        'easing': 'linear',
        'complete': function() {
          document.getElementsByTagName('body')[0].removeChild(comment)
        }
      })
  }
  catch(e) {
    return
  }
})

document.addEventListener('DOMContentLoaded', () => {
  let elem = document.body

  observer.observe(elem, OBSERVE_CONFIG)

  let cas = document.createElement('iframe')
  // cas.setAttribute('src', 'https://river.tango-gacha.com/')
  cas.setAttribute('width', '100%')
  cas.setAttribute('height', '100%')
  cas.setAttribute('frameborder', '0')
  cas.setAttribute('style', "position:absolute;border:0;width:100%;filter:invert(100%);-webkit-filter:invert(100%);z-index:2147483647;pointer-events:none;")
  // let elem = document.body
  elem.appendChild(cas)
})

chrome.runtime.onMessage.addListener(function(request) {
  localStorage.setItem('mns-active', request)
  isActive = request
  return true
})
