document$.subscribe(() => {
  document.querySelectorAll('pre > code.language-python').forEach(codeBlock => {
    const pre = codeBlock.parentElement;

    // 避免重复添加
    if (pre.classList.contains('has-dark-toggle')) return;
    pre.classList.add('has-dark-toggle');

    // 设置相对定位以放置按钮
    pre.style.position = 'relative';

    // 创建按钮
    const btn = document.createElement('button');
    btn.innerText = '🌙 Dark Mode';
    btn.className = 'dark-toggle-btn';
    btn.style.position = 'absolute';
    btn.style.top = '0.4rem';
    btn.style.right = '4rem';
    btn.style.zIndex = '10';

    // 切换 dark class
    btn.onclick = () => {
      codeBlock.classList.toggle('dark-python');
    };

    pre.appendChild(btn);
  });
});
