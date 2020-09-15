export function setRem(minWidth = 1080) {
  function change() {
    document.documentElement.style.fontSize =
      (Math.max(document.documentElement.clientWidth, minWidth) * 100) / 1920 +
      "px";
    document.body.style.fontSize = "12px";
  }
  change();
  /* 监听窗口大小发生改变时 */
  window.addEventListener("resize", change, false);
}
