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
var nodeArray = [];

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

class Node {
	constructor(type, num){
		this.type = type;
		this.num = num;
		this.state = 0;
		nodeArray.push(this);
	}
}

function run() {
	var outputArray = nodeArray.filter(function(v, i) {
  			return (v["type"] == "output");
	});
	for (i = 0; i < outputArray.length; i++) {
		outputArray[i].update();
	}
}

function testin(type, num) {
	target = $('#' + type + '-' + num);
	console.log(target.data('state'));
}

jsPlumb.ready(function(){
	jsPlumb.setContainer(jsPlumb.getSelector('#simzone'));
	jsPlumb.bind('connnection', run);
});


function updateDrag(){
	comps = jsPlumb.getSelector('.node')
	jsPlumb.draggable(comps, {containment: 'parent'});
}

class Input extends Node{
	constructor (type, num) {
		super(type,num);
		this.id = "input-" + inputs;
		$('#simzone').append('<div class="node" id="'+this.id+'"><button class="toggle">On/Off</button></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	};

	toggle(id){
		if(this.state == 0){
			this.state = 1
			$('#'+id).toggleClass("on");
			$('#'+id).data('state', 'on');
		} else {
			this.state = 0
			$('#'+id).toggleClass("on");
			$('#'+id).data('state', 'off');
		}
	};

	update() {
		console.log("INPUT UPDATE CLASS WAS CALLED");
	}

}

$(document).ready(function(){
	$(document).on("click", "button.toggle" , function() {
		id = $(this).parent().attr("id");
		num = id.substring(6,7);
		var result = nodeArray.filter(function(v, i) {
  			return ((v["type"] == "input" && v["num"] == num));
		});
		result[0].toggle(id);
	});		
});

class Not extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "not-" + nots;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/not.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"LeftMiddle"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}

	getInputs() {
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState() {
		var notInput = this.gateInputs[0].sourceId;
		isInputAndUpdate(notInput);
		if ($('#'+notInput).data('state') == "on"){
			$('#'+this.id).data('state','off');
		} else {
			$('#'+this.id).data('state','on');
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}
	update() {
		this.getInputs();
		this.updateState();
	}
}

function isInputAndUpdate(nodeObjectId){
	var objectIdSplit = nodeObjectId.split('-');
	if(objectIdSplit[0] != "input"){
		var inputObject = nodeArray.filter(function(v, i) {
  			return ((v["type"] == objectIdSplit[0] && v["num"] == objectIdSplit[1]));
		});
		inputObject[0].update();
	}
}

class And extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "and-" + ands;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/and.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"BottomLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"TopLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}

	getInputs(){
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState(){
		var andInputs = [];
		andInputs[0] = this.gateInputs[0].sourceId;
		andInputs[1] = this.gateInputs[1].sourceId;
		for(i = 0; i < 2; i++){
			isInputAndUpdate(andInputs[i]);
		}

		if (($('#'+andInputs[0]).data('state') == 'on') && ($('#'+andInputs[1]).data('state') == 'on')){
			$('#'+this.id).data('state','on');
		} else {
			$('#'+this.id).data('state','off');		
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}

	update() {
		this.getInputs();
		this.updateState();
	}
}

class Nand extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "nand-" + nands;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/nand.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"TopLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"BottomLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}

	getInputs(){
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState(){
		var nandInputs = [];
		nandInputs[0] = this.gateInputs[0].sourceId;
		nandInputs[1] = this.gateInputs[1].sourceId;
		for(i = 0; i < 2; i++){
			isInputAndUpdate(nandInputs[i]);
		}

		if (($('#'+nandInputs[0]).data('state') == 'on') && ($('#'+nandInputs[1]).data('state') == 'on')){
			$('#'+this.id).data('state','off');
		} else {
			$('#'+this.id).data('state','on');		
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}

	update() {
		this.getInputs();
		this.updateState();
	}
}

class Or extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "or-" + ors;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/or.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"TopLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"BottomLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}

	getInputs(){
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState(){
		var orInputs = [];
		orInputs[0] = this.gateInputs[0].sourceId;
		orInputs[1] = this.gateInputs[1].sourceId;
		for(i = 0; i < 2; i++){
			isInputAndUpdate(orInputs[i]);
		}

		if (($('#'+orInputs[0]).data('state') == 'off') && ($('#'+orInputs[1]).data('state') == 'off')){
			$('#'+this.id).data('state','off');
		} else {
			$('#'+this.id).data('state','on');		
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}

	update() {
		this.getInputs();
		this.updateState();
	}
}

class Nor extends Node{
	constructor (type, num) {
		super(type,num);
		this.id = "nor-" + nors;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/nor.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"TopLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"BottomLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}
	getInputs(){
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState(){
		var norInputs = [];
		norInputs[0] = this.gateInputs[0].sourceId;
		norInputs[1] = this.gateInputs[1].sourceId;
		for(i = 0; i < 2; i++){
			isInputAndUpdate(norInputs[i]);
		}

		if (($('#'+norInputs[0]).data('state') == 'off') && ($('#'+norInputs[1]).data('state') == 'off')){
			$('#'+this.id).data('state','on');
		} else {
			$('#'+this.id).data('state','off');		
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}

	update() {
		this.getInputs();
		this.updateState();
	}
}

class Xor extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "xor-" + xors;
		$('#simzone').append('<div class="node" id="'+this.id+'"><img src="../images/xor.svg"/></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"TopLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"BottomLeft"}, commonTarget);
		jsPlumb.addEndpoint(this.id, {anchor:"RightMiddle"}, commonSource);
		updateDrag();
	}
	getInputs(){
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState(){
		var xorInputs = [];
		xorInputs[0] = this.gateInputs[0].sourceId;
		xorInputs[1] = this.gateInputs[1].sourceId;
		for(i = 0; i < 2; i++){
			isInputAndUpdate(xorInputs[i]);
		}

		if ($('#'+xorInputs[0]).data('state') != $('#'+xorInputs[1]).data('state')){
			$('#'+this.id).data('state','on');
		} else {
			$('#'+this.id).data('state','off');		
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}

	update() {
		this.getInputs();
		this.updateState();
	}
}

class Output extends Node {
	constructor (type, num) {
		super(type,num);
		this.id = "output-" + outputs;
		$('#simzone').append('<div class="node" id="'+this.id+'"><p>Output</p></div>');
		$('#' + this.id).data('state', 'off');
		jsPlumb.addEndpoint(this.id, {anchor:"LeftMiddle"}, commonTarget);
		updateDrag();
	}

	getInputs() {
		this.gateInputs = [];
		this.gateInputs = jsPlumb.getConnections({target:this.id});
	}

	updateState() {
		var outputInput = this.gateInputs[0].sourceId;
		isInputAndUpdate(outputInput);
		if ($('#'+outputInput).data('state') == "on"){
			$('#'+this.id).data('state','on');
			$('#'+this.id).addClass('on');
		} else {
			$('#'+this.id).data('state','off');
			$('#'+this.id).removeClass('on');
		}
		console.log(this.id + " STATE: " + $('#'+this.id).data('state'));
	}


	update() {
		this.getInputs();
		this.updateState();
	}


}

function Add_Input() {
	newInput = new Input("input", inputs);
	inputs++;
}
function Add_Not(){
	newNot = new Not("not", nots);
	nots++;
}
function Add_And(){
	newAnd = new And("and",ands);
	ands++;
}
function Add_Nand(){
	newNand = new Nand("nand", nands);
	nands++;
}
function Add_Or(){
	newOr = new Or("or",ors);
	ors++;
}
function Add_Nor(){
	newNor = new Nor("nor",nors);
	nors++;
}
function Add_Xor(){
	newXor = new Xor("xor",xors);
	xors++;
}
function Add_Output(){
	newOutput = new Output("output",outputs);
	outputs++;
}
