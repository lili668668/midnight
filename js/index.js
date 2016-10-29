$(function(){
    var baseurl = './midnight_photo/';
    $.ajax({
        url : 'img_paths.json',
        dataType : 'json',
        success : function( data ) {
            for (var cnt = 0;cnt < data["paths"].length;cnt++) {
                var img = '<div class="img"><img class="lazyload" data-original="' + baseurl + data["paths"][cnt] + '"></div>';
                $("#imgs").append(img);
            }
            
            $("img.lazyload").lazyload();

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
        }
    });
});
