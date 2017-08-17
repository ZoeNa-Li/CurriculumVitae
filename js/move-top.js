(function($){$.fn.UItoTop=function(options){
	var defaults={text:'To Top',
	min:200,inDelay:600,
	outDelay:400,
	containerID:'toTop',
	containerHoverID:'toTopHover',
	scrollSpeed:1200,
	easingType:'linear'
    },
	settings=$.extend(defaults,options),
	containerIDhash='#'+settings.containerID,
	containerHoverIDHash='#'+settings.containerHoverID;
	var current = 0;
	var pre = 0;
    var heightLists = [];
    heightLists[0] = 0;
    heightLists[1] = heightLists[0] + $('#header').height();
    heightLists[2] = heightLists[1] + $('#work').height();
    heightLists[3] = heightLists[2] + $('#skill').height();
    heightLists[4] = heightLists[3] + $('#about').height();
$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
$(containerIDhash).hide()
         .on('click.UItoTop',function(){
         	   $('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);
         	   $('#'+settings.containerHoverID,this).
         	   stop().
         	   animate({'opacity':0},settings.inDelay,settings.easingType);
         	   current = 0;
         	   return false;
         	})
         .prepend('<span id="'+settings.containerHoverID+'"></span>')
         .hover(function(){$(containerHoverIDHash,this)
         .stop()
         .animate({'opacity':1},600,'linear');},
                  function(){$(containerHoverIDHash,this).stop()
                  	           .animate({'opacity':0},700,'linear');
                  	       });
 $(window).scroll(function(event){
 	              //var e = window.event || event.srcElement;
 	               var sd=$(window).scrollTop();
 	               if(typeof document.body.style.maxHeight==="undefined"){
 	               	$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
                   if(sd>settings.min)  $(containerIDhash).fadeIn(settings.inDelay);
                   else $(containerIDhash).fadeOut(settings.Outdelay); 
    	        
               });

};
})(jQuery);