var running = false ; 
var process = '' ;
function binarySearchTree () {
	var ctr = 0 ; // for id 
	var root = null;
	var node = function(value){
		this.value = value ;
		this.left = null ;
		this.right = null ;
		this.topPos = 0 ; 
		this.leftPos = 50 ;
		this.leftDiff = 25 ;
		this.lineLeft = 52 ; 
		this.lineWidth = 0 ; 
		this.lineDirection = null ; 
		this.lineId = ++ctr ;
		this.nodeId = ++ctr ;
	}
	this.insert = function(value){
		colorQueue.clear() ; 
		var Line = document.createElement("canvas");  
		Line.className = "LINE";
		var temp=root;
		var level = 1 ; 
		if(root == null)
		{	
			root = new node( value );
			temp = root ; 
			Line.id = temp.lineId ; 
		}
		else
		{
			while(true){
				if(parseInt(value)>parseInt(temp.value))
				{
					if ( level >= 6 ) 
					{
						alert("max level is 6") ; 
						running = false ; 
						return ; 
					}						
					if(temp.right==null)
					{
						temp.right=new node(value),
						Line.id = temp.right.lineId ; // id for the line 
						colorQueue.push(temp) ; 
						temp.right.topPos = temp.topPos+10;
						temp.right.leftPos = temp.leftPos+temp.leftDiff;
						temp.right.lineWidth = temp.leftDiff ;
						temp.right.lineLeft = Math.min(temp.leftPos,temp.right.leftPos) + 2 ; 
						temp.right.leftDiff = temp.leftDiff/2. ; 
						temp = temp.right ; 
						temp.lineDirection = 'right' ; 
						break;
					}
					else
					{
						colorQueue.push(temp) ; 
						temp = temp.right;
						level++ ; 
					}
				}
				else if(parseInt(value)<parseInt(temp.value)){
					if ( level >= 6 ) 
					{
						alert("max level is 6") ; 
						running = false ; 
						return ; 
					}			
					if(temp.left==null){
						temp.left=new node(value),
						Line.id = temp.left.lineId // id for the line 
						colorQueue.push(temp) ; 
						temp.left.topPos = temp.topPos+10;
						temp.left.leftPos = temp.leftPos-temp.leftDiff;
						temp.left.lineWidth = temp.leftDiff ;
						temp.left.lineLeft = Math.min(temp.leftPos,temp.left.leftPos) + 2 ; 
						temp.left.leftDiff = temp.leftDiff/2. ; 
						temp = temp.left ; 
						temp.lineDirection = 'left' ; 
						break;
					}
					else{
						colorQueue.push(temp) ; 
						temp=temp.left;
						level++ ; 
					}
				}
				else{
					// make it return better :D  34an elly b3dha fe rsm w kda @@ 
					alert('no dubplicates') ;
					running = false ; 
					return ; 
					//break;
				}
			}
		}
		Line.style.top = temp.topPos - 3.8 + '%'; 
		Line.style.height = '14%' ; 
		Line.style.left = temp.lineLeft + '%';
		Line.style.width = temp.lineWidth + '%'; 
		document.getElementById("Nodes").appendChild(Line);
		var Node = document.createElement("canvas") ;
		Node.className = 'Circle' ;  
		var ctx = Node.getContext("2d");
		Node.id = temp.nodeId ; 
		ctx.fillStyle = "yellow";
		ctx.font = "bold 65px Arial";
		ctx.fillText(value,130,90);
		Node.style.top = temp.topPos + '%'; 
		Node.style.left = temp.leftPos +'%';
		Node.style.display = 'none';
		var divI = document.getElementById("Nodes") ;
		divI.appendChild(Node) ; 
		colorQueue.push(temp) ; 
		colorNodes('insert') ; 
		//wait till animation(draw line) is done then make the node appear 
		
	}
	this.find = function(value){
		var temp = root;
		colorQueue.clear() ; 
		while(temp!=null && parseInt(temp.value) != parseInt(value) ){
			if(parseInt(value) > parseInt(temp.value) ){
				colorQueue.push(temp) ; 
				temp=temp.right;
			}
			else{
				colorQueue.push(temp) ; 
				temp=temp.left;
			}
		}
		if(temp==null){
			colorQueue.push(value) ; 
			colorNodes('nFound') ; 
			return false;
		}
		else{
			colorQueue.push(temp) ; 
			colorNodes('found') ; 
			return true;
		}
	}
	var originalPostOrder = function(temp){
		if (temp != null){
			originalPostOrder(temp.left);
			originalPostOrder(temp.right);
			colorQueue.push(temp);
			traverseOrder.push(temp.value) ; 
		}
	}
	this.postOrder = function () {
		colorQueue.clear();
		traverseOrder = [] ; 
		originalPostOrder(root);
		colorQueue.push('Post-Order traverse : \n' + traverseOrder); 
		colorNodes('traverse');
	}
	var originalInOrder= function (temp){
		if(temp!=null)
		{
			originalInOrder(temp.left);
			colorQueue.push(temp);
			traverseOrder.push(temp.value) ; 
			originalInOrder(temp.right);	
		}
	}
	this.inOrder = function () {
		colorQueue.clear();
		traverseOrder = [] ; 
		originalInOrder(root);
		colorQueue.push('In-Order traverse : \n' + traverseOrder) ; 
		colorNodes('traverse');
	}
	var originalPreOrder= function(temp){
		if(temp!=null)
		{
			traverseOrder.push(temp.value) ; 
			colorQueue.push(temp);
			originalPreOrder(temp.left);
			originalPreOrder(temp.right);	
		}
	}
	this.preOrder = function () {
		colorQueue.clear();
		traverseOrder = [] ; 
		originalPreOrder(root);
		colorQueue.push('Pre-Order traverse : \n' + traverseOrder);
		colorNodes('traverse');
	}
	var transferNodes = function (toBeTransfered,topPos,leftPos,tempLine) {
		toBeTransfered.topPos=topPos;
		toBeTransfered.leftPos=leftPos;
		toBeTransfered.leftDiff*=2.0;
		toBeTransfered.lineWidth*=2.0;
		$('#'+toBeTransfered.nodeId).animate({
			top: toBeTransfered.topPos+'%',
			left: toBeTransfered.leftPos+'%'
		}
		,1250
		);
		$('#'+toBeTransfered.lineId).animate({
			width: toBeTransfered.lineWidth+'%',
			top: toBeTransfered.topPos-3.8+'%',
			left: tempLine+2+'%'
		}
		,1250
		);
		toBeTransfered.lineLeft = tempLine + 2 ; 
		var isFinished = true ; 
		if(toBeTransfered.left!=null){
			transferNodes(toBeTransfered.left,topPos+10,leftPos-toBeTransfered.leftDiff,leftPos-toBeTransfered.leftDiff);
			isFinished = false ; 
		}
		if(toBeTransfered.right!=null){
			transferNodes(toBeTransfered.right,topPos+10,leftPos+toBeTransfered.leftDiff,Math.min(toBeTransfered.leftPos,leftPos+toBeTransfered.leftDiff));
			isFinished = false ; 
		}
		if ( isFinished == true ) 
		{
			running = false ; 
		}
	}
	
	this.deleteVal = function( value ) 
	{
		colorQueue.clear() ;
		deleteAt(value,'first') ; 
	}
	var deleteAt = function (value , param) {  //param ( first , second enter) 
		var temp=root,parent=null,found=false,temp2,parent2;
		while(!(found) && temp!=null){
			if(value>temp.value){
				colorQueue.push(temp) ;
				parent=temp;				
				temp=temp.right;
			}
			else if(value<temp.value){
				colorQueue.push(temp) ;
				parent=temp;
				temp=temp.left;
			}
			else{
				found=true;
			}
			if ( isNaN(param) == false && param == parent.value ) 
			{
				parent.value = value ; 
			}
		}
		if(found){
			if ( !isNaN(param) ) 
			{
				temp.value = param ; 
				colorQueue.clear() ; 
			}
			if(temp.right==null && temp.left==null){
				
				colorQueue.push([ 'noChilds' , temp ]) ; 
				
				if ( temp == root ) 
				{
					root = null ; 
				}
				else 
				{
					if(parent.right == temp){
						parent.right=null;
					}
					else{
						parent.left=null;
					}
				}
			}
			else{
				if(temp.right==null){
					colorQueue.push([ 'leftChild' , temp ]) ; 
					
					if ( parent == null ) 
					{
						root = temp.left ; 
					}
					else {
						if(parent.right==temp){
							parent.right=temp.left;
						}
						else{
							parent.left=temp.left;
						}
					}
				}
				else if(temp.left == null){
					colorQueue.push([ 'rightChild' , temp ]) ; 
					if ( parent == null ) 
					{
						root = temp.right ; 
					}
					else 
					{
						if(parent.right==temp){
							parent.right=temp.right;
						}
						else{
							parent.left=temp.right;
						}
					}
				}
				else{
					colorQueue.push([ 'findLowest' , temp ] ) ; 
					temp2=temp.right;
					colorQueue.push(temp2) ; 
					while(temp2.left!=null){
						temp2=temp2.left;
						colorQueue.push(temp2) ; 
					}
					var leastOnRight =temp2.value;
					colorQueue.push([ 'swapValues' , temp, temp2 ] ) ; 
					colorQueue.push([ 'deleteLowest' , temp , temp2 ]) ;
				}
			}
			colorNodes('delete') ; 
		}
		else 
		{
			updateActionBox(process + value + ' is not found' ) ; 
			running=false;
		}
	}
		
	function colorNodes( order ) // insert , find ..  
	{ 

		if ( colorQueue.empty() ) {
			running = false ;
			return ; 
		}
		if ( order == 'delete' ) 
		{
			var currentState = colorQueue.front() ; 
			if ( currentState[0] == 'noChilds' ) 
			{
				var temp = currentState[1] ; 
				updateActionBox ( process + temp.value) ; 
				toggleClass(document.getElementById(temp.nodeId));
				$( "#"+temp.nodeId ).hide( 1500);
				$( "#"+temp.lineId ).hide(1500);				
				setTimeout(
					function()
					{
						updateActionBox( process + 'deleting ' + temp.value + ' is done' ) ; 
						document.getElementById("Nodes").removeChild(document.getElementById(temp.nodeId)) ;
						document.getElementById("Nodes").removeChild(document.getElementById(temp.lineId)) ;
						running = false ; 
					}
				, 1500
				)
				return ; 
			}
			else if ( currentState[0] == 'leftChild' ) 
			{
				var temp = currentState[1] ; 
				toggleClass(document.getElementById(temp.nodeId)) ; 
				updateActionBox ( process + temp.value) ; 
				$( "#"+temp.nodeId ).hide( 1250);
				var tempLineToBeDeleted = temp.left.lineId ; 
				$( "#"+tempLineToBeDeleted).hide(1250);
				temp.left.lineId = temp.lineId ; 
				setTimeout(
					function()
					{
						updateActionBox( process + 'deleting ' + temp.value + ' is done' ) ; 
						document.getElementById("Nodes").removeChild(document.getElementById(temp.nodeId)) ;
						document.getElementById("Nodes").removeChild(document.getElementById(tempLineToBeDeleted)) ;
						transferNodes(temp.left,temp.topPos,temp.leftPos,temp.lineLeft-2);
					}
					, 1250
				)
				return ; 
			}
			else if ( currentState[0] == 'rightChild' ) 
			{
				var temp = currentState[1] ; 
				toggleClass(document.getElementById(temp.nodeId)) ; 
				updateActionBox ( process + temp.value) ; 
				$( "#"+temp.nodeId ).hide( 1250);
				var tempLineToBeDeleted = temp.right.lineId ; 
				$( "#"+tempLineToBeDeleted ).hide(1250);	
				temp.right.lineId = temp.lineId ; 
				setTimeout(
					function()
					{
						updateActionBox( process + 'deleting ' + temp.value + ' is done' ) ; 
						document.getElementById("Nodes").removeChild(document.getElementById(temp.nodeId)) ;
						document.getElementById("Nodes").removeChild(document.getElementById(tempLineToBeDeleted)) ;
						transferNodes(temp.right,temp.topPos,temp.leftPos,temp.lineLeft-2);
					}
					, 1250
				)
				return ; 
			}
			else if ( currentState[0] == 'findLowest' )
			{
				var temp = currentState[1] ; 
				toggleClass(document.getElementById(temp.nodeId)) ; 
				updateActionBox(process + 'finding smallest number bigger than ' + currentState[1].value) ; 
				colorQueue.pop() ; 
				setTimeout( function() 
					{
						toggleClass(document.getElementById(temp.nodeId)) ; 
						colorNodes(order) ; 
					}
					,1000 
				);
				return ; 
			}
			else if ( currentState[0] == 'swapValues' )
			{
				var temp = currentState[1] ; 
				var temp2 = currentState[2] ; 
				updateActionBox( process + 'swapping values ' + temp.value + ' and ' + temp2.value )  ; 
				var leastOnRight = temp2.value ; 
				var tempNode = document.getElementById(temp.nodeId) ;
				var temp2Node = document.getElementById(temp2.nodeId) ;	
				var ctx = tempNode.getContext("2d");
				ctx.clearRect(0,0,tempNode.width,tempNode.height) ; 
				ctx.fillStyle = "yellow";
				ctx.font = "bold 65px Arial";	
				ctx.fillText(temp2.value,130,90);
				toggleClass(tempNode) ; 
				toggleClass(temp2Node) ; 
				var ctx2 = temp2Node.getContext("2d");
				ctx2.clearRect(0,0,temp2Node.width,temp2Node.height) ; 
				ctx2.fillStyle = "yellow";
				ctx2.font = "bold 65px Arial";	
				ctx2.fillText(temp.value,130,90);
				colorQueue.pop() ; 
				setTimeout( function() 
					{
						toggleClass(tempNode) ; 
						toggleClass(temp2Node) ; 
						colorNodes('delete') ; 
					}
					,1000 
				) ;
				return ; 			
			}
			else if ( currentState[0] == 'deleteLowest' )
			{
				var temp = currentState[1] ; 
				updateActionBox(process + 'deleting ' + temp.value) ; 
				deleteAt(currentState[2].value , temp.value ) ; 
			}
		}
		if ( colorQueue.getSz() == 1 && order == 'insert' ) 
		{
			var current = colorQueue.front() ; 
			var Node = document.getElementById(current.nodeId) ; 
			var Line = document.getElementById(current.lineId) ; 
			var ctxLine = Line.getContext("2d");
			drawLine(ctxLine,current.lineDirection) ; 
			setTimeout(
				function()
				{
					drawCircle(Node.id) ; 	
				}
				,800
			);
			// wait a bit then change its color 
			setTimeout(
				function()
				{
					updateActionBox( process + current.value + ' is inserted' ) ; 
					toggleClass(Node);
					running = false ; 
				}	
				, 1200 
			)
			return ; 
		}
		else if ( colorQueue.getSz() == 1 && order == 'nFound' ) 
		{
			updateActionBox( process + colorQueue.front() + ' is not found') ; 
			running = false ; 
			return ;  
		}
		else if ( colorQueue.getSz() == 1 && order == 'traverse' ) 
		{
			running = false ; 
			updateActionBox( colorQueue.front() ) ;
			return ; 
		}
		var current = document.getElementById(colorQueue.front().nodeId) ; 
		toggleClass(current) ;
		updateActionBox( process + colorQueue.front().value) ; 
		if ( colorQueue.getSz() == 1 && order == 'found' ) 
		{
			updateActionBox( process + colorQueue.front().value + ' is found' ) ; 
		}	
		
		setTimeout( function() {
				toggleClass(current) ;
				colorQueue.pop() ; 
			}
			,1000
		) ;
		setTimeout( function() {
				colorNodes( order ) ; 
			}
			,1000
		);
	}
}

var actionResult = [] ; 
var traverseOrder = [] ; 

toggleClass = function(node) // change the style of canvas 
{
	if ( node.className == "Circle" ) 
		node.className = "Circle2" ; 
	else 
		node.className = "Circle" ; 
}	

drawLine = function( ctxLine , direction ) { // left or right
	if ( direction == null ) return ; 
	ctxLine.beginPath() ; 
	ctxLine.lineWidth = 5 ; 
	var startX , startY , endX , endY , amount = 0; 
	if ( direction == 'left' ) 
	{
		startX = 300;
		startY = 0;
		endX = 10;
		endY = 80;
	}
	else 
	{
		startX = 0;
		startY = 0;
		endX = 280;
		endY = 70;
	}
	setInterval(function() {
		amount += 0.05; // change to alter duration
		if (amount > 1) amount = 1;
		ctxLine.strokeStyle = "black";
		ctxLine.moveTo(startX, startY);
		ctxLine.lineTo(startX + (endX - startX) * amount, startY + (endY - startY) * amount);
		ctxLine.stroke();
	}, 50);
	ctxLine.closePath() ; 
}
drawCircle = function( canvasId ) {
	{
		$('#'+canvasId).show('scale',500);
	}
}
var colorQueue = new Queue() ; 
function updateActionBox ( update ) 
{
	$('#action').text(update) ; 
}

var undoList = new Stack() ; 
var redoList = new Stack() ; 

function undo()
{
	if ( undoList.empty() ) {
		running = false ; 
		return ; 
	}
	var order = undoList.top(); 
	if ( order[0] == 'insert' ) 
	{	
		process = 'Undo insert ' + order[1] + ' : ' ; 
		var val = order[1] ; 
		bst.deleteVal(val);
	}
	else if ( order[0] == 'delete' ) 
	{
		process = 'Undo delete ' + order[1] + ' : ' ; 
		var val = order[1] ; 
		bst.insert(val);
	}
	else 
	{
		if ( order[0] == 'find' ) 
		{
			process = 'Undo ' + order[0] + ' ' + order[1] + ' : done'  ; 
			updateActionBox(process) ; 
		}
		else if ( order[0] == 'inOrder' ) 
		{
			process = 'Undo traverse in order : done'  ; 
			updateActionBox(process) ; 
		}
		else if ( order[0] == 'preOrder') 
		{
			process = 'Undo traverse pre order : done'  ; 
			updateActionBox(process) ; 
		}
		else if ( order[0] == 'postOrder') 
		{
			process = 'Undo traverse post order : done'  ; 
			updateActionBox(process) ; 
		}
		
		running = false ; 
		// find - order .. 
	}
	redoList.push(undoList.top()) ; 
	undoList.pop() ; 
}
function redo() 
{
	if ( redoList.empty() ) {
		running = false ; 
		return ; 
	}
	var order = redoList.top() ; 
	 if ( order[0] == 'insert' ) 
	{
		process = 'Redo insert ' + order[1] + ' : ' ; 
		var number = order[1] ; 
		bst.insert(number) ; 
	}
	else if ( order[0] == 'find' ) 
	{
		process = 'Redo find ' + order[1] + ' : ' ; 
		var number = order[1] ; 
		bst.find(number) ; 
	}
	else if ( order[0] == 'delete' ) 
	{
		process = 'Redo delete ' + order[1] + ' : ' ; 
		var val = order[1] ; 
		bst.deleteVal(val); 
	}
	else if ( order[0] == 'inOrder' ) 
	{    
		process = 'Redo traverse in order : ' ; 
		bst.inOrder() ; 
	}
	else if ( order[0] == 'preOrder' ) 
	{
		process = 'Redo traverse pre order : ' ; 
		bst.preOrder() ; 
	}
	else if ( order[0] == 'postOrder' ) 
	{
		process = 'Redo traverse post order : ' ; 
		bst.postOrder() ; 
	}
	else 
	{
		running = false ; 
	}
	undoList.push(redoList.top()) ; 
	redoList.pop() ; 	
}


var bst= new binarySearchTree();

$(document).ready(function(){
	    $('#sideList').draggable();
		$('#sideList').accordion({collapsible: true , heightStyle: 'content' , widthStyle: 'content' });
		$('#actionBar').dialog({
			width:'15%',
			maxHeight: 170,
		}) ; 
		$(function(){
			$('#insert').submit(function(event){
				var inputNumber = $("#insert").find('input[name="value"]').val() ;
				if ( running == false ) 
				{
					if ( inputNumber != '' )
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = 'Insert ' + inputNumber + ' : ' ;
						running = true ; 
						bst.insert(inputNumber);
						undoList.push(['insert',inputNumber]) ; 
						redoList.clear() ; 
					}
				}
				else 
				{
					alert('Visualization is running') ; 
				}
				$('#insertTextBox').val('') ; 
				event.preventDefault() ; 
				
			});
		});
		$(function(){
			$('#find').submit(function(event){
				var inputNumber = $("#find").find('input[name="value"]').val() ;
				if ( running == false ) 
				{
					if ( inputNumber != '' )
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = 'Find ' + inputNumber + ' : ' ;				
						running = true ; 
						bst.find(inputNumber);
						undoList.push(['find',inputNumber]) ; 
						redoList.clear() ; 
					}
				}
				else 
				{
					alert('Visualization is running') ; 
				}
				$('#findTextBox').val('') ; 
				event.preventDefault() ; 
				
			});
		});
		$(function(){
			$('#delete').submit(function(event){
				var inputNumber = $("#delete").find('input[name="value"]').val() ;
				if ( running == false ) 
				{
					if ( inputNumber != '' )
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = 'Delete ' + inputNumber + ' : ' ;
						running = true ; 
						bst.deleteVal(inputNumber);
						undoList.push(['delete',inputNumber]) ; 
						redoList.clear() ; 
					}
				}
				else 
				{
					alert('Visualization is running') ; 
				}
				$('#deleteTextBox').val('') ; 
				event.preventDefault() ; 
				
			});
		});
		$(function(){
			$('#inOrder').click(function(event){
				if ( running == false ) 
				{
					process = 'Traverse in order : ' ;
					running = true ; 
					bst.inOrder();
					undoList.push(['inOrder']) ; 
					redoList.clear() ; 
				}
				else 
				{
					alert('Visualization is running') ; 
				}
			});
		});
		$(function(){
			$('#preOrder').click(function(event){
				if ( running == false ) 
				{
					process = 'Traverse pre order : ' ;
					running = true ; 			
					bst.preOrder();
					undoList.push(['preOrder']) ; 
					redoList.clear() ; 
				}
				else 
				{
					alert('Visualization is running') ; 
				}
			});
		});
		$(function(){
			$('#postOrder').click(function(event){
				if ( running == false ) 
				{				
					process = 'Traverse post order : ' ;
					running = true ; 
					bst.postOrder();
					undoList.push(['postOrder']) ;  
					redoList.clear() ; 
				}
				else 
				{
					alert('Visualization is running') ; 
				}
			});
		});		
		$(function(){
		$('#undo').click(function(event){
			if ( running == false ) 
			{
				running = true ; 
				undo();				
			}
			else 
			{
				alert('Visualization is running') ; 
			}
			event.preventDefault() ; 
			
		});
		});
		$(function(){
			$('#redo').click(function(event){
				if(running==false)
				{
					running=true;
					redo() ; 
				}
				else
				{
					alert('Visualization is running') ; 
					
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#showActionBarButton').click(function(event){
				$('#actionBar').dialog({
					width:'15%',
					maxHeight: 170,
				}) ; 
			});
		});
});