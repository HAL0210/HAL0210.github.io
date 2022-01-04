'use strict';

{
  const html = document.querySelector('html');
  const darkmodeBtn = document.getElementById('darkmodeBtn');
  
  var mode = sessionStorage.getItem('mode');
  if (mode === 'dark') {
    html.classList.add('darkmode');
  }
  console.log(`darkmode=${mode}`)
  
  darkmodeBtn.addEventListener('click', () => {
    html.classList.toggle('darkmode');
    if (mode !== 'dark') {
      sessionStorage.setItem('mode', 'dark');
      mode = 'dark';
    } else {
      sessionStorage.setItem('mode', 'normal');
      mode = 'normal';
    }
    console.log(`darkmode=${mode}`)
  });
}