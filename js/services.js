function menuOpen() {
    $(".navigation").each(function () {
        let hamburgerEl = $(this).find(".menu_btn");
        let navLineEl = $(this).find(".nav_hamburger_line");
        let menuContainEl = $(this).find(".menu_contain");
        let flipItemEl = $(this).find(".nav_hamburger_base");
        let menuWrapEl = $(this).find(".menu_wrap");
        let menuBaseEl = $(this).find(".menu_base");
        let menuLinkEl = $(this).find(".menu_link");

        let flipDuration = 0.6;

        function flip(forwards) {
            let state = Flip.getState(flipItemEl);
            if (forwards) {
                flipItemEl.appendTo(menuContainEl);
            } else {
                flipItemEl.appendTo(hamburgerEl);
            }
            Flip.from(state, { duration: flipDuration });
        }

        let tl = gsap.timeline({ paused: true });
        tl.set(menuWrapEl, { display: "flex" });
        tl.from(menuBaseEl, {
            opacity: 0,
            duration: flipDuration,
            ease: "none",
            onStart: () => {
                flip(true);
            }
        });
        tl.to(navLineEl.eq(0), { y: 4, rotate: 45, duration: flipDuration }, "<");
        tl.to(navLineEl.eq(1), { y: -4, rotate: -45, duration: flipDuration }, "<");
        tl.from(menuLinkEl, {
            opacity: 0,
            yPercent: 50,
            duration: 0.2,
            stagger: { amount: 0.2 },
            onReverseComplete: () => {
                flip(false);
            }
        });

        function openMenu(open) {
            if (!tl.isActive()) {
                if (open) {
                    tl.play();
                    hamburgerEl.addClass("nav-open");
                    // РР·РјРµРЅСЏРµРј С‚РµРєСЃС‚ РЅР° [close] РїСЂРё РѕС‚РєСЂС‹С‚РёРё СЃ Р°РЅРёРјР°С†РёРµР№
                    let caption = hamburgerEl.find('.caption');
                    gsap.to(caption, {
                        duration: 0.2, // РџСЂРѕРґРѕР»Р¶РёС‚РµР»СЊРЅРѕСЃС‚СЊ Р°РЅРёРјР°С†РёРё С‚РµРєСЃС‚Р°
                        ease: "power2.inOut", // РР·РёРЅРі Р°РЅРёРјР°С†РёРё С‚РµРєСЃС‚Р°
                        opacity: 0, // РЎРЅР°С‡Р°Р»Р° РґРµР»Р°РµРј С‚РµРєСЃС‚ РїСЂРѕР·СЂР°С‡РЅС‹Рј
                        onComplete: function () {
                            caption.text('[close]'); // РњРµРЅСЏРµРј С‚РµРєСЃС‚
                            gsap.to(caption, { opacity: 1, duration: 0.2, ease: "power2.inOut" }); // Р”РµР»Р°РµРј С‚РµРєСЃС‚ СЃРЅРѕРІР° РІРёРґРёРјС‹Рј
                        }
                    });
                } else {
                    tl.reverse();
                    hamburgerEl.removeClass("nav-open");
                    // Р’РѕР·РІСЂР°С‰Р°РµРј РёСЃС…РѕРґРЅС‹Р№ С‚РµРєСЃС‚ РїСЂРё Р·Р°РєСЂС‹С‚РёРё СЃ Р°РЅРёРјР°С†РёРµР№
                    let caption = hamburgerEl.find('.caption');
                    gsap.to(caption, {
                        duration: 0.2,
                        ease: "power2.inOut",
                        opacity: 0,
                        onComplete: function () {
                            caption.text('[menu]'); // РР·РјРµРЅСЏРµРј С‚РµРєСЃС‚ РѕР±СЂР°С‚РЅРѕ
                            gsap.to(caption, { opacity: 1, duration: 0.2, ease: "power2.inOut" });
                        }
                    });
                }
            }
        }



        hamburgerEl.on("click", function () {
            if ($(this).hasClass("nav-open")) {
                openMenu(false);
            } else {
                openMenu(true);
            }
        });

        menuBaseEl.on("mouseenter", function () {
            openMenu(false);
        });
        menuBaseEl.on("click", function () {
            openMenu(false);
        });

        $(document).on("keydown", function (e) {
            if (e.key === "Escape") {
                openMenu(false);
            }
        });
    });
}

function servicesHover() {

    let typeSplit = new SplitType(".heading-style-h2", {
        types: "words, chars",
        tagName: "span"
    });

    // Hover
    $(".services_collection-item").each(function (index) {
        let tl = gsap.timeline({ paused: true });
        tl.to($(this).find(".heading-style-h2.is-1 .char"), {
            y: "-120%",
            stagger: { each: 0.015 },
            ease: "power2.inOut",
            duration: 0.5
        });
        tl.from(
            $(this).find(".heading-style-h2.is-2 .char"),
            {
                y: "120%",
                stagger: { each: 0.015 },
                ease: "power2.inOut",
                duration: 0.5
            },
            0
        );
        $(this).on("mouseenter", function () {
            tl.restart();
        });
        $(this).on("mouseleave", function () {
            tl.reverse();
        });
    });

}

function textSplit() {
    window.addEventListener("DOMContentLoaded", (event) => {
        // Split text into spans
        let typeSplit = new SplitType("[text-split]", {
            types: "words, chars",
            tagName: "span"
        });

        // Link timelines to scroll position
        function createScrollTrigger(triggerElement, timeline) {
            // Reset tl when scroll out of view past bottom of screen
            ScrollTrigger.create({
                trigger: triggerElement,
                start: "top bottom",
                onLeaveBack: () => {
                    timeline.progress(0);
                    timeline.pause();
                }
            });
            // Play tl when scrolled into view (60% from top of screen)
            ScrollTrigger.create({
                trigger: triggerElement,
                start: "top 60%",
                onEnter: () => timeline.play()
            });
        }


        $("[letters-slide-up]").each(function (index) {
            let tl = gsap.timeline({ paused: true });
            tl.from($(this).find(".char"), { yPercent: 100, duration: 0.2, ease: "power1.out", stagger: { amount: 0.6 } });
            createScrollTrigger($(this), tl);
        });



        // Avoid flash of unstyled content
        gsap.set("[text-split]", { opacity: 1 });
    });
}

function launch() {
    menuOpen();
    textSplit();
    servicesHover();

}

launch();

$(document).ready(function() {
            $(".w-webflow-badge").removeClass("w-webflow-badge").empty();
        });