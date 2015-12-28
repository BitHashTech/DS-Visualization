function Queue()
{
	var array = [] ; 
	var size = 0 ; 
	this.push = function ( value ) 
	{
		array.push(value) ; 
		size++ ; 
	}
	this.front = function ()
	{
		if ( size > 0 ) 
			return array[0] ; 
		return undefined ; 
	}
	this.pop = function ()
	{
		if ( size >= 1 ) 
		{
			array = array.slice(1) ; 
			size--; 
		}
	}
	this.clear = function ()
	{
		array = [] ; 
		size = 0 ; 
	}
	this.getSz = function () 
	{
		return size ; 
	}
	this.empty = function ()
	{
		return ( size == 0 ) ; 
	}
}