/**
 * 
 * @author jinghai.xiao@gmail.com
 * @version 0.0.1
 * depands : XMLHttpRequest.js
 */
JS.ns("JS.AJAX");

JS.AJAX = (function(){
	var xhr = new JS.XMLHttpRequest();
	return {
		dataFormatError : '服务器返回的数据格式有误',
		urlError : '未指定url',
		post : function(url,param,callback,scope,asyn){
			if(typeof url!=='string'){
				throw new Error(this.urlError);
			}
			//默认为异步请求
			var asynchronous = true;
			if(asyn===false){
				asynchronous = false;
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4 && asynchronous){
					JS.callBack(callback,scope,[xhr]);
				}
			}
			xhr.open('POST', url, asynchronous);
			xhr.send(param || null);
			if(!asynchronous){
				JS.callBack(callback,scope,[xhr]);
			}
			
		},
		get : function(url,param,callback,scope,asyn){
			if(typeof url!=='string'){
				throw new Error(this.urlError);
			}
			//默认为异步请求
			var asynchronous = true;
			if(asyn===false){
				asynchronous = false;
			}
			xhr.onreadystatechange = function(){
				if(xhr.readyState==4 && asynchronous){
					JS.callBack(callback,scope,[xhr]);
				}
			}
			xhr.open('GET', url, asynchronous);
			xhr.send(param || null);
			if(!asynchronous){
				JS.callBack(callback,scope,[xhr]);
			}
			
		},
		
		getText : function(url,jsonData,callback,scope,asyn){
			this.get(url,jsonData,function(xhr){
				if(scope){
					callback.call(scope,xhr.responseText);
				}else{
					callback(xhr.responseText);
				}
			},this,asyn);
		},
		
		getJson : function(url,jsonData,callback,scope,asyn){
			this.get(url,jsonData,function(xhr){
				var json = null;
				try{
					json = eval("("+xhr.responseText+")");
				}catch(e){
					throw new Error(this.dataFormatError);
				}
				JS.callBack(callback,scope,[json]);
				/*
				if(scope){
					callback.call(scope,json);
				}else{
					callback(json);
				}*/
			},this,asyn);
		}
	}
})()