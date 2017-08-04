// var f=require("../scripts/memory.js");

describe('Appending Html', function () {
  beforeAll(function () {
    var tempHtml = '<div id="main">' +
  ' <button type="button" class="button top-left" id="simon0" value="green" onclick="clickButton(this)" disabled></button>' +
  '<button type="button" class="button top-right" id="simon1" value="red" onclick="clickButton(this)" disabled> </button>' +
  '<button type="button" class="button bottom-left" id="simon2" value="yellow" onclick="clickButton(this)" disabled> </button>' +
  '<button type="button" class="button bottom-right" id="simon3" value="blue" onclick="clickButton(this)" disabled> </button>' +
  '<div id="inner">' +
   '<p id="simon-text">Simon<sup>&#174</sup></p>' +
   '<div class="start" id="start" onclick="reset()" > </div>' +
   '<div class="strict" id="strict" onclick="set()" > </div>' +
   '<div class="light" id="light"> </div>' +
   '<div id="counter" class="counter"> ' +
    '<p id="count">--</p>' +
   '</div>' +
   '<p class="p" id="pc">COUNT</p>' +
   '<p class="p" id="ps">START</p>' +
   '<p class="p" id="pst">STRICT</p>' +
   '<label class="switch"> ' +
   '<input type="checkbox" id="check_on" onclick="on()" unchecked>' +
   '<span class="slider"></span> ' +
   '<p class="p1" id="on">ON</p>' +
   '<p class="p1" id="off">OFF</p></label>' +
  ' </div>' +
  '</div>';
    tempHtml += '<audio id="green" src="assets/green.ogg" type="audio/ogg">' +
  '</audio> <audio id="red" src="assets/red.ogg" type="audio/ogg">' +
  '</audio> <audio id="yellow" src="assets/yellow.ogg" type="audio/ogg">' +
  '</audio> <audio id="blue" src="assets/blue.ogg" type="audio/ogg"></audio>' +
  ' <audio id="wrong" src="assets/wrong.ogg" type="audio/ogg"></audio>';
    document.body.insertAdjacentHTML('afterbegin', tempHtml);
  });
  describe('Checking the on off button', function () {
    it('Game is switched on', function () {
      document.getElementById('check_on').click();
      expect(myGame.on).toBe(true);
    });
    it('Game is switched off', function () {
      // spyOn(window,'clear');
      document.getElementById('check_on').click();
      expect(myGame.on).toBe(false);
      expect(document.getElementById('count').innerHTML).toBe('--');
      expect(document.getElementById('count').style.opacity).toBe('0.3');
      expect(document.getElementById('light').style.backgroundColor).toBe('rgb(71, 28, 28)');
      // expect(window.clear).toHaveBeenCalled();
    });
  });
  describe('Game on and start', function () {
    it('game start', function () {
      document.getElementById('check_on').click();
      jasmine.clock().install();
      document.getElementById('start').click();
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('--');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('--');
      jasmine.clock().uninstall();
    });
    it('All buttons are changing colour', function () {
      jasmine.clock().install();
      createString([0, 1, 2, 3]);
      expect(myGame.arr).not.toBe([]);
      jasmine.clock().tick(1000);
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(38, 255, 0)');
      jasmine.clock().tick(600);
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(71, 173, 76)');
      jasmine.clock().tick(400);
      expect(document.getElementById('simon1').style.backgroundColor).toBe('rgb(255, 0, 0)');
      jasmine.clock().tick(600);
      expect(document.getElementById('simon1').style.backgroundColor).toBe('rgb(155, 20, 20)');
      jasmine.clock().tick(400);
      expect(document.getElementById('simon2').style.backgroundColor).toBe('rgb(248, 255, 50)');
      jasmine.clock().tick(600);
      expect(document.getElementById('simon2').style.backgroundColor).toBe('rgb(214, 192, 32)');
      jasmine.clock().tick(400);
      expect(document.getElementById('simon3').style.backgroundColor).toBe('rgb(0, 187, 255)');
      jasmine.clock().tick(600);
      expect(document.getElementById('simon3').style.backgroundColor).toBe('rgb(55, 96, 158)');
      jasmine.clock().uninstall();
      document.getElementById('check_on').click();
    });
  });
  describe('play game and clicking the first correct button', function () {
    it('click right button', function () {
      document.getElementById('check_on').click();
      jasmine.clock().install();
      createString([0]);
      jasmine.clock().tick(1000);
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(38, 255, 0)');
      jasmine.clock().tick(600);
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(71, 173, 76)');
      document.getElementById('simon0').onclick(document.getElementById('simon0'));
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(38, 255, 0)');
      jasmine.clock().tick(200);
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(71, 173, 76)');
      jasmine.clock().uninstall();
      document.getElementById('check_on').click();
    });
  });
  describe('play game and clicking the the wrong button', function () {
    it('wrong button & check for the blink in digital counter', function () {
      document.getElementById('check_on').click();
      jasmine.clock().install();
      createString([0]);
      jasmine.clock().tick(1600);
      document.getElementById('simon2').onclick(document.getElementById('simon2'));
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('!!');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('');
      jasmine.clock().tick(200);
      expect(document.getElementById('count').innerHTML).toBe('!!');
      jasmine.clock().tick(1000);
      expect(document.getElementById('count').innerHTML).toBe('01');
      jasmine.clock().uninstall();
      document.getElementById('check_on').click();
    });
  });

  describe('checking the strict button', function () {
    it('Strict light turn on', function () {
      document.getElementById('check_on').click();
      document.getElementById('strict').click();
      expect(document.getElementById('light').style.backgroundColor).toBe('red');
    });
    it('Strict light turn off', function () {
      document.getElementById('strict').click();
      expect(document.getElementById('light').style.backgroundColor).toBe('rgb(71, 28, 28)');
      document.getElementById('check_on').click();
    });
  });
  describe('push button when game is switched off', function () {
    it('Strict button', function () {
      document.getElementById('strict').click();
      expect(document.getElementById('light').style.backgroundColor).toBe('rgb(71, 28, 28)');
    });
    it('Strict button', function () {
      // document.getElementById('check_on').click();
      document.getElementById('start').click();
      expect(document.getElementById('count').style.opacity).toBe('0.3');
      expect(document.getElementById('count').innerHTML).toBe('--');
    });
    it('Simon buttons', function () {
      expect(document.getElementById('simon0').disabled).toBe(true);
      expect(document.getElementById('simon1').disabled).toBe(true);
      expect(document.getElementById('simon2').disabled).toBe(true);
      expect(document.getElementById('simon3').disabled).toBe(true);
      document.getElementById('simon0').onclick(document.getElementById('simon0'));
      expect(document.getElementById('simon0').style.backgroundColor).toBe('rgb(71, 173, 76)');
      document.getElementById('simon1').onclick(document.getElementById('simon1'));
      expect(document.getElementById('simon1').style.backgroundColor).toBe('rgb(155, 20, 20)');
      document.getElementById('simon2').onclick(document.getElementById('simon2'));
      expect(document.getElementById('simon2').style.backgroundColor).toBe('rgb(214, 192, 32)');
      document.getElementById('simon3').onclick(document.getElementById('simon3'));
      expect(document.getElementById('simon3').style.backgroundColor).toBe('rgb(55, 96, 158)');
    });
  });
  describe('When count value is more than 20', function () {
    it('Strict button', function () {
      document.getElementById('check_on').click();
      jasmine.clock().install();
      createString([0, 1, 2, 3, 1, 3, 2, 1, 0, 0, 1, 2, 3, 1, 3, 2, 1, 0, 1, 2, 1]);
      jasmine.clock().tick(400);
      expect(document.getElementById('count').innerHTML).toBe('WON');
      jasmine.clock().uninstall();
      document.getElementById('check_on').click();
    });
  });
  describe('Play and loose game in strict mode', function () {
    it('switch on the game and strat play', function () {
      document.getElementById('check_on').click();
      document.getElementById('strict').click();
      console.log(myGame.strict_val);
      jasmine.clock().install();
      createString([0, 1, 0, 1, 2, 3, 1, 3, 2, 1, 0, 0]);
      jasmine.clock().tick(12600);
      expect(document.getElementById('count').innerHTML).toBe('12');
      document.getElementById('simon1').click();
      jasmine.clock().tick(1000);
      expect(document.getElementById('count').innerHTML).toBe('01');
      jasmine.clock().uninstall();
      document.getElementById('check_on').click();
    });
  });
  describe('Play game and enter only one correct button', function () {
    it('Two buttons will flash will click one button and end the game', function () {
      document.getElementById('check_on').click();
      jasmine.clock().install();
      createString([0, 1]);
      jasmine.clock().tick(2600);
      document.getElementById('simon0').click();
      jasmine.clock().tick(200);
      expect(myGame.counter).toBe(1);
      document.getElementById('check_on').click();
    });
  });
});
