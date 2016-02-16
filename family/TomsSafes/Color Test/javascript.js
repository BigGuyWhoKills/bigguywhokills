// **********************************************************************************
// Filename	: /js/javascript.js
// Author		: Geoff Moller
// Date/Time	: 06JUNE2002
// Purpose	: Contains Shared JavaScript and DHTML functions.
// Parameters	: 
// Revisions	: 
// **********************************************************************************
var strAgt = navigator.userAgent.toLowerCase(); 
var blnWin = ((strAgt.indexOf("win") != -1) || (strAgt.indexOf("16bit") != -1) || (strAgt.indexOf("32bit") != -1));
var blnMac = (strAgt.indexOf("mac") != -1);
var blnUnix = ((strAgt.indexOf("x11") != -1) || (strAgt.indexOf("sunos") != -1) || (strAgt.indexOf("irix") != -1) || (strAgt.indexOf("hp-ux") != -1) || (strAgt.indexOf("sco") != -1) || (strAgt.indexOf("unix") != -1) || (strAgt.indexOf("ncr") != -1) || (strAgt.indexOf("dec") != -1) || (strAgt.indexOf("osf1") != -1) || (strAgt.indexOf("ultrix") != -1) || (strAgt.indexOf("alpha") != -1) || (strAgt.indexOf("sinix") != -1) || (strAgt.indexOf("aix") != -1) || (strAgt.indexOf("inux") != -1) || (strAgt.indexOf("bsd") != -1));
var blnNS = ((strAgt.indexOf("mozilla") != -1) && (strAgt.indexOf("compatible") == -1));
var blnIE = (strAgt.indexOf("msie") != -1);
var dblVer = parseFloat(navigator.appVersion);
var blnN4 = (blnNS && (dblVer < 5));
var blnN6 = (blnNS && (dblVer >= 5));
var intNN6PopupWidthAdjust = (blnNS && (dblVer >= 5))?15:0;
if (blnIE) {
	var intStart = strAgt.indexOf("msie") + 5;
	var intEnd = strAgt.indexOf(";", intStart)
	dblVer = parseFloat(strAgt.substring(intStart, intEnd));
}
var intBrowserW = intBrowserH = 0;
var blnLoaded = true;
var blnGNSubCatLoaded = false;
var blnModel;
var blnHomePage = false;
var blnHelpPage = false;

var strErrorBoxOpener  =   "<table border='0' cellpadding='0' cellspacing='0' bgcolor='FFFF00' ><tr><td><img src='/images/spacer.gif' height='10'></td></tr><tr>";
strErrorBoxOpener  += "<td><table border='0' cellpadding='0' cellspacing='0' ><tr><td><img src='/images/spacer.gif' width='12' height='10'></td>";
strErrorBoxOpener  += "<td align='left' valign='top'><img src='/images/brochureRequest/icoError.gif' width='23' height='23'></td>";
strErrorBoxOpener  += "<td align='left' valign='top'><img src='/images/spacer.gif' width='12' height='33'></td><td  align='left' valign='top'>";

var strErrorBoxCloser = "</td><td align='left' valign='top'><img src='/images/spacer.gif' width='20' height='10'></td></tr></table></td></tr><tr><td align='left' valign='top'><img src='/images/spacer.gif' width='10' height='5'></td></tr></table>";

// **********************************************************************************
// Author : Geoff Moller
// Date/Time : 06JUNE2002
// Purpose : fired when any page is loaded, calls functions to initialize the global navigation
// Return : none
// Parameters :
// Revisions : 11JULY2002 - commented out initComponents() since no longer used - AW 
// **********************************************************************************
function pageLoad(){
	buildGNRightSlider(); 
	buildGNRightImages();
	if (blnHomePage != true) {
		if (strPageCategory != 'Global') {
			initDropDowns();
		}
		drawTopNav();  
	}
}
	
// **********************************************************************************
// Author	: Geoff Moller
// Date/Time : 06JUNE2002
// Purpose : an image object constructor which allows cross browser DHTML image manipulation.
// Return : none
// Parameters: id: the name/id attribute of the image; nestref:the object name of the
//             containing layer of the image if it has one, null if it does not.
// Revisions : 2002-08-29
//             Return absX, absY, relX, relY in addition to x and y.
//             - Alex Weslowski
// **********************************************************************************
function io(id, nestref) {
	// alert("imgobj id is " + id);
	if (blnNS) {
		if (dblVer >= 5) {
			// this.img = document.images[id];
			this.img = eval("document." + id);
			this.absX = 0;
			this.absY = 0;
			ob = this.img;
			do {
				this.absX += ob.offsetLeft;
				this.absY += ob.offsetTop;
				ob = ob.offsetParent;
			} while (ob.nodeName != "BODY");
			ob = this.img;
			do {
				ob = ob.offsetParent;
			} while ((ob.nodeName != "DIV") && (ob.nodeName != "BODY"));
			this.relX = (this.absX - ob.offsetLeft);
			this.relY = (this.absY - ob.offsetTop);
			this.w = this.img.width;
			this.h = this.img.height;
    } else {
      this.img = (nestref) ? eval("nestref.images."+id) : eval("document.images."+id);
      this.relX = this.absX = this.img.x; 
      this.relX = this.absY = this.img.y;
      this.w = this.img.width;
      this.h = this.img.height;
    }
  } else if (blnIE) {
    this.img = document.images[id];
		this.relX = this.img.offsetLeft;
		this.relY = this.img.offsetTop;
    this.absX = 0;
    this.absY = 0;
    ob = this.img;
		do {
			this.absX += ob.offsetLeft;
			this.absY += ob.offsetTop;
			ob = ob.offsetParent;
		} while (ob != null);
    this.w = this.img.width;
    this.h = this.img.height;
  }
	// x and y are deprecated
	this.x = this.absX;
	this.y = this.absY;
	this.imgoff = new Image();
	this.imgoff.src = this.img.src;
  return;
}

// **********************************************************************************
// Author	: Geoff Moller
// Date/Time	: 06JUNE2002
// Purpose	: Write string of HTML to the calling object
// Return	: none	
// Parameters: str: string or HTML to insert
// Revisions	: 
// **********************************************************************************
function changedoc(str) {
	// alert(str);
	if (blnNS && (dblVer < 5)) {
		this.doc.open();
		this.doc.write(str);
		this.doc.close();
	} else if (blnIE || (blnNS && (dblVer >= 5))) {
		this.elm.innerHTML = str;
	}
	return;
}

// **********************************************************************************
// Author : Geoff Moller
// Date/Time : 28JUNE2002
// Purpose : creates new image object and assigns a source
// Return : none	
// Parameters : imagePath: path of the image source
// Revisions : 
// **********************************************************************************
function newImage(imagePath) {
     if (document.images) {
          var rslt = new Image();
          rslt.src = imagePath;
          return rslt;
     }
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Initializes all object attributes.
//Return	: none
//Parameters: id: Id is the id of the div we are referring to; nestref is a reference to the parent div of this object, set to null if parent is not a div
//							(ie if the parent is the document).
//
//Revisions	: 
// **********************************************************************************
function obj(id, nestref) {
	// alert("id is " + id);
	if (blnNS) {
		if (dblVer >= 5) {
			this.elm = this.evt = document.getElementById(id);
			this.ref = this.elm;
			this.css = this.elm.style;
			this.doc = document;
			this.x = this.begx = (nestref) ? this.elm.offsetLeft - nestref.offsetLeft : this.elm.offsetLeft;
			this.y = this.begy = (nestref) ? this.elm.offsetTop - nestref.offsetTop : this.elm.offsetTop;
			this.clipW = this.scrollW = this.elm.offsetWidth;
			this.clipH = this.scrollH = this.elm.offsetHeight;
			this.self = id; 
			eval(this.self + "=this");
		} else { // synchronized
			this.css = (nestref) ? eval("nestref.document.layers." + id) : eval("document.layers." + id);
			this.ref = this.css;
			this.elm = this.evt = this.css;
			this.doc = this.css.document;
			this.x = this.begx = this.css.left;
			this.y = this.begy = this.css.top;
			//this.w,h alaises added for GN DHTML
			this.clipW = this.scrollW = this.w = this.css.clip.width;
			this.clipH = this.scrollH = this.h = this.css.clip.height;
			this.self = id; 
			eval(this.self + " = this");
		}
	} else if (blnIE) {// synchronized
		this.elm = this.evt = document.all[id];
		this.css = this.elm.style;
		this.doc = document;
		this.x = this.begx = this.elm.offsetLeft;
		this.y = this.begy = this.elm.offsetTop;
		//width and height added by geoff for GN DHTML
		//this.w = this.elm.offsetWidth;
    //this.h = this.elm.offsetHeight;
		this.clipW = this.elm.offsetWidth;
		this.clipH = this.elm.offsetHeight;
		this.scrollW = this.elm.scrollWidth;
		this.scrollH = this.elm.scrollHeight;
		this.self = id + "Obj";
		eval(this.self + " = this"); 
	}
	this.id = id; // synchronized
	this.i = 1;
	this.slidingTID = null;
	this.fading = false;
	this.copyFrom = copyFrom;
	this.clip = clip;
	this.num = 0;
	// this.alphafade = alphafade;
	// Added for GN DHTML
	this.slidecoords = slidecoords;
	this.menuslide = menuslide;
	this.changedoc = changedoc;
  this.scroll = scroll;
	this.down = true;
	this.sliding = false;
	this.clipping = false;
	return;
}
				
// *****************************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: performs the menuslide effect on the (the shop, the ride, the company) panels on the right side of the global navigation
//Return	: none
//Parameters: the name of the panel which will be slided
//Revisions	: 
// *****************************************************************************************		
function menuslide(whichMenu) {
	var slideVariation = (whichMenu == 'panel2') ? 6 : 3;
	var func = "";
	var steps = 1;
	var amount = 0;
	if (this.sliding) {
		clearTimeout(slidingID2);
		this.i = 1;
	}
	this.sliding = true;
	if (this.down) {
		steps = Math.max(1, Math.floor(-this.y / 30));
		func = this.self+".slidecoords("+this.x+", "+this.y+", "+this.x+", 0, "+ steps +", 60)";
		this.down = false;
	} else {
		steps = Math.max(1, Math.floor((this.scrollheight + this.y) / 30));
		amount = -this.scrollheight + slideVariation;
		// amount = -this.scrollH + slideVariation;
		func = this.self+".slidecoords("+this.x+", "+this.y+", "+this.x+", "+ amount +", "+ steps +", 60)";
		this.down = true;
	}
	eval(func);
	return;
}

// *****************************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: establishes x/y coordinates used in the menuslide function
//Return	: none
//Parameters: xbeg, ybeg, xend, yend, steps, rate
//Revisions	: 
// *****************************************************************************************
function slidecoords(xbeg, ybeg, xend, yend, steps, rate) {
	if (blnNS && (dblVer >= 5)) {
		this.x = Math.round(xbeg+((xend-xbeg)*(this.i/steps)));
		this.css.left = this.x + "px";
		this.y = Math.round(ybeg+((yend-ybeg)*(this.i/steps)))
		this.css.top = this.y + "px";
	} else {
		this.css.left = this.x = Math.round(xbeg+((xend-xbeg)*(this.i/steps)));
		this.css.top = this.y = Math.round(ybeg+((yend-ybeg)*(this.i/steps)));
	}
	this.i++;
	if (this.i <= steps) {
		slidingID2 = setTimeout(this.self+".slidecoords("+xbeg+", "+ybeg+", "+xend+", "+yend+", "+steps+", "+rate+")", rate);  
	} else { 
		this.i = 1;
		this.sliding = false;
	}
}
		
// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Function to allow cloning.
//Return	: none
//Parameters: srcObj object we want to clone
//Revisions	: 
// **********************************************************************************
function copyFrom(srcObj) {
	for (var prop in srcObj) {
		this.prop = srcObj[prop];
	}
	return;
} 

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Set clipping rectangle according to parameters passed in.
//Return	: none
//Parameters: T top, R right, B bottom, L left
//Revisions	: 
// **********************************************************************************
function clip(T, R, B, L) {
  if (blnNS) {
    this.css.clip.top = T;
    this.css.clip.right = R;
    this.css.clip.bottom = B;
    this.css.clip.left = L;
    this.clipW = this.css.clip.width;
    this.clipH = this.css.clip.height;
  } else if (blnIE) {
    this.css.clip = "rect("+T+", "+R+", "+B+", "+L+")";
    this.css.width = R;
    this.css.height = B;
    this.clipW = R-L;
    this.clipH = B-T;
  }
  return;
}  

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: If size of browser has changed, reload the page. Needed for 4.x versions of Netscape, and if any elements are being dynamically positioned. Called from BODY tag onresize method.
//Return	: none
//Parameters: none
//Revisions	: 
// **********************************************************************************
function checksize() {
	if ((intBrowserW <= 0) || (intBrowserH <= 0)) {
		return;
	}
	if (blnNS) {
		if (intBrowserW != window.innerWidth || intBrowserH != window.innerHeight) {
			location.reload();
			}
	} else if (blnIE) {
		if (intBrowserW != document.body.clientWidth || intBrowserH != document.body.clientHeight) {
			location.href = location;
		}
	}
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Return a string that is intDigits long. For example, pad(7, 3) will return "007".
//Return	: none
//Parameters: intNum number that we want to pad, intDigits how long the returned string should be
//Revisions	: 
function pad(num) {
	return (num < 10) ? "0" + num : num;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Continue sliding until either xt and yt are 1.5708.
//Return	: none
//Parameters: dx x maximum velocity
//					 xt x time, in radians
//					dxt x time velocity, in radians
// 					dy y maximum velocity
//					yt y time, in radians
//					dyt y time velocity, in radians
//					rate how often to run this loop, in milliseconds 
//					funcduring function to evaluate on each loop
//					funcatend function to evaluate when done looping

//Revisions	: 
// **********************************************************************************
function slidesinewave(dx, xt, dxt, dy, yt, dyt, rate, funcduring, funcatend) {
	this.sliding = true;
	var xover = true;
	var yover = true;
	if (dx != 0) {
		xover = false;
		if (xt >= 1.5708) {
			xt = 1.5708;
			xover = true;
		}
		this.css.left = this.x = Math.round(this.x + (dx * Math.cos(xt)));
		xt += dxt;
	}
	if (dy != 0) {
		yover = false;
		if (yt >= 1.5708) {
			yt = 1.5708;
			yover = true;
		}
		this.css.top = this.y = Math.round(this.y + (dy * Math.cos(yt)));
		yt += dyt;
	}
	if (("" + funcduring != "undefined") && (funcduring != null)) {
		eval(funcduring);
	}
	if (!xover || !yover) {
		this.slidingTID = setTimeout(this.self + ".slidesinewave(" + dx + ", " + xt + ", " + dxt + ", " + dy + ", " + yt + ", " + dyt + ", " + rate + ", '" + funcduring + "', '" + funcatend + "')", rate);  
	} else { 
		// alert("funcatend is " + funcatend);
		if ("" + funcatend != "undefined") {
			eval(funcatend);
		}
	}
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Continue sliding until either xt and yt are 1.5708. It is easier to move something a specific number of pixels with this function, compared to using slidesinewave. 
//Return	: none
//Parameters: xbeg beginning x coordinate, before this function is called
//					  xamt amount in pixels to move in the x direction
//					  xt x time, in radians
//					  xdt x time velocity, in radians
//					  ybeg beginning y coordinate, before this function is called
//					  yamt amount in pixels to move in the y direction
//					  yt y time, in radians
//					  ydt y time velocity, in radians
//					  rate how often to run this loop, in milliseconds 
//					  funcduring function to evaluate on each loop
//					  funcatend function to evaluate when done looping
//Revisions	: 
// **********************************************************************************
//
// continues sliding until time is 1.5708 (90 degrees)
//
function slidesineamount(xbeg, xamt, xt, xdt, ybeg, yamt, yt, ydt, rate, funcduring, funcatend) {
	this.sliding = true;
	var xover = true;
	var yover = true;
	if (xamt != 0) {
		xover = false;
		if (xt >= 1.5708) {
			xt = 1.5708;
			xover = true;
		}
		this.css.left = this.x = Math.round(xbeg + Math.sin(xt) * xamt);
		xt += xdt;
	}
	if (yamt != 0) {
		/*
		alert("ybeg is " + ybeg + 
			"\nyamt is " + yamt +
			"\nyt is " + yt +
			"\nydt is " + ydt);
		*/
		yover = false;
		if (yt >= 1.5708) {
			yt = 1.5708;
			yover = true;
		}
		this.css.top = this.y = Math.round(ybeg + Math.sin(yt) * yamt);
		yt += ydt;
	}
	if (("" + funcduring != "undefined") && (funcduring != null)) {
		eval(funcduring);
	}
	if (!xover || !yover) {
		this.slidingTID = setTimeout(this.self + ".slidesineamount(" + xbeg + ", " + xamt + ", " + xt + ", " + xdt + ", " + ybeg + ", " + yamt + ", " + yt + ", " + ydt + ", " + rate + ", '" + funcduring + "', '" + funcatend + "')", rate);  
	} else { 
		if ("" + funcatend != "undefined") {
			eval(funcatend);
		}
	}
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Changes coordinates of any objs that are both draggable and active, to give the appearance of dragging. 
//Return	: none
//Parameters: e is the mousemove event
//Revisions	: 
// **********************************************************************************
function dragmousemove(e) {
	//if (!blnLoaded) {
	//	return;
	//}
	x = event.x + document.body.scrollLeft;
	y = event.y + document.body.scrollTop; 
	//window.status = 'x=' + x + ' ' + 'y=' + y;
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Release captured events, and do other code cleanup before exiting page. Called from BODY tag onunload method.
//Return	: none
//Parameters: 
//Revisions	: 
// **********************************************************************************
function cleanup() {
	writeNavCookie();
	
	if (blnNS) {
		document.releaseEvents(Event.MOUSEMOVE);
	}
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: Popup a window and center it on the screen.
//Return	: none
//Parameters: site URL that will appear in the popup
//					  w width of the popup
//					  h height of the popup
//					  num number if using multiple popups at once
//					  frames if the popup has frames
//					  params would be a string of all the common parameters (see step number 3 below)

//Revisions	: 
// **********************************************************************************
var popwin;
var blnNewPopwin = true;
function popwindow(site, w, h, num) {
	sb = "yes";
  rs = "yes";
  st = "no";
  lc = "no";
  mb = "no";
  tb = "no";
	if (blnNS) {
		if (dblVer < 4) {
			w += 20;
			h += 20;
		// begin code added 2002-11-19 alex w.
		} else if (dblVer < 5) {
			w += 3;
			h -= 40;
		} else {
			w += 10;
			h -= 12;
		}
		// end code added 2002-11-19 alex w.
	} else if (blnIE) {
		w += 17;
	}
	windowparams = "width=" + w + ",height=" + h + ",toolbar=" + tb + ",menubar=" + mb + ",resizable=" + rs +  ",status=" + st + ",location=" + lc + ",scrollbars=" + sb;
		
	if (dblVer >= 4) {
		x = (screen.width - w) >> 1;
		y = (screen.height - h) >> 1;
	} else {
		x = (648 - w) >> 1;
		y = (324 - h) >> 1;
	}
	if (blnIE) {
		windowparams += ",top=" + y + ",left=" + x;
	} else {
		windowparams += ",screenX=" + x + ",screenY=" + y;
	}
	/*
	alert("windowparams is " + windowparams);
	if (("" + popwin != "undefined") && (!popwin.closed)) {
		popwin.close();
	}
	*/
	w += 12;
	h += 34;
	if (site.indexOf(".pdf") == -1) {
		if (site.indexOf("?") == -1) {
			site += "?";
		} else {
			site += "&";
		}
		site += "w=" + w + "&h=" + h;
	}
	// alert("site: " + site);
	popwin = window.open(site, "popwindow" + num, windowparams);
	// popwin = window.open(site, "popwindow" + num, windowparams);
	// setTimeout("popwin.resizeTo(" + w + ", " + h + ")", 70);
	setTimeout("popwin.focus()", 140);
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: sets an image's source to it's "on" source, as defined in the image object's contructor function.
//Return	: none
//Parameters: the image object's name, as defined in the image object's contructor function. 
//Revisions	: 
// **********************************************************************************
function rollOn(imgObjName){
if (!blnLoaded || !document.images) 
	{
		return;
	}
	imgObjName.img.src = imgObjName.imgon.src;
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: sets an image's source to it's "off" source, as defined in the image object's contructor function.
//Return	: none
//Parameters: the image object's name, as defined in the image object's contructor function. 
//Revisions	: 
// **********************************************************************************
function rollOff(imgObjName){
if (!blnLoaded || !document.images) 
	{
		return;
	}
	imgObjName.img.src = imgObjName.imgoff.src;
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: changes the y-axis css position of a layer -  used on the motorcycle landing page
//Return	: none
//Parameters: 1st Parameter: name of the object (as defined in the object's contructor function) ; 2nd parameter: new y value for css positioning of the layer
//Revisions	: 
// **********************************************************************************
function changeCssTop(obj, value){
	obj.css.top  = value;
	return;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06JUNE2002
//Purpose	: changes the css visibility of a given layer or layers
//Return	: none
//Parameters: expects a pair or pairs of values (separated by commas): the name of the layer object (or objects), and the visibility value for the layer(s). 0 hides the layer(s), 1 shows it (them)
//Revisions	: 
// **********************************************************************************
function changeCssVis(args) {
	var arg = changeCssVis.arguments;
	for (var i = 0; i < arg.length; i += 2) {
		arg[i].css.visibility = (arg[i+1] == 1) ? "visible" : "hidden";
		return;
	}
}

function changeCssBgGN(layer) {
	if (!(blnNS && (dblVer < 5))) {
		document.getElementById(layer).style.backgroundColor = '#FF0000';
	}
}


function changeCssBgGNOff(layer){
	if (!(blnNS && (dblVer < 5)))  {
		document.getElementById(layer).style.backgroundColor = '#FFFFFF';
	}
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 29JUL2002
//Purpose	: validate zip code
//Return	: none
//Parameters: 
//Revisions	: 
// **********************************************************************************
function validateZipCode(zipCode){
	var zipRegexAll = '^[0-9]{5}$';
	 var regexZip = new RegExp(zipRegexAll);
	 blnZip = (regexZip.test(zipCode))?1:0;
	 return blnZip;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 29JUL2002
//Purpose	: provide link function for iframe portions in the gn drop down (IE5 + 6) 
//Return	: none
//Parameters: 
//Revisions	: 
// **********************************************************************************
function goToTop(page){
	top.location = page;
}

// **********************************************************************************
//Author	: Geoff Moller
//Date/Time	: 06DEC2002
//Purpose	: change the border for rollover images
//Return	: none
//Parameters: 
//Revisions	: 
// **********************************************************************************
function changeBorder(image, color){
	if (!blnN4){
		image.style.borderColor = color;
		image.style.borderWidth = 1;
		image.style.margin = 0;
	}

}

// **********************************************************************************
// Author : Geoff Moller
// Date/Time : 19FEB2003
// Purpose : parse querystring with js
// Return : none
// Parameters :
// Revisions : 
// **********************************************************************************
function getArgs() {
	var args = new Object();
	var query = location.search.substring(1); 
	var pairs = query.split("&"); 
	
	for(var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('='); 
		if (pos == -1) continue; 
		var argname = pairs[i].substring(0,pos); 
		var value = pairs[i].substring(pos+1); 
		args[argname] = unescape(value); 
	}
	return args; // Return the Object
}

// **********************************************************************************
// Author : Rick Campbell
// Date/Time : 18SEP2002
// Purpose : Checks to see if user is leaving the site when clicking a link.
// Return : none
// Parameters :
// Revisions : 
// **********************************************************************************

if (document.layers) document.captureEvents(Event.MOUSEUP);

document[document.layers?"onmouseup":"onclick"]=

function(e) {
var s = e ? e.target : event.srcElement;
var strref = s.href;

if (s.hostname && s.hostname != location.hostname)

if ((s.hostname) != ("www.honda.com")) 
if ((s.hostname) != ("www.hondahoot.com")) 
if ((s.hostname) != ("www.hondaredriders.com")) 
if ((s.hostname) != ("hrca.honda.com")) 
if ((s.hostname) != ("www.ahm-ownerlink.com")) 

if (strref.indexOf("www") != -1)
{

popwindow('/popups/popup_exit.asp?Category=GOODBYE&SubCategory=' + s.hostname + '/' + s.pathname ,519,495,'');

return false;
}
}

if (document.addEventListener) {
document.addEventListener('click', clickHandler, true);
}

function clickHandler (e) {
var t = e.target.parentNode
var strref = t.href;

if (t.hostname && t.hostname != location.hostname)

if ((t.hostname) != ("www.honda.com")) 
if ((t.hostname) != ("www.hondahoot.com")) 
if ((t.hostname) != ("www.hondaredriders.com")) 
if ((t.hostname) != ("hrca.honda.com")) 
if ((t.hostname) != ("www.ahm-ownerlink.com")) 

if (strref.indexOf("www") != -1)
{
//popwindow('/popups/popup_exit.asp?Category=GOODBYE&SubCategory=' + strrefNS,519,495,'');
popwindow('/popups/popup_exit.asp?Category=GOODBYE&SubCategory=' + t.hostname + t.pathname ,519,495,'');
e.target.parentNode.stopPropagation();
}

}