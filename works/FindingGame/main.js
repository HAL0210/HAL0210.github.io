'use strict';

{
  const main = document.querySelector('body');
  let board = undefined;
  const whiteBoard = document.getElementById('select');
  let SET_WIDTH = undefined;
  let level = undefined;
  let touchCount = -1;
  let selectedOption = undefined;
  let selectedDifficulty = undefined;

  //問題
  const hiragana = [
    {'wrong': 'き','correct': 'さ'},
    {'wrong': 'ほ','correct': 'は'},
    {'wrong': 'ね','correct': 'わ'},
    {'wrong': 'ぬ','correct': 'め'},
    {'wrong': 'る','correct': 'ろ'},
  ]
  const kanji = [
    {'wrong': '永','correct': '氷'},
    {'wrong': '日','correct': '曰'},
    {'wrong': '輸','correct': '輪'},
    {'wrong': '賃','correct': '貸'},
    {'wrong': '右','correct': '石'},
  ]
  const kigou = [
    {'wrong': 'Щ','correct': 'Ш'},
    {'wrong': 'Ъ','correct': 'Б'},
    {'wrong': 'Ⅷ','correct': 'Ⅶ'},
    {'wrong': '∝','correct': '∽'},
    {'wrong': '＃','correct': '♯'},
  ]

  function selectQuestion(select) {
    switch(select) {
      case 0:
        return hiragana;
      case 1:
        return kanji;
      case 2:
        return kigou;
      default:
        return hiragana.concat(kanji).concat(kigou);
    }
  }//問題選択

  
  class Set {
    constructor(game) {
      this.game = game
      
      //set作成
      this.set = document.createElement('div');
      this.set.classList.add('set');
      board.appendChild(this.set);
      this.set.style.width = SET_WIDTH + 'px';
      

      //panels作成
      this.panels = [];
      this.createPanels();


      //正解パネルの配置
      this.createAnswerPanel();

    }//セット作成

    createPanels() {
      for (let i = 0; i < this.game.difficulty; i++) {
        this.panels.push(new Panel(this.game))
      }
      this.panels.forEach(panel => {
        this.set.appendChild(panel.getEl());
        panel.setText()
      });
    }//パネル作成

    createAnswerPanel() {
      this.panels[Math.floor(Math.random() * this.game.difficulty) ].setCorrect();
    }//正解配置
    
  }

  class Panel {

    constructor(game) {
      //panel作成
      this.game = game;
      this.panel = document.createElement('div');
      this.panel.classList.add('panel');
    }//パネル作成

    getEl() {      
      return this.panel;
    }//エレメントを出力

    setText() {
      this.panel.textContent = this.game.question['wrong'];
      this.panel.addEventListener('click', () => {
        touchCount++
      });
    }//不正解テキスト配置

    setCorrect() {
      this.panel.textContent = this.game.question['correct'];
      this.panel.classList.add('correct')
      this.panel.addEventListener('click', () => {
        this.game.nextSet()
        touchCount--;
      });
    }//正解テキスト配置

  }

  class Game {
    constructor(select, difficulty) {
      this.difficulty = difficulty;
      this.select = select;

      this.questions = selectQuestion(this.select);

      this.nextSet();
      this.startTime = undefined;
      this.endTime = undefined;
      this.question = undefined;
      this.startTimer();
    }

    startTimer() {
      this.startTime = Date.now();
    }

    endTimer() {
      this.endTime = ((Date.now() - this.startTime) / 1000).toFixed(2);
    }

    nextSet() {

      //前回のsetを削除します。
      while (board.firstChild) {
        board.removeChild(board.firstChild);
      }

      //次の問題とsetを用意します。問題が尽きたらゲーム終了。
      if (this.questions[0]) {
        this.setQuestion();
        new Set(this)
      } else {
        this.endGame();
      }
    }//セット移行

    setQuestion() {
      this.question = this.questions.splice(Math.floor(Math.random() * this.questions.length), 1)[0];
    }//問題設定

    endGame() {
      console.log('Finish');
      this.endTimer();
      console.log(touchCount)
      console.log(this.endTime)

      //ボードdisable
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      this.setResult();
    }//ゲーム終了

    setResult() {
      //結果ボード作成
      const resultBoard = document.createElement('div');
      resultBoard.classList.add('whiteBoard');
      main.appendChild(resultBoard);

      //結果を記載
      const result = {
        'pFinish': 'Finish!',
        'pSelect': '選んだ難易度：' + selectedDifficulty + ', ' + selectedOption,
        'pTime': 'クリアタイム：' + this.endTime + '秒',
        'pMiss': 'ミスタッチ数：' + touchCount + '回'
      }
      
      
      const pFinish = document.createElement('p');
      resultBoard.appendChild(pFinish);
      pFinish.textContent = result['pFinish'];
      pFinish.classList.add('finish')
      
      const pSelect = document.createElement('p');
      resultBoard.appendChild(pSelect);
      pSelect.textContent = result['pSelect'];

      const pTime = document.createElement('p');
      resultBoard.appendChild(pTime);
      pTime.textContent = result['pTime'];

      const pMiss = document.createElement('p');
      resultBoard.appendChild(pMiss);
      pMiss.textContent = result['pMiss'];

      const retry = document.createElement('div');
      resultBoard.appendChild(retry);
      retry.textContent = 'RETRY ?';
      retry.classList.add('retry');
      retry.addEventListener('click', () => {
        window.location.href = '';
      });
      
    }
  }

  function creatOption(num, text) {
    //選択肢作成
    const option = document.createElement('div');
    option.classList.add('option');
    whiteBoard.appendChild(option);
    option.textContent = text;
    
    //ゲーム開始
    option.addEventListener('click', () => {
      selectedOption = text;
      //ホワイトボードdisable
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }

      //ボード作成
      board = document.createElement('div');
      board.classList.add('board');
      main.appendChild(board);
      new Game(num, level)
    });
  }//各選択肢作成

  function creatOptionSelect() {
    creatOption(0, 'ひらがな');
    creatOption(1, '漢字');
    creatOption(2, '記号');
    creatOption('all', '全部');
  }//選択肢作成

  
  function creatDifficulty(num, text) {
    const difficulty = document.createElement('div');
    difficulty.classList.add('option');
    whiteBoard.appendChild(difficulty);
    difficulty.textContent = text; 
    difficulty.addEventListener('click', () => {
      selectedDifficulty = text;
      level = num * num;
      widthSetting(num)
      while (whiteBoard.firstChild) {
        whiteBoard.removeChild(whiteBoard.firstChild);
      }      
      creatOptionSelect();
    });
  }//各難易度作成

  function creatDifficultySelect() {
    creatDifficulty(2, '2×2');
    creatDifficulty(3, '3×3');
    creatDifficulty(5, '5×5');
    creatDifficulty(7, '7×7');
    creatDifficulty(10, '10×10');
  }//難易度作成

  function widthSetting(num) {
    SET_WIDTH = num * 120
  }



  creatDifficultySelect();

}