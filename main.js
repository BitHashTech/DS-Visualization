
var currentPage = "linkedList" ;

$("document").ready(function() {

	var page = document.getElementById("linkedListPage") ; 
	page.innerHTML = '<object  style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="linkedList\\linkedList.html" ></object>';
	page = document.getElementById("queuePage") ; 
	page.innerHTML = '<object  style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="queue-deque\\queue.html" ></object>';
	page = document.getElementById("dequePage") ; 
	page.innerHTML = '<object  style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="queue-deque\\deque.html" ></object>';
	page = document.getElementById("stackPage") ; 
	page.innerHTML = '<object  style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="stack\\stack.html" ></object>';
	page = document.getElementById("bstPage") ; 
	page.innerHTML = '<object  style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="bst\\bst.html" ></object>';
	
	$('#linkedList').click(function(event)
		{
			if ( currentPage != 'linkedList' )
			{
				document.getElementById('linkedListPage').className = 'nHiddenPage' ;
				document.getElementById(currentPage + 'Page').className = 'hiddenPage' ;
				document.getElementById(currentPage).className = null ;
				currentPage = "linkedList";
				document.getElementById(currentPage).className = 'highLight' ;
			}
		}
	)
	$('#queue').click(function(event) 
		{
			if ( currentPage != 'queue' )  
			{
				document.getElementById('queuePage').className = 'nHiddenPage' ;
				document.getElementById(currentPage + 'Page').className = 'hiddenPage' ;
				document.getElementById(currentPage).className = null ;
				currentPage = "queue";
				document.getElementById(currentPage).className = 'highLight' ;
			}
		}
	)
	$('#deque').click(function(event) 
		{
			if ( currentPage != 'deque' )  
			{
				document.getElementById('dequePage').className = 'nHiddenPage' ;
				document.getElementById(currentPage + 'Page').className = 'hiddenPage' ;
				document.getElementById(currentPage).className = null ;
				currentPage = "deque";
				document.getElementById(currentPage).className = 'highLight' ;
			}
		}
	)
	$('#stack').click(function(event) 
		{
			if ( currentPage != 'stack' )  
			{
				document.getElementById('stackPage').className = 'nHiddenPage' ;
				document.getElementById(currentPage + 'Page' ).className = 'hiddenPage' ;
				document.getElementById(currentPage).className = null ;
				currentPage = "stack";
				document.getElementById(currentPage).className = 'highLight' ;
			}
		}
	)
	$('#bst').click(function(event) 
		{
			if ( currentPage != 'bst' )  
			{
				document.getElementById(currentPage + 'Page' ).className = 'hiddenPage' ;
				document.getElementById('bstPage').className = 'nHiddenPage' ;
				document.getElementById(currentPage).className = null ;
				currentPage = "bst";
				document.getElementById(currentPage).className = 'highLight' ;
			}
		}
	)
	//document.getElementById("page").innerHTML='<object style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="queue\\queue.html" ></object>';
	//document.getElementById("page").innerHTML='<object style=" height: 100% ;width : 100% ; border: 2px ; " type="text/html" data="stack\\stack.html" ></object>';

});