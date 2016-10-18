/**
 *
 * Created by YangSir on 2016/10/9.
 */
import {Game} from "../app";
import {_appEventListener, event} from "../event";
import {ResManager} from "../ResManager";
import {Images} from "../Images";
import {frameRes} from "../frameRes";
import {ResUtil} from "../frameRes";

var Res = new ResManager();
Res.regResType("image", new Images());
Res.regResType("frame", new frameRes());

var g = new Game(false);
export class stickGame extends Game{
    //配置
    cfg = null;
    ball = null;
    //挡板对象
    stick = null;
    //游戏状态
    state = -1;
    constructor(){
        super(false);
        var scm = this.sceneManager;
        var x = (document.body.clientWidth-400)*0.5;
        var tSC = scm.createScene({"x":x,"w":400,"h":500,"name":"title"});
        var mSC = scm.createScene({"color":"gray","x":x,"w":400,"h":500,"name":"main"});
        var eSC = scm.createScene({"x":x,"w":400,"h":500,"name":"end"});
        this.initTSC(tSC);
        this.initMSC(mSC);
        this.initESC(eSC);
        this.initListener();
        this.showScene("title");
        this.loadRes();
        this.run(60);
    }
    initTSC(sc){
        //创建UI,创建加载进度条
        var pBar = $("<div id='pCBar' style='position:absolute;" +
            "border-radius:3px;border:2px solid yellow;" +
            "left:50px;top:245px;height:10px;width:300px;'></div>")
        pBar.append("<div id='pBar' style='position:absolute;" +
            "left:0px;top:0px;overflow:hidden;" +
            "background-color:#ff4b29;width:1px'></div>");
        sc.holder.append("<div id='pTxt' style='text-align:center;" +
            "position:absolute;font-size:26px;color:black;" +
            "height:40px;width:400px;top:210px;'>Loading...</div>");
        sc.holder.append(pBar);
    }
    initMSC(sc){
        //创建UI
        sc.holder.append("<div id='pLifeTxt' style='text-align:left;" +
            "position:absolute;font-size:26px;color:red;" +
            "height:40px;width:130px;left:10px'>Life:0</div>");
        sc.holder.append("<div id='pLevTxt' style='text-align:left;" +
            "position:absolute;font-size:26px;color:red;" +
            "height:40px;width:130px;left:150px'>Level:1</div>");
        sc.holder.append("<div id='pScTxt' style='text-align:left;" +
            "position:absolute;font-size:26px;color:red;" +
            "height:40px;width:130px;left:290px'>Score:000</div>");
    }
    initESC(eSC){
        //创建UI
        var sc = eSC;
        sc.holder.append("<div id='pEndTxt' style='text-align:center;fonct-size:35" +
            "position:absolute;border-radius:3px;color:blue;left:50px;top: 245px;" +
            "height:10px;width:300px;'>GOOD GAME</div>")
    }
    //初始化监听器
    initListener(){
        var self = this;
        //增加监听器
        var ltn = new _appEventListener({
            enabled:true,
            onAfterRender:function(){
                if(self.cfg.blockNum == 0){
                    if(self.cfg.maxLev == self.cfg.level){
                        self.showSuccess();
                    }else{
                        self.cfg.level++;
                        self.loadLevel();
                    }
                }
                self.updateUI();
            },
            onBeforeRender:function(){
                return ;
            }
        });
        this.addListener(ltn);
    }
    //复位游戏
    resetGame(){
        this.resetBall();
        this.state = 0;
    }
    //重置球的位置
    resetBall(){
        this.ball.moveTo(this.stick.x, this.stick.y - (this.stick.h+this.ball.h)*0.5+1);
        //this.ball.dx = this.ball.dy = 0;
    }
    //展示对应场景
    showScene(name){
        var sc = this.sceneManager.getScene(name);
        this.sceneManager.bringToTop(sc);
    }
    //处理触发的事件
    fireEvent(e:event){
        e.exec();
    }
    //
    //开始游戏
    launchBall(){
        this.ball.dx = 5;
        this.ball.dy = -5;
        this.state = 1;
    }
    //处理碰撞事件
    doStickCollide(){
        this.ball.dy = -this.ball.dy;
        //新的变化没有规划
    }
    //处理碰撞事件
    doBlockCollide(sender){
        this.ball.dy = -this.ball.dy;
        //此处sender代表当前砖块
        var sc = sender.owner;
        if(sender.canRelease()){
            sc.removeRObj(sender);
            --this.cfg.blockNum;
        }else{
            sender.updateAnim();
        }
    }
    //处理丢球事件
    doLose(){
        --this.cfg.life;
        this.resetGame();
    }
    //加载资源
    loadRes(){
        var self = this;
        var scm = this.sceneManager;
        var sc = scm.getScene("main");
        Res.loadRes("res.json",function(){
            //注意所有地方的加载最后都是通过这个函数使用jquery的ajax请求加载的。
                ResUtil.loadFile("gamecfg.json", function(data){
                    self.cfg = data;
                    self.showMain();
                });
            },
            function(total,cur){
                var pro = (cur/total)*100|0;
                $("#pTxt").text("Loading:"+pro+"%");
                $("#pBar").width(pro*3);
            });
    }
    //成功了
    showSuccess(){
        this.showScene("end");
    }
    //
    showMain(){
        this.loadCfg();
        this.showScene("main");
    }
    //从配置加载游戏
    loadCfg(){
        var self = this,
            sc = this.sceneManager.getScene("main");
        function createStick(sc)
        {
            var cfg = self.cfg.stick;
            var st = sc.createRObj("stick",{w:"",h:"",self:self});
            st.w = cfg.w;
            st.h = cfg.h;
            var mx = sc.w*0.5;
            st.moveTo(mx,sc.h-30);
            var anims = Res.getAnimationsByName(cfg.resName,cfg.fName);
            st.setAnims(anims);
            self.stick = st;
        }
        function createBall(sc)
        {
            var cfg = self.cfg.ball;
            var ball =  sc.createRObj("ball",{self:self,r:cfg.r});
            self.ball = ball;
            var anims = Res.getAnimationsByName(cfg.resName,cfg.fName);
            ball.setAnims(anims);
            ball.moveTo(self.stick.x,self.stick.y-(self.stick.h+self.ball.h)*0.5-1);
        }
        createStick(sc);
        createBall(sc);
        this.loadLevel();
    }
    //更新生命
    updateLife(){
        $("#pLifeTxt").text("Life:"+this.cfg.life);
    }
    //加载关卡
    loadLevel(){
        var lev = this.cfg.level;
        var cfg = this.cfg["lev"+lev];
        var bcfg = this.cfg.block;
        //下面是加载关卡中单加载砖块，应该另外写成函数
        var self = this;
        var sc = this.sceneManager.getScene("main");
        var anims = Res.getAnimationsByName(bcfg.resName,bcfg.fName);
        var bOffy = 60;
        for(var i = 0, len1 = cfg.length; i<cfg.length; i++){
            for(var j = 0, len2 = cfg[i].length; j<len2; j++){
                var bData = cfg[i][j];
                if(bData>0){
                    var bk = sc.createRObj("block",self);
                    bk.setAnims(anims,"s"+bData);  //这里是因为砖有不同的强度
                    bk.lev = bData;
                    bk.w = bcfg.w;
                    bk.h = bcfg.h;
                    bk.moveTo(bcfg.w*j+(bk.w*0.5),i*bcfg.h+bOffy);
                    self.cfg.blockNum++;
                }
            }
        }
        this.resetGame();
    }
    //更新分数
    updateScore(){
        $("#pScTxt").text("Score"+this.cfg.score);
    }
    //更新关卡
    updateLevel(){

    }
    //更新UI场景
    updateUI(){
        this.updateLife();
        this.updateScore();
        this.updateLevel();
    }
}
var baseBall = new stickGame();

