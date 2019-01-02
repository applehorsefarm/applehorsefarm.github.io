//Fade in logo
setTimeout(logoanimation, 1000);

function logoanimation() {
  var logo = document.getElementById("bannerlogo");
  fadeIn(logo);
}

//Delay for logo animation and to load telefon font
setTimeout(titlebacklight, 3000);

function titlebacklight() {
  var txt = "apple horse farm";
  var txtH = 140;
  var font = "telefon";
  var bg = "#000";
  var rayColor1 = "#B40000";
  var rayColor2 = "#FFFFE0";
  var fade = 1000;

  var canvas = document.getElementById("bannertitle");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width = document.documentElement.clientWidth;
  var ch = canvas.height = document.documentElement.clientHeight * .4;

  var w2 = cw/2;
  var h2 = ch/2;
  var pi = Math.PI;
  var pi2 = pi*.5;

  var txtCanvas = document.createElement("canvas");
  var txtCtx = txtCanvas.getContext("2d");
  txtCtx.font = txtH + "px " + font;
  txtCtx.textBaseline = "middle";
  var txtW = Math.floor(txtCtx.measureText(txt).width);
  txtCanvas.width = txtW;
  txtCanvas.height = txtH*1.5;

  var gradient = ctx.createRadialGradient(w2, h2*.9, 0, w2, h2*.9, txtW);
  gradient.addColorStop(0, rayColor1);
  gradient.addColorStop(1, rayColor1);
  ctx.strokeStyle = gradient;

  txtCtx.fillStyle = gradient;
  txtCtx.font = txtH + "px " + font;
  txtCtx.textBaseline = "middle";
  txtCtx.fillText(txt,0,txtH*.52);

//dirty adjust for descends
txtH *= 1.5;

var bufferCanvas = document.createElement("canvas");
bufferCanvas.width = txtW;
bufferCanvas.height = txtH;
var buffer = bufferCanvas.getContext("2d");

//text start position
var sx = (cw-txtW)*0.5
var sy = (ch-txtH)*0.5

////generate data
var rays = [];
var txtData = txtCtx.getImageData(0,0,txtW,txtH);
for (var i = 0; i < txtData.data.length; i+=4) {
  var ii = i/4;
  var row = Math.floor(ii/txtW)
  var col = ii%txtW
  var alpha = txtData.data[i+3]
  if(alpha !== 0){
    var c = "rgba("
    c += [txtData.data[i],txtData.data[i+1],txtData.data[i+2], alpha/255 ] 
    c += ")";
    rays.push(new Ray(Math.floor(ii/txtW), ii%txtW, c));  
  }
}

var current = 1;
//start animation
tick();

function tick() {
  ctx.clearRect(0,0,cw,ch)
  ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
  ctx.save()
  ctx.globalAlpha = .02;
  ctx.globalCompositeOperation = "lighter";
  if(drawRays(current)){
    current+=5;
    current = Math.min(current, txtW)
    window.requestAnimationFrame(tick)  
  }else{
    // fadeOut()
  }
  ctx.restore()
}

// function fadeOut(){
//   ctx.clearRect(0,0,cw,ch)
//   ctx.globalAlpha *= .95;
//   ctx.drawImage(bufferCanvas, 0, 0, current, txtH, sx, sy, current, txtH)
//   if(ctx.globalAlpha > .01){
//    window.requestAnimationFrame(fadeOut) 
//  }else{
//   window.setTimeout(restart, 500)
// }
// }
// function restart(){
//   for(var i = 0; i < rays.length; i++){
//     rays[i].reset()
//   }
//   ctx.globalAlpha = 1
//   buffer.clearRect(0,0,txtW,txtH)
//   current = 1;
//   tick();
// }

function drawRays(c){
  var count = 0;
  ctx.beginPath()
  for(var i = 0; i < rays.length; i++){
    var ray = rays[i];
    if(ray.col < c){
      count += ray.draw()
    }
  }
  ctx.stroke()
  return count !== rays.length;
}

function filterRays(r){
  return Boolean(r);
}

function Ray(row, col, f){
  this.col = col;
  this.row = row;
  
  var xp = sx + col;
  var yp = sy + row;
  var fill = f;
  
  var ath = (txtH/1.5) 
  
  var a = pi2 * (this.row - ath*.5) / ath;
  if(a === 0){
    a = (Math.random() - .5) * pi2;
  }
  var da = .02 * Math.sign(a);
  da += (Math.random() - .5) * .005;
  var l = 0;
  var dl = Math.random()*2 + 2;
  
  var buffered = false;
  this.reset = function(){
    a = pi2 * (this.row - ath*.5) / ath;
    if(a === 0){
      a = -pi2*.5;
    }
    l = 0;
    buffered = false
  }
  this.draw = function(){
    if(l < 0){
      if(!buffered){
        buffer.fillStyle = fill;
        buffer.fillRect(this.col, this.row, 1, 1);
        buffered = true
      }
      return 1;
    }else{
      ctx.moveTo(xp, yp)
      ctx.lineTo(xp + Math.cos(a) * l, yp + Math.sin(a) * l);
      a += da;
      l += Math.cos(a)*dl;
      return 0;
    }
  }
}
}

//Scroll button
var scrollbutton = document.getElementById('scroll');
scrollbutton.onclick = function () {
  var contentoffsets = document.getElementById('navigation').getBoundingClientRect();
  var contenttop = contentoffsets.top + window.pageYOffset;
  scrollToPosition(document.documentElement, contenttop, 1500);   
}

function scrollToPosition(element, to, duration) {
  var start = element.scrollTop,
  change = to - start,
  currentTime = 0,
  increment = 20;

  var animateScroll = function(){        
    currentTime += increment;
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    element.scrollTop = val;
    if(currentTime < duration) {
      setTimeout(animateScroll, increment);
    }
  };
  animateScroll();
}
//Ease Function (Bounce)
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function(t, b, c, d) {
  var s = 1.70158; 
  if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.8))+1)*t - s)) + b;
  return c/2*((t-=2)*t*(((s*=(1.8))+1)*t + s) + 2) + b;
};

//Fade scroll button in after banner animations
setTimeout(fadeInScroll, 6000);

function fadeInScroll() {
  fadeIn(scrollbutton);
}

//Fade in
function fadeIn(element) {
  if (element.style.opacity <= 0.1) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
      if (op >= 1){
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op += op * 0.03;
    }, 3);
  }
}