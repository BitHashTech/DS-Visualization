var running = false ; 
var process = '' ; 
var maxNumberNodes = 100 ; 
var LinkedList=function()
{
	var counter = 0 ; //counter for canvas id  
	var head = null,tail = null;
	var size=0;
	
	var LinkedListNode=function(val)  // node holds nextNode , value , id for its line and id for its node(circle)
	{
		this.next=null ;
		this.value= val;
		this.lineId = ++counter ;
		this.nodeId = ++counter ; 
	};
	
	this.Append = function (val)
	{	
		if ( size > maxNumberNodes ) 
		{
			alert('Max number of nodes is 100') ; 
			return ; 
		}
		var Line = document.createElement("canvas");  
		Line.className = "LINE";
		var ctxLine = Line.getContext("2d");
		if( head == null)
		{ 
			head = new LinkedListNode(val);
			tail = head;	
		}
		else
		{
			ctxLine.beginPath();
			ctxLine.moveTo(0,60);
			ctxLine.lineTo(300,60);
			ctxLine.lineWidth = 5;
			ctxLine.stroke();
			ctxLine.font = "bold 90px Arial" ; 
			ctxLine.fillText(">",250,92) ; 
			tail.next = new LinkedListNode(val);
			tail = tail.next;
			ctxLine.closePath();
		}
		Line.id = tail.lineId ; 
		document.getElementById("Nodes").appendChild(Line);
		drawLine(Line.id);
		var node = document.createElement("canvas") ;
		node.className = "Circle" ; 
		var ctx = node.getContext("2d");
		ctx.fillStyle = "#660066";
		ctx.font = "bold 70px Arial";
		ctx.fillText(val,130,90);
		node.id = counter ; 
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
				updateInfoBox( process + val + ' is appended' ) ;
				toggleClass(node);
				running = false ; 
			}
			, 1000 
		)
		size++;
	};
	this.del = function (index)
	{
		findByIndex(head,index,0,"delete") ; 
	}
	this.find = function(val)
	{
		findWithNode(head,val,0) ;
	}
	moveNode = function( current )
	{
		return current.next ; 
	}
	toggleClass = function(node) // change the style of canvas 
	{
		if ( node.className == "Circle" ) 
			node.className = "Circle2" ; 
		else 
			node.className = "Circle" ; 
	}
	findWithNode = function( current , val , idx)  // recursive function to find value ( val ) , idx is index , current is node (at first = head)  
	{
		if ( current == null ) 
		{
			updateInfoBox( process + val + ' is not found' ) ;
			running = false ; 
			return ; 
		}
		var node = document.getElementById(current.nodeId) ; 
		toggleClass(node) ; 
		if ( current.value == val ) 
		{
			setTimeout(
				function() 
				{
					updateInfoBox( process + val + ' is found in index ' + idx ) ;
					toggleClass(node);
				}
				,1000) ;  
			running = false ; 
			return ; 
		}
		var Next  = moveNode(current) ;  
		setTimeout(
			function(){
				toggleClass(node); 
				findWithNode(Next,val,idx+1);
			}
			,1000
		) ;
	}
	
	InsertInPlace = function(current , val , position ) //insert a value ( val ) in position after node ( current ) 
	{
		var Line = document.createElement("canvas");
		Line.className = "LINE";
		var ctxLine = Line.getContext("2d");
		var newNode = new LinkedListNode(val) ; 
		if	( position == 0  )
		{ 
			var lineIdForHead = current.lineId ;
			newNode.next = current ;
			var linePrevHead = document.getElementById(lineIdForHead) ;
			var ctxLinePrevHead = linePrevHead.getContext("2d");
			ctxLinePrevHead.beginPath();
			ctxLinePrevHead.moveTo(0,60);
			ctxLinePrevHead.lineTo(300,60);
			ctxLinePrevHead.lineWidth = 5;
			ctxLinePrevHead.stroke();
			ctxLinePrevHead.font = "bold 90px Arial" ; 
			ctxLinePrevHead.fillText(">",250,92) ; 
			head = newNode ; 
			ctxLinePrevHead.closePath() ; 
		}
		else
		{
			ctxLine.beginPath();
			ctxLine.moveTo(0,60);
			ctxLine.lineTo(300,60);
			ctxLine.lineWidth = 5;
			ctxLine.stroke();
			ctxLine.font = "bold 90px Arial" ; 
			ctxLine.fillText(">",250,92) ; 
			newNode.next = current.next ;
			current.next = newNode ;
			ctxLine.closePath();
		}
		Line.id = newNode.lineId ; 	
		var divI = document.getElementById("Nodes") ; 
		divI.insertBefore(Line,document.getElementById(newNode.next.lineId)) ; 
		if ( position == 0 ) 
		{
			document.getElementById(newNode.lineId).style.width = '25px';
			document.getElementById(current.lineId).style.width = '0px';
		}
		drawLine(Line.id);
		var node = document.createElement("canvas") ;
		node.className = "Circle";
		var ctx = node.getContext("2d");
		ctx.fillStyle = "#660066";
		ctx.font = "bold 70px Arial";
		ctx.fillText(val,130,90);
		node.id = counter ; 
		setTimeout(
			function()
			{
				node.style.width = '0px' ;
				node.style.border = '0' ; 
				divI.insertBefore(node,document.getElementById(newNode.next.lineId)) ; 
				drawCircle(node.id) ; 
			}
			,300
		);
		if ( position == 0 ) 
		{
			setTimeout
			(
				function() 
				{
					drawLine(current.lineId) ; 
				}
				,700
			);
		}
		setTimeout(
			function()
			{					
				updateInfoBox( process + val + ' is inserted in index ' + position ) ;
				toggleClass(node); 
				running = false ; 
			}
			, 1000
		);
		size++;	
	}
	this.deleteTail = function() 
	{
		if ( size == 0 ) return ; 
		var tempNode = head ; 
		var indx = 0 ; 
		while ( indx < size-2 ) 
		{
			tempNode = tempNode.next ; 
			indx++ ; 
		}
		if ( size == 1 ) ; 
		else {
			var node = document.getElementById(tempNode.nodeId) ; 
			toggleClass(node) ;
		}
		findByIndex(tempNode,size-1,indx,'delete') ; 
	}
	
	// delete or insert depending on val( a number for insert or 'delete' for delete ) , idx( position wanted) , i(current position), current ( node ) at first = head 
	findByIndex = function(current , idx , i , val) 
	{
		if ( current == null || idx >= size || idx < 0 ) 
		{				
			updateInfoBox( process + 'Out of limit' ) ;
			running = false ; 
			return ; 
		}
		if ( !isNaN(val) && idx == 0 ) //insert val in index 0 
		{
			InsertInPlace(current ,val , i ) ; 
			return ;
		}
		var node = document.getElementById(current.nodeId) ; 
		toggleClass(node) ;
		if ( !isNaN(val) && i == idx-1 ) // insert val
		{
			setTimeout(
				function() 
				{
					toggleClass(node) ; 
					InsertInPlace(current , val , idx ) ;
				}
				,1000) ; 
			return ; 
		}
		else if ( val == "delete" && ( i == idx-1 || idx == 0 ) ) // delete a node
		{
			var lineID , nodeID ;
			if ( idx == 0 ) // delete the first node 
			{
				nodeID = head.nodeId ;
				lineID = head.lineId ;
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
						1000
					);
					setTimeout
					(
						function()
						{ 
							document.getElementById("Nodes").removeChild(document.getElementById(headNextLineId)) ;
						}
						,2000
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
						1000
					);
					setTimeout
					(
						function() 
						{
							document.getElementById("Nodes").removeChild(document.getElementById(lineID)) ;
						}
						,2000
					)
				}
				head = head.next;
			}
			else // delete the node in position idx 
			{
				if ( current.next == null ) return ; 
				else 
				{
					nodeID = current.next.nodeId ;
					lineID = current.next.lineId ; 
					var nextNode = document.getElementById(current.next.nodeId) ;
								
					setTimeout(
						function()
						{
							if ( node.className == 'Circle') 
								toggleClass(node) ; 
							toggleClass(nextNode);
						}
						,1000
					);
					if ( current.next == tail )
					{
						tail=current;
						tail.next= null;
					}
					else 
					{
						current.next=current.next.next;
					}
					setTimeout
					(
						function()
						{
							deleteCanvas(lineID) ;
						}
						,
						1000
					);
					setTimeout(
						function()
						{
							document.getElementById("Nodes").removeChild(document.getElementById(lineID)) ;
						}
						,2000
					)
				}
			}
			size--;
			setTimeout
			(
				function()
				{
					deleteCanvas(nodeID) ;
				}
				,
				1250
			);
			setTimeout
			(
				function()
				{	
					updateInfoBox( process + 'Deleting from index ' + idx + ' is done' ) ;
					document.getElementById("Nodes").removeChild(document.getElementById(nodeID)) ;
					running = false ; 
				}
				,2000
			)
			return ; 
		}
		var Next  = moveNode(current) ;  
		setTimeout(
			function()
			{
				toggleClass(node);
				findByIndex(Next,idx,i+1,val);
			}
			,1000
		);	
	}
	
	this.insert = function(val,index)
	{	
		if ( size > maxNumberNodes ) 
		{
			alert('Max number of nodes is 100') ; 
			return ; 
		}
		if ( index == size ) 
		{
			this.Append(val) ; 
			return ; 
		}
		findByIndex(head,index,0,val);
	};
	
	this.getSize = function () 
	{
		return size ; 
	}
	
	this.findValInPosition = function ( position ) 
	{
		if ( position >= size ) return null ; 
		var tempNode = head ;		
		var indx = 0 ;		
		while ( indx != position ) 
		{
			tempNode = tempNode.next ; 
			indx++ ; 
		}
		return tempNode.value ; 
	}
	
}; 

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
function updateInfoBox ( update ) 
{
	$('#info').text(update) ; 
}

var linkedList = new LinkedList();
var undoList = new Stack() ; 
var redoList = new Stack() ; 

function undo()
{
	if ( undoList.empty() ) 
	{
		running = false ; 
		return ; 
	}
	var order = undoList.top(); 
	if ( order[0] == 'find' ) 
	{
		process = 'Undo find : Done' ;
		updateInfoBox(process) ; 
		running = false ; 
	}
	else if ( order[0] == 'insert' ) 
	{	
		process = 'Undo insert : ' ;
		var position = order[2] ; 
		linkedList.del(position) ; 
	
	}
	else if ( order[0] == 'append' ) 
	{
		process = 'Undo append : ' ;
		linkedList.deleteTail() ; 
	}
	else if ( order[0] == 'delete' ) 
	{
		process = 'Undo delete : ' ;
		var number = order[1] ; 
		var position = order[2] ;
		if ( position == linkedList.getSize() ) 
			linkedList.Append(number) ; 
		else 
			linkedList.insert(number,position) ; 
				
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
	if ( order[0] == 'append' ) 
	{
		process = 'Redo append : ' ;
		var number = order[1] ;
		linkedList.Append(number) ; 
	}
	else if ( order[0] == 'insert' ) 
	{
		process = 'Redo insert : ' ;
		var number = order[1] ; 
		var position = order[2] ; 
		linkedList.insert(number,position) ; 
	}
	else if ( order[0] == 'find' ) 
	{
		process = 'Redo find : ' ;
		var number = order[1] ; 
		linkedList.find(number) ; 
	}
	else if ( order[0] == 'delete' ) 
	{
		process = 'Redo delete : ' ;
		var position = order[2] ; 
		linkedList.del(position) ; 
	}
	else 
	{
		running = false ; 
	}
	undoList.push(redoList.top()) ; 
	redoList.pop() ; 
	
}

$(document).ready(function(){
	
	    $('#sideList').draggable(); // make the list movable 
		
		$('#sideList').accordion({collapsible: true , heightStyle: "content"});
		
		$('#infoBar').dialog({
			width:'15%',
			maxHeight: 170,
			position: {my: 'right top', at: 'right top', of: window}
		}) ; 
		$(function(){
			$('#append').submit(function(event) {				
				var inputNumber = $("#append").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					if ( running == false ) 
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = 'Append : ' ;
						running = true ; 
						linkedList.Append(inputNumber) ; 
						undoList.push(['append',inputNumber]); 
						redoList.clear() ; 
					}
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				$('#appendTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#find').submit(function(event) {
				var inputNumber = $("#find").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					if ( running == false ) 
					{
						inputNumber = parseInt(inputNumber,10) ; 
						process = 'Find : ';
						running = true ; 
						linkedList.find(inputNumber) ; 
						undoList.push(['find',inputNumber]) ; 
						redoList.clear() ; 
					}
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				$('#findTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#insert').submit(function(event) {
				var inputNumber = $("#insert").find('input[name="value"]').val();
				var inputPosition = $("#insert").find('input[name="position"]').val();
				if ( inputNumber != '' && inputPosition != '' )
				{
					if ( running == false ) 
					{
						inputNumber = parseInt(inputNumber,10) ; 
						inputPosition = parseInt(inputPosition,10) ; 
						process = 'Insert : ' ;
						running = true ; 
						linkedList.insert(inputNumber,inputPosition) ; 
						undoList.push(['insert',inputNumber,inputPosition]) ; 
						redoList.clear() ; 
					}					
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				$('#insertTextBox1').val('') ; 
				$('#insertTextBox2').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#delete').submit(function(event) {
				var inputPosition = $("#delete").find('input[name="position"]').val();
				if ( inputPosition != '' )
				{
					if ( running == false ) 
					{
						inputPosition = parseInt(inputPosition,10) ; 
						process = 'Delete : ' ;
						var valueInPosition = linkedList.findValInPosition(inputPosition); 
						if ( valueInPosition == null )
						{
							updateInfoBox( process + 'Out of limit') ; 
						}
						else 
						{
							running = true ; 
							linkedList.del(inputPosition) ;
							undoList.push(['delete',valueInPosition,inputPosition]); 
							redoList.clear() ; 
						}
					}
					else 
					{
						alert('Visualization is running') ; 
					}
				}
				//alert('Success');
				$('#deleteTextBox1').val('') ;
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
				if ( running == false ) 
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
			$('#showInfoBarButton').click(function(event){
				$('#infoBar').dialog({
					width:'15%',
					maxHeight: 170,
				}) ; 
			});
		});
});