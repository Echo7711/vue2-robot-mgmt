// rem等比适配配置文件
// 基准大小
const baseSize = 16
// 设置rem函数
function setRem() {
  // 当前页面相对于1920宽的缩放比例，可根据自己需要修改
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置rem
window.onresize = function () {
  setRem()
}