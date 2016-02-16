// ********************************************************************************
// Filename      :  utility_functions.js
// Author        :  rpinteractive
// Date/Time     :  06-13-2002
// Purpose       :  Generic JavaScript functions for performing common tasks; Will centralize browser-specific
//						code so that extensions for future browser developments will be simplified
// Parameters    :  N/A
// Revisions     :  N/A
// ********************************************************************************

// Browser Info
function UFcheckBrowser(){
	this.ver = navigator.appVersion;
	this.agent = navigator.userAgent.toLowerCase();
	this.dom = document.getElementById ? 1 : 0;
	this.all = document.all ? 1 : 0;
	this.layers = document.layers ? 1 : 0;
	this.images = document.images ? 1 : 0;
	this.IE = (navigator.appName=="Microsoft Internet Explorer") ? 1 : 0;
	this.NS = (navigator.appName=="Netscape") ? 1 : 0;
	this.MAC = (this.agent.indexOf("mac")!=-1);
	return this;
}

oUFBrowser = UFcheckBrowser();

// ********************************************************************************
// Function	: UFChangeImage(String , String , String)
// Author	: Bradley Stone
// Date/Time	: 06-03-2002
// Purpose	: This function will swap out an image and replace it with another image
// Parameters: String - Name of image as defined by the 'name' attribute in the HTML
//             image tag
//             String - Path of image to replace swapped out image with (can be relative
//             or absolute url)
//             String - [Optional] name of the layer which the image exists on, if any
// Returns	: N/A
// Revisions : 2002-08-26
//             Revised to work properly for oUFBrowser.dom and oUFBrowser.all, also
//             took care of case where layer was not defined for oUFBrowser.layers
//             - Alex Weslowski
// ********************************************************************************
function UFChangeImage(sIMGName, sImageSRC, sLayerName) {
	if (oUFBrowser.images) {
		if (oUFBrowser.dom) { 
			document.getElementById(sIMGName).src = sImageSRC;
		} else if (oUFBrowser.layers) { 
			if (("" + sLayerName != "undefined") && (sLayerName != "")) {
				if ("" + document.layers[sLayerName] != "undefined") {
					document.layers[sLayerName].document.images[sIMGName].src = sImageSRC;
				}
			} else {
				if ("" + document.images[sIMGName] != "undefined") {
					document.images[sIMGName].src = sImageSRC;
				}
			}
		} else if (oUFBrowser.all) {
			document.images[sIMGName].src = sImageSRC;
		}
	}
}

// ********************************************************************************
//Function	: UFHideLayer(String)
//Author	: Steven Green
//Date/Time	: 06-20-2002
//Purpose	: This function will change the style of a <SPAN> or <DIV> tag to hidden 
//				so it will disappear from the page
//Parameters	: String - ID of the <SPAN> or <DIV> tag that should disappear
//		
//Returns	: N/A
//Revisions	: N/A
// ********************************************************************************
function UFHideLayer(sLayerName) { 

	if (oUFBrowser.dom) {
		document.getElementById(sLayerName).style.visibility = "hidden";
	} else if (oUFBrowser.layers) {
		if (document.layers[sLayerName]) {		
		        document.layers[sLayerName].visibility = 'hide';	
		}
	} else if (oUFBrowser.all)  {
	        document.all[sLayerName].style.visibility = 'hidden';
        	document.all[sLayerName].style.zIndex = -100;
	}

}

// ********************************************************************************
//Function	: UFShowLayer(String)
//Author	: Steven Green
//Date/Time	: 06-20-2002
//Purpose	: This function will change the style of a <SPAN> or <DIV> tag to visible 
//				so it will appear on the page
//Parameters	: String - ID of the <SPAN> or <DIV> tag that should appear
//		
//Returns	: N/A
//Revisions	: N/A
// ********************************************************************************
function UFShowLayer (sLayerName) {  

	if (oUFBrowser.dom) {
		document.getElementById(sLayerName).style.visibility = "visible";
	} else if (oUFBrowser.layers) {
		if (document.layers[sLayerName]) {
		        document.layers[sLayerName].visibility = 'visible';
		}
	}  else if (oUFBrowser.all) { // Internet Explorer
	        document.all[sLayerName].style.visibility = 'visible';
	        document.all[sLayerName].style.zIndex = 100;
	}
}

// ********************************************************************************
//Function	: UFPrintFrame(String)
//Author	: Bradley Stone (taken from Scott Westerfield)
//Date/Time	: 07-09-2002
//Purpose	: This function will print out the contents of a frame
//Parameters: frame(String) - Name of frame to print
//Returns	: N/A
//Revisions	: N/A
// ********************************************************************************
function UFPrintFrame(frame) {
    // handle IE5
    if (window.print && oUFBrowser.IE) {
        frame.focus();
        window.print();
				// link.focus();
    // handle NS4
    } else if (window.print) {
        frame.print();
    // handle IE4 (not Mac)
    } else if (oUFBrowser.IE && !oUFBrowser.MAC) {
        frame.focus();
        // call vbscript function
        // then return focus to original frame
				// setTimeout("vbPrintPage(); link.focus();", 100);
				setTimeout("vbPrintPage();" , 100);
    // other browsers
    } else {
	    var str = "";
	    str += "Your browser does not support automatic printing.\n";
	    str += "This page may be printed by selecting File -> Print\n";
	    str += "or by clicking the Print icon in the tool bar.";
	    alert(str);
    }

}

// ********************************************************************************
// Function	: UFPrintWindow()
// Author	: Bradley Stone (taken from Scott Westerfield)
// Date/Time	: 07-09-2002
// Purpose	: This function will print out the contents of a window
// Parameters: frame(String) - Name of frame to print
// Returns	: N/A
// Revisions : 2002-08-21
//             Changed all "this." to "oUFBrowser.", commented out "closeWindow()"
//             - Alex Weslowski
// ********************************************************************************
function UFPrintWindow() {
    // handle NS4, IE5
    if (window.print) { 
        window.print();
        // closeWindow();
    // handle IE4 (not Mac)
    } else if (oUFBrowser.IE && !oUFBrowser.MAC) { 
        // call vbscript function
        vbPrintPage();
        // closeWindow();
    // other browsers
    } else { 
	    var str = "";
	    str += "Your browser does not support automatic printing.\n";
	    str += "This page may be printed by selecting File -> Print\n";
	    str += "or by clicking the Print icon in the tool bar.";
	    alert(str);
    }
}

// ********************************************************************************
// Function	: UFPrePrint
// Author	: Bradley Stone (taken from Scott Westerfield)
// Date/Time	: 07-09-2002
// Purpose	: This function will print out code necessary for being able to print the contents of a page from the browser's javascript APi
// Parameters: N/A
// Returns	: N/A
// Revisions	: N/A
// ********************************************************************************
function UFPrePrint() {
	if (oUFBrowser.IE && !window.print && !oUFBrowser.MAC) {
		with (document) {
			write('<OBJECT ID="WB" WIDTH="0" HEIGHT="0" ');
			writeln('CLASSID="clsid:8856F961-340A-11D0-A96B-00C04FD705A2">');
			writeln('</OBJECT>');
			writeln('<' + 'SCRIPT LANGUAGE="VBScript">');
			writeln('Sub window_onunload');
			writeln('    On Error Resume Next');
			writeln('    Set WB = nothing');
			writeln('End Sub');
			writeln('Sub vbPrintPage');
			writeln('    OLECMDID_PRINT = 6');
			writeln('    OLECMDEXECOPT_DONTPROMPTUSER = 2');
			writeln('    OLECMDEXECOPT_PROMPTUSER = 1');
			writeln('    On Error Resume Next');
			writeln('    WB.ExecWB OLECMDID_PRINT, OLECMDEXECOPT_PROMPTUSER');
			writeln('End Sub');
			writeln('<' + '/SCRIPT>');
		}
	}
}
