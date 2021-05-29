'use strict';

{
  const timer = document.getElementById('timer');
  const btn = document.getElementById('timerGameBtn');
  const goal = document.getElementById('goal');

  let startTime;
  let timeoutId = 0;
  let goalSeconds = setGoalSeconds();
  goal.textContent = `${goalSeconds}秒を目指そう`

  function setGoalSeconds() {
    return 5 + Math.floor(Math.random() * 6)
  }

  function countUp() {
    const time = new Date(Date.now() - startTime);
    const s = String(time.getSeconds()).padStart(2, '0');
    const ms = String(Math.floor(time.getMilliseconds() / 10)).padStart(2, '0');

    timer.textContent = `${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10)
  }

  btn.addEventListener('click', () => {

    if (btn.classList.contains('start')) {
      timerStart();
    } else if (btn.classList.contains('stop')) {
      timerStop();
    } else if (btn.classList.contains('retry')) {
      timerRetry();
    }
    
  });
  
  function timerStart() {
    startTime = Date.now();

    countUp();

    btn.textContent = 'STOP';
    btn.classList.remove('start');
    btn.classList.add('stop');
  }

  function timerStop() {
    clearTimeout(timeoutId);

    const timeDiffer = Math.floor((Number(timer.textContent) - goalSeconds + 0.0001) * 100) / 100;

    if (timeDiffer === 0) {
      goal.textContent = `ピッタリ${goalSeconds}秒！`
    } else if(timeDiffer < 0) {
      goal.textContent = `${-timeDiffer}秒早かった…`;
    } else if(timeDiffer > 0) {
      goal.textContent = `${timeDiffer}秒遅かった…`;
    }

    btn.textContent = 'RETRY';
    btn.classList.remove('stop');
    btn.classList.add('retry');
  }

  function timerRetry() {
    timer.textContent = '00.00';

    goalSeconds = setGoalSeconds();
    goal.textContent = `${goalSeconds}秒を目指そう`

    btn.textContent = 'START';
    btn.classList.remove('retry');
    btn.classList.add('start');
  }
}