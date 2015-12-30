var queue = new Queue() ;

$(document).ready(function(){
	    $('#sideList-queue').draggable(); // make the list movable 
		
		$('#sideList-queue').accordion({collapsible: true , heightStyle: "content"});
		
		$('#actionBar').dialog({
			width:'15%',
			maxHeight: 170,
		}) ; 
		$(function(){
			$('#push').submit(function(event) {
				// @@@
				var inputNumber = $("#push").find('input[name="value"]').val() ; 
				if ( inputNumber != '' )
				{
					if ( running == false ) 
					{
						inputNumber = parseInt(inputNumber,10) ; 
						running = true ; 
						process = 'Push back : ' ;
						queue.push_back(inputNumber);
						undoList.push(['Push Back',inputNumber]) ; 
						redoList.clear() ; 
						setTimeout( function() 
							{
								running = false ; 
							}
							,1000
						) ; 
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
			$('#front').click(function(event) {
				// @@
				if ( queue.getSize() > 0 ) 
				{
					if ( running == false ) 
					{
						process = 'Front : ' ; 
						running = true ; 
						queue.front() ; 
						undoList.push(['front']) ; 
						redoList.clear() ; 
						setTimeout( function() 
							{
								running = false ; 
							}
							,500
						) ; 
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
						process = 'Pop front : ' ; 
						running = true ; 
						var number = queue.getHead() ; 
						queue.pop_front() ; 
						undoList.push(['Pop front',number]) ; 
						redoList.clear() ; 
						setTimeout( function() 
							{
								running = false ; 
							}
							,1000
						) ; 
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
			$('#showActionBarButton').click(function(event){
				$('#actionBar').dialog({
					width:'15%',
					maxHeight: 170,
				}) ; 
			});
		});
});