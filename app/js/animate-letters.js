let AnimateLetters = (function($){
	let $jittery = $('.eye_catcher-html');
	$.each($('u', $jittery), (i) => {
	    $(this).css('animation-delay', '-'+i+'70ms');
	});
})(jQuery);

export {AnimateLetters};