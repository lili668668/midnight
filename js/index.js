$(function(){
	var $grid = $('#imgs').masonry({
				itemSelector: '.img',
				columnWidth: 400,
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