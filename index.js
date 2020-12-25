gsap.registerPlugin( ScrollTrigger );


//mainHero
gsap.utils.toArray( '#mainHero' ).forEach( section => {
  ScrollTrigger.create( {
    trigger: section,
    start: 'top top',
    pin: true,
    pinSpacing: false
  } );
} );


//work transitions
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter( ".transition3, .featuredh4, #projects", "skewY", "deg" ), // fast
  clamp = gsap.utils.clamp( -75, 5 ); // don't let the skew go beyond 20 degrees. 

ScrollTrigger.create( {
  onUpdate: ( self ) => {
    let skew = clamp( self.getVelocity() / -650 );
    // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
    if ( Math.abs( skew ) > Math.abs( proxy.skew ) ) {
      proxy.skew = skew;
      gsap.to( proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => skewSetter( proxy.skew ) } );
    }
  }
} );

// make the right edge "stick" to the scroll bar. force3D: true improves performance
gsap.set( ".transition3, .featuredh4, #projects", { transformOrigin: "right center", force3D: true } );


//Smooth transitions

// usage:
batch( ".transition2, .transition1", {
  interval: 0.1, // time window (in seconds) for batching to occur. The first callback that occurs (of its type) will start the timer, and when it elapses, any other similar callbacks for other targets will be batched into an array and fed to the callback. Default is 0.1
  batchMax: 53,   // maximum batch size (targets)
  onEnter: batch => gsap.to( batch, { autoAlpha: 1, stagger: 0.15, overwrite: true } ),
  onLeave: batch => gsap.set( batch, { autoAlpha: 0, overwrite: true } ),
  onEnterBack: batch => gsap.to( batch, { autoAlpha: 1, stagger: 0.15, overwrite: true } ),
  onLeaveBack: batch => gsap.set( batch, { autoAlpha: 0, overwrite: true } )
  // you can also define things like start, end, etc.
} );




// the magical helper function (no longer necessary in GSAP 3.3.1 because it was added as ScrollTrigger.batch())...
function batch ( targets, vars ) {
  let varsCopy = {},
    interval = vars.interval || 0.1,
    proxyCallback = ( type, callback ) => {
      let batch = [],
        delay = gsap.delayedCall( interval, () => { callback( batch ); batch.length = 0; } ).pause();
      return self => {
        batch.length || delay.restart( true );
        batch.push( self.trigger );
        vars.batchMax && vars.batchMax <= batch.length && delay.progress( 1 );
      };
    },
    p;
  for ( p in vars ) {
    varsCopy[p] = ( ~p.indexOf( "Enter" ) || ~p.indexOf( "Leave" ) ) ? proxyCallback( p, vars[p] ) : vars[p];
  }
  gsap.utils.toArray( targets ).forEach( target => {
    let config = {};
    for ( p in varsCopy ) {
      config[p] = varsCopy[p];
    }
    config.trigger = target;
    ScrollTrigger.create( config );
  } );
}


//Hero animations

gsap.from( "#me", {
  opacity: 0,
  duration: 2.1,
  x: -260,
  delay: 1.3,

  ease: Back.easeOut,
} );
gsap.from( "#free", {
  duration: 1,
  delay: 3.9,
  backgroundPosition: "0px 300px",
  stagger: 0.7,
  opacity: 0,
} );
gsap.from( "header", {
  duration: 1,
  delay: 0.3,
  y: -270,
  backgroundPosition: "0px 800px",
  ease: Power4.easeOut,
  opacity: 0,
} );
gsap.from( ".square1", {
  duration: 1,
  delay: 0.3,
  staggered: 0.6,
  y: 100,
  ease: Sine.easeOut,
  opacity: 0,
} );
gsap.from( ".square2", {
  duration: 1,
  delay: 1.3,
  staggered: 0.6,
  y: 50,
  x: 50,
  ease: Sine.easeOut,
  opacity: 0,
} );
gsap.from( ".square3", {
  duration: 1,
  delay: 2.3,
  staggered: 0.6,
  y: 100,
  x: -100,
  ease: Power4.easeOut,
  opacity: 0,
} );
gsap.from( ".square4", {
  duration: 1,
  delay: 2.9,
  staggered: 0.6,
  y: 50,
  x: 50,
  ease: Power4.easeOut,
  opacity: 0,
} );
gsap.from( ".square5", {
  duration: 1,
  delay: 0.3,
  staggered: 0.6,
  y: 100,
  ease: Sine.easeOut,
  opacity: 0,
} );
