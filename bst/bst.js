
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
	$('#'+canvasId).animate(
		{
			height : '6%' 
		},600
	)
	document.getElementById(canvasId).style.border = '2px solid black' ; 

}
var running = false ; 
var colorQueue = new Queue() ; 
function colorNodes( order ) // inser , find ..  
{ 
	if ( colorQueue.empty() ) {
		running = false ; 
		return ; 
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
				toggleClass(Node);
			}
			, 1200 
		)
		running = false ; 
		return ; 
	}
	var current = document.getElementById(colorQueue.front()) ; 
	toggleClass(current) ;
	if ( colorQueue.getSz() == 1 && order == 'found' ) 
	{
		alert('found') ; 
	}
	else if ( colorQueue.getSz() == 1 && order == 'nFound' ) 
	{
		alert("not found") ; 
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
function binarySearchTree () {
	var ctr = 0 ; // for id 
	var root=null;
	var	size = 0;
	var node = function(value){
		this.value = value;
		this.left =null;
		this.right =null;
		this.topPos = 0 ; 
		this.leftPos= 50 ;
		this.leftDiff = 25 ;
		this.lineLeft = 0 ; 
		this.lineWidth = 0 ; 
		this.lineDirection = null ; 
		this.lineId = ++ctr ;
		this.nodeId = ++ctr ;
	}
	this.insert = function(value){
		colorQueue.clear() ; 
		var Line = document.createElement("canvas");  
		Line.className = "LINE";
		/** mkn4 feh node id f 7teto fa7tgt el temp ykon bra 34an ageb mno elid **/ 
		var temp=root;
		if(size==0)
		{	
			root = new node(parseInt(value));
			size++;
			temp = root ; 
			Line.id = temp.lineId ; 
		}
		else
		{
			while(true){
				if(parseInt(value,10)>parseInt(temp.value,10))
				{
					if(temp.right==null)
					{
						temp.right=new node(parseInt(value)),
						size++;
						Line.id = temp.right.lineId ; // id for the line 
						colorQueue.push(temp.nodeId) ; 
						temp.right.topPos = temp.topPos+10;
						temp.right.leftPos = temp.leftPos+temp.leftDiff;
						temp.right.lineWidth = temp.leftDiff ;
						temp.right.lineLeft = Math.min(temp.leftPos,temp.right.leftPos) ; 
						temp.right.leftDiff = temp.leftDiff/2. ; 
						temp = temp.right ; 
						temp.lineDirection = 'right' ; 
						break;
					}
					else
					{
						colorQueue.push(temp.nodeId) ; 
						temp=temp.right;
					}
				}
				else if(parseInt(value,10)<parseInt(temp.value,10)){
					if(temp.left==null){
						temp.left=new node(parseInt(value)),
						size++;
						Line.id = temp.left.lineId // id for the line 
						colorQueue.push(temp.nodeId) ; 
						temp.left.topPos = temp.topPos+10;
						temp.left.leftPos = temp.leftPos-temp.leftDiff;
						temp.left.lineWidth = temp.leftDiff ;
						temp.left.lineLeft = Math.min(temp.leftPos,temp.left.leftPos) ; 
						temp.left.leftDiff = temp.leftDiff/2. ; 
						temp = temp.left ; 
						temp.lineDirection = 'left' ; 
						break;
					}
					else{
						colorQueue.push(temp.nodeId) ; 
						temp=temp.left;
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
		Line.style.left = temp.lineLeft + 2 + '%';
		Line.style.width = temp.lineWidth + '%'; 
		document.getElementById("Nodes").appendChild(Line);
		var Node = document.createElement("canvas") ;
		Node.className = 'Circle' ;  
		var ctx = Node.getContext("2d");
		Node.id = temp.nodeId ; 
		ctx.fillStyle = "yellow";
		ctx.font = "bold 65px Arial";
		ctx.fillText(parseInt(value,10),130,90);
		Node.style.top = temp.topPos + '%'; 
		Node.style.left = temp.leftPos +'%'; 
		Node.style.height = '0px' ; 
		Node.style.border = '0' ; 
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
				colorQueue.push(temp.nodeId) ; 
				temp=temp.right;
			}
			else{
				colorQueue.push(temp.nodeId) ; 
				temp=temp.left;
			}
		}
		if(temp==null){
			colorNodes('nFound') ; 
			return false;
		}
		else{
			colorQueue.push(temp.nodeId) ; 
			colorNodes('found') ; 
			return true;
		}
	}
	var originalPostOrder = function(temp){
		if (temp != null){
			originalPostOrder(temp.left);
			originalPostOrder(temp.right);
			colorQueue.push(temp.nodeId);
		}
	}
	this.postOrder = function () {
		colorQueue.clear();
		originalPostOrder(root);
		colorNodes('traverse');
		
	}
	var originalInOrder= function (temp){
		if(temp!=null)
		{
			originalInOrder(temp.left);
			colorQueue.push(temp.nodeId);
			originalInOrder(temp.right);	
		}
	}
	this.inOrder = function () {
		colorQueue.clear();
		originalInOrder(root);
		colorNodes('traverse');
	}
	var originalPreOrder= function(temp){
		if(temp!=null)
		{
			colorQueue.push(temp.nodeId);
			originalPreOrder(temp.left);
			originalPreOrder(temp.right);	
		}
	}
	this.preOrder = function () {
		colorQueue.clear();
		originalPreOrder(root);
		colorNodes('traverse');
	}
	this.deleteAt = function (value) {
		var temp=root,parent=null,found=false,temp2,parent2;
		while(!(found) && temp){
			if(value>temp.value){
				parent=temp;
				temp=temp.right;
			}
			else if(value<temp.value){
				parent=temp;
				temp=temp.left;
			}
			else{
				found=true;
			}
		}
		if(found){
			size--;
			if(temp===root){
				if(temp.right==null && temp.left==null){
					root=null;
				}
				else if(temp.right==null){
					root=root.left;
				}
				else if(temp.left==null){
					root=root.right;
				}
				else{
					parent2=root;
					temp2=root.right;
					while(temp2.left!=null){
						parent2=temp2;
						temp2=temp2.left;
					}
					if(parent2===root){
						temp2.left=root.left;
					}
					else{
						parent2.left=temp2.right;
						temp2.right=root.right;
						temp2.left=root.left;
					}
					root=temp2;
				}
			}
			else{
				if(temp.right==null && temp.left==null){
					if(parent.right===temp){
						parent.right=null;
					}
					else{
						parent.left=null;
					}
				}
				else if(temp.right==null){
					if(parent.right===temp){
						parent.right=temp.left;
					}
					else{
						parent.left=temp.left;
					}
				}
				else if(temp.left==null){
					if(parent.right===temp){
						parent.right=temp.right;
					}
					else{
						parent.left=temp.right;
					}
				}
				else{
					parent2=temp;
					temp2=temp.right;
					while(temp2.left!=null){
						parent2=temp2;
						temp2=temp2.left;
					}
					if(parent2===temp){
						temp2.left=temp.left;
					}
					else{
						parent2.left=temp2.right;
						temp2.left=temp.left;
						temp2.right=temp.right;
						
					}
					if(parent.right===temp){
						parent.right=temp2;
					}
					else{
						parent.left=temp2;
					}
				}
			}
			return true;
		}
		return false;
	} 
}
var bst= new binarySearchTree();
$(document).ready(function(){
	    $('#sideList').draggable();
		$('#sideList').accordion({collapsible: true , heightStyle: "fill"});
		$(function(){
			$('#insert').submit(function(event){
				var inputNumber = $("#insert").find('input[name="value"]').val() ;
				if ( running == false ) 
				{
					running = true ; 
					if ( inputNumber != '' )
					{
						bst.insert(inputNumber);
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
					running = true ; 
					if ( inputNumber != '' )
					{
						bst.find(inputNumber);
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
			$('#inOrder').click(function(event){
				if ( running == false ) 
				{
					running = true ; 
					bst.inOrder();
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
					running = true ; 			
					bst.preOrder();
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
					running = true ; 
					bst.postOrder();
				}
				else 
				{
					alert('Visualization is running') ; 
				}
			});
		});
});