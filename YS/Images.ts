/**
 * Created by YangSir on 2016/9/23.
 * 这是管控图片文件加载的对象
 * 使用方法
 * var obj = {"name":"mario", "src":"./images/mario.png"}
 * var mario = new Images().load(obj.name, obj.url, function(){});
 */

export class Images{
    ClassName = "image";
    load(name: string, url: string, loadedFN: Function, selfThis?:any){
        var img = new Image();
        img.src = url;
        var obj = {"type": "image", "name": name, "hEle": img, "src": url, "isLoaded": false}
        img.onload = function(){
            obj.isLoaded = true;
            loadedFN&&loadedFN();
        }
        return obj;
    }
}
