//
// svg animation
//

    var closed_eye = "M517.133 303.998s75.16 51.272 153.392 0c0 0-17.276-44.976-78.232-52.55-.002 0-57.105 10.225-75.16 52.55z"

    var half_blink = anime({
        targets: '#e1', // left eyelid
        d: closed_eye,
        duration: 1500,
        direction: 'alternate',
        easing: 'easeInCubic',
        loop: 20,
        delay: function() { return 2000 + anime.random(0, 4000); }
    });

    var left_hand_move = anime({
        targets: ['#left_hand', '#left_phone'],
        rotate: 1,
        duration: 2500,
        direction: 'alternate',
        loop: 10,
        easing: 'linear',
        delay: function() { return 1000 + anime.random(0, 500); }
    });

    var right_hand_move = anime({
        targets: ['#right_hand', '#right_phone' ],
        duration: 3000,
        loop: 4,
        direction: 'alternate',
        rotate: 0.4,
        duration: 4500,
        //translateX: function() { return anime.random(0, 20); },
        translateY: 10,
        easing: 'easeInQuart',
        delay: function() { return anime.random(0, 20); }
    })





	// media query event handler
	if (matchMedia) {
	  const mq = window.matchMedia("(min-width: 500px)");
	  mq.addListener(WidthChange);
	  WidthChange(mq);
	}
	
	// media query change
	function WidthChange(mq) {
	  if (mq.matches) {
	    // window width is at least 500px
	    document.querySelector('svg#hands_and_eyes').setAttribute("viewBox", "0 0 1600 590")	
	  } else {
	    // window width is less than 500px
	    document.querySelector('svg#hands_and_eyes').setAttribute("viewBox", "0 0 800 590")	
             
	  }
	
	}


