console.log("#### Mermaid init script loaded ####");

function initMermaid() {
  // 清除旧图，防止重复渲染
  document.querySelectorAll('.mermaid').forEach((el) => {
    el.removeAttribute('data-processed');
    el.innerHTML = el.textContent;
  });

  // 初始化 Mermaid（设置主题颜色、箭头长度、方向）
  mermaid.initialize({
    startOnLoad: true,  // 关闭自动渲染，手动控制时机
    theme: 'base',
    themeCSS: false,
    flowchart: {
      nodeSpacing: 20,       // 横向节点间距
      rankSpacing: 25,       // 垂直方向箭头间距
      padding: 10,            // 节点内边距
      useMaxWidth: false,    // 避免自动拉伸全宽
      curve: 'linear',       // 直线箭头（而不是曲线）
    }
  });

  // 手动渲染所有 Mermaid 图
  mermaid.init(undefined, document.querySelectorAll('.mermaid'));
}

// 初次页面加载渲染
document.addEventListener("DOMContentLoaded", initMermaid);

// 每次页面跳转后重新渲染（支持 MkDocs Material 的 instant loading）
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initMermaid();
  });
}
