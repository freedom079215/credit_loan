/**
 * 此頁為線上補件的JS集合
 * 最後需要移動到index.jsp
 */
//add by rocky 20170630
//1--------網銀登入
	var adObj = {
    		WBStatus : true,
    		CCStatus : true,
    		ccReload : false,
    		ccAutocodeStatus : true,
    		BCStatus : true
    };
    function addNbCheck(){
    	if(adObj.WBStatus != true) {
    		return;
    	}
    	var submitFlag = true;
  		var custIdExp = /^[A-Z](1|2)\d{8}$/i;
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

  		//$(".errmsg").hide();
  		var reqNumExp = /^[0-9]+$/;
  		var alertErrMsg = "";
  		var custId = $("#user_id_add").val();
  		var usercode = $("#user_code_add").val();
  		var pwd = $("#user_pwd_add").val();
  		$("#user_id_add-error").html("");
  		$("#user_code_add-error").html("");
  		$("#user_pwd_add-error").html("");
  		$("#authcode_add-error").html("");
  		if(custId =="" || custId == null){
  			alertErrMsg = alertErrMsg + "請輸入身分證字號! ";
  			$("#user_id_add-error").html("請輸入身分證字號!");
  			submitFlag = false;
  		}else if(custId.search(custIdExp)==-1 || custId.length != 10){
  			alertErrMsg = alertErrMsg + "請輸入正確身分證字號! ";
  			$("#user_id_add-error").html("請輸入正確身分證字號!");
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
  				alertErrMsg = alertErrMsg + "請輸入正確身分證字號! ";
  				$("#user_id_add-error").html("請輸入正確身分證字號!");
  				submitFlag = false;
  			} 

  		}
  		
  		if(usercode =="" || usercode == null){
  			alertErrMsg += "請輸入使用者代號! ";
  			$("#user_code_add-error").html("請輸入使用者代號!");
  			submitFlag = false;
  		}else if(usercode.length <6){
  			alertErrMsg += "使用者代號不得小於六位 ";
  			$("#user_code_add-error").html("使用者代號不得小於六位");
  			submitFlag = false;
  		}
  		
  		if(pwd =="" || pwd == null){
  			alertErrMsg += "請輸入使用者密碼! ";
  			$("#user_pwd_add-error").html("請輸入使用者密碼!");
  			submitFlag = false;
  		}else if(pwd.length <6){
  			alertErrMsg += "使用者密碼不得小於六位 ";
  			$("#user_pwd_add-error").html("使用者密碼不得小於六位");
  			submitFlag = false;
  		}
  		
  		if($("#authcode_add").val() == null || $("#authcode_add").val() == "" || $("#authcode_add").val() == "請輸入右圖數字"){
  			alertErrMsg += "請填入圖片驗證碼 ";
  			$("#authcode_add-error").html("請填入圖片驗證碼");
  			submitFlag = false;
  		}
  		if(submitFlag){		
			var param = {
				"PARTY_ID" : document.getElementById("user_id_add").value,
				"PWD" : document.getElementById("user_pwd_add").value,
				"usercode" : document.getElementById("user_code_add").value,
				"NonSessionSessionId" : document.getElementById("NonSessionSessionId").value,
				"picAuthCode" : document.getElementById("authcode_add").value
			};
			adObj.WBStatus = false;
			$("#add_text").html("");
			$("#add_title").hide();
			$.ajax({
				url:"./add/ad01_wbauth.jsp",
				dataType:"text",
				type:"post",
				cache:false,
				data:param,
				success:function(data){					
					var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
					console.log(dataStr);
					adObj.WBStatus = true;
					jsonObj = $.parseJSON(dataStr);						
					if(jsonObj.rtnCode == "001"){
						$("#add_text").html(jsonObj.msg);
						$("#add_title").show();
						var errorType = jsonObj.errorType;
						if(errorType == "3") {
							window.location.hash = "#additional-fail-modal";
							//$("#additional-fail-modal").modal('show');
						}
					}
					else if(jsonObj.rtnCode == "000"){
						document.getElementById("submitType_wb").value = jsonObj.submitType;
						document.getElementById("custId_wb").value = jsonObj.custId;
						document.getElementById("authType_wb").value = jsonObj.authType;
						document.getElementById("dateStrDate_wb").value = jsonObj.dateStrDate;
						document.getElementById("dateStrTime_wb").value = jsonObj.dateStrTime;
						document.getElementById("sessionID_wb").value = jsonObj.sessionID;
						document.getElementById("authCode_wb").value = jsonObj.authCode;
						$("#add_wb_form").submit();
					}
				}
			});
  			
  		}else {
  			//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
  			$("#add_text").html(alertErrMsg);
  			$("#add_title").show();
  			$("#add-webbank-modal").scrollTop(0);
  		}
	}
//2----------------信用卡登入

	var maskphone_add = window.sessionStorage["maskphone_add"];
    var maskmail_add = window.sessionStorage["maskmail_add"];
    var COUNTER_START_add = 5 * 60;
    var counter_add = COUNTER_START_add;//COUNTER_START;
    var _CounterDownTimer_add;
    var showlink_add = 0;
    //var ccReload_add = false;
    
    //[重新發送驗證碼]的倒數樹機制
    function showTimeInfoTimer_add() {
    	window.clearTimeout(_CounterDownTimer_add);
    	counter_add--;
    	
    	//var m = (100 + Math.floor(counter_add / 60)).toString().substr(1);
    	//var s = (100 + counter_add % 60).toString().substr(1);
    	//$("#cardaddsmstxt").html("重新發送驗證碼 (" + (parseInt(m*60)+parseInt(s))+")");
    	$("#cardaddsmstxt").html("重新發送驗證碼 (" + counter_add +")");
    	if (counter_add == 0) {
    		//$("#resendcode").attr("href","javascript:resendAuthCode();");
    		//$("#resendcode").css("cursor:pointer");
    		//ccReload_add = true;
    		adObj.ccReload = true;
    		return;
    	}
    	_CounterDownTimer_add = setTimeout(showTimeInfoTimer_add, 1000);
    }
    function setTimeAndTitle_add() {
    	$("#cardaddsms").html( window.sessionStorage["maskphone_add"] +"和" + window.sessionStorage["maskmail_add"]);
    	showTimeInfoTimer_add();
    }
    function ccReloadSMS_add() {
    	if(adObj.ccReload == true) {//ccReload_add
    		//重送
    		var resendAction = "./add/ad01_refreshAC.jsp";	
			var param = {
		    		"custid" : window.sessionStorage["custsId_add"],
		    		"NonSessionSessionId" : window.sessionStorage["NonSessionSessionId"],
		    		"mobileNo" : window.sessionStorage["mobileNo_add"],
		    		"emailAddr" : window.sessionStorage["emailAddr_add"]
		    	};
			$("#add_creditcard_verify_text").html("");
			$("#add_creditcard_verify_title").hide();
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
						$("#add_creditcard_verify_text").html(jsonObj.msg);
						$("#add_creditcard_verify_title").show();
					}
					else if(jsonObj.rtnCode == "000"){
						window.sessionStorage["sessionId_add"] = jsonObj.sessionId;
						counter_add = COUNTER_START_add;
						//ccReload_add = false;
						adObj.ccReload = false;
						showTimeInfoTimer_add();
					}
				}
			});
    	}else {
    		//console.log("還在倒數");
    	}
    }
      //end add by rocky 20170630 for add
      //add by rocky for creditcard 
//信用卡登入資料檢查送出

    function addCardCheck(){
    	if(adObj.CCStatus != true) {
    		return;
    	}
    	var submitFlag = true;
    	var custIdExp = /^[A-Z](1|2)\d{8}$/i;
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
		var custId = $("#cardid_add").val();
		//alert(custId);
		//$(".errmsg").hide();
		//var chnName = $("#chnName").val();
		var regExp = /^[\d|a-zA-Z]+$/;
		var reqNumExp = /^[0-9]+$/;
		$("#cardid_add-error").html("");
		$("#cardno_add-error").html("");
		$("#carddate_add-error").html("");
		$("#cardcv_add-error").html("");
		$("#cardcode_add-error").html("");
		if(custId == "" || custId == null){
			alertErrMsg += "請輸入身分證字號! ";
			$("#cardid_add-error").html("請輸入身分證字號!");
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10){
			alertErrMsg += "請輸入正確身分證字號! ";
			$("#cardid_add-error").html("請輸入正確身分證字號!");
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
				alertErrMsg += "請輸入正確身分證字號! ";
				$("#cardid_add-error").html("請輸入正確身分證字號!");
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
			alert("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
			alertErrMsg += "親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！ ";
			submitFlag = false;
		}
		
		//$("#cardNo").val($("#cardNo1").val()+$("#cardNo2").val()+$("#cardNo3").val()+$("#cardNo4").val());
		var cardNoComplete = $("#cardno_add").val();
		if($("#cardno_add").val() == null || $("#cardno_add").val() == "" || $("#cardno_add").val().length < 16){
			alertErrMsg += "請輸入信用卡卡號! ";
			$("#cardno_add-error").html("請輸入信用卡卡號!");
			submitFlag = false;
		}else if(!cardNoComplete.match(reqNumExp)){
			alertErrMsg += "請輸入正確信用卡卡號! ";
			$("#cardno_add-error").html("請輸入正確信用卡卡號!");
			submitFlag = false;
		}
		
		//$("#expireDate").val($("#expireDate1").val()+$("#expireDate2").val());
		var expireDate = $("#carddate_add").val();
		if($("#carddate_add").val() == null || $("#carddate_add").val() == "" || $("#carddate_add").val().length < 4){
			alertErrMsg += "請輸入有效年月! ";
			$("#carddate_add-error").html("請輸入有效年月!");
			submitFlag = false;
		}else if(!expireDate.match(reqNumExp)){
			alertErrMsg += "請輸入正確有效年月! ";
			$("#carddate_add-error").html("請輸入正確有效年月!");
			submitFlag = false;
		}
		var cvv2 = $("#cardcv_add").val();
		if($("#cardcv_add").val() == null || $("#cardcv_add").val() == ""){
			alertErrMsg += "請輸入卡片檢核碼! ";
			$("#cardcv_add-error").html("請輸入卡片檢核碼!");
			submitFlag = false;
		}else if(!cvv2.match(reqNumExp) || cvv2.length != 3){
			alertErrMsg += "請輸入正確卡片檢核碼! ";
			$("#cardcv_add-error").html("請輸入正確卡片檢核碼!");
			submitFlag = false;
		}
		
		if($("#cardcode_add").val() == null || $("#cardcode_add").val() == "" || $("#cardcode_add").val() == "請輸入右圖數字"){
			alertErrMsg += "請輸入圖片驗證碼! ";
			$("#cardcode_add-error").html("請輸入圖片驗證碼!");
			submitFlag = false;
		}
		
		if(submitFlag){		
			var resendAction = "./add/ad01_ccauth.jsp";	
			var param = {
		    		"custid_add" : custId,
		    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
		    		"cardcode_add" : $("#cardcode_add").val(),
		    		"cardno_add":$("#cardno_add").val(),
		    		"cardcv_add":$("#cardcv_add").val(),
		    		"carddate_add":$("#carddate_add").val()
		    	};
			adObj.CCStatus = false;
			$("#add_creditcard_text").html("");
			$("#add_creditcard_title").hide();
			$.ajax({
				url:resendAction,
				dataType:"text",
				type:"post",
				cache:false,
				data:param,
				success:function(data){					
					var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
					adObj.CCStatus = true;
					jsonObj = $.parseJSON(dataStr);						
					if(jsonObj.rtnCode == "001"){
						$("#add_creditcard_text").html(jsonObj.msg);
						$("#add_creditcard_title").show();
					}
					else if(jsonObj.rtnCode == "000"){
						//紀錄下一頁需要的電話及密碼
						window.sessionStorage["maskphone_add"] = jsonObj.maskphone;
						window.sessionStorage["maskmail_add"] = jsonObj.maskmail;
						window.sessionStorage["custsId_add"] = jsonObj.custId;
						window.sessionStorage["sessionId_add"] = jsonObj.sessionId;
						window.sessionStorage["mobileNo_add"] = jsonObj.mobileNo;
			    		window.sessionStorage["emailAddr_add"] = jsonObj.emailAddr;
			    		
			    		window.sessionStorage["NonSessionSessionId"] = $("#NonSessionSessionId").val();
			    		//ccReload_add = false;
			    		adObj.ccReload = false;
						setTimeAndTitle_add();
						parent.location.replace("./index.jsp#add-creditcard-verify-modal");
					}
				}
			});
		}else {
			//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
			$("#add_creditcard_text").html(alertErrMsg);
			$("#add_creditcard_title").show();
			$("#add-creditcard-modal").scrollTop(0);
		}
	}
    //輸入驗證碼頁面，檢查後送出
    function cardverify_add() {
    	if(adObj.ccAutocodeStatus != true) {
    		return;
    	}
    	//檢查並送出
    	$("#verify_no_add-error").html("");
    	var verify_no = $("#verify_no_add").val();
    	if(verify_no == "" || verify_no.length < 6) {
    		$("#verify_no_add-error").html("請輸入驗證碼!");
    		$("#add_creditcard_verify_text").html("請輸入驗證碼!");
    		$("#add_creditcard_verify_title").show();
    		$("#add-creditcard-verify-modal").scrollTop(0);
    		return;
    	}

    	var param = {
    		"custId" : window.sessionStorage["custsId_add"],
    		"sessionId" : window.sessionStorage["sessionId_add"],
    		"authCode":verify_no
    	};
    	adObj.ccAutocodeStatus = false;
    	$("#add_creditcard_verify_text").html("");
		$("#add_creditcard_verify_title").hide();
    	$.ajax({
			url:"./add/ad01_autocode.jsp",
			dataType:"text",
			type:"post",
			cache:false,
			data:param,
			success:function(data){					
				var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
				adObj.ccAutocodeStatus = true;
				jsonObj = $.parseJSON(dataStr);

				if(jsonObj.rtnCode == "001"){
					$("#add_creditcard_verify_text").html(jsonObj.msg);
					$("#add_creditcard_verify_title").show();

					var errorType = jsonObj.errorType;
					if(errorType == "2") {
						window.location.hash = "#additional-fail-modal";
						//$("#additional-fail-modal").modal('show');
					}
				}else if(jsonObj.rtnCode == "000") {
					document.getElementById("submitType_cc").value = jsonObj.submitType;
					document.getElementById("custId_cc").value = jsonObj.custId;
					document.getElementById("authType_cc").value = jsonObj.authType;
					document.getElementById("dateStrDate_cc").value = jsonObj.dateStrDate;
					document.getElementById("dateStrTime_cc").value = jsonObj.dateStrTime;
					document.getElementById("sessionID_cc").value = jsonObj.sessionID;
					document.getElementById("authCode_cc").value = jsonObj.authCode;
					$("#add_cc_form").submit();
				}
			}
		});
    }
//3--------金融卡登入
    function verify_ic_add() {
    	if(adObj.BCStatus != true) {
    		return;
    	}
    	var custId = $("#id_add").val();
    	var custIdExp = /^[A-Z](1|2)\d{8}$/i;
    	var submitFlag = true;
    	var alertErrMsg = "";
    	$("#id_add-error").html("");
    	$("#pin_add-error").html("");
    	$("#authcode_chip_add-error").html("");
    	if(custId == "" || custId == null) {
			$("#id_add-error").html("請輸入身分證字號!");
			alertErrMsg = "請輸入身分證字號! ";
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10) {
			$("#id_add-error").html("請輸入正確身分證字號!");
			alertErrMsg = "請輸入正確身分證字號! ";
			submitFlag = false;
		}
    	if($("#pin_add").val() == "" || $("#pin_add").val() == null) {
			$("#pin_add-error").html("請輸入晶片卡密碼!");
			alertErrMsg += "請輸入晶片卡密碼! ";
			submitFlag = false;
		}
    	if($("#authcode_chip_add").val() == "" || $("#authcode_chip_add").val() == null) {
			$("#authcode_chip_add-error").html("請輸入圖形驗證碼!");
			alertErrMsg += "請輸入圖形驗證碼! ";
			submitFlag = false;
		}
    	
    	if(submitFlag) {
	    	window.sessionStorage["pin"] = "pin_add";	
			var result = CheckItem();
			if(result) {
				var param = {
			    		"id_progress" : $("#id_add").val(),
			    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
			    		"picAuthCode" : $("#authcode_chip_add").val(),
			    		"Tag" : $("#Tag").val(),
			    		"IssAcctNo" : $("#IssAcctNo_abc").val()
			    	};
				adObj.BCStatus = false;
				$("#progress_bankcard_text").html("");
				$("#progress_bankcard_title").hide();
		    	$.ajax({
					url:"./add/ad01_bcauth.jsp",
					dataType:"text",
					type:"post",
					cache:false,
					data:param,
					success:function(data){					
						var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
						adObj.BCStatus = true;
						jsonObj = $.parseJSON(dataStr);
						
						if(jsonObj.rtnCode == "001"){
							$("#add_bankcard_text").html(jsonObj.msg);
							$("#add_bankcard_title").show();
							var errorType = jsonObj.errorType;
							if(errorType == "2") {
								window.location.hash = "#additional-fail-modal";
								//$("#additional-fail-modal").modal('show');
							}
							
						}else if(jsonObj.rtnCode == "000") {
							document.getElementById("submitType_abc").value = jsonObj.submitType;
							document.getElementById("custId_abc").value = jsonObj.custId;
							document.getElementById("authType_abc").value = jsonObj.authType;
							document.getElementById("dateStrDate_abc").value = jsonObj.dateStrDate;
							document.getElementById("dateStrTime_abc").value = jsonObj.dateStrTime;
							document.getElementById("sessionID_abc").value = jsonObj.sessionID;
							document.getElementById("authCode_abc").value = jsonObj.authCode;
							$("#add_bc_form").submit();
						}
					}
				});
			}
    	}else {
    		//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
    		$("#add_bankcard_text").html(alertErrMsg);
    		$("#add_bankcard_title").show();
    		$("#add-bankcard-modal").scrollTop(0);
    	}
    }