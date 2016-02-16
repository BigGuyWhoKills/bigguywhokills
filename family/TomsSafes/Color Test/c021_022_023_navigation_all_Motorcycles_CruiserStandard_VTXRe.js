
var viewBrochureOver = newImage("/images/model/c023_view_brochure/viewBrochureOver.gif");
var icoOpenTecSpecsOver = newImage("/images/model/c022_technical_navigation/icoOpenTecSpecsOver.gif");


function highlightBrochureLink(){
var sColor;
var sCategory = 'Motorcycles';
sCategory = sCategory.toLowerCase();
var orig
switch (sCategory){
case 'motorcycles':
	sColor = '#666666';
	doHighlight(sColor);
	break;
case 'atvs':
	sColor = '#814729';
	doHighlight(sColor);
	break;
case 'scooters':
	sColor = '#333300';
	doHighlight(sColor);
	break;
case 'watercraft':
	sColor = '#003366';
	doHighlight(sColor);
	break;
	}
}

function doHighlight(newColor){
if (document.getElementById){
		document.getElementById('linkBrochure').style.color = newColor;
	}
}
