gsap.registerPlugin( ScrollTrigger );

gsap.utils.toArray( '#mainHero' ).forEach( section => {
    ScrollTrigger.create( {
        trigger: section,
        start: 'top top',
        pin: true,
        pinSpacing: false
    } );
} );

let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".skewElem", "skewY", "deg"), // fast
  clamp = gsap.utils.clamp(-7, 7); // don't let the skew go beyond 20 degrees.

ScrollTrigger.create({
  onUpdate: (self) => {
    let skew = clamp(self.getVelocity() / -300);
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, {
        skew: 0,
        duration: 0.8,
        ease: "power3",
        overwrite: true,
        onUpdate: () => skewSetter(proxy.skew),
      });
    }
  },
});

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set(".work__left", { transformOrigin: "right center", force3D: true });


gsap.from("#me", {
  opacity: 0,
  duration: 2.1,
  x: -260,
  delay: 1.3,
  stagger: 0.6,
  ease: Back.easeOut,
});
gsap.from("#free", {
  duration: 1,
  delay: 3.9,
  backgroundPosition: "0px 300px",
  stagger: 0.7,
  opacity: 0,
});
gsap.from("header", {
  duration: 1,
  delay: 0.3,
  y: -270,
  backgroundPosition: "0px 800px",
  ease: Power4.easeOut,
  opacity: 0,
});
gsap.from(".square1", {
  duration: 1,
  delay: 0.3,
  staggered: 0.6,
  y: 100,
  ease: Sine.easeOut,
  opacity: 0,
});
gsap.from(".square2", {
  duration: 1,
  delay: 1.3,
  staggered: 0.6,
  y: 50,
  x: 50,
  ease: Sine.easeOut,
  opacity: 0,
});
gsap.from(".square3", {
  duration: 1,
  delay: 2.3,
  staggered: 0.6,
  y: 100,
  x: -100,
  ease: Power4.easeOut,
  opacity: 0,
});
gsap.from(".square4", {
  duration: 1,
  delay: 2.9,
  staggered: 0.6,
  y: 50,
  x: 50,
  ease: Power4.easeOut,
  opacity: 0,
});
gsap.from(".square5", {
  duration: 1,
  delay: 0.3,
  staggered: 0.6,
  y: 100,
  ease: Sine.easeOut,
  opacity: 0,
});