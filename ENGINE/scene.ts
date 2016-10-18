/**
 * Created by YangSir on 2016/8/29.
 */
/*
* scene主要包含一个div以及一个canvas，div作为一个整个scene的容器，
* 而canvas则是作为一个整个场景显示使用
* 通常情况下，吧游戏显示的场景放在人、div容器中的最底层。
* 而其他对象例如游戏ui则放在游戏最顶层*/
import "./jquery";
import {ClassFactory} from "./ClassFactory";
import {_EventListener} from "./event";
export class scene{
    x: number;
    y: number;
    w: number;
    h: number;
    color: string;
    //场景容器
    holder: any;
    cvs: any;
    ctx: any;
    name: string;
    //保存所有监听器
    listeners:Array<any> = [];
    //保存所有的渲染对象
    rObjs:Array<any> = [];
    nameRObjs = {};
    constructor(arg: any){
        this.name = arg.name||"Unnamed";
        this.x = arg.x||0;
        this.y = arg.y||0;
        this.color = arg.color;
        this.w = arg.w||320;
        this.h = arg.h||200;
        this.holder = $("<div id='sc_"+this.name+"'style='position:absolute;overflow:hidden;left:0px;top:0px'> </div>");
        //绑定的canvas元素，以后的精灵都在这个canvas上进行绘制
        this.cvs = $("<canvas id='cv_"+this.name+"'style='z-index:-1;position:absolute;left:0px;top:0px'> </canvas>");
        this.ctx = this.cvs[0].getContext("2d");
        this.setPos();
        this.setSize();
        this.setColor(this.color);
        this.holder.append(this.cvs);
        this.holder.append(this.ctx);
        $(document.body).append(this.holder);

    }
    //创建渲染对象
    createRObj(className:string, arg:any){
        className = className||"RenderObj";
        var obj = ClassFactory.newInstance(className, arg);
        this.addRobj(obj);
        return  obj;
    }
    //添加对象
    addRobj(renderObj){
        renderObj.owner = this;
        this.rObjs.push(renderObj);
        this.nameRObjs[renderObj.name] = renderObj;
    }
    //删除对象
    removeRObj(renderObj){
        this.removeRObjByName(renderObj.name);
    }
    //根据名称删除对象
    removeRObjByName(name: string){
        if(this.nameRObjs[name]){
            this.nameRObjs[name].canRemove = true;
            //现在我们需要直接删除掉那个元素
            delete this.nameRObjs[name];
            for(var i = 0,len = this.rObjs.length; i<len; i++){
                if(this.rObjs[i].name === name){
                    this.rObjs.splice(i,1);
                    break;
                }
            }
        }
    }

    //删除所有可移除标记的渲染对象
    removeAllCanRemove(){
        for(let i=0,len=this.rObjs.length; i<len; i++){
            if(this.rObjs[i].canremove){
                delete this.nameRObjs[this.rObjs[i].name];
                this.rObjs.splice(i,1);
            }
        }
    }
    //根据名称查找对象
    getRObjByName(name:string){
        return this.nameRObjs[name];
    }
    //删除所有渲染对象
    clearRObj(){
        this.rObjs = [];
        this.nameRObjs = {};
    }
    //添加监听器
    addListener(ln:_EventListener){
        this.listeners.push(ln);
    }
    //删除监听器列表
    clearListener(){
        this.listeners.length = 0;
    }
    setPos(x?:number,y?:number):void{
        this.x = x||this.x;
        this.y = y||this.y;
        this.holder.css("left",this.x).css("top",this.y);
    }
    setSize(w?:number,y?:number):void{
        this.w = w||this.w;
        this.h = y||this.h;
        this.holder.css("width",this.w).css("height",this.h);
        this.cvs.attr("width",this.w).attr("height",this.h);//为什么是attr
    }
    setColor(color:string):void{
        this.color = color||this.color;
        this.holder.css("background-color",this.color);
    }
    update():void{
        // alert("scene.update,ok");
        //for循环更新所有精灵
        for(let i=0,len=this.rObjs.length; i<len; i++){
            if(this.rObjs[i]){
                this.rObjs[i].update();
            }
        }
    }
    render():void{
        //for循环渲染所有精灵,并不是
        var ltns = this.listeners;
        this.clear();//清除canvas
        //执行渲染前监听器
        for(var i=0,len=ltns.length; i<len; i++){
            ltns[i].enabled&&ltns[i].onBeforeRender(this);//为什么要传入this啊
        }
        this.renderRObj();
        for(var i=0,len=ltns.length; i<len; i++){
            ltns[i].enabled&&ltns[i].onAfterRender(this);//为什么要传入this啊
        }
    }
    //渲染所有对象
    renderRObj(){
        for(var i=0,len=this.rObjs.length; i<len; i++){
            this.ctx.save();
            this.rObjs[i].isVisible&&this.rObjs[i].render(this.ctx);
            this.ctx.restore();
        }
    }
    //清除背景
    clear():void{
        this.ctx.clearRect(0, 0, this.w, this.h);
    }
    //显示
    show():void{
        this.holder.show();
    }
    //隐藏
    hide():void{
        this.holder.hide();
    }
    fadeOut(time: any, fn: any){
        this.holder.fadeOut(time, fn);
    }
    fadeIn(time: number, fn: any):void{
        this.holder.fadeIn(time, fn);
    }
    //设置背景
    setBGImg(imgURL: string,pattern: number){
        this.holder.css("background-image", "url("+imgURL+")");
        switch(pattern) {
            case 0:
                this.holder.css("background-repeat", "no-repeat");
                this.holder.css("background-position", "center");
                break;
            case 1:
                this.holder.css("background-size", this.w+"px "+this.h+"px");
                break;
        }
    }
    //清除相关所有内容
    clean():void{
        this.cvs.remove();
        this.holder.remove();
        this.cvs = this.holder = this.ctx = null;
    }
}
