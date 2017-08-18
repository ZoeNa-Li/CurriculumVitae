(function($){
  var current = 0;
  var pre = 0;
  $.fn.UItoTop=function(options){
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
$('body').append('<a href="#" id="'+settings.containerID+'">'+settings.text+'</a>');
$(containerIDhash).hide()
         .on('click.UItoTop',function(){
         	   $('html, body').animate({scrollTop:0},settings.scrollSpeed,settings.easingType);
         	   $('#'+settings.containerHoverID,this)
             .stop()
             .animate({'opacity':0},settings.inDelay,settings.easingType);
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
 	               var sd=$(window).scrollTop();
 	               if(typeof document.body.style.maxHeight==="undefined"){
 	               	$(containerIDhash).css({'position':'absolute','top':sd+$(window).height()-50});}
                   if(sd>settings.min)  $(containerIDhash).fadeIn(settings.inDelay);
                   else $(containerIDhash).fadeOut(settings.Outdelay); 
    	        
               });

};

    var heightLists = [];
    heightLists[0] = 0;
    heightLists[1] = heightLists[0] + $('#header').height();
    heightLists[2] = heightLists[1] + $('#work').height();
    heightLists[3] = heightLists[2] + $('#about').height();
    heightLists[4] = heightLists[3] + $('#blog').height();
    // heightLists[5] = heightLists[4] + $('#footer').height();
    console.log(heightLists);  
    var IDs = ["#header", "#work","#about"];
    var scrolltop = new Array();  
    var i = 0;  
    var  now =0;
     scrolltop[0] = 0; 
     var pre = 0; 
     var sum = 0;
     function handler(event){
      // html,body{overflow–y:hidden;padding–right:17px;}
       var e = window.event || event.srcElement;
      if(e.wheelDelta)
           // console.log(e.wheelDelta);
        sum = sum + e.wheelDelta;
        // console.log("sum:"+ sum);
        if( sum <0 && current<3){
          current++;
          $('html, body').animate({scrollTop:heightLists[current]},500,'linear');
           sum = 0;
            document.removeEventListener("mousewheel",handler,false);
            
          setTimeout(function(){ document.addEventListener("mousewheel",handler,false);},800);
        }
        if(sum >0 && current>0){
          current--;
          $('html, body').animate({scrollTop:heightLists[current]},500,'linear');
          sum = 0;
          $(document).unbind("mousewheel",handler);
           // console.log("偏移"+heightLists[current]); //[0, 830, 1927, 2803, 3437.406]
          document.removeEventListener("mousewheel",handler,false);
          setTimeout(function(){ document.addEventListener("mousewheel",handler,false);},800);
        }

    }
    document.addEventListener("mousewheel",handler,false);   
    document.addEventListener('touchstart',touch, false);  
    document.addEventListener('touchmove',touch, false);  
    document.addEventListener('touchend',touch, false);  
    var storageY=[0,0];
    function touch (event){  
        var event = event || window.event;            
        switch(event.type){  
            case "touchstart":
               storageY[0]=  event.touches[0].clientY;
                break;  
            case "touchend":  
                storageY[1] =  event.changedTouches[0].clientY;
                // console.log("y1:"+storageY[0]); 
                // console.log("y2:"+storageY[1]);  
                var delta = storageY[1]-storageY[0];
                storageY=[0,0];
                if( delta <-150 && current<3){
                 current++;
                 // console.log("current"+current);
                $('html, body').animate({scrollTop:heightLists[current]},500,'linear');}
              if(delta > 150 && current>0){
                 current--;
                $('html, body').animate({scrollTop:heightLists[current]},500,'linear');
                 }
                break;  
             case "touchmove":  
                event.preventDefault();  
                break;  
        }  
          
    }  
    function changeHeight(){
        var height = document.body.clientHeight  || document.documentElement.clientWidth;
        heightLists[0] = 0;
        heightLists[1] = heightLists[0] + $('#header').height();
        heightLists[2] = heightLists[1] + $('#work').height();
        heightLists[3] = heightLists[2] + $('#about').height();
        heightLists[4] = heightLists[3] + $('#blog').height();
    }
     window.onresize=function(){ changeHeight();  }  

})(jQuery);