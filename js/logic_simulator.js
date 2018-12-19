// logic_simulator.js
// Chase Gindlesperger

var inputs = 1
var nots = 1
var ands = 1
var nands = 1
var ors = 1
var nors = 1
var xors = 1
var outputs = 1

var commonSource = {
	isSource:true,
	connector: ["Straight"],
	maxConnections: 3
}

var commonTarget = {
	isTarget:true,
	connector: ["Straight"],
	maxConnections: 1
}

function testin(type, num) {
	target = $('#' + type + '-' + num);
	console.log(target.data('state'));
}

jsPlumb.ready(function(){
	jsPlumb.setContainer(jsPlumb.getSelector('#simzone'));
});


function updateDrag(){
	nodes = jsPlumb.getSelector('.node')
	jsPlumb.draggable(nodes, {containment: 'parent'});
}

function Input(){
	this.id = "input-" + inputs;
	var _this = this;
	$('#simzone').append('<div class="node input" id="'+this.id+'"><button class = "toggle">On/Off</button></div>');
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	$("#" + this.id).data("state", "off");
	updateDrag();
	inputs += 1;

	function toggle(selector){
		$(selector).toggleClass("on");
		if ($(selector).data('state') == "on"){
			$(selector).data('state', "off")
		} else {
			console.log("Switching " + selector + " to on");
			$(selector).data('state', "on");
		}
	};

	(function(selector){
		$(selector + " button.toggle").click(function(){
			toggle(selector);
		});
	})("#"+_this.id); //IDK what this is but it doesn't work without it
}

function Not() {
	this.id = "not-" + nots;
	$('#simzone').append('<div class="node not" id="'+this.id+'"><img src="../images/not.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "LeftMiddle"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	nots += 1;
	updateDrag();
}


function And() {
	this.id = "and-" + ands;
	this.inputs = [];
	$('#simzone').append('<div class="node and" id="'+this.id+'"><img src="../images/and.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "BottomLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "TopLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	ands += 1;
	updateDrag();

	this.update = function () {
		console.log("this got called");
	}
}

function Nand() {
	this.id = "nand-" + nands;
	$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/nand.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "BottomLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "TopLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	nands += 1;
	updateDrag();
}

function Or() {
	this.id = "or-" + ors;
	$('#simzone').append('<div class="node or" id="'+this.id+'"><img src="../images/or.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "BottomLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "TopLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	ors += 1;
	updateDrag();
}

function Nor() {
	this.id = "nor-" + nors;
	$('#simzone').append('<div class="node nor" id="'+this.id+'"><img src="../images/nor.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "BottomLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "TopLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	nors += 1;
	updateDrag();
}

function Xor() {
	this.id = "xor-" + xors;
	$('#simzone').append('<div class="node xor" id="'+this.id+'"><img src="../images/nor.svg"/></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "BottomLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "TopLeft"}, commonTarget);
	jsPlumb.addEndpoint(this.id, {anchor: "RightMiddle"}, commonSource);
	xors += 1;
	updateDrag();
}

function Output() {
	this.id = "output-" + outputs;
	$('#simzone').append('<div class="node output" id="'+this.id+'"><p>OUTPUT</p></div>');
	$("#" + this.id).data("state", "off");
	jsPlumb.addEndpoint(this.id, {anchor: "LeftMiddle"}, commonTarget);
	outputs += 1
	updateDrag();
	this.update = function() {
		console.log('this also got called');
	}
}


function update() {
	$('#and-1').update();
}
