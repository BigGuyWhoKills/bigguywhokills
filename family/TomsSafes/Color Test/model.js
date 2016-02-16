 	// ***************************************************************************************
// Filename : model.js
// Author : Alex Weslowski
// Date/Time : 2002-07-08
// Purpose : positions DIV or IFRAME for models page description component;
//           changes content of DIV or IFRAME when navigation is clicked.
// Parameters : bIE ... true if client is IE or compatible
//              bNS ... true if client is NS or compatible
// Revisions : 
// ***************************************************************************************

var oFrame;
var oFrameImage;
var bModelPageLoaded = false;

function modelPageLoad() {
	if (blnNS) {
		intBrowserW = window.innerWidth;
		intBrowserH = window.innerHeight;
	} else if (blnIE) {
		intBrowserW = document.body.clientWidth;
		intBrowserH = document.body.clientHeight;
	}
	oFrame = new obj("theframe", null);
	oFrameImage = new io("theframeimg", null);
	oFrame.css.left = oFrame.absX = oFrameImage.absX;
	oFrame.css.top = oFrame.absY = oFrameImage.absY;
	oFrame.css.visibility = "visible";
	/*
	if (blnNS) {
		modelPageNavigation("description");
	}
	*/
	bModelPageLoaded = true;
}

function modelPageNavigation(strModelPage, strQS) {
	var strPage = strModelPage + ".asp"  + strQueryString;
	if ("" + strQS != "undefined") {
		strPage = strPage + "&" + strQS;
	}
	/*
	if ((strModelPage  == "videos") || (strModelPage  == "360")) {
		if ("" + strQS == "undefined")  {
			popwindow(strPage, 517 , 276, 0);
		}
	} else {
	*/
	if (blnSectionIframe) {
		if (bModelPageLoaded) {
			if ((strModelPage == "photos") && ("" + strQS != "undefined")) {
				// alert("doc : " + document.theframe.document.all.photos_right.src);
				// alert("doc : " + top.oFrame.elm.document.all.photos_right.src);
				document.theframe.document.all.photos_right.src = "photos_right.asp" + strQueryString + "&" + strQS;
			} else {
				top.oFrame.elm.src = strPage;
			}
		}
	} else {
		// var data = document.applets["http"].Request(strPage);
		// data = "<table border=2><tr><td>Hello world</td></tr></table>";
		// alert("" + data);
		// oFrame.changedoc(data);
		strPage = "model.asp"  + strQueryString + "&ModelPage=" + strModelPage;
		if ("" + strQS != "undefined") {
			strPage = strPage + "&" + strQS;
		}
		// alert(strPage);
		window.location.href = strPage;
	}
	return;
}

function modelPageRedText(elm, pop) {
	// if (!blnSectionIframe || !bModelPageLoaded) {
	if (((blnIE || blnNS) && (dblVer < 5)) || !bModelPageLoaded) {
		return;
	}
	var anchorTags = document.getElementsByTagName("A");
	var fontTags;
	var one;
	var two;
	for (var i = 0; i < anchorTags.length; i++) {
		one = (anchorTags[i].className == "linkModelYearActive") ? true : false;
		two = (anchorTags[i].className == "linkPopUpSpecNavActive") ? true : false;
		if (one) {
			anchorTags[i].className = "linkModelMediaNavigation";
		} else if (two) {
			anchorTags[i].className = "linkPopUpSpecNav";
		}
		if (one || two) {
			if (anchorTags[i].firstChild.nodeName != "#text") {
				fontTags = anchorTags[i].children.tags("FONT");
				if (fontTags.length > 0) {
					if (blnNS) {
						anchorTags[i].removeChild(fontTags[0]);
					} else {
						fontTags[0].removeAttribute("color");
					}
				}
			}
		}
	}
	if ("" + pop == "true") {
		elm.className = "linkPopUpSpecNavActive";
	} else {
		elm.className = "linkModelYearActive";
	}
	return;
}


var counter = 0; 
function ddShowHide(){
if (counter == 0){
	objDDList.css.visibility = 'visible';
}
else {
	objDDList.css.visibility = 'hidden';
	}
counter = (counter == 0)?1:0;
return;
}

function initAccessoriesDD(){
if (blnModelAcessoriesListDiv){
if (blnN4){objTheframe = new obj('theframe', null);}
strNestRef = (blnN4)?objTheframe.ref:null;	
	
	objDDShowHide = new obj('divDDShowHide', strNestRef);
	objDDList = new obj('divDDList', strNestRef);
	objDDShowHide.css.width = objDDList.css.width = objDDList.clipW;
	objDDShowHide.css.visibility = 'visible'; 
}
//objDDList.css.width = objDDList.css.width + 19;
}

function coords(){
	if (blnIE){
		if (!checkMouseMoveF() && blnModelAcessoriesListDiv){
			document.getElementById('divDDList').style.visibility = 'hidden';
			counter = 0;
		}
	}
}


