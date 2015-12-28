function Queue()
{
	var head = null , tail = null ; 
	var size = 0 ;
	var ctr = 0 ; // ctr = counter for nodes and lines id  
	newNode = function( val )
	{
		this.next = null ; 
		this.prev = null ; 
		this.value = val ; 
		this.lineId = ++ctr ; 
		this.nodeId = ++ctr ; 
	}
	this.push_back = function ( val ) 
	{
		var Line = document.createElement("canvas");  
		Line.className = "LINE";
		var ctxLine = Line.getContext("2d");
		if ( head == null ) 
		{
			head = new newNode(val) ;
			tail = head ; 
		}
		else 
		{
			ctxLine.beginPath();
			ctxLine.moveTo(300,0);
			ctxLine.lineTo(300,150);
			ctxLine.lineWidth = 5;
			ctxLine.stroke();
			tail.next = new newNode(val) ;
			tail.next.prev = tail ; 
			tail = tail.next ; 	
			ctxLine.closePath();
		}
		Line.id = tail.lineId ; 
		document.getElementById("Nodes").appendChild(Line);
		drawLine(Line.id);
		var node = document.createElement("canvas") ;
		node.className = "Circle" ; 
		var ctx = node.getContext("2d");
		ctx.fillStyle = "yellow";
		ctx.font = "bold 50px Arial";
		ctx.fillText(parseInt(val,10),130,90);
		node.id = ctr ; 
		var divI = document.getElementById("Nodes") ; 
		//wait till animation(draw line) is done then make the node appear 
		setTimeout(
			function()
			{
				node.style.height = '0px' ; 
				node.style.border = '0' ; 
				divI.appendChild(node) ; 
				drawCircle(node.id) ; 
			}
			,300
		);
		// wait a bit then change its color 
		setTimeout(
			function()
			{
				toggleClass(node);
			}
			, 1000 
		)
		size++;
	}
	
	this.push_front = function ( val ) 
	{
		if ( size == 0 ) 
		{
			this.push_back(val) ; 
			return ; 
		}
		var Line = document.createElement("canvas");
		Line.className = "LINE";
		var ctxLine = Line.getContext("2d");
		var queueNode = new newNode(val) ; 
		var lineIdForHead = head.lineId ;
		queueNode.next = head ;
		head.prev = queueNode ; 
		head = queueNode ; 
		var linePrevHead = document.getElementById(lineIdForHead) ;
		var ctxLinePrevHead = linePrevHead.getContext("2d");
		ctxLinePrevHead.beginPath();
		ctxLinePrevHead.moveTo(160,0);
		ctxLinePrevHead.lineTo(160,150);
		ctxLinePrevHead.lineWidth = 10;
		ctxLinePrevHead.stroke();
		ctxLinePrevHead.closePath() ; 
		Line.id = queueNode.lineId ; 	
		var divI = document.getElementById("Nodes") ; 
		divI.insertBefore(Line,document.getElementById(queueNode.next.lineId)) ; 
		document.getElementById(queueNode.lineId).style.height = '25px';
		document.getElementById(head.next.lineId).style.height = '0px';
		drawLine(Line.id);
		var node = document.createElement("canvas") ;
		node.className = "Circle";
		var ctx = node.getContext("2d");
		ctx.fillStyle = "yellow";
		ctx.font = "bold 50px Arial";
		ctx.fillText(parseInt(val,10),130,90);
		node.id = head.nodeId ; 
		setTimeout(
			function()
			{
				node.style.height = '0px' ;
				node.style.border = '0' ; 
				divI.insertBefore(node,document.getElementById(queueNode.next.lineId)) ; 
				drawCircle(node.id) ; 
			}
			,300
		);
		setTimeout
		(
			function() 
			{
				drawLine(head.next.lineId) ; 
			}
			,700
		);
		setTimeout(
			function()
			{
				toggleClass(node);
			}
			, 1000
		);
		size++;	
	}
	this.front = function ()
	{
		if ( size > 0 ) 
		{
			var node = document.getElementById(head.nodeId) ; 
			toggleClass(node) ; 
			alert(head.value) ; 
			setTimeout(
				function()
				{
					toggleClass(node) ;
				}
				,
				300
			);
			return head.value ; 
		}
		return null ; 
	}
	this.back = function () 
	{
		if ( size > 0 ) 
		{
			var node = document.getElementById(tail.nodeId) ; 
			toggleClass(node) ; 
			alert(tail.value) ; 
			setTimeout(
				function()
				{
					toggleClass(node) ;
				}
				,
				300
			);
			return tail.value ; 
		}	
		return null ; 
	}
	this.getHead = function() 
	{
		if ( head == null ) return null ; 
		return head.value ; 
	}
	this.getTail = function() 
	{
		if ( tail == null ) return null ; 
		return tail.value ; 
	}
	this.pop_front = function ()
	{
		if ( size >= 1 ) 
		{
			var lineID , nodeID ;
			nodeID = head.nodeId ;
			lineID = head.lineId ;
			var node = document.getElementById(nodeID) ;
			toggleClass(node);
			if ( head.next != null ) 
			{
				var headNextLineId = head.next.lineId ; 
				head.next.lineId = lineID ;
				setTimeout
				(
					function()
					{
						deleteCanvas(headNextLineId) ;
					}
					,
					500
				);
				setTimeout
				(
					function()
					{ 
						document.getElementById("Nodes").removeChild(document.getElementById(headNextLineId)) ;
					}
					,1500
				)
			}
			else 
			{
				setTimeout
				(
					function()
					{
						deleteCanvas(lineID) ;
					}
					,
					500
				);
				setTimeout
				(
					function() 
					{
						document.getElementById("Nodes").removeChild(document.getElementById(lineID)) ;
					}
					,1500
				)
			}
			setTimeout
			(
				function()
				{
					deleteCanvas(nodeID) ;
				}
				,
				500
			);
			setTimeout
			(
				function()
				{	
					document.getElementById("Nodes").removeChild(node) ; 
				}
				,1200
			)
			head = head.next;
			size--; 
			if ( size > 0 ) 
			{
				head.prev = null ; 
			}
		}
	}
	this.pop_back = function () 
	{
		if ( size == 0 ) return ; 
		var nodeID = tail.nodeId ;
		var lineID = tail.lineId ; 
		tail = tail.prev ; 
		if ( tail == null ) 
		{
			head = null ; 
		}
		var node = document.getElementById(nodeID) ; 
		toggleClass(node) ; 
		setTimeout
		(
			function()
			{
				deleteCanvas(lineID) ;
			}
			,
			500
		);
		setTimeout(
			function()
			{
				document.getElementById("Nodes").removeChild(document.getElementById(lineID)) ;
			}
			,1500
		)
		setTimeout
		(
			function()
			{
				deleteCanvas(nodeID) ;
			}
			,
			500
		);
		setTimeout
		(
			function()
			{	
				document.getElementById("Nodes").removeChild(node) ; 
			}
			,1200
		);
		size--;
	}
	this.getSize = function() 
	{
		return size ; 
	}
	this.empty = function ()
	{
		return ( size == 0 ) ; 
	}
}


toggleClass = function(node) // change the style of canvas 
{
	if ( node.className == "Circle" ) 
		node.className = "Circle2" ; 
	else 
		node.className = "Circle" ; 
}

drawLine = function( canvasId )
{
	$('#'+canvasId).animate(
		{
			height : '25px' 
		},500
	)
}


drawCircle = function( canvasId )
{
	$('#'+canvasId).animate(
		{
			height : '50px' 
		},600
	)
	document.getElementById(canvasId).style.border = '2px solid black' ; 
}

deleteCanvas = function( canvasId ) 
{
	$('#'+canvasId).animate(
		{
			height : '0px' 
 		},700
	)
}


function undo()
{
	if ( undoList.empty() ) return ; 
	var order = undoList.top(); 
	if ( order[0] == 'top' ) 
	{
		alert(order[0]) ; 
		queue.front() ; 
		
	}
	else if ( order[0] == 'push' ) 
	{	
		alert(order[0] + ' ' + order[1] ) ;
		queue.pop_front() ; 
	
	}
	else if ( order[0] == 'pop' ) 
	{
		alert(order[0] ) ; 
		queue.push_front(order[1]) ; 
	}
	redoList.push(undoList.top()) ; 
	undoList.pop() ; 
}
function redo() 
{
	if ( redoList.empty() ) return ; 
	var order = redoList.top() ; 
	if ( order[0] == 'push' ) 
	{
		alert(order[0] + ' ' + order[1]) ; 
		queue.push_front(order[1]) ; 
	}
	else if ( order[0] == 'pop' ) 
	{
		alert(order[0]) ; 
		queue.pop_front() ; 
	}
	else if ( order[0] == 'top' ) 
	{
		alert(order[0]) ;
		queue.front() ;  
	}
	undoList.push(redoList.top()) ; 
	redoList.pop() ; 
	
}
var queue = new Queue() ;
var undoList = new Stack() ; 
var redoList = new Stack() ; 

$(document).ready(function(){
	
	    $('#sideList').draggable(); // make the list movable 
		
		$('#sideList').accordion({collapsible: true , heightStyle: "fill"});
		
		$(function(){
			$('#push').submit(function(event) {
				// @@@
				var inputNumber = $("#push").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					queue.push_front(inputNumber);
					undoList.push(['push',inputNumber]) ; 
					redoList.clear() ; 
				}
				$('#pushTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#top').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					queue.front() ; 
					undoList.push(['top']) ; 
					redoList.clear() ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#pop').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					var number = queue.getHead() ; 
					queue.pop_front() ; 
					undoList.push(['pop',number]) ; 
					redoList.clear() ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#undo').click(function(event) {
				undo() ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#redo').click(function(event) {
				redo() ; 
				event.preventDefault() ; 
			});
		});
});