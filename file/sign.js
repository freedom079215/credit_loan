function verify_ic_sign(){
		window.sessionStorage["pin"]="pin_sign";	
		var custIdExp = /^[A-Z](1|2)\d{8}$/i;
		var submitFlag = true;
		// 依照字母的編號排列，存入陣列備用。
		var letters = {"A":"10","B":"11","C":"12","D":"13","E":"14","F":"15",
					"G":"16","H":"17","I":"34","J":"18","K":"19",
					"L":"20","M":"21","N":"22","O":"35","P":"23",
					"Q":"24","R":"25","S":"26","T":"27","U":"28",
					"V":"29","W":"32","X":"30","Y":"31","Z":"33"};
		// 儲存各個乘數
		var multiply = new Array(1, 9, 8, 7, 6, 5, 
							   4, 3, 2, 1,1);
		var nums = new Array(2);
		var firstNum;
		
		var total = 0;
		var alertErrMsg = "";
		var custId = $("#id_sign").val();
		var regExp = /^[\d|a-zA-Z]+$/;
		var reqNumExp = /^[0-9]+$/;
		$("#id_sign-error").html("");
		$("#pin_sign-error").html("");
		$("#authcode_chip_sign-error").html("");
		$("#sign_chip_msg").hide();
		if(custId == "" || custId == null){
			//alertErrMsg = alertErrMsg + "請輸入身分證字號!\n";
			//showErrorText("#PARTY_ID","請輸入身分證字號!");
			$("#id_sign-error").html("請輸入身分證字號!");
			alertErrMsg="請輸入身分證字號!";
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10){
			$("#id_sign-error").html("請輸入正確身分證字號!");
			alertErrMsg="請輸入正確身分證字號!";
			submitFlag = false;
		}else{
			// 取出第一個字元和最後一個數字。
			var firstChar = custId.charAt(0).toUpperCase();
			var lastNum = custId.charAt(9);
			
			// 找出第一個字母對應的數字，並轉換成兩位數數字。
			firstNum = parseInt(letters[firstChar]);
			nums[0] = Math.floor(firstNum / 10);
			nums[1] = firstNum - (nums[0] * 10);
			
			// 執行加總計算
			for(var i=0; i<multiply.length; i++){
				if (i<2) {
				total += nums[i] * multiply[i];
				} else {
				total += parseInt(custId.charAt(i-1)) * 
					   multiply[i];
				}
			}
			// 和最後一個數字比對
			if ((total % 10)!= 0) {
				//alertErrMsg = alertErrMsg + "請輸入正確身分證字號!\n";
				//showErrorText("#PARTY_ID","請輸入正確身分證字號");
				$("#id_sign-error").html("請輸入正確身分證字號!");
				alertErrMsg="請輸入正確身分證字號!";
				submitFlag = false;
			} 
		}
		var CustStr3 = custId;
		if (CustStr3== 'A110269003' || CustStr3=='A202277708'  || CustStr3 == 'A221987274' || CustStr3 == 'B221066299' ||
			CustStr3 =='B221195419' || CustStr3 =='D220041905' || CustStr3 == 'E101794220' || CustStr3 == 'F120339311' ||
			CustStr3 =='F126694991' || CustStr3 =='G120562553' || CustStr3 == 'H121557842' || CustStr3 == 'J120242825' ||
			CustStr3 =='J201762386' || CustStr3 =='J220472030' || CustStr3 == 'J221524962' || CustStr3 == 'K121695670' ||
			CustStr3 =='K220172161' || CustStr3 =='K220273912' || CustStr3 == 'L101042388' || CustStr3 == 'L120536565' ||
			CustStr3 =='L120562869' || CustStr3 =='L120571475' || CustStr3 == 'L120575704' || CustStr3 == 'L120584383' ||
			CustStr3 =='L120691963' || CustStr3 =='L121222864' || CustStr3 == 'L121726732' || CustStr3 == 'L122695094' ||
			CustStr3 =='L201431690' || CustStr3 =='L220673109' || CustStr3 == 'L220698428' || CustStr3 == 'L220701617' ||
			CustStr3 =='L220707342' || CustStr3 =='L221729066' || CustStr3 == 'L222322294' || CustStr3 == 'L222329917' ||
			CustStr3 =='M120071766' || CustStr3 =='M200761065' || CustStr3 == 'N220671296' || CustStr3 == 'N222462624' ||
			CustStr3 =='Q221364729' || CustStr3 =='R221642489' || CustStr3 == 'R224076512' || CustStr3 == 'S120548481' ||
			CustStr3 =='S221761908' || CustStr3 =='T120503492' || CustStr3 == 'T120915527' || CustStr3 == 'T220498416' ||
			CustStr3 =='A224002269' || CustStr3 =='E120050814' || CustStr3 == 'E222150766' || CustStr3 == 'G120565241' ||
			CustStr3 =='G221098858' || CustStr3 =='H121641429' || CustStr3 == 'J120238796' || CustStr3 == 'J200515543' ||
			CustStr3 =='J220121878' || CustStr3 =='J221112426' || CustStr3 == 'J221131118' || CustStr3 == 'J221531681' ||
			CustStr3 =='J221706295' || CustStr3 =='L120672762' || CustStr3 == 'L120941477' || CustStr3 == 'L220706176' ||
			CustStr3 =='L220854882' || CustStr3 =='L222058226' || CustStr3 == 'L222355211' || CustStr3 == 'L222580465' ||
			CustStr3 =='M120882090' || CustStr3 =='N223546530' || CustStr3 == 'S121761620'	){
			//alert("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
			$("#id_sign-error").html("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
			alertErrMsg="親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！";
			submitFlag = false;
		}
		
		if($("#usercode_sign").val()==""){
			submitFlag = false;	
			$("#usercode_sign-error").html("請輸入使用者代號！");
			alertErrMsg=alertErrMsg+"請輸入使用者代號！\n";
		}
		if($("#pin_sign").val()==""){
			submitFlag = false;	
			$("#pin_sign-error").html("請輸入晶片卡密碼！");
			alertErrMsg=alertErrMsg+"請輸入晶片卡密碼！\n";
		}
		if($("#authcode_chip_sign").val()==""){
			submitFlag = false;	
			$("#authcode_chip_sign-error").html("請輸入圖片驗證碼！");
			alertErrMsg=alertErrMsg+"請輸入圖片驗證碼！\n";
		}
		if(submitFlag==false){
			$("#sign_chip_msg").show();
			$("#sign_chip_text").html(alertErrMsg);
			$("#verify-bankcard-modal").scrollTop(0);
		}else{
			$("#id_sign").val($("#id_sign").val().toUpperCase());
			CheckItem();	
		}
	}
function signCardSmsCheck(){
	var resendAction = "./sign/cardauthcode.jsp";	       
    var sessionId=window.sessionStorage["sessionId"];
	var param = {
    		"sessionId" :sessionId,
    		"authCode" : $("#cardcodesms_sign").val(),
    		"custId" : $("#card_sign_custid").val()
    	};
	$("#sign_cardSMS_msg").hide();
	$("#sign_cardSMS_text").html("");
	$.ajax({
		url:resendAction,
		dataType:"text",
		type:"post",
		cache:false,
		data:param,
		success:function(data){					
			var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
			jsonObj = $.parseJSON(dataStr);						
			if(jsonObj.rtnCode == "001"){
				//alert(jsonObj.msg);
				$("#sign_cardSMS_msg").show();
				$("#sign_cardSMS_text").html(jsonObj.msg);
			}
			else if(jsonObj.rtnCode == "000"){		
				$("#card_sign_custid").val($("#card_sign_custid").val().toUpperCase());
				document.sign_card_form.submit();
			}
		}
	});
}   
function signCardCheck(){
	var errmsg="";
	var custIdExp = /^[A-Z](1|2)\d{8}$/i;
	var submitFlag = true;
	// 依照字母的編號排列，存入陣列備用。
	var letters = {"A":"10","B":"11","C":"12","D":"13","E":"14","F":"15",
				"G":"16","H":"17","I":"34","J":"18","K":"19",
				"L":"20","M":"21","N":"22","O":"35","P":"23",
				"Q":"24","R":"25","S":"26","T":"27","U":"28",
				"V":"29","W":"32","X":"30","Y":"31","Z":"33"};
	// 儲存各個乘數
	var multiply = new Array(1, 9, 8, 7, 6, 5, 
						   4, 3, 2, 1,1);
	var nums = new Array(2);
	var firstNum;
	
	var total = 0;
	var alertErrMsg = "";
	var custId = $("#cardid_sign").val();
	var regExp = /^[\d|a-zA-Z]+$/;
	var reqNumExp = /^[0-9]+$/;
	$("#cardid_sign-error").html("");
	$("#cardno_sign-error").html("");
	$("#carddate_sign-error").html("");
	$("#cardcv_sign-error").html("");
	$("#cardcode_sign-error").html("");
	$("#sign_card_msg").hide();
	$("#sign_card_text").html("");
	$("#carddate_sign-error").hide("");
	if(custId == "" || custId == null){
		//alertErrMsg = alertErrMsg + "請輸入身分證字號!\n";
		//showErrorText("#PARTY_ID","請輸入身分證字號!");
		$("#cardid_sign-error").html("請輸入身分證字號!");
		errmsg="請輸入身分證字號!";
		submitFlag = false;
	}else if(custId.search(custIdExp)==-1 || custId.length != 10){
	//alertErrMsg = alertErrMsg + "請輸入正確身分證字號!\n";
	//showErrorText("#PARTY_ID","請輸入正確身分證字號");
		$("#cardid_sign-error").html("請輸入正確身分證字號!");
		errmsg="請輸入正確身分證字號!";
		submitFlag = false;
	}else{
		// 取出第一個字元和最後一個數字。
		var firstChar = custId.charAt(0).toUpperCase();
		var lastNum = custId.charAt(9);
		
		// 找出第一個字母對應的數字，並轉換成兩位數數字。
		firstNum = parseInt(letters[firstChar]);
		nums[0] = Math.floor(firstNum / 10);
		nums[1] = firstNum - (nums[0] * 10);
		
		// 執行加總計算
		for(var i=0; i<multiply.length; i++){
			if (i<2) {
			total += nums[i] * multiply[i];
			} else {
			total += parseInt(custId.charAt(i-1)) * 
				   multiply[i];
			}
		}
		// 和最後一個數字比對
		if ((total % 10)!= 0) {
			//alertErrMsg = alertErrMsg + "請輸入正確身分證字號!\n";
			//showErrorText("#PARTY_ID","請輸入正確身分證字號");
			$("#cardid_sign-error").html("請輸入正確身分證字號!");
			errmsg="請輸入正確身分證字號!";
			submitFlag = false;
		} 
	}
	var CustStr3 = custId;
	if (CustStr3== 'A110269003' || CustStr3=='A202277708'  || CustStr3 == 'A221987274' || CustStr3 == 'B221066299' ||
		CustStr3 =='B221195419' || CustStr3 =='D220041905' || CustStr3 == 'E101794220' || CustStr3 == 'F120339311' ||
		CustStr3 =='F126694991' || CustStr3 =='G120562553' || CustStr3 == 'H121557842' || CustStr3 == 'J120242825' ||
		CustStr3 =='J201762386' || CustStr3 =='J220472030' || CustStr3 == 'J221524962' || CustStr3 == 'K121695670' ||
		CustStr3 =='K220172161' || CustStr3 =='K220273912' || CustStr3 == 'L101042388' || CustStr3 == 'L120536565' ||
		CustStr3 =='L120562869' || CustStr3 =='L120571475' || CustStr3 == 'L120575704' || CustStr3 == 'L120584383' ||
		CustStr3 =='L120691963' || CustStr3 =='L121222864' || CustStr3 == 'L121726732' || CustStr3 == 'L122695094' ||
		CustStr3 =='L201431690' || CustStr3 =='L220673109' || CustStr3 == 'L220698428' || CustStr3 == 'L220701617' ||
		CustStr3 =='L220707342' || CustStr3 =='L221729066' || CustStr3 == 'L222322294' || CustStr3 == 'L222329917' ||
		CustStr3 =='M120071766' || CustStr3 =='M200761065' || CustStr3 == 'N220671296' || CustStr3 == 'N222462624' ||
		CustStr3 =='Q221364729' || CustStr3 =='R221642489' || CustStr3 == 'R224076512' || CustStr3 == 'S120548481' ||
		CustStr3 =='S221761908' || CustStr3 =='T120503492' || CustStr3 == 'T120915527' || CustStr3 == 'T220498416' ||
		CustStr3 =='A224002269' || CustStr3 =='E120050814' || CustStr3 == 'E222150766' || CustStr3 == 'G120565241' ||
		CustStr3 =='G221098858' || CustStr3 =='H121641429' || CustStr3 == 'J120238796' || CustStr3 == 'J200515543' ||
		CustStr3 =='J220121878' || CustStr3 =='J221112426' || CustStr3 == 'J221131118' || CustStr3 == 'J221531681' ||
		CustStr3 =='J221706295' || CustStr3 =='L120672762' || CustStr3 == 'L120941477' || CustStr3 == 'L220706176' ||
		CustStr3 =='L220854882' || CustStr3 =='L222058226' || CustStr3 == 'L222355211' || CustStr3 == 'L222580465' ||
		CustStr3 =='M120882090' || CustStr3 =='N223546530' || CustStr3 == 'S121761620'	){
		//alert("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
		$("#cardid_sign-error").html("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
		errmsg="親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！";
		submitFlag = false;
	}
	
	var cardNoComplete = $("#cardno_sign").val();
	if($("#cardno_sign").val() == null || $("#cardno_sign").val() == "" || $("#cardno_sign").val().length < 16){
		//alertErrMsg = alertErrMsg + "請輸入信用卡卡號!\n";
		//showErrorText("#cardNo","請輸入信用卡卡號!");
		$("#cardno_sign-error").html("請輸入信用卡卡號!");
		errmsg=errmsg+"請輸入信用卡卡號!\n";
		submitFlag = false;
	}else if(!cardNoComplete.match(reqNumExp)){
		//alertErrMsg = alertErrMsg + "請輸入正確信用卡卡號!\n";
		//showErrorText("#cardNo","請輸入正確信用卡卡號!");
		$("#cardno_sign-error").html("請輸入正確信用卡卡號!");
		errmsg=errmsg+"請輸入正確信用卡卡號!\n";
		submitFlag = false;
	}
	var expireDate = $("#carddate_sign").val();
	if($("#carddate_sign").val() == null || $("#carddate_sign").val() == "" || $("#carddate_sign").val().length < 4){
		//alertErrMsg = alertErrMsg + "請輸入有效年月!\n";
		//showErrorText("#expireDate","請輸入有效年月!");
		$("#carddate_sign-error").html("請輸入有效月年!");
		$("#carddate_sign-error").show("");
		errmsg=errmsg+"請輸入有效月年!\n";
		submitFlag = false;
	}else if(!expireDate.match(reqNumExp)){
		//alertErrMsg = alertErrMsg + "請輸入正確有效年月!\n";
		//showErrorText("#expireDate","請輸入正確有效年月!");
		$("#carddate_sign-error").html("請輸入正確有效月年!");
		$("#carddate_sign-error").show("");
		errmsg=errmsg+"請輸入正確有效月年!\n";
		submitFlag = false;
	}
	var cvv2 = $("#cardcv_sign").val();
	if($("#cardcv_sign").val() == null || $("#cardcv_sign").val() == ""){
		//alertErrMsg = alertErrMsg + "請輸入卡片檢核碼!\n";
		//showErrorText("#cvv2","請輸入卡片檢核碼!");
		$("#cardcv_sign-error").html("請輸入卡片檢核碼!");
		errmsg=errmsg+"請輸入卡片檢核碼!\n";
		submitFlag = false;
	}else if(!cvv2.match(reqNumExp) || cvv2.length != 3){
		//alertErrMsg = alertErrMsg + "請輸入正確卡片檢核碼!\n";
		//showErrorText("#cvv2","請輸入正確卡片檢核碼!");
		$("#cardcv_sign-error").html("請輸入正確卡片檢核碼!");
		errmsg=errmsg+"請輸入正確卡片檢核碼!\n";
		submitFlag = false;
	}
	
	if($("#cardcode_sign").val()==""){			
		$("#cardcode_sign-error").html("請填入圖片驗證碼");
		errmsg=errmsg+"請輸入圖片驗證碼!\n";
		submitFlag = false;
	}
	if(submitFlag==false){
		//$("#sign_title").show();
		//$("#sign_text").html(errmsg);
		$("#sign_card_msg").show();
		$("#sign_card_text").html(errmsg);
		$("#creditcard-sign-modal").scrollTop(0);
		return;
	}else{	
		var resendAction = "./sign/cardauth.jsp";	
		//console.log( $("#NonSessionSessionId").val());
		var param = {
	    		"cardid_sign" : custId,
	    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
	    		"cardcode_sign" : $("#cardcode_sign").val(),
	    		"cardno_sign":$("#cardno_sign").val(),
	    		"cardcv_sign":$("#cardcv_sign").val(),
	    		"carddate_sign":$("#carddate_sign").val()
	    		
	    	};			
		$.ajax({
			url:resendAction,
			dataType:"text",
			type:"post",
			cache:false,
			data:param,
			success:function(data){					
				var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
				//console.log("signCardCheck dataStr:"+dataStr);
				jsonObj = $.parseJSON(dataStr);						
				if(jsonObj.rtnCode == "001"){
					//alert(jsonObj.msg);
					$("#sign_card_msg").show();
					$("#sign_card_text").html(jsonObj.msg);
					changeCheckPicCardsign();
				}
				else if(jsonObj.rtnCode == "000"){
					window.sessionStorage["maskphone"] = jsonObj.maskphone;
					window.sessionStorage["maskmail"] = jsonObj.maskmail;
					window.sessionStorage["emailAddr"] = jsonObj.emailAddr;
					window.sessionStorage["mobileNo"] = jsonObj.mobileNo;
					window.sessionStorage["sessionId"] = jsonObj.sessionId;
					window.sessionStorage["custId"] = jsonObj.custId;
					window.sessionStorage["cardno"] = jsonObj.cardno;
					//parent.location.replace("./index.jsp#sign-creditcard-verify-modal");
					window.location.href="./index.jsp#sign-creditcard-verify-modal";
					
				}
			}
		});
		return;
	}
	function signresend(){
		if(counter==0){}
		else{
			return;
		}
		var param = {
	    		"mobilno" :$("#card_sign_mobileno").val(),
	    		"mail" : $("#card_sign_mail").val(),
	    		"custId" : $("#card_sign_custid").val()
	    };
		var resendAction = "./sign/cardauthcoderesend.jsp";	
		$.ajax({
			url:resendAction,
			dataType:"text",
			type:"post",
			cache:false,
			data:param,
			success:function(data){					
				var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
				jsonObj = $.parseJSON(dataStr);						
				if(jsonObj.rtnCode == "001"){
					//alert(jsonObj.msg);
					$("#sign-creditcard-verify-modal").scrollTop(0);
					$("#sign_cardSMS_msg").show();
					$("#sign_cardSMS_text").html(jsonObj.msg);
				}
				else if(jsonObj.rtnCode == "000"){		
					counter = COUNTER_START;
					showTimeInfoTimer();
				}
			}
		});
	}
	
}