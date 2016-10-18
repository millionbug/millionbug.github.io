/**
 * Created by YangSir on 2016/10/6.
 */
import  {Game} from "../app";
import {ResManager} from "../ResManager";
import {ClassFactory} from "../ClassFactory";
import {Images} from "../Images";
import {frameRes} from "../frameRes";
import {Sprite} from "../Sprite";
export class Mario extends Sprite{
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
export var Res = new ResManager();
Res.regResType("images", new Images());
Res.regResType("frame", new frameRes());

function  initGame(){
  //获取场景管理器
    var scm = g.sceneManager;
    //创建场景
    var sc = g.sceneManager.createScene({"w":400, "h": 400});
    loadRes(sc);
}
//加载资源
function loadRes(scene){
    Res.loadRes("res.json", function(data){
        //创建精灵
        initRenderObj(scene);
        //开始飞奔
        g.run(20);
    });
}
//初始化创建精灵
function initRenderObj(sc){
    //创建30个mario
    for(var i = 0; i<30; i++){
        var mr = sc.createRObj("Mario", "mr");
        //设置随机位置
        mr.moveTo(Math.floor(Math.random()*500),Math.floor(Math.random()*500));
        //设置随机速度
        mr.dx = Math.floor((Math.random()+1)*3) - 1;
        mr.setAnimSpeed(2*Math.random());
        mr.w = mr.h = 64;
        //获取Mario动画序列资源
        var anims = Res.getAnimationsByName("sprite","mario");
        mr.setAnims(anims, "run");
    }
}
//初始化游戏
initGame();