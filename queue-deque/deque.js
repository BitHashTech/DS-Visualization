function undo()
{
	if ( undoList.empty() ) return ; 
	var order = undoList.top(); 
	if ( order[0] == 'Front' ) 
	{
		alert(order[0]) ; 
		queue.front() ; 	
	}
	else if ( order[0] == 'Back' ) 
	{
		alert(order[0]) ; 
		queue.back() ; 
	}
	else if ( order[0] == 'Push Back' ) 
	{	
		alert(order[0] + ' ' + order[1] ) ;
		queue.pop_back() ; 
	
	}
	else if ( order[0] == 'Push Front' ) 
	{	
		alert(order[0] + ' ' + order[1] ) ;
		queue.pop_front() ; 
	
	}
	else if ( order[0] == 'Pop Front' ) 
	{
		alert(order[0] ) ; 
		queue.push_front(order[1]) ; 
	}
	else if ( order[0] == 'Pop Back' ) 
	{
		alert(order[0] ) ; 
		queue.push_back(order[1]) ; 
	}
	redoList.push(undoList.top()) ; 
	undoList.pop() ; 
}
function redo() 
{
	if ( redoList.empty() ) return ; 
	var order = redoList.top() ; 
	if ( order[0] == 'Push Front' ) 
	{
		alert(order[0] + ' ' + order[1]) ; 
		queue.push_front(order[1]) ; 
	}
	else if ( order[0] == 'Push Back' ) 
	{
		alert(order[0] + ' ' + order[1]) ; 
		queue.push_back(order[1]) ; 
	}
	else if ( order[0] == 'Pop Front' ) 
	{
		alert(order[0]) ; 
		queue.pop_front() ; 
	}
	else if ( order[0] == 'Pop Back' ) 
	{
		alert(order[0]) ; 
		queue.pop_back() ; 
	}
	else if ( order[0] == 'Front' ) 
	{
		alert(order[0]) ;
		queue.front() ;  
	}
	else if ( order[0] == 'Back' ) 
	{
		alert(order[0]) ;
		queue.back() ;  
	}
	undoList.push(redoList.top()) ; 
	redoList.pop() ; 
	
}
var queue = new Queue() ;
var undoList = new Stack() ; 
var redoList = new Stack() ; 

$(document).ready(function(){
	
	    $('#sideList-deque').draggable(); // make the list movable 
		
		$('#sideList-deque').accordion({collapsible: true , heightStyle: "fill"});
		
		$(function(){
			$('#pushFront').submit(function(event) {
				// @@@
				var inputNumber = $("#pushFront").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					queue.push_front(inputNumber);
					undoList.push(['Push Front',inputNumber]) ; 
					redoList.clear() ; 
				}
				$('#pushFrontTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#pushBack').submit(function(event) {
				// @@@
				var inputNumber = $("#pushBack").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					queue.push_back(inputNumber);
					undoList.push(['Push Back',inputNumber]) ; 
					redoList.clear() ; 
				}
				$('#pushBackTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#front').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					queue.front() ; 
					undoList.push(['Front']) ; 
					redoList.clear() ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#back').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					queue.back() ; 
					undoList.push(['Back']) ; 
					redoList.clear() ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#popFront').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					var number = queue.getHead() ; 
					queue.pop_front() ; 
					undoList.push(['Pop Front',number]) ; 
					redoList.clear() ; 
				}
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#popBack').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					var number = queue.getHead() ; 
					queue.pop_back() ; 
					undoList.push(['Pop Back',number]) ; 
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