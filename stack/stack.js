var running = false ;
var maxNumberNodes = 100 ; 
var process = '' ;
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
	var push_Head = function ( val ) 
	{
		var Line = document.createElement("canvas");  
		Line.className = "LINE";
		var ctxLine = Line.getContext("2d");
		head = new newNode(val) ;
		tail = head ; 
		Line.id = tail.lineId ; 
		document.getElementById("Nodes").appendChild(Line);
		drawLine(Line.id);
		var node = document.createElement("canvas") ;
		node.className = "Circle" ; 
		var ctx = node.getContext("2d");
		ctx.fillStyle = "yellow";
		ctx.font = "bold 50px Arial";
		ctx.fillText(val,130,90);
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
				updateActionBox(process + val + ' is pushed') ; 	
				toggleClass(node);
				running = false ; 
			}
			, 1000 
		)
		size++;
	}

	this.push_front = function ( val ) 
	{
		
		if ( size > maxNumberNodes ) 
		{
			alert('Max number of nodes is 100') ; 
			return ; 
		}
		val = val ; 
		if ( size == 0 ) 
		{
			push_Head(val) ; 
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
		ctx.fillText(val,130,90);
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
				updateActionBox ( process + val + ' is pushed' ) ;
				toggleClass(node);
				running = false ; 
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
			setTimeout(
				function()
				{
					updateActionBox ( process + head.value + ' is top' ) ;
					toggleClass(node) ;
					running = false ; 
				}
				,
				500
			);
			return head.value ; 
		}
		else {
			running = false ; 
			return null ; 
		}
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
		if ( size == 0 ) 
		{
			running = false ; 
			return ; 
		}
		else 
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
					updateActionBox ( process + 'Pop is done'  ) ;
					document.getElementById("Nodes").removeChild(node) ; 
					running = false ; 
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
	this.getSize = function() 
	{
		return size ; 
	}
	this.empty = function ()
	{
		return ( size == 0 ) ; 
	}
}

function updateActionBox ( update ) 
{
	$('#action').text(update) ; 
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
	if ( undoList.empty() ) {
		running = false ; 
		return ; 
	}
	var order = undoList.top(); 
	if ( order[0] == 'top' ) 
	{
		process = "Undo top : Done" ; 
		updateActionBox(process) ; 
		running = false ; 
	}
	else if ( order[0] == 'push' ) 
	{	
		process = "Undo push : " ;
		queue.pop_front() ; 
	
	}
	else if ( order[0] == 'pop' ) 
	{
		process = "Undo pop : " ;
		queue.push_front(order[1]) ; 
	}
	else 
	{
		running = false ; 
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
	if ( order[0] == 'push' ) 
	{
		process = "Redo push : " ;
		queue.push_front(order[1]) ; 
	}
	else if ( order[0] == 'pop' ) 
	{
		process = "Redo pop : " ; 
		queue.pop_front() ; 
	}
	else if ( order[0] == 'top' ) 
	{
		process = "Redo top : " ; 
		queue.front() ;  
	}
	else 
	{
		running = false ; 
	}
	undoList.push(redoList.top()) ; 
	redoList.pop() ; 
	
}
var queue = new Queue() ;
var undoList = new Stack() ; 
var redoList = new Stack() ; 

$(document).ready(function(){
	
		$('#actionBar').dialog({
			width:'15%',
			maxHeight: 170,
		}) ; 
	    $('#sideList').draggable(); // make the list movable 
		
		$('#sideList').accordion({collapsible: true , heightStyle: "content"});
		
		$(function(){
			$('#push').submit(function(event) {
				// @@@
				var inputNumber = $("#push").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					if ( running == false ) 
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = "Push : ";
						running = true ; 
						queue.push_front(inputNumber);
						undoList.push(['push',inputNumber]) ; 
						redoList.clear() ; 
					}
					else 
					{
						alert('Visualization is running') ; 
					}
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
					if ( running == false ) 
					{
						process = "Top : " ; 
						running = true ; 
						queue.front() ; 
						undoList.push(['top']) ; 
						redoList.clear() ; 
					}
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#pop').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					if ( running == false ) 
					{
						process = "Pop : " ; 
						running = true ; 
						var number = queue.getHead() ; 
						queue.pop_front() ; 
						undoList.push(['pop',number]) ; 
						redoList.clear() ; 
					}
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#undo').click(function(event) {
				if ( running == false ) 
				{
					running = true ; 
					undo() ; 
				}				
				else 
				{
					alert('Visualization is running') ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#redo').click(function(event) {
				if ( running == false) 
				{
					running = true ; 
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