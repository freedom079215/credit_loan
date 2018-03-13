/***==================================================
20170516:驗證功能專用
===================================================***/


function CheckItem(){

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


//判斷使用者代碼	
function CustCodeCheckX(CustCode){
  if(CustCode == null || CustCode == "") {
    alert("請輸入6-16位數使用者代號");
	  return false;	
  }
  if( CustCode.length < 6 || (CustCode).length > 16 ){
    if(CustCode.length < 6){
      alert("請輸入6-16位數使用者代號");
    }
    if(CustCode.length > 16){
      alert("使用者代號長度限制最多為16位");
    }
		return false;	
	}
  return true;
}

// User自訂的晶片卡密碼檢核
function UserCheckPIN(pin){
  if(pin == null || pin == "") {
    alert("請輸入6-12位晶片金融卡密碼");
	return false;	
  }
  if( pin.length < 6 || (pin).length > 12 ){
    if(pin.length < 6){
      alert("請輸入6-12位晶片金融卡密碼");
    }
    if(pin.length > 12){
      alert("晶片金融卡密碼長度限制最多為12位");		
    }
		return false;	
	}
  return true;
}

