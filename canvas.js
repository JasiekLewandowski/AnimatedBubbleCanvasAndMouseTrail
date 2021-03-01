var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var colorArray = ["#39998E", "#FFDC7C", "#FFAA67", "#DA674A"];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined
}

var particles = [];

//EventListener
canvas.addEventListener("mousemove", function(event) {
  mouse.x = event.offsetX;
  mouse.y = event.offsetY;
  generateParticles();
})

//Circles class
function Circle(x, y, xinc, yinc, radius, color) {
  this.xinc = xinc;
  this.yinc = yinc;
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.xinc = -this.xinc;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.yinc = -this.yinc;
    }
    this.x += this.xinc;
    this.y += this.yinc;
    this.draw();
  }
}

//Mouse trail particles class
function Particle(x, y, xinc, yinc, radius, color) {
  this.xinc = xinc;
  this.yinc = yinc;
  this.radius = radius;
  this.x = x;
  this.y = y;
  this.color = color;

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.xinc = -this.xinc;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.yinc = -this.yinc;
    }
    this.x += this.xinc;
    this.y += this.yinc;
    this.draw();
  }
}

//Creating mouse trail particles
function generateParticles() {
  for (i = 0; i < 7; i++) {
    if (particles.length > 200) {
      particles.splice(0, 1);
    }
    var color = colorArray[Math.floor(Math.random() * 4)]
    var xinc = (Math.random() - 0.5);
    var yinc = (Math.random() - 0.5);
    particles.push(new Particle(mouse.x, mouse.y, xinc, yinc, 4, color));
  }
}

//Creating background circles
var circleArray = [];
for (i = 0; i < 50; i++) {
  var x = (Math.random() * (innerWidth - radius * 2)) + radius;
  var y = (Math.random() * (innerHeight - radius * 2)) + radius;
  var radius = (Math.random() * 40) + 10;
  var xinc = (Math.random() * 5) + 1;
  var yinc = (Math.random() * 5) + 1;
  var color = colorArray[Math.floor(Math.random() * 4)]
  circleArray.push(new Circle(x, y, xinc, yinc, radius, color));
}

//Animating
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
  for (k = 0; k < particles.length; k++) {
    particles[k].update();
  }
}

animate();
