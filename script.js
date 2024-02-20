function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var timeout;

function squeezeAnimetion() {
  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);
    xScale = gsap.utils.clamp(0.75, 1.2, dets.clientX - xPrev);
    yScale = gsap.utils.clamp(0.75, 1.2, dets.clientY - yPrev);

    xPrev = dets.clientX;
    yPrev = dets.clientY;

    crsrAnimation(xScale, yScale);

    timeout = setTimeout(function () {
      let crsr = document.querySelector(".crsr");
      crsr.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
    }, 100);
  });
}

function crsrAnimation(xScale, yScale) {
  window.addEventListener("mousemove", function (dets) {
    let crsr = document.querySelector(".crsr");
    crsr.style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xScale},${yScale})`;
  });
}

let heroTextAnimation = function () {
  var tl = gsap.timeline();

  tl.from("nav", {
    y: "-100",
    opacity: 0,
    ease: Expo,
    duration: 1,
  });
  tl.to(".boundingelem", {
    y: 0,
    ease: Expo.easeInOut,
    duration: 1.4,
    stagger: 0.2,
  });
  tl.from(".hero-bottom", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
    delay: -1,
  });
};

crsrAnimation();
heroTextAnimation();
squeezeAnimetion();
