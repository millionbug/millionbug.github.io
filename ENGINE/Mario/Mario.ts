/**
 * Created by YangSir on 2016/9/21.
 */
import {ClassFactory} from "../ClassFactory";
import {Sprite} from "../Sprite";
import {Game} from "../app";
import {Frame} from "../Frame";
class Mario extends Sprite{
    update(){
        var w = this.owner.w;
        let h = this.owner.h;
        if(this.x<20||this.x>w-20){
            this.dx = -this.dx;
            this.isXFlip = (this.dx<0);
        }
        super.update();
    }
}
ClassFactory.regClass("Mario", Mario);
var g = new Game(false);
//初始化游戏
function initGame(){
    //获取场景管理器
    var scm = g.sceneManager;
    //创建场景
    var sc = scm.createScene({"w":640, "h":400});
    initRenderObj(sc);
}
//初始化创建精灵
function initRenderObj(sc){
    //设置跑步动画
    var runFrame = new Frame("run", document.getElementById("mr"));
    var crouchFrame = new Frame("crouch", document.getElementById("mr"));
    var jumpFrame = new Frame("jump", document.getElementById("mr"));
    //添加跑步帧
    for(var i=0; i<3; i++){
        runFrame.add({x:32*i, y:0, w:32, h:32});
    }
    //添加跳跃帧
    jumpFrame.add({x:0, y:0, w:32, h:32});
    jumpFrame.add({x:32*6, y:0, w:32, h:32});
    //添加蹲下帧
    crouchFrame.add({x:0, y:0, w:32, h:32});
    crouchFrame.add({x:32*14, y:0, w:32, h:32});
    //创建动画集合
    var anims = ClassFactory.newInstance("Animation",{});
    anims.add("run", runFrame);
    anims.add("crouch",crouchFrame);
    anims.add("jump", jumpFrame);
    //创建30个mario
    for(var i = 0; i<30; i++){
        var mr = sc.createRObj("Mario","mr");
        //设置随机位置
        mr.moveTo(parseInt(Math.random()*400),parseInt(Math.random()*400));
        //设置随机速度为0~3
        mr.dx = parseInt(Math.random()*3+1);
        mr.setAnimSpeed(2*Math.random());
        mr.w = mr.h = 64;
        mr.setAnims(anims, "run");
    }
}
initGame();
g.run(-1);