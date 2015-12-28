function Stack()
{
	var array = [] ; 
	var size = 0 ; 
	this.push = function ( value ) 
	{
		array.push(value) ; 
		size++ ; 
	}
	this.top = function ()
	{
		if ( size > 0 ) 
			return array[size-1] ; 
		return undefined ; 
	}
	this.pop = function ()
	{
		if ( size >= 1 ) 
		{
			array = array.slice(0,size-1) ; 
			size--; 
		}
	}
	
	this.clear = function ()
	{
		array = [] ; 
		size = 0 ; 
	}
	this.empty = function ()
	{
		return ( size == 0 ) ; 
	}
}