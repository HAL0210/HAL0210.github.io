'use strict';

{
  document.querySelector('button').addEventListener('click', () => {
    const omikuji = document.querySelector('button');
    const num = Math.floor(Math.random() * variasions.length);

    // レア確率（大吉と大凶）の判定
    const rare = Math.random();

    if (rare < 0.05) {
      omikuji.textContent = '大吉';
    } else if (rare > 0.99) {
      omikuji.textContent = '大凶';
    } else {
      omikuji.textContent = variasions[num];
    }

  });

  const variasions = [
    "中吉",
    "小吉",
    "末吉",
    "末吉",
    "末吉",
    "吉",
    "凶",
  ]

}