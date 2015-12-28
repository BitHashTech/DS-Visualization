function undo()
{
	if ( undoList.empty() ) return ; 
	var order = undoList.top(); 
	if ( order[0] == 'front' ) 
	{
		alert(order[0]) ; 
		queue.front() ; 
		
	}
	else if ( order[0] == 'push' ) 
	{	
		alert(order[0] + ' ' + order[1] ) ;
		queue.pop_back() ; 
	
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
		queue.push_back(order[1]) ; 
	}
	else if ( order[0] == 'pop' ) 
	{
		alert(order[0]) ; 
		queue.pop_front() ; 
	}
	else if ( order[0] == 'front' ) 
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
	
	    $('#sideList-queue').draggable(); // make the list movable 
		
		$('#sideList-queue').accordion({collapsible: true , heightStyle: "fill"});
		
		$(function(){
			$('#push').submit(function(event) {
				// @@@
				var inputNumber = $("#push").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					queue.push_back(inputNumber);
					undoList.push(['push',inputNumber]) ; 
					redoList.clear() ; 
				}
				$('#pushTextBox1').val('') ; 
				event.preventDefault() ; 
			});
		});
		$(function(){
			$('#front').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					queue.front() ; 
					undoList.push(['front']) ; 
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