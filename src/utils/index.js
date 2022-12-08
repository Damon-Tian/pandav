export function getBase64(imgUrl) {
  return new Promise((resolve) => {
    window.URL = window.URL || window.webkitURL
    var xhr = new XMLHttpRequest()
    xhr.open("get", imgUrl, true)
    xhr.responseType = "blob"
    xhr.onload = function () {
      if (this.status == 200) {
        //得到一个blob对象
        var blob = this.response
        console.log("blob", blob)
        // 至关重要
        let oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
          // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
          resolve(e.target.result)
        }
        oFileReader.readAsDataURL(blob)
      }
    }
    xhr.send()
  })
}

export function getImageUrl(url) {
  const origin = url.split(/\b\/.*/)[0]
  console.log(url.replace(origin, ""))
  return url.replace(origin, "")
}

export function DateFormat(date, fmt) {
  fmt = fmt || "yyyy-MM-dd hh:mm:ss"
  if (date === null || typeof date === "undefined" || date === "") {
    return null
  } else {
    // 时间要转成obj，否则报错
    date = new Date(date)
  }
  var o = {
    "M+": date.getMonth() + 1, // 月
    "d+": date.getDate(), // 日
    "h+": date.getHours(), // 时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    )
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      )
    }
  }
  return fmt
}

export function debounce(fn, delay, immdiate = false) {
  let timer = null
  let isInvoke = false
  return function _debounce(...arg) {
    if (timer) clearTimeout(timer)
    if (immdiate && !isInvoke) {
      fn.apply(this, arg)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(this, arg)
        isInvoke = false
      }, delay)
    }
  }
}

export function formatTime(val) {
  const y = val.slice(0, 4)
  const m = val.slice(4, 6)
  const d = val.slice(6, 8)
  const h = val.slice(8, 10)
  return `${y}-${m}-${d} ${h}点`
}

export function time_to_sec(time) {
  if (time !== null) {
    var s = ""
    var hour = time.split(":")[0]
    var min = time.split(":")[1]
    var sec = time.split(":")[2]
    s = Number(hour * 3600) + Number(min * 60) + Number(sec)
    return s * 1000
  }
}


export const chngeTime = (seconds) => {
  if (!seconds) return;
  let d = Math.floor(seconds / (3600000 * 24))
  let h = Math.floor((seconds % (3600000 * 24)) / 3600000)
  let m = Math.floor((seconds % 3600000) / 60000)
  let s = Math.floor(seconds % 60000) + ""
  return d + "天" + h + "时" + m + "分" + s.substring(0, 2) + "秒"
}
export const getRandom = (m, n) => {
  return Math.floor((n + 1 - m) * Math.random() + m)
}

export const getRandomRgb = () => {
  const r = getRandom(50, 255)
  const g = getRandom(35, 255)
  const b = getRandom(0, 232)
  return `rgb(${r},${g},${b})`
}