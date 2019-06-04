
export function compress(fileObj, quality , callback) {
           try{
                const image = new Image()
                image.src = URL.createObjectURL(fileObj)
                image.onload = function() {
                  const that = this
                  // 默认按比例压缩
                  let w = that.width
                  let h = that.height
                  const scale = w / h
                  w = fileObj.width || w
                  h = fileObj.height || (w / scale)
                  // 生成canvas
                  const canvas = document.createElement('canvas')
                  const ctx = canvas.getContext('2d')
                  // 创建属性节点
                  const anw = document.createAttribute('width')
                  anw.nodeValue = w
                  const anh = document.createAttribute('height')
                  anh.nodeValue = h
                  canvas.setAttributeNode(anw)
                  canvas.setAttributeNode(anh)
                  ctx.drawImage(that, 0, 0, w, h)
                  // 图像质量
                  // quality值越小，所绘制出的图像越模糊
                  let  data = canvas.toDataURL('image/jpeg', quality);
                //自定义需求 ： 小于1M
                while (data.length > 1024 * 1024) {
                   data = canvas.toDataURL('image/jpeg', quality)
                }
              // 压缩完成执行回调
              const newFile = convertBase64UrlToBlob(data);
              callback(newFile);
            }
            }catch(err){
            console.log(err);
         }
    }
    function convertBase64UrlToBlob(urlData) {
      const bytes = window.atob(urlData.split(',')[1]) ;// 去掉url的头，并转换为byte
      // 处理异常,将ascii码小于0的转换为大于0
      const ab = new ArrayBuffer(bytes.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i)
      }
      return new Blob([ab], { type: 'image/png' })
}