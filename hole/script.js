document.addEventListener("DOMContentLoaded", () => {
    // 20 Farewell Messages for Hanna
    const messages = [
      "Hanna, your kindness and warmth have made such a difference. We’ll miss you!",
      "From your contagious laugh to your incredible dedication, you've left a mark on all of us.",
      "It’s hard to imagine this place without you, but we know you’ll shine wherever you go.",
      "Your presence made things brighter. Thank you for being such a wonderful person.",
      "No words can truly express our appreciation. Wishing you all the success ahead!",
      "You always lifted everyone's spirits. Keep being amazing!",
      "You’ve been a friend, mentor, and inspiration. We're better for knowing you.",
      "We’ll miss your energy, ideas, and heart. Go do incredible things!",
      "Hanna, you are one of a kind. This isn’t goodbye—just ‘see you later’!",
      "Go chase those dreams, Hanna! You deserve all the success in the world.",
      "Thank you for moments big and small that made working together unforgettable.",
      "Your passion has been inspiring. Keep bringing that magic wherever you go!",
      "No distance can change the impact you’ve had on us. We’re cheering for you always!",
      "A new journey begins—and we know you'll conquer it with grace and brilliance.",
      "The only thing stronger than our sadness seeing you go is our excitement for what's next!",
      "The universe is lucky to have someone like you, Hanna. Keep making it brighter!",
      "We’re forever grateful for the laughs, memories, and wisdom you shared.",
      "One last message before you vanish into the unknown: you’ll always be part of us, Hanna!",
      "Wherever you go, our thoughts go with you. Thank you for everything.",
      "You’re not just leaving a workplace—you’re leaving a legacy in our hearts!"
    ];
  
    const container = document.getElementById("message-container");
  
    // Create a <p> for each message, all share the same center
    messages.forEach((text) => {
      const p = document.createElement("p");
      p.classList.add("message");
      p.textContent = text;
      container.appendChild(p);
    });
  });
  
  document.addEventListener("scroll", () => {
    // 1) Convert scroll to 0..1 "progress"
    const scrollY = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = scrollY / docHeight; // 0 at top, 1 at bottom
  
    // 2) Scale the black hole from scale(1) → scale(4)
    const blackHole = document.getElementById("black-hole");
    const holeZoom = 1 + 3 * progress; 
    blackHole.style.transform = `translate(-50%, -50%) scale(${holeZoom})`;
  
    // 3) Scale the message container to 60% of the hole's scale
    const textContainer = document.getElementById("message-container");
    const containerZoom = holeZoom * 0.6; // 60% to keep text inside the hole
    textContainer.style.transform = `translate(-50%, -50%) scale(${containerZoom})`;
  
    // 4) Fade logic: fadeIn + hold + fadeOut + gap
    // We'll make sure there's NO overlap in subranges, 
    // so only 1 message is visible at a time.
    const fadeInFrac  = 0.15;
    const holdFrac    = 0.25;
    const fadeOutFrac = 0.2;
    const gapFrac     = 0.4; 
    // sum = 1.0
  
    const msgs = document.querySelectorAll(".message");
    const total = msgs.length;
    const segmentSize = 1 / total;
  
    msgs.forEach((m, i) => {
      // This message's segment in [0..1]
      const start = i * segmentSize;
      const end   = (i + 1) * segmentSize;
  
      // Sub-ranges
      const fadeInEnd   = start + segmentSize * fadeInFrac;
      const holdEnd     = fadeInEnd + segmentSize * holdFrac;
      const fadeOutEnd  = holdEnd + segmentSize * fadeOutFrac;
  
      // If outside this message's timeframe, hidden
      if (progress < start || progress > fadeOutEnd) {
        m.style.opacity = 0;
        m.style.transform = "translate(-50%, -50%) scale(1)";
        return;
      }
  
      // FADING IN
      if (progress >= start && progress < fadeInEnd) {
        const phaseProgress = (progress - start) / (fadeInEnd - start);
        m.style.opacity = phaseProgress.toFixed(2);
        m.style.transform = `translate(-50%, -50%) scale(${1 + 0.2 * phaseProgress})`;
      }
      // HOLD
      else if (progress >= fadeInEnd && progress < holdEnd) {
        m.style.opacity = 1;
        m.style.transform = "translate(-50%, -50%) scale(1.2)";
      }
      // FADING OUT
      else if (progress >= holdEnd && progress < fadeOutEnd) {
        const phaseProgress = (progress - holdEnd) / (fadeOutEnd - holdEnd);
        const fade = 1 - phaseProgress; 
        m.style.opacity = fade.toFixed(2);
        m.style.transform = `translate(-50%, -50%) scale(${1 + 0.2 * fade})`;
      }
    });
  });
  