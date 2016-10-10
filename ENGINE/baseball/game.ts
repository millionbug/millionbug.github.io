/**
 *
 * Created by YangSir on 2016/10/9.
 */
import {Game} from "../app";
import {_appEventListener} from "../event";
import {ResManager} from "../ResManager";
import {Images} from "../Images";
import {frameRes} from "../frameRes";
import {ResUtil} from "../ResManager";

var Res = new ResManager();
Res.regResType("images", new Images());
Res.regResType("frame", new frameRes());

var g = new Game(false);
class stickGame extends Game{
    cfg = null;
    ball = null;
    stick = null;
    state = -1;
    constructor(){
        super(false);
        var scm = this.sceneManager;
        var x = (document.body.clientWidth-400)*0.5;
        var tSC = scm.createScene([{"x":x,"w":400,"h":500,"name":"title"}]);
        var mSC = scm.createScene([{"color":"gray","x":x,"w":400,"h":500,"name":"main"}]);
        var eSC = scm.createScene([{"x":x,"w":400,"h":500,"name":"end"}]);
        this.initTSC(tSC);
        this.initMSC(mSC);
        this.initESC(eSC);
        this.initListener();
        this.showScene("title");
        //¼ÓÔØ×ÊÔ´
        this.loadRes();
        this.run(60);
    }
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
    //
    showMain(){
        this.loadCfg();
        this.showScene("main");
    }
    //
    loadCfg(){
        var self = this,
            sc = this.sceneManager.getScene("main");
        function createStick(sc)
        {
            var cfg = self.cfg.stick;
            var st = sc.createRObj("stick",["stick"]);
            st.w = cfg.w;
            st.h = cfg.h;
            var mx = sc.w*0.5;
            st.moveTo(mx,sc.h-30);
            var anims = ResManager.getAnimationsByName(cfg.resName,cfg.fName);
            st.setAnims(anims);
            self.stick = st;
        }
        function createBall(sc)
        {
            var cfg = self.cfg.ball;
            var ball =  sc.createRObj("ball",["ball",cfg.r]);
            self.ball = ball;
            var anims = ResManager.getAnimationsByName(cfg.resName,cfg.fName);
            ball.setAnims(anims);
        }
        createStick(sc);
        createBall(sc);
        this.loadLevel();
    }
    //展示对应场景
    showScene(name){
        var sc = this.sceneManager.getScene(name);
        this.sceneManager.bringToTop(sc);
    }
    initTSC(sc){
    //创建UI,创建加载进度条
        var pBar = $("<div id='pCBar' style='position:absolute;" +
            "border-radius:3px;border:2px;solid;yellow;" +
            "left:50px;top:245px;height:10px;width:300px;'></div>")
        pBar.append("<div id='pBar' style='position:absolute;" +
            "left:0px;top:0px;overflow:hidden;" +
            "background-color:#ff4b29;width:1px'></div>");
        sc.holder.append("<div id='pBar' style='text-align:center;" +
            "position:absolute;font-size:26px;color:white;" +
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
    initEsc(eSC){
        //创建UI
        var sc = eSC;
        sc.holder.append("<div id='pEndTxt' style='text-align:center;fonct-size:35" +
            "position:absolute;border-radius:3px;color:white;left:50px;top: 245px;" +
            "height:10px;width:300px;'>GOOD GAME</div>")
    }
    //初始化监听器
    initListener(){
        var self = this;
        //增加监听器
        var ltn = new _appEventListener({
            enabled:true,
            onAfterRender:function(){
                self.updateUI();
                return ;
            },
            onBeforeRender:function(){
                return ;
            }
        });
        this.addListener(ltn);
    }
}


