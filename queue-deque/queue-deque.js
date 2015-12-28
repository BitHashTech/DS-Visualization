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
			ctxLine.moveTo(0,60);
			ctxLine.lineTo(300,60);
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
				node.style.width = '0px' ; 
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
			size-- ; 
			if ( size > 0 ) 
			{
				head.prev = null ; 
			}
		}
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
		ctxLinePrevHead.moveTo(0,60);
		ctxLinePrevHead.lineTo(300,60);
		ctxLinePrevHead.lineWidth = 5;
		ctxLinePrevHead.stroke();
		ctxLinePrevHead.closePath() ; 
		Line.id = queueNode.lineId ; 	
		var divI = document.getElementById("Nodes") ; 
		divI.insertBefore(Line,document.getElementById(queueNode.next.lineId)) ; 
		document.getElementById(queueNode.lineId).style.width = '25px';
		document.getElementById(head.next.lineId).style.width = '0px';
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
				node.style.width = '0px' ;
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
			width : '25px' 
		},500
	)
}


drawCircle = function( canvasId )
{
	$('#'+canvasId).animate(
		{
			width : '50px' 
		},600
	)
	document.getElementById(canvasId).style.border = '2px solid black' ; 
}

deleteCanvas = function( canvasId ) 
{
	$('#'+canvasId).animate(
		{
			width : '0px' 
 		},700
	)
}


