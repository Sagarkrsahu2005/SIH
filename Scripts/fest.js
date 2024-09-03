// Initialize GSAP and Locomotive Scroll
function init() {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });

    // Update ScrollTrigger on scroll
    locoScroll.on("scroll", ScrollTrigger.update);

    // Configure ScrollTrigger to work with Locomotive Scroll
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // Refresh ScrollTrigger on refresh event
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}

// Initialize the functions on page load
document.addEventListener("DOMContentLoaded", () => {
    init();

    // Cursor functionality
    const crsr = document.querySelector(".cursor");
    document.addEventListener("mousemove", (e) => {
        crsr.style.left = `${e.clientX + 1}px`;
        crsr.style.top = `${e.clientY + 1}px`;
    });

    // GSAP animations
    gsap.from(".page1 h1, .page1 h2", {
        y: 10,
        rotate: 10,
        opacity: 0,
        delay: 0.3,
        duration: 0.7
    });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top 27%",
            end: "top 0",
            scrub: 3
        }
    });
    tl.to(".page1 h1", { x: -100 }, "anim")
      .to(".page1 h2", { x: 100 }, "anim")
      .to(".page1 video", { width: "90%" }, "anim");

    const tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top -115%",
            end: "top -120%",
            scrub: 3
        }
    });
    tl2.to(".main", { backgroundColor: "#ffff" });

    const tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: ".page1 h1",
            scroller: ".main",
            start: "top -280%",
            end: "top -300%",
            scrub: 3
        }
    });
    tl3.to(".main", { backgroundColor: "#0F0D0D" });

    // Custom cursor functionality
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            const att = elem.getAttribute("data-image");
            crsr.style.width = "470px";
            crsr.style.height = "370px";
            crsr.style.borderRadius = "0";
            crsr.style.backgroundImage = `url(${att})`;
        });
        elem.addEventListener("mouseleave", () => {
            crsr.style.width = "20px";
            crsr.style.height = "20px";
            crsr.style.borderRadius = "50%";
            crsr.style.backgroundImage = "none";
        });
    });

    // Navigation hover effect
    const h4 = document.querySelectorAll("#nav h4");
    const purple = document.querySelector("#purple");
    h4.forEach((elem) => {
        elem.addEventListener("mouseenter", () => {
            purple.style.display = "block";
            purple.style.opacity = "1";
        });
        elem.addEventListener("mouseleave", () => {
            purple.style.display = "none";
            purple.style.opacity = "0";
        });
    });
});
