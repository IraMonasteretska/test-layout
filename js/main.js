$(document).ready(function () {
    // Counter
    const counters = document.querySelectorAll('.countup__num');
    let animated = false;

    const options = {
        threshold: 0.5
    };

    const animateCount = (el, target) => {
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const step = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            el.textContent = Math.floor(progress * target);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target;
            }
        };

        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                counters.forEach(counter => {
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''), 10);
                    animateCount(counter, target);
                });
                animated = true;
                observer.disconnect(); // зупиняємо після першого разу
            }
        });
    }, options);

    const trigger = document.querySelector('.countup');
    if (trigger) observer.observe(trigger);



    // menu burger
    if ($('.burger2').length) {
        (function () {
            var burger2;
            burger2 = document.querySelector(".burger2");
            burger2.addEventListener("click", function () {
                return burger2.classList.toggle("on");
            });

        }).call(this);
    }

    $('.burger').click(function () {
        $('body').toggleClass('hidden');
        $('.header__colmenu').toggleClass('show');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    })

    // modal
    document.querySelectorAll('[data-target]').forEach(function (trigger) {
        trigger.addEventListener("click", function () {
            const targetSelector = trigger.getAttribute("data-target");
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.style.display = "flex";
                setTimeout(() => {
                    targetElement.classList.add("active");
                }, 10);
                document.body.classList.add("hidden");
            }
        });
    });

    document.querySelectorAll('[data-close]').forEach(function (closer) {
        closer.addEventListener("click", function () {
            const modal = closer.closest('[id]');
            if (modal) {
                modal.classList.remove("active");
                document.body.classList.remove("hidden");
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300);
            }
        });
    });

    // book a session
    $('.booknow').click(function(){
        $('.ourservicesrow').addClass('hide');
        $('.calendywrap').addClass('active');
    });

     $('.back a').click(function(e){
        e.preventDefault();
        $('.ourservicesrow').removeClass('hide');
        $('.calendywrap').removeClass('active');
    });

})