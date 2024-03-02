function loco() {
  gsap.registerPlugin(ScrollTrigger);
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
    smoothMobile: true,
    smartphone: {
      smooth: true,
    },
    mobile: {
      breakpoint: 0,
      smooth: false,
      getDirection: true,
    },
    tablet: {
      breakpoint: 0,
      smooth: false,
      getDirection: true,
    },
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
loco();

var timeout;
var tl = gsap.timeline();

function loader() {
  // Select progress bar and percentage elements
  var prog = document.querySelector(".innerPrg");
  var percent = document.querySelector("#center h6");

  // Function to update progress bar and percentage
  function updateProgress(i) {
    prog.style.width = i + "%";
    percent.textContent = i + "%";
  }

  // Start loading
  function startLoading() {
    var i = 0;
    var timer = setInterval(() => {
      updateProgress(i);
      i++;
      if (i > 100) {
        clearInterval(timer);
      }
    }, 5);
  }
  setTimeout(startLoading, 1200);
}

function heroTextAnimation() {
  tl.to("#loader", {
    top: "-120%",
    duration: 0.5,
    delay: 3,
  });
  tl.from("nav", {
    y: "-100",
    opacity: 0,
    ease: Expo,
    duration: 1,
    delay: 1,
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
}

function footerTime() {
  function updateTime() {
    var IST_time = new Date();

    var hours = IST_time.getHours().toString().padStart(2, "0");
    var minutes = IST_time.getMinutes().toString().padStart(2, "0");
    var seconds = IST_time.getSeconds().toString().padStart(2, "0");

    var timeElement = document.getElementById("IST-time");
    timeElement.textContent = " IST: " + hours + ":" + minutes + ":" + seconds;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

loader();
heroTextAnimation();
footerTime();
