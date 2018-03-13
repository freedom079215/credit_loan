/**
 * 此頁為線上查詢的JS集合
 * 最後需要移動到index.jsp
 */
    //驗證圖示重整
    function replaceCheckPic(picID){
    	var NonSessionSessionId = $("#NonSessionSessionId").val();
    	var url = "../servlet/servlet.RB51.RANDPICServlet?SESSIONID="+NonSessionSessionId+"&t="+new Date().getTime();
    	$("#"+picID).attr("src",url);
    }
    var bankCardType = "";
    
//add by rocky 20170630
//1--------網銀登入
    var pgObj = {
    		WBStatus : true,
    		CCStatus : true,
    		ccReload : false,
    		ccAutocodeStatus : true,
    		BCStatus : true
    };
    function progressNbCheck(){
    	if(pgObj.WBStatus != true) {
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
		//$(".errmsg").hide();//remove by rocky
		var reqNumExp = /^[0-9]+$/;
		var alertErrMsg = "";
		var custId = $("#user_id_progress").val();
		var usercode = $("#user_code_progress").val();
		var pwd = $("#user_pwd_progress").val();
		
		//clear
		$("#user_id_progress-error").html("");
		$("#user_code_progress-error").html("");
		$("#user_pwd_progress-error").html("");
		$("#authcode_progress-error").html("");
		if(custId =="" || custId == null){
			$("#user_id_progress-error").html("請輸入身分證字號!");
			alertErrMsg = "請輸入身分證字號! ";
			submitFlag = false;
		}if(custId.search(custIdExp)==-1 || custId.length != 10){
			$("#user_id_progress-error").html("請輸入正確身分證字號!").show();
			submitFlag = false;
			alertErrMsg = "請輸入正確身分證字號! ";
		}else{
			// 取出第一個字元和最後一個數字。
			var firstChar = custId.charAt(0).toUpperCase();
			//var lastNum = custId.charAt(9);
			
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
				$("#user_id_progress-error").html("請輸入正確身分證字號!");
				submitFlag = false;
				alertErrMsg = "請輸入正確身分證字號! ";
			} 
		}
		
		if(usercode =="" || usercode == null){
			$("#user_code_progress-error").html("請輸入使用者代號!");
			submitFlag = false;
			alertErrMsg += "請輸入使用者代號! ";
		}else if(usercode.length <6){
			$("#user_code_progress-error").html("使用者代號不得小於六位");
			alertErrMsg += "使用者代號不得小於六位 ";
			submitFlag = false;
		}
		
		if(pwd =="" || pwd == null){
			$("#user_pwd_progress-error").html("請輸入使用者密碼!");
			alertErrMsg += "請輸入使用者密碼 ";
			submitFlag = false;
		}else if(pwd.length <6){
			$("#user_pwd_progress-error").html("使用者密碼不得小於六位");
			alertErrMsg += "使用者密碼不得小於六位 ";
			submitFlag = false;
		}
		
		if($("#authcode_progress").val() == null || $("#authcode_progress").val() == "" || $("#authcode_progress").val() == "請輸入右圖數字"){
			$("#authcode_progress-error").html("請填入圖片驗證碼");
			alertErrMsg += "請填入圖片驗證碼 ";
			submitFlag = false;
		}
		
		if(submitFlag){
			var param = {
				"user_id_progress" : document.getElementById("user_id_progress").value,
				"user_pwd_progress" : document.getElementById("user_pwd_progress").value,
				"user_code_progress" : document.getElementById("user_code_progress").value,
				"NonSessionSessionId_pg" : document.getElementById("NonSessionSessionId_pg").value,
				"authcode_progress" : document.getElementById("authcode_progress").value
			};
			pgObj.WBStatus = false;
			$("#progress_text").html("");
			$("#progress_title").hide();
			$.ajax({
				url:"./progress/pg01_wbauth.jsp",
				dataType:"text",
				type:"post",
				cache:false,
				data:param,
				success:function(data){					
					var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
					pgObj.WBStatus = true;
					jsonObj = $.parseJSON(dataStr);						
					if(jsonObj.rtnCode == "001"){
						$("#progress_text").html(jsonObj.msg);
						$("#progress_title").show();
						var errorType = jsonObj.errorType;
						if(errorType == "3") {
							window.location.hash = "#search-fail-modal";
						}else if(errorType == "1") {
							replaceCheckPic('checkPic_progress');
						}
					}
					else if(jsonObj.rtnCode == "000"){
						document.getElementById("submitType").value = jsonObj.submitType;
						document.getElementById("custId").value = jsonObj.custId;
						document.getElementById("authType").value = jsonObj.authType;
						document.getElementById("dateStrDate").value = jsonObj.dateStrDate;
						document.getElementById("dateStrTime").value = jsonObj.dateStrTime;
						document.getElementById("sessionID").value = jsonObj.sessionID;
						document.getElementById("authCode").value = jsonObj.authCode;
						$("#progress_wb_form").submit();
					}
				}
			});
			
		}else {
			//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
			$("#progress_text").html(alertErrMsg);//.scrollLeft(0).scrollTop(0);
			$("#progress_title").show();
			$("#progress-webbank-modal").scrollTop(0);
		}
	}

//2----------------信用卡登入

	//var maskphone_pg = window.sessionStorage["maskphone_pg"];
    //var maskmail_pg = window.sessionStorage["maskmail_pg"];
    var COUNTER_START_pg = 5 * 60;
    var counter_pg = COUNTER_START_pg;
    var _CounterDownTimer_pg;
    var showlink_pg = 0;
    //var ccReload_pg = false;
    function setTimeAndTitle_pg() {
    	$("#cardprogresssms").html( window.sessionStorage["maskphone_pg"] +"和" + window.sessionStorage["maskmail_pg"] );
    	showTimeInfoTimer_pg();
    }
    //[重新發送驗證碼]的倒數樹機制
    function showTimeInfoTimer_pg() {
    	window.clearTimeout(_CounterDownTimer_pg);
    	counter_pg--;
    	
    	//var m = (100 + Math.floor(counter_pg / 60)).toString().substr(1);
    	//var s = (100 + counter_pg % 60).toString().substr(1);
    	//$("#cardprogresssmstxt").html("重新發送驗證碼 (" + (parseInt(m*60)+parseInt(s))+")");
    	$("#cardprogresssmstxt").html("重新發送驗證碼 (" + counter_pg +")");
    	if (counter_pg <= 0) {
    		//$("#resendcode").attr("href","javascript:resendAuthCode();");
    		//$("#resendcode").css("cursor:pointer");
    		pgObj.ccReload = true;
    		//ccReload_pg = true;
    		return;
    	}
    	_CounterDownTimer_pg = setTimeout(showTimeInfoTimer_pg, 1000);
    }
    function ccReloadSMS() {
    	if(pgObj.ccReload == true) {	//ccReload_pg) {
    		//重送
    		var resendAction = "./progress/pg01_refreshAC.jsp";	
			var param = {
		    		"custid" : window.sessionStorage["custsId_pg"],
		    		"NonSessionSessionId" : window.sessionStorage["NonSessionSessionId"],
		    		"mobileNo" : window.sessionStorage["mobileNo_pg"],
		    		"emailAddr" : window.sessionStorage["emailAddr_pg"]
		    	};
			$("#progress_creditcard_verify_text").html("");
			$("#progress_creditcard_verify_title").hide();
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
						$("#progress_creditcard_verify_text").html(jsonObj.msg);
						$("#progress_creditcard_verify_title").show();
					}
					else if(jsonObj.rtnCode == "000"){
						window.sessionStorage["sessionId_pg"] = jsonObj.sessionId;
						counter_pg = COUNTER_START_pg;
						showTimeInfoTimer_pg();
						pgObj.ccReload = false;
						//ccReload_pg = false;
					}
				}
			});
    	}else {
    		//console.log("still in record");
    	}
    }
      //end add by rocky 20170630 for progress
      //add by rocky for creditcard 
//信用卡登入資料檢查送出
    function progressCardCheck(){
    	if(pgObj.CCStatus != true) {
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
		var custId = $("#cardid_progress").val();
		//alert(custId);
		//$(".errmsg").hide();
		//var chnName = $("#chnName").val();
		var regExp = /^[\d|a-zA-Z]+$/;
		var reqNumExp = /^[0-9]+$/;
		//clear error msg
		$("#cardid_progress-error").html("");
		$("#cardno_progress-error").html("");
		$("#carddate_progress-error").html("");
		$("#carddate_progress-error").html("");
		$("#cardcv_progress-error").html("");
		$("#cardcode_progress-error").html("");
		if(custId == "" || custId == null){
			$("#cardid_progress-error").html("請輸入身分證字號!");
			alertErrMsg = "請輸入身分證字號! ";
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10){
			$("#cardid_progress-error").html("請輸入正確身分證字號!");
			alertErrMsg = "請輸入正確身分證字號! ";
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
				$("#cardid_progress-error").html("請輸入正確身分證字號!");
				alertErrMsg = "請輸入正確身分證字號! ";
				submitFlag = false;
			} 
		}
			
		var CustStr3 = custId;
		if (CustStr3== 'A110269003' || CustStr3 =='A202277708' || CustStr3 == 'A221987274' || CustStr3 == 'B221066299' ||
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
			
		var cardNoComplete = $("#cardno_progress").val();
		if($("#cardno_progress").val() == null || $("#cardno_progress").val() == "" || $("#cardno_progress").val().length < 16){
			$("#cardno_progress-error").html("請輸入信用卡卡號!");
			alertErrMsg += "請輸入信用卡卡號! ";
			submitFlag = false;
		}else if(!cardNoComplete.match(reqNumExp)){
			$("#cardno_progress-error").html("請輸入正確信用卡卡號!");
			alertErrMsg += "請輸入正確信用卡卡號! ";
			submitFlag = false;
		}
			
		var expireDate = $("#carddate_progress").val();
		if($("#carddate_progress").val() == null || $("#carddate_progress").val() == "" || $("#carddate_progress").val().length < 4){
			$("#carddate_progress-error").html("請輸入有效年月!");
			alertErrMsg += "請輸入有效年月! ";
			submitFlag = false;
		}else if(!expireDate.match(reqNumExp)){
			$("#carddate_progress-error").html("請輸入正確有效年月!");
			alertErrMsg += "請輸入正確有效年月! ";
			submitFlag = false;
		}
		var cvv2 = $("#cardcv_progress").val();
		if($("#cardcv_progress").val() == null || $("#cardcv_progress").val() == ""){
			$("#cardcv_progress-error").html("請輸入卡片檢核碼!");
			alertErrMsg += "請輸入卡片檢核碼! ";
			submitFlag = false;
		}else if(!cvv2.match(reqNumExp) || cvv2.length != 3){
			$("#cardcv_progress-error").html("請輸入正確卡片檢核碼!");
			alertErrMsg += "請輸入正確卡片檢核碼! ";
			submitFlag = false;
		}
			
		if($("#cardcode_progress").val() == null || $("#cardcode_progress").val() == "" || $("#cardcode_progress").val() == "請輸入右圖數字"){
			$("#cardcode_progress-error").html("請輸入圖片驗證碼!");
			alertErrMsg += "請輸入圖片驗證碼! ";
			submitFlag = false;
		}
		if(submitFlag) {
			var resendAction = "./progress/pg01_ccauth.jsp";	
			var param = {
		    		"custid_progress" : custId,
		    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
		    		"cardcode_progress" : $("#cardcode_progress").val(),
		    		"cardno_progress" : $("#cardno_progress").val(),
		    		"cardcv_progress" : $("#cardcv_progress").val(),
		    		"carddate_progress" : $("#carddate_progress").val()
		    		//"cardbirth_progress" : $("#cardbirth_progress").val()
		    	};
			pgObj.CCStatus = false;
			$("#progress_creditcard_text").html("");
			$("#progress_creditcard_title").hide();
			$.ajax({
				url:resendAction,
				dataType:"text",
				type:"post",
				cache:false,
				data:param,
				success:function(data){					
					var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
					pgObj.CCStatus = true;
					jsonObj = $.parseJSON(dataStr);						
					if(jsonObj.rtnCode == "001"){
						$("#progress_creditcard_text").html(jsonObj.msg);
						$("#progress_creditcard_title").show();
						if("圖片驗證碼輸入錯誤!" == jsonObj.msg) {
							replaceCheckPic('checkPicCard_progress');
						}
					}
					else if(jsonObj.rtnCode == "000"){
						//紀錄下一頁需要的電話及密碼
						window.sessionStorage["maskphone_pg"] = jsonObj.maskphone;
						window.sessionStorage["maskmail_pg"] = jsonObj.maskmail;
						window.sessionStorage["custsId_pg"] = jsonObj.custId;
						window.sessionStorage["sessionId_pg"] = jsonObj.sessionId;
						window.sessionStorage["mobileNo_pg"] = jsonObj.mobileNo;
			    		window.sessionStorage["emailAddr_pg"] = jsonObj.emailAddr;
			    		
			    		window.sessionStorage["NonSessionSessionId"] = $("#NonSessionSessionId").val();
			    		pgObj.ccReload = false;
			    		//ccReload_pg = false;
						setTimeAndTitle_pg();
						parent.location.replace("./index.jsp#progress-creditcard-verify-modal");
					}
				}
			});
		}else {
			//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
			$("#progress_creditcard_text").html(alertErrMsg);
			$("#progress_creditcard_title").show();
			$("#progress-creditcard-modal").scrollTop(0);
		}
			
	}
    //輸入驗證碼頁面，檢查後送出
    function cardverify_pg() {
    	if(pgObj.ccAutocodeStatus != true) {
    		return;
    	}
    	//檢查並送出
    	var alertErrMsg = "";
    	$("#cardcv_progress-error").html("");
    	var verify_no = $("#verify_no_progress").val();
    	if(verify_no == "" || verify_no.length < 6) {
    		$("#verify_no_progress-error").html("請輸入驗證碼!");
    		alertErrMsg = "請輸入驗證碼!";
    		$("#progress_creditcard_verify_text").html(alertErrMsg);
    		$("#progress_creditcard_verify_title").show();
    		$("#progress-creditcard-verify-modal").scrollTop(0);
    		return;
    	}

    	var param = {
    		"custId" : window.sessionStorage["custsId_pg"],
    		"sessionId" : window.sessionStorage["sessionId_pg"],
    		"authCode" : verify_no
    	};
    	pgObj.ccAutocodeStatus = false;
    	$("#progress_creditcard_verify_text").html("");
		$("#progress_creditcard_verify_title").hide();
    	$.ajax({
			url:"./progress/pg01_autocode.jsp",
			dataType:"text",
			type:"post",
			cache:false,
			data:param,
			success:function(data){					
				var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
				pgObj.ccAutocodeStatus = true;
				jsonObj = $.parseJSON(dataStr);

				if(jsonObj.rtnCode == "001"){
					$("#progress_creditcard_verify_text").html(jsonObj.msg);
					$("#progress_creditcard_verify_title").show();
					var errorType = jsonObj.errorType;
					if(errorType == "2") {
						window.location.hash = "#search-fail-modal";
						//$("#search-fail-modal").modal('show');
					}
				}else if(jsonObj.rtnCode == "000") {
					document.getElementById("submitType_pgcc").value = jsonObj.submitType;
					document.getElementById("custId_pgcc").value = jsonObj.custId;
					document.getElementById("authType_pgcc").value = jsonObj.authType;
					document.getElementById("dateStrDate_pgcc").value = jsonObj.dateStrDate;
					document.getElementById("dateStrTime_pgcc").value = jsonObj.dateStrTime;
					document.getElementById("sessionID_pgcc").value = jsonObj.sessionID;
					document.getElementById("authCode_pgcc").value = jsonObj.authCode;
					pgObj.ccReload = false;
					//ccReload_pg = false;
					$("#progress_cc_form").submit();
				}
			}
		});
    }
//3--------金融卡登入
    function verify_ic_progress(){
    	if(pgObj.BCStatus != true) {
    		return;
    	}
    	var custId = $("#id_progress").val();
    	var custIdExp = /^[A-Z](1|2)\d{8}$/i;
    	var submitFlag = true;
    	var alertErrMsg = "";
    	$("#id_progress-error").html("");
    	$("#pin_progress-error").html("");
    	$("#authcode_chip_progress-error").html("");
    	if(custId == "" || custId == null) {
			$("#id_progress-error").html("請輸入身分證字號!");
			alertErrMsg = "請輸入身分證字號! ";
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10) {
			$("#id_progress-error").html("請輸入正確身分證字號!");
			alertErrMsg = "請輸入正確身分證字號! ";
			submitFlag = false;
		}
    	if($("#pin_progress").val() == "" || $("#pin_progress").val() == null) {
			$("#pin_progress-error").html("請輸入晶片卡密碼!");
			alertErrMsg += "請輸入晶片卡密碼! ";
			submitFlag = false;
		}
    	if($("#authcode_chip_progress").val() == "" || $("#authcode_chip_progress").val() == null) {
			$("#authcode_chip_progress-error").html("請輸入圖形驗證碼!");
			alertErrMsg += "請輸入圖形驗證碼! ";
			submitFlag = false;
		}
    	if(submitFlag) {
    		
			window.sessionStorage["pin"] = "pin_progress";	
			var result = CheckItem();
			if(result) {
				var param = {
			    		"id_progress" : $("#id_progress").val(),
			    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
			    		"picAuthCode" : $("#authcode_chip_progress").val(),
			    		"Tag" : $("#Tag").val(),
			    		"IssAcctNo" : $("#IssAcctNo_bc").val()
			    	};
				pgObj.BCStatus = false;
				$("#progress_bankcard_text").html("");
				$("#progress_bankcard_title").hide();
		    	$.ajax({
					url:"./progress/pg01_bcauth.jsp",
					dataType:"text",
					type:"post",
					cache:false,
					data:param,
					success:function(data){					
						var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
						pgObj.BCStatus = true;
						jsonObj = $.parseJSON(dataStr);
						if(jsonObj.rtnCode == "001"){
							$("#progress_bankcard_text").html(jsonObj.msg);
							$("#progress_bankcard_title").show();
							var errorType = jsonObj.errorType;
							if(errorType == "2") {
								window.location.hash = "#search-fail-modal";
								//$("#search-fail-modal").modal('show');
							}else if(jsonObj.msg =="圖片驗證碼錯誤，請重新輸入!"){
								replaceCheckPic('checkChipPic_pg');
							}
							
						}else if(jsonObj.rtnCode == "000") {
							document.getElementById("submitType_bc").value = jsonObj.submitType;
							document.getElementById("custId_bc").value = jsonObj.custId;
							document.getElementById("authType_bc").value = jsonObj.authType;
							document.getElementById("dateStrDate_bc").value = jsonObj.dateStrDate;
							document.getElementById("dateStrTime_bc").value = jsonObj.dateStrTime;
							document.getElementById("sessionID_bc").value = jsonObj.sessionID;
							document.getElementById("authCode_bc").value = jsonObj.authCode;
							$("#progress_bc_form").submit();
						}
					}
				});
			}
    	}else {
    		//alertErrMsg = alertErrMsg.substring(0, alertErrMsg.length-6);
    		$("#progress_bankcard_text").html(alertErrMsg);
    		$("#progress_bankcard_title").show();
    		$("#progress-bankcard-modal").scrollTop(0);
    	}
	}
//atm51.js
    function GetUsedReader_pg()
    {
    	  XCsp.ListReaders();       //列出讀卡機

        if($('input[name=selReader_pg]').val()=="") {
        	$('input[name=UsedReader_pg]').val(XCsp.caReader1);
        	$('.datalist[for="selReaderList"] > div[value="1"]').trigger('click'); // 配合新美工@verify_2.jsp
        }
        else{
        	$('input[name=UsedReader]').val($('input[name=selReader]').val());
        }
    	

        if ($('input[name=selReader]').val()==""){    
            // alert("請選擇正確之讀卡機");
        }else {    	
            XCsp.DisConnectCard();
            bCdReady = XCsp.ConnectCard();      
            if(bCdReady != 0) {        	
                if(bCdReady == -2146435060 || bCdReady == -2146434967) {
                    alert("請將晶片金融卡插入讀卡機");
                    bCdReady = XCsp.ConnectCard();
                    if(bCdReady != 0) {
                        alert("讀卡機無法連線到晶片金融卡,請您再次確認是否已正確插入讀卡機!\n若您確認已插入讀卡機，建議您先按下方”確定”鍵，再按鍵盤上的”f5”鍵，可重新啟動連線。\n註：如您仍有使用問題，請您直接撥打客服電話02-26553355");
                        XCsp.DisConnectCard();
                        XCsp.DisConnectReader();
                        return;
                    }
                }
                else {
                    alert("晶片卡讀取錯誤！\n(RtnCode=" + bCdReady + ")");
                    return;
                }
            }        
        }
        // checkReaderToExpandPage($('input[name=selReaderV]').val());
        // Timer=setTimeout('checkReader2()',500);
    }
    //以下照抄，尚須做修改，沒使用到預定刪除
    function returnToken22(tokenValue)
	{
		document.txForm.pin.value += tokenValue;
	}
	function clearToken22()
	{
		document.txForm.pin.value = '';
	}
	function checkReaderToExpandPage22()
	{
	    //if(XCsp.isPinPadReader == "True") {
	    if(false) { //先將第二代讀卡機的功能 disabled
	        var words = WordsOfPinPadReader;
	        if(navigator.appName == "Netscape") {
	            //document.htmlWords1.document.write(words);
	            //document.htmlWords.document.write('&nbsp;<input name="pin" type="password" class="b1" size="14" maxlength="12">');
	            document.getElementById("htmlWords1").innerHTML = words;
	            //document.getElementById("htmlWords").innerHTML='&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">';
	        }
	        else if(navigator.appVersion.indexOf("MSIE") != -1 || navigator.appName == 'Microsoft Internet Explorer' || navigator.appName.indexOf("PCman") != -1) {        
	            document.all("htmlWords1").innerHTML = words;
	            //document.all("htmlWords").innerHTML='&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">';
	        }
	        else {  
	            document.htmlWords1.document.write(words);
	            //document.htmlWords.document.write('&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">');
	        }
	    }
	    else {
	        var words = WordsOfNonPinPadReader;
	        //alert("navigator.appName:"+navigator.appName);
	        if(navigator.appName == "Netscape") {
	            //document.htmlWords1.document.write(words);
	            //document.htmlWords.document.write('&nbsp;<input name="pin" type="password" class="b1" size="14" maxlength="12">');
	            document.getElementById("htmlWords1").innerHTML = words;
	            //document.getElementById("htmlWords").innerHTML='&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">';
	        }
	        else if(navigator.appVersion.indexOf("MSIE") != -1 || navigator.appName == 'Microsoft Internet Explorer' || navigator.appName.indexOf("PCman") != -1) {        
	            document.all("htmlWords1").innerHTML = words;
	            //document.all("htmlWords").innerHTML='&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">';
	        }
	        else {
	            //document.htmlWords.document.write('&nbsp;<input name="pin" type="password" class="text" size="15" style="width: 155px; height:22px" maxlength="12">');
	            document.htmlWords1.document.write(words);
	        }
	    }
	} 
	    
	
	//複製chipcardverifyOpenAcct.js
	function CheckItem_pg(){

		  //console.log('CheckItem pin ...');
		  if(isSelfCard("812")) {
			//console.log("XCsp.isPullPlugReader:"+XCsp.isPullPlugReader);
		    //console.log("XCsp.baReaderName:"+XCsp.baReaderName);
		    if(XCsp.isPullPlugReader == "False" && XCsp.baReaderName.indexOf("<%= bull.utils.tools.PropertyUtl.getProperty('EBANK.properties', 'InterceptVerifyPin') %>") != -1) {
		      //Added by James for InterceptVerifyPin
		      var words = '';
		      words += '                  <span class="9font" valign="middle"><font size="2" color="red">';
		      words += '                  <%= new String(bull.utils.tools.PropertyUtl.getProperty("EBANK.properties", "InterceptVerifyPinLoginHint").getBytes("ISO8859-1"), "UTF-8") %>';
		      words += '                  </font></span>';
		      if(navigator.appName == "Netscape") {
		        document.htmlWords2.document.write(words);
		      } else if(navigator.appVersion.indexOf("MSIE") != -1) {
		        document.all("htmlWords2").innerHTML = words;
		      } else {
		        document.htmlWords2.document.write(words);
		      }      
		      //InitTimer = setTimeout('CheckPIN()',500);
		      
		      //console.log("pin_apply:"+$("#"+window.sessionStorage["pin"]).val());
		      check = UserCheckPIN($("#"+window.sessionStorage["pin"]).val());

		      
		      check = VerifyPIN($("#"+window.sessionStorage["pin"]).val());
		      if(check ==false){
		    	  //console.log("error");
		      } else {
		    	  //console.log("ok");
		        // txForm.submit();
		      }
		      return false;
		    } else {
		    	
		      check = VerifyPIN($("#"+window.sessionStorage["pin"]).val());
		      if(check == false){
		        // txForm.pin.focus();
		        // txForm.Submit1.disabled = false;
		        // txForm.Submit2.disabled = false;
		        // document.txForm.Submit1.className = 'buttonLogin';
		        return false;
		      }
		    }
		  } else {
		    alert("限持台新銀行晶片卡才可使用此功能喔!");
		    // txForm.Submit1.disabled = false;
		    // txForm.Submit2.disabled = false;
		    // document.txForm.Submit1.className='buttonLogin';
		    //XCsp.DisconnectCard();
		    //XCsp.DisconnectReader();
		    //window.close();
		    return false;
		  }
		  //alert('CheckItem pin OK');
		  //document.sForm.PageBeginLogTime.value=getPageTime();
		  //document.sForm.thisPageName.value="/RB00/RB00010200.jsp";
		  // document.getElementById("ChipLoginMsg").style.visibility = 'visible';
		  // document.getElementById("butObj").style.visibility ='hidden';
		  return check;
		}

	//以下使用公版的就好，將來會刪除
	function getReader222(){
		bRdrReady = XCsp.ConnectReader();
    	if (bRdrReady != 0) {
    		alert("讀卡機連線失敗(" + bRdrReady + ")");
    		return false;
    	} else {
    		XCsp.ListReaders();    //列出讀卡機
    		if (XCsp.inor == -1) {
    			alert("請將讀卡機接上您的電腦後, 再按確定!");
    			XCsp.ListReaders();    //列出讀卡機
    			if (XCsp.inor == -1) {
    				alert("無法連線到讀卡機, 歡迎下次使用晶片金融卡於本系統!");
    				XCsp.DisConnectReader();
    				return false;
    			} else {
    				return true;
    			}
    		} else {
    			return true;
    		}
    		return false;
    	}
    }  	
  	
    function connectCardFlow222(){
    	//console.log("connectCardFlow");
    	var isInsert = false;
          isInsert = connectIssCard();
          if(!isInsert) {
            alert("讀卡機無法連線到晶片卡，請您再次確認晶片卡是否已正確插入讀卡機！<br>若您已插入讀卡機，請重新插入，待讀卡機燈號未閃爍時，再按F5重新整理網頁。<br>如有任何疑問，請洽客服中心(02)2655-3355。");
    	    XCsp.DisConnectCard();
    	    XCsp.DisConnectReader();
            return false;
          }
        return true;
      }    
    function connectIssCard222(){
    	//console.log("connectIssCard");
    	XCsp.DisConnectCard();
	    XCsp.DisConnectReader();

	    XCsp.ConnectReader();
	    XCsp.ListReaders();
	    
        var isInsert = false;
        var i;
        for(i=0; i<XCsp.iNoR; i++) {
        	var tmpReader = eval('XCsp.caReader'+(i+1)) ;
        	//console.log("tmpReader:"+tmpReader);
        	
    	   // $('#selReader').append('<div value="'+(i+1)+ '" onclick="selectOption(this)">'+ tmpReader  +'</div>');
    	   $('#selReader').append($('<option>', { 
		        value: (i+1),
		        text :tmpReader 
		    }));		 
    	   if(isInsert == false) {
            eval("XCsp.baReaderName = XCsp.caReader" + (i+1) + ";");
            bCdReady = XCsp.ConnectCard();
            if(bCdReady == 0) {
              	$('.datalist[for="selReaderList"] > div[value="'+(i+1)+'"]').trigger('click');
              return true;
            }else if(bCdReady == 1016) {
              // alert("請確認連接之網址是否正確");   
              return false;
            }		
          }
        }
        return false;
      }
  	
  	
 	
  	
    function InitWin222(){
		//判斷eAtm ActiveX元件版本機制
		//console.log('XCsp.versionID:'+XCsp.versionID);
		if(XCsp.versionID == undefined || XCsp.versionID != "<%= ATM_Version %>") {
			var oldVersionID = XCsp.versionID;
			var newVersionID = "<%= java.net.URLEncoder.encode(ATM_Version) %>";
			theUrl = "../include/VersionErrorPageVerifyUCM.jsp?oldVersionID=" + oldVersionID + "&newVersionID=" + newVersionID;
			//this.location = theUrl;
			return;
		}

	    XCsp.DisConnectCard();
	    XCsp.DisConnectReader();
		
		XCsp.noPullPlugReader = "<%= noPullPlugReader %>";
		
		// 仿照eATM
		if (!getReader()) {
			return;
		}
		if (!connectCardFlow()) {
			return;
		}
		if(!isSelfCard("812")) {
			alert("目前跨行交易暫停服務, 歡迎下次使用台新晶片金融卡於本系統!");
			XCsp.DisConnectCard();
			XCsp.DisConnectReader();
			return;
		}
		
		
		XCsp.newPinPadReader = "<%= newPinPadReader %>";
		// InitTimer=setTimeout('GetUsedReader()',500);
   	}
//------------------------------參考

