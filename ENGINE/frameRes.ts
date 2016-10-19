import {Animation} from "./Frame";
/**
 * Created by YangSir on 2016/9/23.
 * 专业根据配置json文件处理生成动画帧
 */
import {ResManager} from "./ResManager";
import {Res} from "./MarioRes/game";
import {Images} from "./Images";
import {Frame} from "./Frame";
var _resMan = new ResManager;
//var _resMan = Res;
var _imgRes = new Images;
export class frameRes{
    className = "frame";
    load(name: string, url: string, loadedFN?: any, selfThis?:any){
        //解析frameJSON格式配置文件
        function parse(animations: Animation, data: any){
            var fs: any;
            switch(data.type){
                case 0:
                    console.log(_imgRes,data);
                    var res = selfThis.getResByName(_imgRes.ClassName, data.img);   //
                    fs = new Frame("def", res.hEle);
                    fs.add({"x":0, "y":0, "w":res.hEle.width, "h": res.hEle.height});   //看了好几天小说，差点捡不起来了
                    animations.add("def", fs);
                    break;
                case 1:
                    var res = selfThis.getResByName("image", data.img);  //_imgRes.ClassName此处为images
                    if(res == null){
                        console.log("Load image for frames: "+data.img+" error !");
                        return ;
                    }
                    var r = data.rc[0];
                    var c = data.rc[1];
                    var w = data.rc[2];
                    var h = data.rc[3];
                    fs = data.animations;
                    //如果忽略则取全部
                    if(fs == null){
                        fs = new Frame("def", res.hEle);  // 这里就是之前的默认帧动画名称
                        for(var i = 0; i< r; i++){
                            for(let j = 0; j<c; j++){
                                fs.add({"x": j*w, "y":i*h, "w": w, "h": h});
                            }
                        }
                        animations.add("def", fs);
                    }else {
                        for( var fname in fs){
                            if(fs.hasOwnProperty(fname)){
                                var fss = fs[fname];
                                var fm = new Frame(fname, res.hEle);
                                for(let j = fss[0]; j<=fss[fss.length-1];j++){
                                    var fx = j%c;
                                    fx|= fx;
                                    var fy = j/c;
                                    fy|=fy;
                                    fm.add({"x":w*fx, "y":h*fy, "w":w, "h":h});
                                }
                                animations.add(fname, fm);
                            }
                        }
                    }
                    break;
            }
        }
        var obj = {"type":"frame", "name":name, "src":url, "frames":{}, "isLoaded":false};
        //加载动画资源

        ResUtil.loadFile(url, function(data){
            obj.isLoaded = true;
            for( var i in data){
                if(data.hasOwnProperty(i)){
                    var f = data[i];
                    obj.frames[i] = new Animation();
                    //解析动画资源
                    parse(obj.frames[i],f);
                }
            }
            loadedFN&&loadedFN();
        });
        return obj;   //这里忘记return了，果然状态不大好啊
    }
}
export class ResUtil{
    static  loadFile(url:string, loadFN:Function){
            var  self = this;
            var dt = "json";
            var obj = {
                url: url,
                type: "get",
                datatype: dt,
                success: function(data){
                    loadFN(data);
                },
                error: function(){
                    console.log(url+"error");
                }
            };
            $.ajax(obj);
        }
}
