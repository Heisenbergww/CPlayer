/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by juri on 2016/11/24.
	 */
	__webpack_require__(1);
	
	var GPlayer = function (option) {
	
	    var o = new Object();
	    //default config
	    o.defaultOption = {
	        name:'name',
	        musicList: [
	            {
	                title: 'あっちゅ～ま青春!',
	                author: '七森中☆ごらく部',
	                url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
	                pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
	            },
	            {
	                title: 'secret base~君がくれたもの~',
	                author: '茅野愛衣',
	                url: 'http://devtest.qiniudn.com/secret base~.mp3',
	                pic: 'http://devtest.qiniudn.com/secret base~.jpg'
	            },
	            {
	                title: '回レ！雪月花',
	                author: '小倉唯',
	                url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
	                pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
	            }
	        ]
	    };
	    o.defaultOption = option;
	    //define the play status
	    o.playStatus = ['play','pause','playing'];
	    var playStatus;
	
	    //get svg
	    o.svgPics = {
	        'play': ['0 0 16 31', 'M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z'],
	        'pause': ['0 0 17 32', 'M14.080 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048zM2.88 4.8q2.88 0 2.88 2.048v18.24q0 2.112-2.88 2.112t-2.88-2.112v-18.24q0-2.048 2.88-2.048z']
	    };
	
	    //get the music list
	    o.getMusic = function () {
	        var ml = option.musicList.length;
	        var music = 0;
	        for (var i = 0;i < ml; i++){
	        }
	        return [music,ml];
	    };
	    var musicIndex = o.getMusic()[0];
	    var musicListLength = o.getMusic()[1];
	
	    //set music
	    o.setMusic = function () {
	        var defaultSong = music;
	    };
	
	    //play and pause status and to get the song's index
	    var audio = document.createElement("audio");
	    audio.volume = 0.1;
	    o.getMusicInfo = function () {
	        var musicTitle = document.getElementsByClassName('music_title')[0].firstChild.firstChild;
	        var musicAuthor = document.getElementsByClassName('artist')[0].firstChild.firstChild;
	        audio.src = option.musicList[musicIndex].url;
	        musicTitle.innerHTML = option.musicList[musicIndex].title;
	        musicAuthor.innerHTML = option.musicList[musicIndex].author;
	        o.setTime();
	    };
	
	    //transfer time into second (thanks for APlayer)
	    o.secondToTime = function (second) {
	        var add0 = function (num) {
	            return num < 10 ? '0' + num : '' + num;
	        };
	        var min = parseInt(second / 60);
	        var sec = parseInt(second - min * 60);
	        var hours = parseInt(min / 60);
	        var minAdjust = parseInt((second / 60) - (60 * parseInt((second / 60) / 60)));
	        return second >= 3600 ? add0(hours) + ':' + add0(minAdjust) + ':' + add0(sec) : add0(min) + ':' + add0(sec);
	    };
	
	    //click to play
	    o.playStart = function () {
	        var playButton = document.getElementsByClassName('player_button')[0];
	        o.getMusicInfo();
	        playButton.addEventListener('click',function () {
	            audio.autoplay = true;
	            o.playOrPause();
	        });
	    };
	
	    //player's current time
	    var time = 0;
	    o.setTime = function () {
	        var musicTime = document.getElementsByClassName('song_time')[0].firstChild.firstChild;
	        var musicDuration = document.getElementsByClassName('song_time')[0].firstChild.lastChild;
	        var duration = audio.duration;
	        time = audio.currentTime;
	        musicDuration.innerHTML = o.secondToTime(duration);
	        musicTime.innerHTML = o.secondToTime(time);
	        processPencentage = (time / duration) * 100 + '%';
	
	    };
	
	    //play or pause
	    o.playOrPause = function () {
	        var playButton = document.getElementsByClassName('player_button')[0];
	        if(playButton.classList.contains('player_pause')){
	            o.ShowPlayButton();
	            playStatus = o.playStatus[0];
	            o.play(playStatus);
	        }else {
	            o.ShowPauseButton();
	            o.pause();
	        }
	    };
	
	    //set Interval
	    var playTimer1 = null;
	    var playTimer2 = null;
	
	    //play
	    o.play = function (p,i) {
	
	        if(p == o.playStatus[0]) {
	            clearInterval(playTimer2);
	            audio.currentTime = time;
	            audio.play();
	            playTimer1 = setInterval(function () {
	                o.setTime();
	                o.playBarDraw();
	                // console.log(o.secondToTime(audio.currentTime)+' play');
	            }, 100);
	        }else if(p == o.playStatus[2]){
	            clearInterval(playTimer1);
	            clearInterval(playTimer2);
	            if(i != 'inmouseove'){
	                playTimer2 = setInterval(function () {
	                    o.setTime();
	                    o.playBarDraw();
	                    // console.log(o.secondToTime(audio.currentTime)+' playing');
	                }, 100);
	            }
	        }
	
	    };
	
	
	    //pause
	    o.pause = function () {
	        console.log(o.secondToTime(time)+' pause time');
	        console.log(o.secondToTime(times)+' pause times');
	        // audio.currentTime = gct;
	        console.log(o.secondToTime(audio.currentTime)+' pause2');
	        audio.currentTime = time;
	        audio.pause();
	    };
	
	    //draw play bar
	    o.playBarDraw = function () {
	        var playBar = document.getElementsByClassName('play_bar_front')[0];
	        playBar.style.width = processPencentage;
	    };
	
	    //switch to play button
	    o.ShowPlayButton = function () {
	        var playButton = document.getElementsByClassName('player_button')[0];
	        playButton.classList.remove('player_pause');
	        playButton.classList.add('player_play');
	        playButton.firstChild.firstChild.setAttribute("viewBox",o.svgPics.pause[0]);
	        playButton.firstChild.firstChild.lastChild.setAttribute("d",o.svgPics.pause[1]);
	    };
	
	    //switch to pause button
	    o.ShowPauseButton = function () {
	        var playButton = document.getElementsByClassName('player_button')[0];
	        playButton.classList.remove('player_play');
	        playButton.classList.add('player_pause');
	        playButton.firstChild.firstChild.setAttribute("viewBox",o.svgPics.play[0]);
	        playButton.firstChild.firstChild.lastChild.setAttribute("d",o.svgPics.play[1]);
	    };
	
	    //play the pre song
	    o.playPre = function () {
	        var playPre = document.getElementsByClassName('pre_song')[0];
	        playPre.addEventListener('click',function () {
	            if(musicIndex > 0){
	                musicIndex -= 1;
	                o.getMusicInfo();
	                o.ShowPlayButton();
	                o.play();
	            }else{
	                alert('这首歌前面没有歌曲了！');
	            }
	        })
	    };
	
	    //play the next song
	    o.playNext = function () {
	        var playNext = document.getElementsByClassName('next_song')[0];
	        playNext.addEventListener('click',function () {
	            if(musicIndex < musicListLength - 1){
	                musicIndex += 1;
	                o.getMusicInfo();
	                o.ShowPlayButton();
	                o.play();
	            }else{
	                alert('这首歌后面没有歌曲了！');
	            }
	        })
	    };
	
	    //drag the play bar button
	    var times = 0;
	    o.dragPlayBarCtrl = function () {
	        var playBarCtrl = document.getElementsByClassName('play_bar_ctrl')[0];
	        var PlayBarBack = document.getElementsByClassName('play_bar_back')[0];
	        var PlayBarFront = document.getElementsByClassName('play_bar_front')[0];
	        playBarCtrl.addEventListener('mousedown',function(){
	            document.addEventListener('mousemove',function playBarMove(event) {
	                var musicTime = document.getElementsByClassName('song_time')[0].firstChild.firstChild;
	                var e = event || window.event;
	                var ll = e.clientX - o.getElementViewLeft(PlayBarBack);
	                if(0 <= ll&& ll<= 300 ){
	                    var inWhere = 'inmouseove';
	                    playStatus = o.playStatus['2'];
	                    o.play(playStatus,inWhere);
	                    PlayBarFront.style.width = (ll / 300)*100 + '%';
	                    times = (ll / 300) * audio.duration;
	                    musicTime.innerHTML = o.secondToTime(times);
	
	                }else if(ll < 0){
	                    PlayBarFront.style.width = 0;
	                }else{
	                    PlayBarFront.style.width = 1;
	                }
	
	                document.addEventListener('mouseup',function () {
	                    document.removeEventListener('mousemove',playBarMove);
	                    var musicDuration = document.getElementsByClassName('song_time')[0].firstChild.lastChild;
	                    if(audio.play){
	                        audio.currentTime = times;
	                        playStatus = o.playStatus['2'];
	                        o.play(playStatus);
	                        console.log(o.secondToTime(audio.currentTime)+' mousemove');
	                    }
	                });
	            });
	            // playBarCtrl.style.left = playBarCtrl.offsetLeft;
	        });
	    };
	
	    // get element's view position (thanks for Aplayer)
	    o.getElementViewLeft = function (element) {
	        var actualLeft = element.offsetLeft;
	        var current = element.offsetParent;
	        var elementScrollLeft;
	        while (current !== null) {
	            actualLeft += current.offsetLeft;
	            current = current.offsetParent;
	        }
	        elementScrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
	        return actualLeft - elementScrollLeft;
	    };
	
	    //add html to the web
	    o.generator = function(){
	        var _this=document.getElementById('G_player');
	        _this.innerHTML=
	            '<div class="player_pic">'+
	            '<div class="player_button player_pause">' +
	            '<div class="player_icon">' +
	            '<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="100%" version="1.1" viewBox="0 0 16 31" width="100%">'+
	            '<use xlink:href="#G_player"></use>' +
	            '<path class="G_player_fill" d="M15.552 15.168q0.448 0.32 0.448 0.832 0 0.448-0.448 0.768l-13.696 8.512q-0.768 0.512-1.312 0.192t-0.544-1.28v-16.448q0-0.96 0.544-1.28t1.312 0.192z" id="aplayer-play"></path>' +
	            '</svg>'+
	            '</div>'+
	            '</div>'+
	            '</div>'+
	            '<div class="player_container">' +
	            '<div class="player_music">' +
	            '<span class="music_title">' +
	            '<font>' +
	            '<font>Tell You Like</font>' +
	            '</font>' +
	            '</span>' +
	            '<span class="artist">' +
	            '<font>' +
	            '<font>Juny</font>' +
	            '</font>' +
	            '</span>' +
	            '</div>' +
	            '<div class="play_bar">' +
	            '<div class="play_bar_back">' +
	            '<div class="play_bar_front">' +
	            '<span class="play_bar_ctrl">' +
	            '</span>' +
	            '</div>' +
	            '</div>' +
	            '</div>' +
	            '<div class="songs_switch">' +
	            '<div class="pre_song">' +
	            '<svg xmlns:xlink="http://www.w3.org/1999/xlink" height="25" version="1.1" viewBox="5 950 100 100" width="25">' +
	            '<use xlink:href="#G_player">' +
	            '</use>' +
	            '<path class="G_player_fill" d="m 57.635123,985.21308 0,15.10682 15.03198,-15.03054 15.03199,-15.0305 0,32.01784 0,32.0179 -14.77776,-14.7763 c -8.12777,-8.1269 -14.86389,-14.6901 -14.96916,-14.5848 -0.10527,0.1053 -0.23201,6.7824 -0.28164,14.8381 -0.0496,8.0557 -0.14013,14.6467 -0.20111,14.6467 -0.0911,0 -23.51278,-18.1981 -37.76018,-29.3387 -1.9714,-1.5416 -3.5113,-2.869 -3.4219,-2.9499 0.3817,-0.3452 40.76522,-31.67462 41.04225,-31.84048 0.2431,-0.14553 0.30553,2.90384 0.30553,14.92386 z" style="fill:#694208;fill-opacity:1;stroke:#694208;stroke-width:0;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none">' +
	            '</path>' +
	            '</svg>' +
	            '</div>' +
	            '<div class="next_song">' +
	            '<svg xmlns:xlink="http://www.w3.org/1999/xlink"  version="1.1" viewBox="-5 0 100 100" width="25"  height="25">' +
	            '<path class="G_player_fill" d="m 46.347629,67.101886 0,-15.106772 -15.031987,15.030496 -15.031986,15.030495 0,-32.01785 0,-32.017851 14.777758,14.776244 c 8.127767,8.126935 14.863889,14.690112 14.969162,14.584839 0.105273,-0.105273 0.232009,-6.78242 0.281636,-14.838106 0.04963,-8.055687 0.140128,-14.646703 0.201109,-14.646703 0.09111,0 23.512808,18.198095 37.760134,29.338715 1.971454,1.541568 3.511316,2.868998 3.421916,2.949848 -0.38169,0.345181 -40.765185,31.674651 -41.042214,31.840504 -0.2431,0.145537 -0.305528,-2.903837 -0.305528,-14.923859 z"  style="fill:#694208;fill-opacity:1;stroke:#694208;stroke-width:0;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none" id="aplayer-play">' +
	            '</path>' +
	            '</svg>' +
	            '</div>' +
	            '<div class="song_time">' +
	            '<p><span class="current">00.00</span>/<span>04:36</span></p>' +
	            '</div>' +
	            '</div>' +
	            '</div>';
	    };
	
	    //call all the functions
	    o.init = function () {
	        o.getMusic();
	        o.generator();
	        o.getMusicInfo();
	        o.playNext();
	        o.playPre();
	        o.playStart();
	        o.setTime();
	        o.dragPlayBarCtrl();
	    };
	    return o;
	};
	
	
	//api
	var api = new GPlayer({
	    name:'jj',
	    musicList:[
	        {
	            title: 'あっちゅ～ま青春!',
	            author: '七森中☆ごらく部',
	            url: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.mp3',
	            pic: 'http://devtest.qiniudn.com/あっちゅ～ま青春!.jpg'
	        },
	        {
	            title: 'Preparation',
	            author: 'Hans Zimmer/Richard Harvey',
	            url: 'http://devtest.qiniudn.com/Preparation.mp3',
	            pic: 'http://devtest.qiniudn.com/Preparation.jpg'
	        },
	        {
	            title: '回レ！雪月花',
	            author: '小倉唯',
	            url: 'http://devtest.qiniudn.com/回レ！雪月花.mp3',
	            pic: 'http://devtest.qiniudn.com/回レ！雪月花.jpg'
	        }
	    ]
	});
	api.init();
	
	
	
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/less-loader/index.js!./demo.less", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/postcss-loader/index.js!./../../node_modules/less-loader/index.js!./demo.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "#G_player {\n  width: 450px;\n  height: 100px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 20px auto;\n}\n#G_player .player_pic {\n  width: 100px;\n  height: 100px;\n  float: left;\n  -webkit-border-top-left-radius: 5px;\n          border-top-left-radius: 5px;\n  -webkit-border-bottom-left-radius: 5px;\n          border-bottom-left-radius: 5px;\n  background: rgba(255, 182, 192, 0.88);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n}\n#G_player .player_pic .player_button {\n  width: 26px;\n  height: 26px;\n  border: 2px solid #fff;\n  bottom: 50%;\n  right: 50%;\n  margin: 0 -15px -15px 0;\n  position: absolute;\n  -webkit-border-radius: 14px;\n          border-radius: 14px;\n  outline: none;\n}\n#G_player .player_pic .player_button:focus {\n  outline: none;\n}\n#G_player .player_pic .player_button .player_icon {\n  -webkit-border-radius: 12px;\n          border-radius: 12px;\n  background-color: #fff;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  width: 26px;\n  height: 26px;\n  border-style: none;\n  cursor: pointer;\n}\n#G_player .player_pic .player_button .player_icon .G_player_fill {\n  fill: lightpink;\n}\n#G_player .player_container {\n  padding: 10px 10px 5px 10px;\n  position: relative;\n  width: 350px;\n  height: 100px;\n  float: left;\n  -webkit-border-top-right-radius: 5px;\n          border-top-right-radius: 5px;\n  -webkit-border-bottom-right-radius: 5px;\n          border-bottom-right-radius: 5px;\n  background: rgba(0, 188, 212, 0.65);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n#G_player .player_container .player_music .music_title {\n  font-size: 16px;\n  color: #fff;\n  margin-left: 20px;\n  margin-right: 10px;\n  font-weight: bold;\n}\n#G_player .player_container .player_music .artist {\n  font-size: 14px;\n  color: #6d4444;\n}\n#G_player .player_container .play_bar {\n  height: 20px;\n  padding-top: 15px;\n  width: 300px;\n  margin: 0 auto;\n}\n#G_player .player_container .play_bar .play_bar_back {\n  width: 100%;\n  height: 2px;\n  background: #e6d6d4;\n}\n#G_player .player_container .play_bar .play_bar_back .play_bar_front {\n  width: 0;\n  height: 2px;\n  background-color: #5ea254;\n  position: relative;\n}\n#G_player .player_container .play_bar .play_bar_back .play_bar_front .play_bar_ctrl {\n  display: block;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  top: -4px;\n  left: 100%;\n  background-color: #fff;\n  -webkit-border-radius: 5px;\n          border-radius: 5px;\n  -webkit-transform: translateY(5);\n      -ms-transform: translateY(5);\n          transform: translateY(5);\n  border: 1px solid #0c2a15;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n#G_player .player_container .play_bar .play_bar_back .play_bar_front .play_bar_ctrl:hover {\n  background-color: #8cc32a;\n  cursor: pointer;\n}\n#G_player .player_container .songs_switch {\n  display: inline-block;\n  bottom: 10px;\n}\n#G_player .player_container .songs_switch .pre_song {\n  float: left;\n  -webkit-border-radius: 12px;\n          border-radius: 12px;\n  background-color: #fff;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  width: 26px;\n  height: 26px;\n  border-style: none;\n  cursor: pointer;\n}\n#G_player .player_container .songs_switch .pre_song .G_player_fill {\n  fill: lightpink;\n}\n#G_player .player_container .songs_switch .next_song {\n  float: left;\n  margin-left: 10px;\n  -webkit-border-radius: 12px;\n          border-radius: 12px;\n  background-color: #fff;\n  -webkit-transition: all 0.5s ease;\n  transition: all 0.5s ease;\n  width: 26px;\n  height: 26px;\n  border-style: none;\n  cursor: pointer;\n}\n#G_player .player_container .songs_switch .next_song .G_player_fill {\n  fill: lightpink;\n}\n#G_player .player_container .songs_switch .song_time {\n  float: left;\n}\n#G_player .player_container .songs_switch .song_time p {\n  padding: 3px 0 0 13px;\n  margin: 0;\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=demo.output.js.map