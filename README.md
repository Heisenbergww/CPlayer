# CPlayer

> A colorful html5 music player

## Introduction

Demo

Screenshot

![image](https://raw.githubusercontent.com/Heisenbergww/CPlayer/master/src/img/CPlayer.png)

## Usage

### HTML

```HTML
<div id="G_player"></div>
<!-- ... -->
<script src="../dist/js/demo.output.js"></script>
```

### JS

```JS
var api = new GPlayer({
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
```

>The project is proceeding,now it could just add music list and do some simple paly thing.You could drap the playbar to change the current play time.More function would be added,as well as fixes the bugs.
