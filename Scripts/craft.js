// Initialize GSAP and ScrollTrigger
function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

init();

// Custom Cursor Effect
var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

document.addEventListener("mousemove", function(dets) {
    gsap.to(crsr, {
        x: dets.x + 1,
        y: dets.y + 1,
        duration: 0.3,
        ease: "power1.out"
    });
});

// Craft Item Animations
gsap.from(".craft-item", {
    opacity: 0,
    scale: 0.8,
    y: 50,
    stagger: 0.2,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
        trigger: ".craft-section",
        start: "top 80%",
        end: "top 60%",
        scrub: 1
    }
});

// Hover Effects on Craft Items
document.querySelectorAll(".craft-item").forEach(item => {
    item.addEventListener("mouseenter", () => {
        var att = item.getAttribute("data-image");
        gsap.to(crsr, {
            width: "470px",
            height: "370px",
            borderRadius: "0",
            backgroundImage: `url(${att})`,
            duration: 0.3,
            ease: "power1.out"
        });
    });
    item.addEventListener("mouseleave", () => {
        gsap.to(crsr, {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundImage: `none`,
            duration: 0.3,
            ease: "power1.in"
        });
    });
});

// Detail Reveal on Click
gsap.set(".craft-details", { autoAlpha: 0 });

document.querySelectorAll(".craft-item").forEach(item => {
    item.addEventListener("click", () => {
        gsap.to(".craft-details", {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Section Transitions
gsap.to(".section", {
    scrollTrigger: {
        trigger: ".section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false
    },
    opacity: 1,
    y: 0,
    duration: 1
});

// Nav Hover Effects
var h4 = document.querySelectorAll("#nav h4");
var purple = document.querySelector("#purple");

h4.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        gsap.to(purple, {
            display: "block",
            opacity: 1,
            duration: 0.5
        });
    });
    elem.addEventListener("mouseleave", function() {
        gsap.to(purple, {
            display: "none",
            opacity: 0,
            duration: 0.5
        });
    });
});

// Page 1 Animations
gsap.from(".page1 h1, .page1 h2", {
    y: 10,
    rotate: 10,
    opacity: 0,
    delay: 0.3,
    duration: 0.7
});

var tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 3
    }
});
tl.to(".page1 h1", {
    x: -100,
}, "anim")
.to(".page1 h2", {
    x: 100
}, "anim")
.to(".page1 video", {
    width: "90%"
}, "anim");

var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -115%",
        end: "top -120%",
        scrub: 3
    }
});
tl2.to(".main", {
    backgroundColor: "#ffff"
});

var tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top -280%",
        end: "top -300%",
        scrub: 3
    }
});
tl3.to(".main", {
    backgroundColor: "#0F0D0D"
});

// Craft Item Box Hover
var boxes = document.querySelectorAll(".box");
boxes.forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
        var att = elem.getAttribute("data-image");
        gsap.to(crsr, {
            width: "470px",
            height: "370px",
            borderRadius: "0",
            backgroundImage: `url(${att})`,
            duration: 0.3,
            ease: "power1.out"
        });
    });
    elem.addEventListener("mouseleave", function() {
        gsap.to(crsr, {
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundImage: `none`,
            duration: 0.3,
            ease: "power1.in"
        });
    });
});
