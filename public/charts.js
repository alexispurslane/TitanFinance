function shadeColor1(color, percent) {
  var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}

function Guage(options) {
  //canvas initialization
  var canvas = document.getElementById(options.canvas);
  this.ctx = canvas.getContext("2d");
  //dimensions
  this.W= canvas.width;
  this.H= canvas.height;
  //Variables
  this.degrees = 0;
  this.new_degrees = 0;
  this.difference = 0;
  this.color = options.color; //purple looks better to me "#8d46b0"
  this.bgcolor = "#222";
  this.text = "";
  this.animation_loop = null;
  this.redraw_loop = null;
  return this;
}
Guage.prototype.draw = function (self) {
  //Clear the canvas everytime a chart is drawn
  self.ctx.clearRect(0, 0, self.W, self.H);
  //Background 360 degree arc
  self.ctx.beginPath();
  self.ctx.strokeStyle = self.bgcolor;
  self.ctx.lineWidth = 30;
  self.ctx.arc(self.W/ 2, self.H/ 2, 100, 0, Math.PI * 2, false); //you can see the arc now
  self.ctx.stroke();
  //gauge will be a simple arc
  //Angle in radians = angle in degrees * PI / 180
  var radians = self.degrees * Math.PI / 180;
  self.ctx.beginPath();
  self.ctx.strokeStyle = self.color;
  self.ctx.lineWidth = 30;
  //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
  //the arc will start from the topmost end
  self.ctx.arc(self.W/ 2, self.H/ 2, 100, 0 - 90 * Math.PI / 180, radians - 90 * Math.PI / 180, false);
  //you can see the arc now
  self.ctx.stroke();
  self.ctx.beginPath();
  self.ctx.strokeStyle = shadeColor1(self.color, 20);
  self.ctx.lineWidth = radians + 2;
  //The arc starts from the rightmost end. If we deduct 90 degrees from the angles
  //the arc will start from the topmost end
  self.ctx.arc(self.W/ 2, self.H/ 2, 100, 0 - 90 * Math.PI / 180, (radians) - 90 * Math.PI / 180, false);
  //you can see the arc now
  self.ctx.stroke();
  //Lets add the text
  self.ctx.fillStyle = self.color;
  self.ctx.font = "50px source sans pro";
  self.text = Math.floor(self.degrees / 360 * 100) + "%";
  //Lets center the text
  //deducting half of text width from position x
  self.text_width = self.ctx.measureText(self.text).width;
  //adding manual value to position y since the height of the text cannot
  //be measured easily. There are hacks but we will keep it manual for now.
  self.ctx.fillText(self.text, self.W/ 2 - self.text_width / 2, self.H/ 2 + 15);

};

Guage.prototype.moveDraw = function (newdeg, self) {
  //Cancel any movement animation if a new chart is requested
  if (typeof self.animation_loop !== undefined) {
    clearInterval(self.animation_loop);
  }
  //random degree from 0 to 360:: Math.round(Math.random()*360)
  self.new_degrees = newdeg;
  self.difference = self.new_degrees - self.degrees;
  //self will animate the gauge to new positions
  //The animation will take 1 second
  //time for each frame is 1sec / difference in degrees
  self.animation_loop = setInterval(self.animTo, 1000 / self.difference, self);
  if (Math.floor(self.difference) <= 0) {
    clearInterval(self.animation_loop);
  }
};
//function to make the chart move to new degrees

Guage.prototype.animTo = function (self) {
  //clear animation loop if degrees reaches to new_degrees
  if (self.degrees === self.new_degrees) {
    clearInterval(self.animation_loop);
  }

  if (self.degrees < self.new_degrees) {
    self.degrees++;
  }
  self.draw(self);
  self.redraw_loop = setInterval(self.moveDraw, 2000, self.new_degrees, self); //Draw a new chart every 2 seconds

};
Guage.prototype.haltRedraw = function (self) {
  clearInterval(self.redraw_loop);
  clearInterval(self.animation_loop);

};
var week, quart, year;
$('canvas').waitUntilExists(function () {
  week = new Guage({
    canvas: 'week',
    color:  '#9954bb'
  });
  week.draw(week);
  quart = new Guage({
    canvas: 'quart',
    color:  '#2780e3'
  });
  quart.draw(quart);
  year = new Guage({
    canvas: 'year',
    color:  '#f0005e'
  });
  year.draw(year);

  $(function () {
    var changedWeek  = parseInt($('#cw').text()),
    changedQuart = parseInt($('#cq').text()),
    changedYear  = parseInt($('#cy').text());
    week.moveDraw(Math.floor(changedWeek * 360 / 100), week);
    quart.moveDraw(Math.floor(changedQuart * 360 / 100), quart);
    year.moveDraw(Math.floor(changedYear * 360 / 100), year);
  });
});
