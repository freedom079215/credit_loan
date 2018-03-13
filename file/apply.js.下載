
	    
	function verify_ic_apply(){
		
	
		window.sessionStorage["pin"]="pin_apply";	
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
		var ErrMsg = "";
		var custId = $("#id_apply").val();
		var regExp = /^[\d|a-zA-Z]+$/;
		var reqNumExp = /^[0-9]+$/;
		$("#id_apply-error").html("");
		$("#pin_apply-error").html("");
		$("#authcode_chip_apply-error").html("");
		$("#apply_chip_msg").hide();
		if(custId == "" || custId == null){
			//alertErrMsg = alertErrMsg + "請輸入身分證字號!\n";
			//showErrorText("#PARTY_ID","請輸入身分證字號!");
			$("#id_apply-error").html("請輸入身分證字號!");
			ErrMsg=ErrMsg+"請輸入身分證字號!";
			submitFlag = false;
		}else if(custId.search(custIdExp)==-1 || custId.length != 10){
		//alertErrMsg = alertErrMsg + "請輸入正確身分證字號!\n";
		//showErrorText("#PARTY_ID","請輸入正確身分證字號");
			$("#id_apply-error").html("請輸入正確身分證字號!");
			ErrMsg=ErrMsg+"請輸入正確身分證字號!\n";
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
				$("#id_apply-error").html("請輸入正確身分證字號!");
				ErrMsg=ErrMsg+"請輸入正確身分證字號!\n";
				submitFlag = false;
			} 
		}
		
		
		if($("#pin_apply").val()==""){
			submitFlag = false;	
			$("#pin_apply-error").html("請輸入晶片卡密碼！");
			ErrMsg=ErrMsg+"請輸入晶片卡密碼！\n";
			
		}
		if($("#empno_apply").val() == "如有指定業務請務必填寫業務員編" || $("#empno_apply").val() == ""){
			$("#empno_apply").val("");
		}else if($("#empno_apply").val().length < 6 || $("#empno_apply").val().length > 7 || !$("#empno_apply").val().match(reqNumExp)){
			ErrMsg=ErrMsg+"請填入正確業務人員編號\n";
			submitFlag = false;
		}
		if($("#authcode_chip_apply").val()==""){
			submitFlag = false;	
			$("#authcode_chip_apply-error").html("請輸入圖片驗證碼！");
			ErrMsg=ErrMsg+"請輸入圖片驗證碼！\n";
		}
		if(submitFlag==false){
			$("#apply_chip_msg").show();
			$("#apply_chip_text").html(ErrMsg);
			$("#bankcard-modal").scrollTop(0);
		}else{
			$("#id_apply").val($("#id_apply").val().toUpperCase());
			CheckItem();
		}	
		
		////console.log(CheckItem());
	}
	function applyresend(){
		if(counter==0){}
		else{
			return;
		}
		var param = {
	    		"mobilno" :$("#card_apply_mobileNo").val(),
	    		"mail" : $("#card_apply_mail").val(),
	    		"custId" : $("#card_apply_custid").val()
	    };
		var resendAction = "./apply/cardauthcoderesend.jsp";	
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
					$("#creditcard-verify-modal").scrollTop(0);
					$("#apply_cardSMS_msg").show();
					$("#apply_cardSMS_text").html(jsonObj.msg);
				}
				else if(jsonObj.rtnCode == "000"){		
					counter = COUNTER_START;
					showTimeInfoTimer();
				}
			}
		});
	}
	 function applyCardSmsCheck(){
		 	$("#card_apply_custid").val($("#card_apply_custid").val().toUpperCase());
	    	var resendAction = "./apply/cardauthcode.jsp";	       
	        var sessionId=window.sessionStorage["sessionId"];
			var param = {
		    		"sessionId" :sessionId,
		    		"authCode" : $("#cardcodesms_apply").val(),
		    		"custId" : $("#card_apply_custid").val()
		    	};
			$("#apply_cardSMS_msg").hide();
			$("#apply_cardSMS_text").html("");
			if($("#cardcodesms_apply").val()==""){
				$("#apply_cardSMS_msg").show();
				$("#apply_cardSMS_text").html("請輸入驗證碼!");
				$("#creditcard-verify-modal").scrollTop(0);
				return;
			}
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
						$("#creditcard-verify-modal").scrollTop(0);
						$("#apply_cardSMS_msg").show();
						$("#apply_cardSMS_text").html(jsonObj.msg);
					}
					else if(jsonObj.rtnCode == "000"){						
						document.apply_card_form.submit();
					}
				}
			});
	    }   
	 function applyCardCheck(){
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
			var merrsg="";
			var total = 0;
			var alertErrMsg = "";
			var custId = $("#cardid_apply").val();
			var regExp = /^[\d|a-zA-Z]+$/;
			var reqNumExp = /^[0-9]+$/;
			$("#cardid_apply-error").html("");
			$("#cardno_apply-error").html("");
			$("#carddate_apply-error").html("");
			$("#cardcv_apply-error").html("");
			$("#cardcode_apply-error").html("");
			$("#apply_card_msg").hide();
			$("#apply_card_text").html("");
			$("#carddate_apply-error").hide();	
			if(custId == "" || custId == null){
				//alertErrMsg = alertErrMsg + "請輸入身分證字號!\n";
				//showErrorText("#PARTY_ID","請輸入身分證字號!");
				$("#cardid_apply-error").html("請輸入身分證字號!");
				merrsg="請輸入身分證字號!";
				submitFlag = false;
			}else if(custId.search(custIdExp)==-1 || custId.length != 10){
			//alertErrMsg = alertErrMsg + "請輸入正確身分證字號!\n";
			//showErrorText("#PARTY_ID","請輸入正確身分證字號");
				$("#cardid_apply-error").html("請輸入正確身分證字號!");
				merrsg="請輸入正確身分證字號!";
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
					$("#cardid_apply-error").html("請輸入正確身分證字號!");
					merrsg="請輸入正確身分證字號!";
					submitFlag = false;
				} 
			}
//			var CustStr3 = custId;
//			if (CustStr3== 'A110269003' || CustStr3=='A202277708'  || CustStr3 == 'A221987274' || CustStr3 == 'B221066299' ||
//				CustStr3 =='B221195419' || CustStr3 =='D220041905' || CustStr3 == 'E101794220' || CustStr3 == 'F120339311' ||
//				CustStr3 =='F126694991' || CustStr3 =='G120562553' || CustStr3 == 'H121557842' || CustStr3 == 'J120242825' ||
//				CustStr3 =='J201762386' || CustStr3 =='J220472030' || CustStr3 == 'J221524962' || CustStr3 == 'K121695670' ||
//				CustStr3 =='K220172161' || CustStr3 =='K220273912' || CustStr3 == 'L101042388' || CustStr3 == 'L120536565' ||
//				CustStr3 =='L120562869' || CustStr3 =='L120571475' || CustStr3 == 'L120575704' || CustStr3 == 'L120584383' ||
//				CustStr3 =='L120691963' || CustStr3 =='L121222864' || CustStr3 == 'L121726732' || CustStr3 == 'L122695094' ||
//				CustStr3 =='L201431690' || CustStr3 =='L220673109' || CustStr3 == 'L220698428' || CustStr3 == 'L220701617' ||
//				CustStr3 =='L220707342' || CustStr3 =='L221729066' || CustStr3 == 'L222322294' || CustStr3 == 'L222329917' ||
//				CustStr3 =='M120071766' || CustStr3 =='M200761065' || CustStr3 == 'N220671296' || CustStr3 == 'N222462624' ||
//				CustStr3 =='Q221364729' || CustStr3 =='R221642489' || CustStr3 == 'R224076512' || CustStr3 == 'S120548481' ||
//				CustStr3 =='S221761908' || CustStr3 =='T120503492' || CustStr3 == 'T120915527' || CustStr3 == 'T220498416' ||
//				CustStr3 =='A224002269' || CustStr3 =='E120050814' || CustStr3 == 'E222150766' || CustStr3 == 'G120565241' ||
//				CustStr3 =='G221098858' || CustStr3 =='H121641429' || CustStr3 == 'J120238796' || CustStr3 == 'J200515543' ||
//				CustStr3 =='J220121878' || CustStr3 =='J221112426' || CustStr3 == 'J221131118' || CustStr3 == 'J221531681' ||
//				CustStr3 =='J221706295' || CustStr3 =='L120672762' || CustStr3 == 'L120941477' || CustStr3 == 'L220706176' ||
//				CustStr3 =='L220854882' || CustStr3 =='L222058226' || CustStr3 == 'L222355211' || CustStr3 == 'L222580465' ||
//				CustStr3 =='M120882090' || CustStr3 =='N223546530' || CustStr3 == 'S121761620'	){
//				//alert("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
//				$("#cardid_apply-error").html("親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！");
//				merrsg=merrsg+"親愛的客戶，由於您的信用卡曾遭冒用，為保障您的權益，如欲申請網路銀行/行動銀行服務，請親電本行信用卡客服中心(0800-023-123)由專人為您處理，或親臨台新銀行各分行櫃台辦理，謝謝！\n";
//				submitFlag = false;
//			}
			var cardNoComplete = $("#cardno_apply").val();
			if($("#cardno_apply").val() == null || $("#cardno_apply").val() == "" || $("#cardno_apply").val().length < 16){
				//alertErrMsg = alertErrMsg + "請輸入信用卡卡號!\n";
				//showErrorText("#cardNo","請輸入信用卡卡號!");
				$("#cardno_apply-error").html("請輸入信用卡卡號!");
				merrsg=merrsg+"請輸入信用卡卡號!";
				submitFlag = false;
			}else if(!cardNoComplete.match(reqNumExp)){
				//alertErrMsg = alertErrMsg + "請輸入正確信用卡卡號!\n";
				//showErrorText("#cardNo","請輸入正確信用卡卡號!");
				$("#cardno_apply-error").html("請輸入正確信用卡卡號!");
				merrsg=merrsg+"請輸入正確信用卡卡號!";
				submitFlag = false;
			}
			var expireDate = $("#carddate_apply").val();
			if($("#carddate_apply").val() == null || $("#carddate_apply").val() == "" || $("#carddate_apply").val().length < 4){
				//alertErrMsg = alertErrMsg + "請輸入有效年月!\n";
				//showErrorText("#expireDate","請輸入有效年月!");
				$("#carddate_apply-error").html("請輸入有效月年!");
				merrsg=merrsg+"請輸入有效月年!";
				$("#carddate_apply-error").show();
				submitFlag = false;
			}else if(!expireDate.match(reqNumExp)){
				//alertErrMsg = alertErrMsg + "請輸入正確有效年月!\n";
				//showErrorText("#expireDate","請輸入正確有效年月!");
				$("#carddate_apply-error").show();
				$("#carddate_apply-error").html("請輸入正確有效月年!");
				merrsg=merrsg+"請輸入正確有效月年!";
				submitFlag = false;
			}
			var cvv2 = $("#cardcv_apply").val();
			if($("#cardcv_apply").val() == null || $("#cardcv_apply").val() == ""){
				//alertErrMsg = alertErrMsg + "請輸入卡片檢核碼!\n";
				//showErrorText("#cvv2","請輸入卡片檢核碼!");
				$("#cardcv_apply-error").html("請輸入卡片檢核碼!");
				merrsg=merrsg+"請輸入卡片檢核碼!";
				submitFlag = false;
			}else if(!cvv2.match(reqNumExp) || cvv2.length != 3){
				//alertErrMsg = alertErrMsg + "請輸入正確卡片檢核碼!\n";
				//showErrorText("#cvv2","請輸入正確卡片檢核碼!");
				$("#cardcv_apply-error").html("請輸入正確卡片檢核碼!");
				merrsg=merrsg+"請輸入正確卡片檢核碼!";
				submitFlag = false;
			}
			if($("#cardsale_apply").val() == "如有指定業務請務必填寫業務員編" || $("#cardsale_apply").val() == ""){
				$("#cardsale_apply").val("");
			}else if($("#cardsale_apply").val().length < 6 || $("#cardsale_apply").val().length > 7 || !$("#cardsale_apply").val().match(reqNumExp)){
				merrsg=merrsg+"請填入正確業務人員編號";
				submitFlag = false;
			}
			if($("#cardcode_apply").val()==""){			
				$("#cardcode_apply-error").html("請填入圖片驗證碼");
				merrsg=merrsg+"請填入圖片驗證碼!";			
				submitFlag = false;
			}
			if(submitFlag==false){
				//$("#apply_title").show();
				//$("#apply_text").html(errmsg);
				$("#creditcard-modal").scrollTop(0);
				$("#apply_card_msg").show();
				$("#apply_card_text").html(merrsg);
				return;
			}else{	
				var resendAction = "./apply/cardauth.jsp";	
				//console.log( $("#NonSessionSessionId").val());
				var param = {
			    		"cardid_apply" : custId,
			    		"NonSessionSessionId" : $("#NonSessionSessionId").val(),
			    		"cardcode_apply" : $("#cardcode_apply").val(),
			    		"cardsale_apply" :$("#cardsale_apply").val(),
			    		"cardno_apply":$("#cardno_apply").val(),
			    		"cardcv_apply":$("#cardcv_apply").val(),
			    		"carddate_apply":$("#carddate_apply").val()
			    		
			    	};			
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
							$("#creditcard-modal").scrollTop(0);
							$("#apply_card_msg").show();
							$("#apply_card_text").html(jsonObj.msg);
							changeCheckPicCardApply();
						}
						else if(jsonObj.rtnCode == "000"){
							window.sessionStorage["maskphone"] = jsonObj.maskphone;
							window.sessionStorage["maskmail"] = jsonObj.maskmail;
							window.sessionStorage["emailAddr"] = jsonObj.emailAddr;
							window.sessionStorage["mobileNo"] = jsonObj.mobileNo;
							window.sessionStorage["sessionId"] = jsonObj.sessionId;
							window.sessionStorage["custId"] = jsonObj.custId;
							window.sessionStorage["cardno"] = jsonObj.cardno;
							window.sessionStorage["empId"] = jsonObj.empId;							
						  	window.location.href="./index.jsp#creditcard-verify-modal";
						}
					}
				});
				return;
			}
			
		}
	 function applyNbCheck(){

	  		var errmsg="";
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
			var total = 0
			var reqNumExp = /^[0-9]+$/;
			var alertErrMsg = "";
			var custId = $("#user_id_apply").val();
			var usercode = $("#user_code_apply").val();
			var pwd = $("#user_pwd_apply").val();
			$("#user_id_apply-error").html("");
			$("#user_code_apply-error").html("");
			$("#user_pwd_apply-error").html("");
			$("#authcode_apply-error").html("");
			$("#apply_nb_msg").hide();
			$("#apply_nb_text").html("");
			if(custId =="" || custId == null){
				$("#user_id_apply-error").html("請輸入身分證字號!");
				//setError("#user_id_apply");
				submitFlag = false;
				errmsg=errmsg+"請輸入身分證字號\n";
			}else if(custId.search(custIdExp)==-1 || custId.length != 10){	
				$("#user_id_apply-error").html("請輸入正確身分證字號");
				//setError("#user_id_apply");
				submitFlag = false;
				errmsg=errmsg+"請輸入正確身分證字號\n";
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
					$("#user_id_apply-error").html("請輸入正確身分證字號");
					//setError("#user_id_apply");
					submitFlag = false;
					errmsg=errmsg+"請輸入正確身分證字號\n";
				}
			}

			if(usercode =="" || usercode == null){
				$("#user_code_apply-error").html("請輸入使用者代號!");
				//setError("#user_code_apply");
				submitFlag = false;
				errmsg=errmsg+"請輸入使用者代號\n";
			}else if(usercode.length <6){
				$("#user_code_apply-error").html("使用者代號不得小於六位");
				//setError("#user_code_apply");
				submitFlag = false;
				errmsg=errmsg+"使用者代號不得小於六位\n";
			}

			if(pwd =="" || pwd == null){
				$("#user_pwd_apply-error").html("請輸入使用者密碼!");
				//setError("#user_pwd_apply");
				submitFlag = false;
				errmsg=errmsg+"請輸入使用者密碼\n";
			}else if(pwd.length <4){
				$("#user_pwd_apply-error").html("使用者密碼不得小於四位");
				//setError("#user_pwd_apply");
				submitFlag = false;
				errmsg=errmsg+"使用者密碼不得小於四位\n";
			}
			var empIdval = $("#empid_apply").val();
			if($("#empid_apply").val() == "如有指定業務請務必填寫業務員編" || $("#empid_apply").val() == ""){
				$("#empid_apply").val("");
			}else if($("#empid_apply").val().length < 6 || $("#empid_apply").val().length > 7 || !empIdval.match(reqNumExp)){
	   			errmsg=errmsg+"請填入正確業務人員編號\n";
				submitFlag = false;
			}

			if($("#authcode_apply").val() == null || $("#authcode_apply").val() == "" || $("#authcode_apply").val() == "請輸入右圖數字"){
				$("#authcode_apply-error").html("請填入圖片驗證碼");			
				errmsg=errmsg+"請填入圖片驗證碼\n";
				submitFlag = false;    			
			}
			
			if(submitFlag==false){
				//$("#apply_title").show();
				//$("#apply_text").html(errmsg);
				$("#apply_nb_msg").show();
				$("#apply_nb_text").html(errmsg);
				$("#webbank-modal").scrollTop(0);
				return;
			}else{		
				$("#user_id_apply").val($("#user_id_apply").val().toUpperCase());
				document.apply_nb_form.submit();
				return;
			}		
	  	}