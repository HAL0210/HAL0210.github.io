'use strict';

{
  document.querySelector('button').addEventListener('click', () => {
    const omikuji = document.querySelector('button');
    const num = Math.floor(Math.random() * variasions.length);

    // レア確率（大吉と大凶）の判定
    const rare = Math.random();

    if (rare < 0.05) {
      omikuji.textContent = '大吉';
      omikuji.classList.remove('bad', 'normal');
      omikuji.classList.add('happy');
    } else if (rare > 0.99) {
      omikuji.textContent = '大凶';
      omikuji.classList.remove('happy', 'normal');
      omikuji.classList.add('bad');
    } else if (rare > 0.95) {
      omikuji.textContent = '凶';
      omikuji.classList.remove('happy', 'normal');
      omikuji.classList.add('bad');
    } else {
      omikuji.textContent = variasions[num];
      omikuji.classList.remove('happy', 'bad');
      omikuji.classList.add('normal');
    }

  });

  const variasions = [
    "中吉",
    "小吉",
    "末吉",
    "末吉",
    "吉",
  ]
  // 大吉： 5%
  // 中吉：18%
  // 　吉：18%
  // 小吉：18%
  // 末吉：36%
  // 　凶： 4%
  // 大凶： 1%
}