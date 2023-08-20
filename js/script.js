function showMeneu() {
	var content = $('#headMenue')
	if (content.css('display') === "block") {
		content.css('display', 'none')
	} else {
		content.css('display', 'block')
	}
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 100);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0xffffff, 0);
renderer.setSize(460, 340, false);
(document.getElementById('threejs') || document.body).appendChild(renderer.domElement);

const size = 1;
const widthSegments = 3;

const heightSegments = 3;

const depthSegments = 3;

const geometry = new THREE.WireframeGeometry(
	new THREE.BoxGeometry(
		size, size, size,
		widthSegments, heightSegments, depthSegments));
line = new THREE.Line(
	geometry,
	new THREE.LineBasicMaterial({
		color: new THREE.Color('rgb(170, 55, 211)')
	}));


scene.add(line);

camera.position.set(2, 0.5, 1.5);
line.rotation.x = 180
line.rotation.y = 10
line.rotation.z = 0
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
document.addEventListener('mousemove', onDocumentMouseMove, false);
function onDocumentMouseMove(event) {
	const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
	const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
	const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
	vector.unproject(camera);

	line.rotation.x = vector.x;
	line.rotation.y = vector.y;
	line.rotation.z = vector.z;
}
const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};
function changeColor(num) {
	// line.scale.x = 0.5
	for (let i = 0; i < 5; i++) {
		if (i != num) {
			document.getElementById('checkColor' + i).checked = false
		}
	}
	if (num == 0) { line.material.color = new THREE.Color(0xAA37D3) }
	if (num == 1) { line.material.color = new THREE.Color(0xff0000) }
	if (num == 2) { line.material.color = new THREE.Color(0xfff700) }
	if (num == 3) { line.material.color = new THREE.Color(0x0000ff) }
	if (num == 4) { line.material.color = new THREE.Color(0xffffff) }
}
var slider = document.getElementById("myRange");
var output = document.getElementById("obSize");
slider.oninput = function () {
    output.innerHTML = this.value;
	line.scale.x = this.value / 10
	line.scale.y = this.value / 10
	line.scale.z = this.value / 10
}
animate();


function draw() {
	con.clearRect(0, 0, WIDTH, HEIGHT);
	for (var e = 0; e < pxs.length; e++) {
		pxs[e].fade();
		pxs[e].move();
		pxs[e].draw()
	}
}

function Circle() {
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	this.s = {
		ttl: 8e3,
		xmax: 5,
		ymax: 2,
		rmax: 10,
		rt: 1,
		xdef: 960,
		ydef: 540,
		xdrift: 4,
		ydrift: 4,
		random: true,
		blink: true
	};
	this.reset = function () {
		this.x = this.s.random ? WIDTH * Math.random() : this.s.xdef;
		this.y = this.s.random ? HEIGHT * Math.random() : this.s.ydef;
		this.r = (this.s.rmax - 1) * Math.random() + 1;
		this.dx = Math.random() * this.s.xmax * (Math.random() < .5 ? -1 : 1);
		this.dy = Math.random() * this.s.ymax * (Math.random() < .5 ? -1 : 1);
		this.hl = this.s.ttl / rint * (this.r / this.s.rmax);
		this.rt = Math.random() * this.hl;
		this.s.rt = Math.random() + 1;
		this.stop = Math.random() * .2 + .4;
		this.s.xdrift *= Math.random() * (Math.random() < .5 ? -1 : 1);
		this.s.ydrift *= Math.random() * (Math.random() < .5 ? -1 : 1)
	};
	this.fade = function () {
		this.rt += this.s.rt
	};
	this.draw = function () {
		if (this.s.blink && (this.rt <= 0 || this.rt >= this.hl)) this.s.rt = this.s.rt * -1;
		else if (this.rt >= this.hl) this.reset();
		var e = 1 - this.rt / this.hl;
		con.beginPath();
		con.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
		con.closePath();
		var t = this.r * e;
		g = con.createRadialGradient(this.x, this.y, 0, this.x, this.y, t <= 0 ? 1 : t);
		g.addColorStop(0, "rgba(255,255,255," + e + ")");
		g.addColorStop(this.stop, "rgba(77,101,181," + e * .6 + ")");
		g.addColorStop(1, "rgba(77,101,181,0)");
		con.fillStyle = g;
		con.fill()
	};
	this.move = function () {
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;
		this.x += this.rt / this.hl * this.dx;
		this.y += this.rt / this.hl * this.dy;
		if (this.x > WIDTH || this.x < 0) this.dx *= -1;
		if (this.y > HEIGHT || this.y < 0) this.dy *= -1
	};
	this.getX = function () {
		return this.x
	};
	this.getY = function () {
		return this.y
	}
}
var WIDTH;
var HEIGHT;
var canvas;
var con;
var g;
var pxs = new Array;
var rint = 60;
$(document).ready(function () {
	WIDTH = "100%";
	HEIGHT = "100%";
	$("#container").width(WIDTH).height(HEIGHT);
	WIDTH = window.innerWidth;
	HEIGHT = window.innerHeight;
	canvas = document.getElementById("pixie");
	$(canvas).attr("width", WIDTH).attr("height", HEIGHT);
	con = canvas.getContext("2d");
	for (var e = 0; e < 100; e++) {
		pxs[e] = new Circle;
		pxs[e].reset()
	}
	setInterval(draw, rint)
});
$(".services .header2 .service-header").hover(function () {
	var e = $(this);
	e.find("h3").hide();
	$(this).parent().find(".header-bg").stop(true, true).animate({
		width: "100%"
	}, "fast", function () {
		e.find("h3").addClass("active").fadeIn("fast")
	})
}, function () {
	var e = $(this);
	e.find("h3").hide();
	e.parent().find(".header-bg").stop(true, true).animate({
		width: 70
	}, "fast", function () {
		e.find("h3").removeClass("active").fadeIn("fast")
	})
})
