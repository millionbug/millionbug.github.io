import {frameRes} from "./frameRes";
/**
 * Created by YangSir on 2016/9/23.
 */
export class ResManager{
    //存储所有定义的资源类型
    defTypes = {};
    //存贮所有资源
    res = {};
    //注册资源类型
    regResType(type: any, clz: any){
        if(this.defTypes[type]===undefined){
            this.defTypes[type] = {"type":type, "class":clz};
        }
    }
    //根据类型获取资源类
    getClass(type: any){
        var res = this.defTypes[type]["class"];
        return res;
    }
    //加载资源类
    load(type, name, src, loadedFN){  //这个的类型
        var self = this;
        var res = this.getClass(type).load(name, src, loadedFN,self);
        this.addRes(res);
        return res;
    }
    //添加资源
    addRes(resObj){
        console.log(resObj);
        this.res[resObj.type] = this.res[resObj.type]||{};
        this.res[resObj.type][resObj.name]  = resObj;
    }
    //删除指定资源
    removeRes(resObj){
        var t = resObj.type,
            n = resObj.name;
        delete this.res[t][n];
        if(function(obj){
                for(var i in obj){
                    return false;   //如果不是空则返回false
                }
                return true;   //为空则删除掉这个隶属于的属性
            }(this.res[t]))       //这里面本来是一个函数
        {
            delete this.res[t];
        }
    }
    //清除所有元素
    clearRes(){
        this.res = {};
    }
    //根据名称获取资源
    getResByName(type:string, name:string){
        return this.res[type][name];       //好像存储的时候有必要做这么多的
    }
    //获取帧动画对象
    getAnimationsByName(fResName:any, fName:string){  //这里fResName好像不是string
        var obj =  this.res["frame"][fResName];
        var fm = obj.frames[fName];
        return fm;
    }
    //加载资源，url制定资源配置文件
    loadRes(url:string, loadedFN:Function, perLoadedFN?:Function){
        var  self = this;
        var dt = "json";
        var obj = {
            url: url,
            type: "post",
            dataType: dt,
            success: function(data){
                console.log(data);
                self.parseRes(data, loadedFN, perLoadedFN);
            },
            error: function(){
                console.log(url+"error");
            }
        };
        $.ajax(obj);
    }
    //解析资源
    parseRes(res, loadedFN, perLoadedFN){
        var resCount = 0;
        var totalCount = 0;
        var resType = [];
        this.res = [];
        for(var i in res){
            if(res.hasOwnProperty(i)){
                resType.push(i);
                totalCount += res[i].length;
            }
        }
        var cResTIdx = 0;
        var cRes = resType[cResTIdx];
        var cResCount = 0;
        var loadObj = null;
        var self = this;
        var loadHand = window.setInterval(function(){
            if(loadObj == null){
                loadObj = self.load(cRes, res[cRes][cResCount].name,
                                    res[cRes][cResCount].src, null);
            }else{
                if(loadObj.isLoaded){
                    resCount++;
                    cResCount++;
                    perLoadedFN&&perLoadedFN(totalCount, resCount);
                    if(resCount == totalCount){
                        window.clearInterval(loadHand);
                        loadedFN&&loadedFN(loadedFN);
                        return ;
                    }
                    if(cResCount>=res[cRes].length){
                        cResTIdx++;
                        cRes = resType[cResTIdx];
                        cResCount = 0;
                    }
                    loadObj = self.load(cRes, res[cRes][cResCount].name, res[cRes][cResCount].src, null);
                }
            }
        });
    }
}

