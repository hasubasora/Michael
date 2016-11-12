window.onload=function () {
	code($(".code"),$(".tel"),$('.registerError'))
	code($(".logincode"),$(".logintel"),$('.loginError'))
	function code(codebtn,tel,Error) {
		codebtn.click(function(){
	        // alert($tel.val())
	        var otel = tel.val();
	        var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
	        if (tel.val()==""){ 
	        	Error.html("请输入手机号");

	        }else if(reg.test(otel)){
	            // 倒计时
	            var a=60;
	            var timer = setInterval(function () {
	            	if(a>0){
	            		codebtn.attr("disabled",true).val("("+a+")重新获取");
	            		tel.attr("disabled",true);
	            		a--;
	            	}else{
	            		clearInterval(timer);
	            		codebtn.attr("disabled",false).val("发送验证码");
	            		tel.attr("disabled",false);
	            		a=60;
	            	}
	            },1000);
	        }
	    });
		Btn($('.registerBtn'),$('.box1'),$('.box2'));
		Btn($('.loginBtn'),$('.box2'),$('.box1'))
		function Btn(btn,ebtn,obtn) {
			btn.on('click',function (argument) {
				ebtn.hide()
				obtn.show();
			})
		}	
	}



function toForm() {

}
toForm.prototype = {
	toLogin:function() {
		alert("进来了")
	},
	toRegister:function () {//按键抬起检测名字
		alert("按键抬起检测名字")
		$.ajax({
            url: get_name_url,     //后台处理程序
            type: "post",               //数据发送方式
            dataType: "json",           //接受数据格式
            data: {                     //要传递的数据
            	username: userName.val()
            },
            success: function (result) {
            	if (result.status == 1) {
            		rError.html('手机号已经存在！');
            		return false;
            	}else{
            		rError.html('手机号可用√').css('background','green');          		
            	}	
            },
            error: function () {
	        	// body...
	        }
	    });
		return true;
	},
	fnBlur:function(){//失去焦点事件
		if (this.value=='') {
			rError.html('输入正确手机号');
			return false
		}else if (this.value.length<11){
			rError.html('输入正确手机号');
		}else{
			rError.html('');
			return true
		};
	},
	fnKeyup:function(){//手机号验证
		this.value=this.value.replace(/[^\d]/g,'') //去除空格
		if (this.value!='') {
			rError.html('');
			var tel = this.value;
			var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			if(reg.test(tel)){
				toForm.prototype.toRegister()
			}else{
				rError.html('填写正确手机号');
				return false
			};
		};
		return this;
	},
	fnPwd:function () { //密码失去焦点事件
		if (this.value=='') {
			rError.html('填写密码');
			return false
		}else if (this.value.length<6){
			rError.html('填写6位数以上的密码');
			return false
		}else{
			rError.html('');
			return true
		};
	},
	fnCode:function () {
		if (this.value!='') {
			rError.html('');
			return true
		}else{
			rError.html('填写验证码');
			return false
		};
	},
	fnSign:function () {
		if (this.value!='') {
			rError.html('');
			return true
		}else if(this.value<2){
			rError.html('输入牌子');
			return false
		}else{
			rError.html('输入牌子');
			return false
		};
	},
	goEnter:function (e) {//回车事件
		if(e.keyCode==13){
			toForm.prototype.fnCommit()
		}
	},
	noCode:function (e) {//禁止输入空格
		e = e||event;  
		if(event.keyCode == 32)event.returnValue = false;
	},
	fnCommit:function () {//提交事件
		alert('你长得太帅了，机器已经停止运作')
		$.ajax({
                url: match_register_url,     //后台处理程序
                type: "post",               //数据发送方式
                dataType: "json",           //接受数据格式
                data: {                     //要传递的数据
                	username: userName.val(),
                   // companyName: companyName.val(),
                   password: secondPsw.val(),
                   phone: tel.val(),
                   code: code.val(),
               },
               success: function(result){
	               	if(result.status == 1){
	               		layer.msg(" 注 册 成 功 ",{time: 2000},function(){
	               			window.location.href = turn_login_url;
	               		});
	               	}else if(result.status == 0){
	               		layer.msg(result.info);
	               	}
               },
               error: function(){
               	layer.alert(" 注 册 失 败 ",{icon: 6});
               }
           });
	}
}
var Bel= new toForm();
	//tel.toRegister()
	var rError=$('.registerError');
	//禁止输入事件
	$(".tel").on('keypress',Bel.noCode);
	// 失去焦点事件
	$(".tel").on('blur',Bel.fnBlur);
	$(".pwd").on('blur',Bel.fnPwd);
	// 按键抬起事件
	$(".tel").on('keyup',Bel.fnKeyup);
	//按键按下事件
	$(".button").on('keydown',Bel.goEnter)
	//按键提交事件
	$(".button").on('click',function (argument) {
		if ($(".tel").val()==''){
			rError.html('填充完整注册信息');
		}else if ($(".tel").val()<11) {
			rError.html('填充完整手机号');	
		}else if ($(".pwd").val()=='') {
			rError.html('填充完整注册信息');
		}else if ($(".pwd").val().length<6) {
			rError.html('填写6位数以上的密码');
		}else if ($(".toCode").val()=='') {
			rError.html('填写验证码');
		}else if ($(".sgin").val()=='') {
			rError.html('填充完整注册信息');
		}else if ($(".sgin").val()<2) {
			rError.html('填充完整牌子');	
		}else{
			rError.html('');
			var tel = $(".tel").val();
			var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
			if(reg.test(tel)){
				Bel.fnCommit()
			}
		}
	});

}




// function toForm(warning) {
//    this.warning = warning;
//    toForm.prototype.init.call(this);
// }

// toForm.prototype = {
//    init: function() {
//       return this;
//    },
//    toLogin: function() {
//      alert(this.warning);
//    }
// }

// var form = new toForm("弹出我");
// form.toLogin();
