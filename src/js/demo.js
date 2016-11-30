/**
 * Created by juri on 2016/11/24.
 */
require('../less/demo.less');

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




