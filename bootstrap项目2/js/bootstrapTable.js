//将文件引入项目中，传入url或者html文件中的<table data-url='' id="table"></table>中配置url就好了
//ajax的httpxmlrequest对象我没有实现，212，194， 145插入需要的ajax方法，向后台通知，增加，删除，与修改数据。
(function($){
	
var defaultOptions = {
	method: "get",
	toolbar: "#toolbar", //工具按钮用哪一个容器
	stript: "stript", //是否显示行间隔色
	cache: "false", //是否缓存
	pagination: "true", //是否显示分页
	sortable: "false", //是否显示排序
	pageNumber: 1,
	pageSize: 10,
	pageList: [10, 15, 20, 30], //可供选择的每页的行数
	search: true, //服务端搜索
	strictSearch: true,
	showColumns: true, //是否显示所有的列
	showRefresh: true, //是否显示刷新按钮
	minimumCountColumns: 2, //最少显示的列
	clickToSelect: true, //是否启用点击选中行
	height: 500, //表格高度
	uniqueID: "ID", //每一行的唯一标识
	showToggle: true, //是否显示详细视图与列表视图的切换按钮
	cardView: false, //是否显示详细列表
	detailView: false, //是否显示父子表  （应该么有用到吧，如果用到了，我就再研究一下
	columns: [],
	responseHandler: function(res) {
		return res.rows;   //这里要求json数据一定是要数组，如果不是可以在这里处理后返回给当前页面进行调用
	},
	onClickRow: function(item, $element) {
		return false;
	},
	onLoadSuccess: function(data){
		//alert(data);
		//return false;
	}
};


function bootTableInit(options){
    var op = $.extend({},defaultOptions,options);
	if(op.columns.length!=0){
		tableInit(op);
	}else{
		//先请求一次数据，利用json初始化columns
		var xml = new XMLHttpRequest();
		xml.onreadystatechange = function(){
			if(xml.readyState == 4&& xml.status == 200){
				var rowsColumn = JSON.parse(xml.responseText).rows[0];
                var param = $("<div></div>");
                op.columns.push({checkbox:true});   //首先添加一个勾选框，不然无法选中删除数据
				for(var key in rowsColumn){
					console.log(key);
					op.columns.push({    //这一个是配置columns的
						field: key,
						title: "Item "+key,
						align: "center",
						valign: "bottom",
						sortable: true,
						checkbox: false
					});
                    //这是配置工具栏的modal
                    mkmodal(key, param);
                }
                toolbarInit(param);//这里toolbarinit要放在后面了，因为里面增加的条目也要根据json数据来确定
                tableInit(op); //对不起刚才我真的没找到这么简单的错误//但是又出了一个错误我靠真的难找不到
            }
		}
		console.log(op.url);
		xml.open("get",op.url,false);   //false为定义同步请求
		xml.send(null);
	}
}
function mkmodal(key, param){
    var str = "<div class='form-group'><lable class='control-label'><h4>"+key+"</h4></lable> <input type='text' class='form-control' name='"+key+"' /> </div>"
    //$("body").append($(str));
    str = $(str)[0];
    param.append(str);
}


function toolbarInit(param){
	//创建工具栏并且插入body，供后面的table使用
	var $toolbar =$(["<div id='toolbar' class='btn-group' style='display:inline-block'>",
						"<button id='btn_add' type='button' class='btn btn-default' data-target='#myModal' data-toggle='modal'>",
							"<span class='glyphicon glyphicon-plus' aria-hidden='true'></span>新增",
						"</button>",
						"<button id='btn_edit' type='button' class='btn btn-default' data-toggle='popover' title='修改' data-container='body' data-placement='bottom' data-content='请先选择将要修改的行'>",
							"<span class='glyphicon glyphicon-pencil' aria-hidden='true'></span>修改",
						"</button>",
						"<button id='btn_delete' type='button' class='btn btn-default' title='删除' data-toggle='popover' data-cntainer='body' data-placement='bottom' data-content='请先选择将要删除的行'>",
							" <span class='glyphicon glyphicon-remove' aria-hidden='true'></span>删除",
						"</button>"
					].join(""));
	$toolbar.insertBefore($("#table"));
	//创建工具栏对应的modal
	var $modal = $([
		"<div class='modal fade' id='example' tabindex='-1' role='dialog'>",
			"<div class='modal-dialog'>",
				"<div class='modal-content'>",
					"<div class='modal-header'>",
						"<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>",
						"<h3 class='modal-title'>新增数据</h4>",
					"</div>",
					"<div class='modal-body'>",
						"<form id='modalform' aciton='javascript:void(0)'>",

						"</form>",
					"</div>",
					"<div class='modal-footer'>",
						"<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>",
						"<button type='button' class='btn btn-primary' id='subbmit'>Add Add</button>",
					"</div>",
				"</div>",
			"</div>",
		"</div>"
	].join(""));
	$modal.insertBefore($("#table"));
    if(param){
        param = param[0];
        $("#modalform").append(param);
        console.log($("#modalform"),$modal);
    }else{
        console.log("meiyou param");
        return ;
    }
	//对工具栏添加点击事件
    //添加
	var $addBotton = $("#btn_add");
	$addBotton.click(function(e) {
	    var target = e.target;
		$("#subbmit")[0].innerText = target.innerText;
		$("#subbmit")[0].name = target.id;
		$("#example").modal("show");
		$("button[name=btn_add]").one("click",function(){  //此处必须用one否则会重复绑定
			var datas = [];
			var input = $("form input[type=text]");
			var inputlen = input.length;
            var data = {};
            for(var i=0; i<input.length; i++){
                var inputid = input[i].name;
                eval("data."+inputid+" = input["+i+"].value");
            }
			datas.push(data);
			//本地刷新
            //这里的datas是一个添加的数据的数组格式为
            //datas:[{id:1, name:2, age:3}]形式
            //此处可以添加ajax事件
			$("#table").bootstrapTable("append",datas);
			$("#table").bootstrapTable("scrollTo","bottom");
			$("#example").modal("hide");
		});
	});


    //编辑
	var $editButton = $("#btn_edit");
	$editButton.click(function(e){
        var data = $("#table").bootstrapTable("getSelections");
        if(data.length===0){
            $editButton.popover("show");
            setTimeout(function(){
                $editButton.popover("hide");
            },1000);
            return;
        }
        var target = e.target;
		$("#subbmit")[0].innerText = target.innerText;
		$("#subbmit")[0].name = target.id;
        console.log(data);
		var inputs = $("#example input");
		for(var i=0,len=data.length; i<len; i++){
			var j = 0;
			for(var key in data[i]){
				if(key==0)continue;
				console.log(data[i][key]);
				inputs[j].value = data[i][key];
				j++;
				if(j>2)break;
			}
		}
		$("#example").modal("show");
		$("button[name=btn_edit]").one("click",function(e){
			var input = $("form input[type=text]");
			var newData = {};
            for(var i=0; i<input.length; i++){
                var inputid = input[i].name;
                eval("newData."+inputid+" = input["+i+"].value");
            }
			$("#table").bootstrapTable("updateRow",{
				index: data[0].id,
				row: newData
			});
            //此处newData是对象，可以插入ajax方法
			$("#example").modal("hide");
		});
	});
    //删除
    var $delete = $("#btn_delete");
    $delete.click(function() {
		var $table = $("#table");
		var ids = $.map($table.bootstrapTable('getSelections'), function(row) {
			return row.id;
		});
        if(ids.length===0){
            $delete.popover("show");
            setTimeout(function(){
                $delete.popover("hide");
            },1000);
            return;
        }
        //field是删除的索引，values索引的值
        //插入ajax方法
		$table.bootstrapTable("remove", {
			field: "id",
			values: ids
		});
	});
}


function tableInit(options){
	if(options){
		console.log(options.columns);
		$("#table").bootstrapTable(options);
		
	}else{
	    console.log("为什么没有options");
    }
}

bootTableInit(
    {
        url:"./data2.json"   //这里是函数入口，只需要配置url
        //也可以配置其他信息覆盖掉我设置的默认
    }


	);

})(jQuery)