$(function(){
	var $grid = $('#imgs').masonry({
				itemSelector: '.img',
				animate: true
			});
			
	$grid.imagesLoaded().progress( function() {
		$grid.masonry();
	});
	
	$grid.on('click', '.img', function(){
		$(this).toggleClass('after-click');
		$grid.masonry();
	});
});