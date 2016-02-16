

var aOverlayz = new Array();
var oOverlay;
var aSwatchez = new Array();
var oSwatchOver;
var aColornamez = new Array();
var oColorNameTxt;
var iNumLayers = 5;

function modelColorsLoad() {
	var ref = ("" + oFrame == "undefined") ? null : oFrame.ref;
	var doc = ("" + oFrame == "undefined") ? null : oFrame.doc;
	oOverlay = new io("overlayimg", doc);
	oColorNameImg = new io("colornameimg", doc);
	for (var i = 0; i < iNumLayers; i++) {
		aOverlayz[i] = new obj("overlaydiv" + i, ref);
		aOverlayz[i].css.left = 6;
		aOverlayz[i].css.top = 1;
		aOverlayz[i].css.zIndex = 1;
		aColornamez[i] = new obj("colornamediv" + i, ref);
		/*
		if (i == 0) {
			alert("abs: " + oOverlay.absX + ", " + oOverlay.absY);
			alert("rel: " + oOverlay.relX + ", " + oOverlay.relY);
			alert("abs: " + oColorNameImg.absX + ", " + oColorNameImg.absY);
			alert("rel: " + oColorNameImg.relX + ", " + oColorNameImg.relY);
		}
		*/
		if (blnIE && blnMac) {
			aColornamez[i].css.left = aColornamez[i].x = 320;
			aColornamez[i].css.top = aColornamez[i].y = 26;
		} else if (blnIE && (dblVer < 5.5)) {
			aColornamez[i].css.left = aColornamez[i].x = 331;
			aColornamez[i].css.top = aColornamez[i].y = 26;
		} else if (blnNS && (dblVer >= 5)) {
			aColornamez[i].css.left = aColornamez[i].x = oColorNameImg.relX;
			aColornamez[i].css.top = aColornamez[i].y = oColorNameImg.relY;
		} else {
		  aColornamez[i].css.left = aColornamez[i].x = oColorNameImg.absX;
			aColornamez[i].css.top = aColornamez[i].y = oColorNameImg.absY;
		}
		aColornamez[i].css.zIndex = 1;
		aSwatchez[i] = new io("swatchimg" + i, doc);
		/*
		if (i == 0) {
			alert(aSwatchez[i].absX + ", " + aSwatchez[i].absY);
			alert(aSwatchez[i].relX + ", " + aSwatchez[i].relY);
		}
		*/
		if (blnIE && blnMac) {
			aSwatchez[i].absX = 331 + (38 * (i % 5));
			aSwatchez[i].absY = (i > 4) ? 86 : 48;
		} else if (blnIE && (dblVer < 5.5)) {
			aSwatchez[i].absX = 331 + (38 * (i % 5));
			aSwatchez[i].absY = (i > 4) ? 85 : 47;
		}
	}
	oSwatchOver = new obj("swatchoverdiv", ref);
	rollColorOn(0);
	oSwatchOver.css.visibility = "visible";
}

var iLastNum = -1;
function rollColorOn(iNum, sName) {
	aOverlayz[iNum].css.visibility = "visible";
	aColornamez[iNum].css.visibility = "visible";
	if (iLastNum > -1) {
		aOverlayz[iLastNum].css.visibility = "hidden";
		aColornamez[iLastNum].css.visibility = "hidden";
	}
	if (blnNS && (dblVer >= 5)) {
		oSwatchOver.css.left = oSwatchOver.absX = aSwatchez[iNum].relX;
		oSwatchOver.css.top = oSwatchOver.absY = aSwatchez[iNum].relY;
	} else {
		oSwatchOver.css.left = oSwatchOver.absX = aSwatchez[iNum].absX;
		oSwatchOver.css.top = oSwatchOver.absY = aSwatchez[iNum].absY;
	}
	oSwatchOver.css.zIndex = 1;
	top.status = sName;
	iLastNum = iNum;
}

function rollColorOff(iNum) {
	aOverlayz[0].css.visibility = "visible";
	aOverlayz[iNum].css.visibility = "hidden";
	oSwatchOver.css.visibility = "hidden";
	aColornamez[iNum].visibility = "hidden";
	iLastNum = 0;
}

