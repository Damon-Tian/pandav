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
  if (!seconds) return
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

export const downloadBlob = (response) => {
  const disposition = response.headers["content-disposition"]
  let fileName = disposition.substring(
    disposition.indexOf("filename=") + 9,
    disposition.length
  )
  // iso8859-1的字符转换成中文
  fileName = decodeURIComponent(fileName)
  // 去掉双引号
  fileName = fileName.replace(/\\"/g, "")
  const content = response.data
  console.info("rep:", disposition)
  console.info("fileName:", fileName)
  // 创建a标签并点击， 即触发下载
  let url = window.URL.createObjectURL(new Blob([content]))
  let link = document.createElement("a")
  link.style.display = "none"
  link.href = url
  link.setAttribute("download", fileName)
  //link.download = "测试下载文件.xls"
  // 模拟
  document.body.appendChild(link)
  link.click()
  // 释放URL 对象
  window.URL.revokeObjectURL(link.href)
  document.body.removeChild(link)
}

export const formatOrgName = (name) => {
  if (name) {
    if (name.indexOf("成都") !== -1) {
      return "成都分局"
    } else if (name.indexOf("崇州") !== -1) {
      return "崇州总站"
    } else if (name.indexOf("大邑") !== -1) {
      return "大邑总站"
    } else if (name.indexOf("彭州") !== -1) {
      return "彭州总站"
    } else if (name.indexOf("都江堰") !== -1) {
      return "都江堰总站"
    } else {
      return name
    }
  } else {
    return ""
  }
}
//扁平化数组转树形
export const transListToTreeData = (list, parentId) => {
  // 1. 创建一个数组存放结果
  const res = []
  // 2. 遍历源数据, parentId === 传入参数的对象放入结果数组
  list.forEach((element) => {
    if (element.parentId === parentId) {
      // 递归开始, 每次找到一个符合条件的部门
      // 继续用这个部门的 id 作为下一层的 parentId
      const children = transListToTreeData(list, element.id)
      // 如果找到结果, 应该将结果放入当前 element.children 当中
      if (children.length > 0) {
        element.children = children
      }
      res.push(element)
    }
  })

  // 3. 返回结果数组
  return res
}
export const deepClone = function (obj) {
  //可传入对象 或 数组
  //  判断是否为 null 或 undefined 直接返回该值即可,
  if (obj === null || !obj) return obj
  // 判断 是要深拷贝 对象 还是 数组
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    //对象字符串化的值会为 "[object Object]"
    let target = {} //生成新的一个对象
    const keys = Object.keys(obj) //取出对象所有的key属性 返回数组 keys = [ ]
    //遍历复制值, 可用 for 循环代替性能较好
    keys.forEach((key) => {
      if (obj[key] && typeof obj[key] === "object")
        //如果遇到的值又是 引用类型的 [ ] {} ,得继续深拷贝
        target[key] = deepClone(obj[key])
      //递归
      else target[key] = obj[key]
    })
    return target //返回新的对象
  } else if (Array.isArray(obj)) {
    // 数组同理
    let arr = []
    obj.forEach((item, index) => {
      if (item && typeof item === "object") arr[index] = deepClone(item)
      else arr[index] = item
    })
    return arr
  }
}
