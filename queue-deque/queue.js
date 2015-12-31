var queue = new Queue() ;

$(document).ready(function(){
	    $('#sideList-queue').draggable(); // make the list movable 
		
		$('#sideList-queue').accordion({collapsible: true , heightStyle: "content"});
		
		$('#infoBar').dialog({
			width:'15%',
			maxHeight: 170,
			position: {my: 'right top', at: 'right top', of: window}
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
			$('#showInfoBarButton').click(function(event){
				$('#infoBar').dialog({
					width:'15%',
					maxHeight: 170,
				}) ; 
			});
		});
});