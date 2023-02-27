// Author: Erno Mitrovic
// Date: February 26, 2023
// Description: Add image as texture to svg

function updateSVG(){
    const original = document.getElementsByTagName('object')[0]
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'fill')
    element.setAttributeNS(null, 'x', 10);
	element.setAttributeNS(null, 'y', 15);
	element.setAttributeNS(null, 'width', 25);
    element.setAttributeNS(null, 'height', 30);
	element.setAttributeNS(null, 'fill', '#007bff');
    original.appendChild(element)
}

document.querySelector(".svgClass").getSVGDocument().getElementById("svgInternalID").setAttribute("fill", "red")
