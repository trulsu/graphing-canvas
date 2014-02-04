var PLOTTING = {};
PLOTTING.canvas = document.getElementById('canvas');
PLOTTING.context = canvas.getContext("2d");
PLOTTING.context.font = "8px Arial";

PLOTTING.drawXAxis = function(params) {
  var ypos = params.margin + params.height;
  var x0 = params.margin;
  var x1 = params.margin + params.width;
  var i,val;
  var xpos;

  PLOTTING.context.moveTo(x0,ypos);
  PLOTTING.context.lineTo(x1,ypos);
  PLOTTING.context.stroke();
  
  xpos = x0;
  for(i=0;i<10;i+=1) {
    xpos += params.xstep;
    PLOTTING.context.moveTo(xpos, ypos - 5);
    PLOTTING.context.lineTo(xpos, ypos + 5);
    PLOTTING.context.stroke();
    val = '' + (i+1);
    PLOTTING.context.fillText(val, xpos - 2, ypos + 12);
  }
};

PLOTTING.drawYAxis = function(params) {
  var xpos = params.margin;
  var y0 = params.margin + params.height;
  var y1 = params.margin;
  var i, val;
  var ypos;

  PLOTTING.context.moveTo(xpos, y0);
  PLOTTING.context.lineTo(xpos, y1);
  PLOTTING.context.stroke();

  ypos = y0;
  for(i=0;i<6;i+=1) {
    ypos -= params.ystep;
    PLOTTING.context.moveTo(xpos - 5,ypos);
    PLOTTING.context.lineTo(xpos + 5,ypos);
    PLOTTING.context.stroke();
    val = '' + ((i+1)*10);
    PLOTTING.context.fillText(val, xpos-14, ypos+3);
  }
};

PLOTTING.plotFunction = function(xvalues, params) {
  var y0 = xvalues[0];
  var y1 = xvalues[1];
  var x0 = params.margin;
  var x1 = x0 + params.width;
  var funcText = '' + params.factor + 'x + ' + params.addend;

  PLOTTING.context.moveTo(x0,y0);
  PLOTTING.context.lineTo(x1, y1);
  PLOTTING.context.stroke();

  PLOTTING.context.fillText(funcText, x1 + 5, y1);
};

PLOTTING.createPlotValues = function(params) {
  var starty = (params.margin + params.height) - (params.addend * (params.ystep/10));
  var endy = starty - (params.ystep * params.factor);
  return [starty, endy];
};

PLOTTING.getParameters = function() {
  var factorValue = document.getElementById('factorId').value;
  var addendValue = document.getElementById('addendId').value;
  var marginValue = 15;
  var rightBox = 50;
  var widthValue = PLOTTING.canvas.width - marginValue - rightBox;
  var heightValue = PLOTTING.canvas.height - (marginValue * 2);
  var xstepValue = widthValue / 10;
  var ystepValue = heightValue / 6;
  return {
    factor: parseInt(factorValue),
    addend: parseInt(addendValue),
    width: widthValue,
    height: heightValue,
    margin: marginValue,
    xstep: xstepValue,
    ystep: ystepValue
  };
};

/* Set button to execute plotting */
var button = document.getElementById('plotbuttonId');
button.onclick = function(event) {
  var result = document.getElementById('resultId');
  var values;
  var params = PLOTTING.getParameters();

  PLOTTING.drawXAxis(params);
  PLOTTING.drawYAxis(params);
  
  values = PLOTTING.createPlotValues(params);
  PLOTTING.plotFunction(values, params);

  // Stop event from propagating
  // Avoids page reload
  if(event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
};


