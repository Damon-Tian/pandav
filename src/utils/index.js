

export function getBase64(imgUrl) {
    return new Promise((resolve) => {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                console.log("blob", blob)
                // 至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    // 此处拿到的已经是base64的图片了,可以赋值做相应的处理
                    resolve(e.target.result)
                }
                oFileReader.readAsDataURL(blob);
            }
        }
        xhr.send();
    })
}