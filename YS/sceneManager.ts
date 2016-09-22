/**
 * Created by YangSir on 2016/8/30.
 */
/*
* 这个类是用来管理场景类的，由它去创建场景，销毁以及切换*/
import {scene} from "./scene";
export class sceneManager{
    namedScenes = {};
    scenes = [];
    createScene(args:any){
        let sc = null;
        sc = new scene(args);
        this.push(sc);
        return sc;
    }
    //场景重新排序
    sortSceneIdx():void{
        for(let i=0,len = this.scenes.length; i < len; i++){
            let sc = this.scenes[i];
            sc.holder.css("z-index", i);//是对场景的显示分层排序
        }
    }
    push(scene: scene):void{
        if(!this.getScene(scene.name)){
            this.scenes.push(scene);
            this.namedScenes[scene.name] = scene;
        }
    }
    pop():void{
        let sc = this.scenes.pop();
        if(sc!=null){
            sc.clean();
            delete this.namedScenes[sc.name];
        }
    }
    //删除场景
    remove():void{
        let sc = this.getScene(name);
        if(sc!=null){
            sc.clean();
            delete this.namedScenes[name];
            // ArrayUtil.removeFn(this.scenes, function(s){
            //     return s.name === name;
            // });
            this.sortSceneIdx();
        }
    }
    //交换场景位置
    swap(from:number, to:number){
        if(from>=0&&from<=this.scenes.length-1&&to>=0&&to<=this.scenes.length-1){
             let sc = this.scenes[from];
            this.scenes[from] = this.scenes[to];
            this.scenes[to] = sc;
            this.sortSceneIdx();
        }
    }
    //获取某个场景的索引
    getIdx(scene:scene):number{
        return scene.holder.css("z-index");
    }
    //把某个场景移动到最顶部
    bringToTop(scene:scene){
        let idx = this.getIdx(scene);
        if(idx != this.scenes.length-1){
            this.scenes.splice(idx, 1);   //删除，替换，插入
            this.scenes[this.scenes.length] = scene;
            this.sortSceneIdx();
        }
    }
    //把某个场景移动到最底部
    bringToLast(scene:scene){
        let idx = this.getIdx(scene);
        if(idx != 0){
            this.scenes.splice(idx, 1);
            this.scenes.splice(0, 0, scene);
            this.sortSceneIdx();
        }
    }
    //场景后移
    back(scene:scene):void{
        let idx = this.getIdx(scene);
        if(idx>0){
            this.swap(idx, idx-1);
        }
    }
    //场景前移
    forward(scene:scene){
        let idx = this.getIdx(scene);
        if(idx<this.scenes.length){
            this.swap(idx, idx+1);
        }
    }
    //根据名称获取场景
    getScene(name: string):scene{
        return this.namedScenes[name];
    }
    //获取当前场景（顶部场景）
    getCurrentScene():scene{
        return this.scenes[this.scenes.length-1];
    }
    //清除所有场景
    clearAll(){
        for(let i in this.scenes){
            this.scenes[i].clean();
        }
        this.namedScenes = {};
        this.scenes = [];
    }
}
