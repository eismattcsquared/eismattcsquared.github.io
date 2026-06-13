/*
	Paradigm Shift by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			default:   ['1681px',   null       ],
			xlarge:    ['1281px',   '1680px'   ],
			large:     ['981px',    '1280px'   ],
			medium:    ['737px',    '980px'    ],
			small:     ['481px',    '736px'    ],
			xsmall:    ['361px',    '480px'    ],
			xxsmall:   [null,       '360px'    ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Hack: Enable IE workarounds.
		if (browser.name == 'ie')
			$body.addClass('is-ie');

	// Mobile?
		if (browser.mobile)
			$body.addClass('is-mobile');

	// Scrolly.
		$('.scrolly')
			.scrolly({
				offset: 100
			});

	// Polyfill: Object fit.
		if (!browser.canUse('object-fit')) {

			$('.image[data-position]').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', $this.data('position'))
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

			$('.gallery > a').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Apply img as background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-position', 'center')
						.css('background-size', 'cover')
						.css('background-repeat', 'no-repeat');

				// Hide img.
					$img
						.css('opacity', '0');

			});

		}

	// Gallery.
		$('.gallery')
			.on('click', 'a', function(event) {

				var $a = $(this),
					$gallery = $a.parents('.gallery'),
					$modal = $gallery.children('.modal'),
					$modalImg = $modal.find('img'),
					href = $a.attr('href');

				// Not an image? Bail.
					if (!href.match(/\.(jpg|gif|png|mp4)$/))
						return;

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Lock.
					$modal[0]._locked = true;

				// Set src.
					$modalImg.attr('src', href);

				// Set visible.
					$modal.addClass('visible');

				// Focus.
					$modal.focus();

				// Delay.
					setTimeout(function() {

						// Unlock.
							$modal[0]._locked = false;

					}, 600);

			})
			.on('click', '.modal', function(event) {

				var $modal = $(this),
					$modalImg = $modal.find('img');

				// Locked? Bail.
					if ($modal[0]._locked)
						return;

				// Already hidden? Bail.
					if (!$modal.hasClass('visible'))
						return;

				// Stop propagation.
					event.stopPropagation();

				// Lock.
					$modal[0]._locked = true;

				// Clear visible, loaded.
					$modal
						.removeClass('loaded')

				// Delay.
					setTimeout(function() {

						$modal
							.removeClass('visible')

						setTimeout(function() {

							// Clear src.
								$modalImg.attr('src', '');

							// Unlock.
								$modal[0]._locked = false;

							// Focus.
								$body.focus();

						}, 475);

					}, 125);

			})
			.on('keypress', '.modal', function(event) {

				var $modal = $(this);

				// Escape? Hide modal.
					if (event.keyCode == 27)
						$modal.trigger('click');

			})
			.on('mouseup mousedown mousemove', '.modal', function(event) {

				// Stop propagation.
					event.stopPropagation();

			})
			.prepend('<div class="modal" tabIndex="-1"><div class="inner"><img src="" /></div></div>')
				.find('img')
					.on('load', function(event) {

						var $modalImg = $(this),
							$modal = $modalImg.parents('.modal');

						setTimeout(function() {

							// No longer visible? Bail.
								if (!$modal.hasClass('visible'))
									return;

							// Set loaded.
								$modal.addClass('loaded');

						}, 275);

					});

})(jQuery);

/* =========================================
   Custom Portfolio Logic
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('DOMContentLoaded', () => {

    // 1. Force the browser to forget past scrolls and start at the top
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // 2. Element Setup
    const tabs = document.querySelectorAll('.nav-tab');

    // 1. Element Setup
    const tabs = document.querySelectorAll('.nav-tab');
    const tracks = document.querySelectorAll('.portfolio-track');
    const portfolioContent = document.getElementById('portfolio-content');

    // 2. Tab Clicking Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            
            // A. Unlock scrolling on both html and body
            document.documentElement.style.overflowY = 'auto';
            document.body.style.overflowY = 'auto';

            // B. Unhide the main content container
            portfolioContent.style.display = 'block';

            // C. Hide all individual tracks first
            tracks.forEach(track => {
                track.style.display = 'none';
            });

            // D. Find the specific track matching the button and show it
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';

            // E. Smoothly scroll down to the content
            portfolioContent.scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    });

    // 3. Scroll Animation Logic (The Fade-In Effect)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible-element');
            } else {
                entry.target.classList.remove('visible-element');
            }
        });
    }, { threshold: 0.15 }); 

    // Attach the observer to all hidden elements
    document.querySelectorAll('.hidden-element').forEach(element => {
        observer.observe(element);
    });

});
