function GenData(ATM_CheckNum)
{
  var LoginData;
  //console.log("ATM_CheckNum:"+ATM_CheckNum);
  LoginData = GenLoginData(ATM_CheckNum);
  //console.log("LoginData.length:"+LoginData.length);
  if(LoginData.length > 0) {
    //console.log("BankID:"+XCsp.issueNo);
    document.sign_chip_form.BankID.value = XCsp.issueNo;
    document.sign_chip_form.Memo.value = XCsp.Remark;
    document.sign_chip_form.SNum.value = XCsp.ICC;
    document.sign_chip_form.LoginData.value = LoginData;
    document.sign_chip_form.submit();
  }else {
	  alert("晶片卡驗證失敗");
  }
}
function GenLoginData(ATM_CheckNum)
{
    var LoginData = "";
    XCsp.FdChkCode = ATM_CheckNum;
    RtnCode = XCsp.GenLoginData();
    if(RtnCode == 0)
        LoginData = XCsp.OptionData1;
    else if(XCsp.uiSW12 != 1015 && XCsp.uiSW12 != 1018)
    {
        if(XCsp.uiSW12 == 1005)
            //alert("本次交易已無法順利進行，失敗原因可能如下：\n1. 交易進行中可能取出(或交換)晶片卡；或是可能取出(或交換)晶片卡讀卡機\n （本行提醒您，當進行晶片卡交易時，為保障交易安全，請您不要在交易進行時取出(或交換)晶片卡或讀卡機）。\n2. 發卡行網路連線或系統線路壅塞\n3. 讀取晶片卡資料時發生讀取錯誤\n4. 讀卡機故障，或是讀卡機安裝不完整\n （其他系統問題建議與本行客戶服務中心聯絡）。\n\n本次交易已無法完成，請重新登入網路ATM，造成不便，敬請見諒！");
            alert("本次交易無法順利進行，原因是系統未能順利偵測到您的晶片卡！\n若您仍需進行帳務交易時，為確保帳戶安全，請您重新登入網路ATM。\n造成不便，敬請見諒！");
        else
            alert("[" + XCsp.uiSW12 + "]ActiveX元件發生錯誤!");
    }
    return LoginData;
}
function InitReader()
{
	  bRdrReady = XCsp.ConnectReader();
    if (bRdrReady != 0)
        alert("讀卡機連線失敗(" + bRdrReady + ")");
    else {
    		
        XCsp.ListReaders();    //列出讀卡機
        if (XCsp.iNoR == 1) {
            document.getElementsByName('selReader').options[0].text = XCsp.caReader1.substring(0,25);
            document.getElementsByName('UsedReader')[0].value = XCsp.caReader1;

            XCsp.baReaderName = document.getElementsByName('UsedReader')[0].value;
            bCdReady = XCsp.ConnectCard();
            if(bCdReady != 0)
                alert("請將晶片金融卡插入讀卡機");
        }
        else {
            document.getElementsByName('UsedReader')[0].value = XCsp.caReader1;
            document.getElementsByName('selReader')[0].length = XCsp.iNoR;
            var i;
            var isInsert = false;
            for(i=0; i<XCsp.iNoR; i++) {
                eval("document.getElementsByName('selReader').options[" + i + "].text = XCsp.caReader" + (i+1) + ".substring(0,25);");

                eval("XCsp.baReaderName = XCsp.caReader" + (i+1) + ";");
                bCdReady = XCsp.ConnectCard();
                if(bCdReady == 0)
                    isInsert = true;
            }

            if(isInsert == false)
                alert("請將晶片金融卡插入讀卡機");
        }
    }
}

function GetUsedReader()
{
	  XCsp.ListReaders();       //列出讀卡機

    if($('input[name=selReader]').val()=="") {
    	$('input[name=UsedReader]').val(XCsp.caReader1);
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

function checkReaderToExpandPage(index)
{
	
    if(XCsp.isPinPadReader == "True") {
        var words = WordsOfPinPadReader;
        document.getElementById("htmlWords").innerHTML=words;

    }
    else {
    	
        var words = WordsOfNonPinPadReader;        
        document.getElementById("htmlWords").innerHTML=words;

    }

    eval("document.getElementsByName('UsedReader')[0].value = XCsp.caReader" + index + ";");
    // document.txForm.selReader.length = XCsp.iNoR;
    for(i=0; i<XCsp.iNoR; i++){
    	eval("document.getElementsByName('selReader')[0].options[" + i + "].text = XCsp.caReader" + (i+1) + ".substring(0, 25);");
    }
    $('.datalist[for="selReaderList"] > div[value="' + index + '"]').trigger('click'); // 配合新美工@verify_2.jsp
}

function checkReader2()
{
	
	////console.log('XCsp.isPinPadReader:'+XCsp.isPinPadReader);
	
    if(XCsp.isPinPadReader == "True") {
	      if(VerifyPINonPAD()) {
            // document.txForm.submit();
        }
    }
    else {
        //txForm.pin.focus();
    	$('input[name=pin]').focus();
    }
}

function isSelfCard(BankID) {
    var RtnCode = XCsp.FiscListAccounts();
    if(RtnCode < 0)
        alert("晶片卡讀取錯誤！\n(RtnCode=" + RtnCode + ")");

    var IssueNo = XCsp.issueNo;
    if(IssueNo.substring(0, 3) == BankID)
        return true;
    else
        return false
	
}

function VerifyPIN()
{
	////console.log('VerifyPIN:'+$("#"+window.sessionStorage["pin"]).val());
	
    if($("#"+window.sessionStorage["pin"]).val().length < 6 || $("#"+window.sessionStorage["pin"]).val().length > 12) {
        alert("請輸入6-12位數字的密碼！");
//        document.getElementsByName(window.sessionStorage["pin"]).value = '';
//        document.getElementsByName(window.sessionStorage["pin"]).focus();
        return false;
    }

    XCsp.bPq = 16 ;
    XCsp.baBuf = $("#"+window.sessionStorage["pin"]).val();
    RtnCode = XCsp.VerifyPIN();
    $("#"+window.sessionStorage["pin"]).val("");

    ////console.log('VerifyPIN:RtnCode:'+RtnCode+', XCsp.baBuf:'+XCsp.baBuf );
	////console.log('col:'+window.sessionStorage["pin"]);
    if(RtnCode == 0) {
    	////console.log('VerifyPIN:RtnCode==0')
    	////console.log(XCsp.uiSW12);
    	if(XCsp.uiSW12 == 0x9000) {
    		////console.log('VerifyPIN:uiSW12:0x9000');
    		
            XCsp.FiscListAccounts();
    		////console.log(" XCsp.account0:"+ XCsp.account0);
    		if(window.sessionStorage["pin"]=="pin_apply"){    			
    			$("#apply_chip_cardno").val(XCsp.account0);
    			document.apply_chip_form.submit();
    		}
    		if(window.sessionStorage["pin"]=="pin_sign"){    			
    			$("#sign_chip_cardno").val(XCsp.account0);
    			var resendAction = "./sign/chipauth.jsp";	
    			var param = {
    		    		"id_sign" :$("#id_sign").val(),
    		    		"sign_chip_cardno" : XCsp.account0,
    		    		"usercode_sign" : $("#usercode_sign").val(),
    		    		"Tag":"ph1"
    		    };
    			$.ajax({
    				url:resendAction,
    				dataType:"text",
    				type:"post",
    				cache:false,
    				data:param,
    				success:function(data){	
    					//console.log(data); 
    					var dataStr = data.substring(data.indexOf("cuts")+4,data.indexOf("cute"));
    					jsonObj = $.parseJSON(dataStr);			
    					document.sign_chip_form.ATM_No.value = jsonObj.ATM_No;
    					GenData(jsonObj.ATM_CheckNum);
    					
    				}
    			});
    			//document.sign_chip_form.submit();
    		}
    		$("input[name=IssAcctNo]").val(XCsp.account0);
    		// document.getElementsByName('IssAcctNo')[0].value = XCsp.account0;
    		//setPageData({IssAcctNo: XCsp.account0})
            return true;
        }
        else if(XCsp.uiSW12 == 0x6608) {
        	////console.log('VerifyPIN:uiSW12:0x6608')
        	
            alert("晶片卡密碼錯誤，請您重新輸入！\n提醒您：若密碼連續錯誤次數達三次，晶片卡將自動鎖卡！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPIN]密碼錯誤");

            
        }
        else if(XCsp.uiSW12 == 0x6620) {
        	////console.log('VerifyPIN:uiSW12:0x6620')
        	
            alert("晶片卡已鎖卡, 請洽分行辦理！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPIN]晶片卡已鎖卡");

            
        }
        else {
        	////console.log('VerifyPIN:uiSW12:others')
        	
            //alert("[" + XCsp.uiSW12 + "]晶片卡讀取錯誤, 請重新啟動瀏覽器並重新登入！");
            alert("[" + XCsp.uiSW12 + "]本次交易已無法順利進行，失敗原因可能如下：\n1. 交易進行中可能取出(或交換)晶片卡；或是可能取出(或交換)晶片卡讀卡機\n （提醒您，進行晶片卡交易時，為保障交易安全，請您不要在交易進行時取出(或交換)晶片卡或讀卡機）。\n2. 讀取晶片卡資料時發生讀取錯誤\n3. 讀卡機故障，或是讀卡機安裝不完整（其他系統問題建議與本行客戶服務中心聯絡）。\n\n本交易已無法完成,建議您先按下方”確認”鍵，再按鍵盤上的”f5”鍵，或是重新登入以恢復連線。造成不變，敬請見諒！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPIN]晶片卡讀取錯誤");
        }
        return false;
    }
    else {
    	////console.log('VerifyPIN:RtnCode!=0')
    	
        alert("本次交易已無法順利進行，失敗原因可能如下：\n1. 交易進行中可能取出(或交換)晶片卡；或是可能取出(或交換)晶片卡讀卡機\n （提醒您，進行晶片卡交易時，為保障交易安全，請您不要在交易進行時取出(或交換)晶片卡或讀卡機）。\n2. 讀取晶片卡資料時發生讀取錯誤\n3. 讀卡機故障，或是讀卡機安裝不完整（其他系統問題建議與本行客戶服務中心聯絡）。\n\n本交易已無法完成,建議您先按下方”確認”鍵，再按鍵盤上的”f5”鍵，或是重新登入以恢復連線。造成不變，敬請見諒！");
        XCsp.FiscListAccounts();
        var IssAcct = XCsp.account0;
        VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPIN]晶片卡讀取錯誤");
        return false;
    }
}

function VerifyPINonPAD()
{
	XCsp.bPq = 16 ;
    RtnCode = XCsp.VerifyPIN();

    if(RtnCode == 0) {
        if(XCsp.uiSW12 == 0x9000) {
            XCsp.FiscListAccounts();
            // document.getElementsByName('IssAcctNo')[0].value = XCsp.account0;
           // setPageData({IssAcctNo: XCsp.account0})
            ////console.log(" XCsp.account0:"+ XCsp.account0);
            return true;
        }
        else if(XCsp.uiSW12 == 0x6608) {
            alert("晶片卡密碼錯誤，請您重新輸入！\n提醒您：若密碼連續錯誤次數達三次，晶片卡將自動鎖卡！\n如需再一次輸入，請按鍵盤上的”f5”鍵！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPINonPAD]密碼錯誤");
        }
        else if(XCsp.uiSW12 == 0x6620) {
            alert("晶片卡已鎖卡, 請洽分行辦理！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPINonPAD]晶片卡已鎖卡");
        }
        else {
            alert("[" + XCsp.uiSW12 + "]本次交易已無法順利進行，失敗原因可能如下：\n1. 交易進行中可能取出(或交換)晶片卡；或是可能取出(或交換)晶片卡讀卡機\n （提醒您，進行晶片卡交易時，為保障交易安全，請您不要在交易進行時取出(或交換)晶片卡或讀卡機）。\n2. 讀取晶片卡資料時發生讀取錯誤\n3. 讀卡機故障，或是讀卡機安裝不完整（其他系統問題建議與本行客戶服務中心聯絡）。\n\n本交易已無法完成,建議您先按下方”確認”鍵，再按鍵盤上的”f5”鍵，或是重新登入以恢復連線。造成不變，敬請見諒！");
            XCsp.FiscListAccounts();
            var IssAcct = XCsp.account0;
            VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPINonPAD]晶片卡讀取錯誤");
        }
        return false;
    }
    else {
        //alert("晶片卡讀取錯誤, 請重新啟動瀏覽器並重新登入！");
        alert("本次交易已無法順利進行，失敗原因可能如下：\n1. 交易進行中可能取出(或交換)晶片卡；或是可能取出(或交換)晶片卡讀卡機\n （提醒您，進行晶片卡交易時，為保障交易安全，請您不要在交易進行時取出(或交換)晶片卡或讀卡機）。\n2. 讀取晶片卡資料時發生讀取錯誤\n3. 讀卡機故障，或是讀卡機安裝不完整（其他系統問題建議與本行客戶服務中心聯絡）。\n\n本交易已無法完成,建議您先按下方”確認”鍵，再按鍵盤上的”f5”鍵，或是重新登入以恢復連線。造成不變，敬請見諒！");
        XCsp.FiscListAccounts();
        var IssAcct = XCsp.account0;
        VerifyPinLog(XCsp.issueNo.substring(0, 3), IssAcct, "[VerifyPINonPAD]晶片卡讀取錯誤");
        return false;
    }
}

function VerifyPinLog(BankID, IssueNo, Memo)
{
    //window.open("../eATM/VerifyPinLog.jsp?BankID=" + BankID + "&IssueNo=" + IssueNo + "&Memo=" + Memo+ "&Channel=AT","logwindow","titlebar=no,width=1,height=1 left=1000,top=1000");
}