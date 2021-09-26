'use strict';

{
  document.querySelector('button').addEventListener('click', () => {
    console.log('おみくじを引きます。')

    const omikuji = document.querySelector('button');

    // レア確率（大吉と凶）の判定
    const rare = Math.random();

    console.log('rare:' + String(rare))

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
      const number = Math.floor(Math.random() * variasions.length);
      console.log('number:' + String(number))
      omikuji.textContent = variasions[number];
      omikuji.classList.remove('happy', 'bad');
      omikuji.classList.add('normal');
    }
    console.log(omikuji.textContent + 'が引かれました')

  });

  const variasions = [
    "中吉",
    "小吉",
    "末吉",
    "末吉",// 末吉の確率を二倍
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