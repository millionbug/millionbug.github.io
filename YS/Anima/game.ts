/**
 * Created by YangSir on 2016/9/16.
 */
import {FrameState} from "../FrameState";
import {Frame} from "../Frame";
import {frameCtrl} from "../Frame";
import {Animation} from "../Frame";
//定义动画
var anims = new Animation();
//帧控制器
var fCtrl = null;
//时钟句柄
var tHand = null;
function initAnim(){
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
    anims.add("run", runFrame);
    anims.add("crouch",crouchFrame);
    anims.add("jump", jumpFrame);
    fCtrl = new frameCtrl();
    fCtrl.setAnims(anims, "run");
}
initAnim();
//开始动画，这里是用add方法是因为此处声明的函数无法绑定到节点上，因为不属于window(TS)的锅
var btnS = document.getElementById("btnStart");
btnS.addEventListener("click",start);
function start(e){
    var cv = document.getElementById("mycanvas");
    var ctx = cv.getContext("2d");
    if(btnS.value==="开始"){
        FrameState.start();//开启帧数追踪
        //更新帧状态
        tHand = setInterval(function(){
            FrameState.update();
            var f = fCtrl.getNextFrame();
            ctx.clearRect(0,0,64,64);
            //绘制帧
            ctx.drawImage(f.img,f.x,f.y,f.w,f.h,0,0,64,64);
        },20);
        btnS.value = "停止";
    }else{
        btnS.value="开始";
        clearInterval(tHand);
    }
}
//改变速度
var sp = document.getElementById("sp");
sp.addEventListener("click",changeSpeed);
function changeSpeed(e){
    //console.log(this.value);//这里的this表示当前点击的对象
    fCtrl.speed = this.value;
}
//修改当前动画
var changeA = document.getElementById("changeAnimation");
changeA.addEventListener("click",changeAnimation);
function changeAnimation(e){
   fCtrl.setCurrent(this.value);
}
