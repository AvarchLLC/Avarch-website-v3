document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for the story section arrow
  const scrollArrow = document.querySelector('.f-story-scroll-circle');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#journey-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Entrance Animations (IntersectionObserver)
  if (!prefersReducedMotion) {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };

    const entranceObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // If it's a timeline section, trigger custom timeline animation
          if (entry.target.classList.contains('f-timeline')) {
            animateTimeline(entry.target);
          } else {
            // General fade up
            entry.target.classList.add('is-visible');
          }
          // Unobserve so it only happens once
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.f-fade-up, .f-gold-rule').forEach(el => {
      entranceObserver.observe(el);
    });
    
    document.querySelectorAll('.f-timeline').forEach(el => {
      entranceObserver.observe(el);
    });

    // Hero title staggering (fallback if no reduced motion)
    const titleLines = document.querySelectorAll('.f-hero-title-line');
    titleLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('is-visible');
      }, index * 60 + 100);
    });

    // Premium Editorial Hero Animations
    if (typeof gsap !== 'undefined') {
      if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
      }

      // --- 1. Entrance Master Timeline ---
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Image and glow appear simultaneously first
      tl.from('.f-hero-portrait img', { opacity: 0, duration: 1.5, scale: 1.02 }, 0.2)
        .from('.f-bg-glow', { opacity: 0, duration: 1.5, scale: 0.9 }, 0.2)
        // Texts appear after
        .from('.f-headline-outline', { y: 30, opacity: 0, duration: 1 }, 1.0)
        .from('.f-headline-solid', { y: 40, opacity: 0, duration: 1 }, 1.2)
        .from('.f-headline-accent-line', { width: 0, duration: 0.8, ease: "power3.inOut" }, 1.4)
        .from('.f-hero-quote, .f-hero-author', { y: 20, opacity: 0, duration: 1, stagger: 0.2 }, 1.6)
        .from('.f-bg-dots', { opacity: 0, duration: 1.5 }, 1.8)
        .from('.f-hero-nav, .f-hero-bottom-divider, .f-hero-scroll', { opacity: 0, duration: 1 }, 2.0);

      // --- 2. Scroll Parallax Effects ---
      if (typeof ScrollTrigger !== 'undefined') {
        // Portrait moves slightly slower than page (parallax lag)
        gsap.to('.f-hero-portrait', {
          y: 80,
          ease: "none",
          scrollTrigger: {
            trigger: ".f-editorial-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        // Background glow moves up at a different rate
        gsap.to('.f-bg-glow', {
          y: -30, // Extremely gentle shift
          ease: "none",
          scrollTrigger: {
            trigger: ".f-editorial-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        // Dotted pattern moves slightly
        gsap.to('.f-bg-dots', {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: ".f-editorial-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });

        // --- 3. Section 02: Auto-Play Timeline ---
        const storySection = document.querySelector('#story-section');
        const storyNodes = gsap.utils.toArray('.f-story-node');

        if (storySection && storyNodes.length) {
          // Set initial hidden state
          gsap.set('.f-story-line-active', { height: '0%' });
          gsap.set('.f-story-node-dot', { scale: 0, opacity: 0 });
          gsap.set('.f-story-node-content', { x: 20, opacity: 0 });

          // Calculate the y-position of each dot relative to the nodes container
          // so we can grow the line to each one in sequence
          function getNodeDotPercent(node) {
            const nodesEl = document.querySelector('.f-story-nodes');
            const dot = node.querySelector('.f-story-node-dot');
            if (!nodesEl || !dot) return 0;
            const nodesTop = nodesEl.getBoundingClientRect().top;
            const dotCenter = dot.getBoundingClientRect().top + 12; // center of 24px dot
            const nodesH = nodesEl.getBoundingClientRect().height;
            return ((dotCenter - nodesTop) / nodesH) * 100;
          }

          function playStoryTimeline() {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            storyNodes.forEach((node, i) => {
              const pct = getNodeDotPercent(node) + '%';
              tl.to('.f-story-line-active', {
                height: pct,
                duration: 0.7,
                ease: 'power2.inOut'
              })
              .to(node.querySelector('.f-story-node-dot'), {
                scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)'
              }, '-=0.1')
              .to(node.querySelector('.f-story-node-content'), {
                x: 0, opacity: 1, duration: 0.5
              }, '-=0.2')
              .to(node, {
                '--node-opacity': 1,
                duration: 0.3
              }, '<');

              node.classList.add('is-active');
            });
          }

          // Fire once when section scrolls into view
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                setTimeout(playStoryTimeline, 300);
                observer.unobserve(storySection);
              }
            });
          }, { threshold: 0.3 });

          observer.observe(storySection);
        }

        // --- 4. Section 03: Building Ethereum Together ---
        const buildSection = document.getElementById('build-section');
        if (buildSection) {
          const buildTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#build-section',
              start: 'top 75%',
            }
          });

          buildTl.from('#build-section .f-build-eyebrow, #build-section .f-build-headline, #build-section .f-build-text', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
          });
          // Note: Removed the .f-build-card from() animation because it can trap them at opacity: 0 if ScrollTrigger is missed.
        }

        // --- 5. Section 04: The Voice ---
        const voiceSection = document.getElementById('journey-section');
        if (voiceSection) {
          const voiceTl = gsap.timeline({
            scrollTrigger: {
              trigger: '#journey-section',
              start: 'top 75%',
            }
          });

          // Text blocks slide in
          voiceTl.from('#journey-section .f-build-eyebrow, #journey-section .f-voice-text', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power3.out'
          })
          // Words fade up
          .fromTo('#voice-headline-anim .f-voice-word', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.15, ease: 'power3.out' }, "-=0.8"
          );

          // Sequential Highlight Effect (Infinitely looping!)
          const words = gsap.utils.toArray('#voice-headline-anim .f-voice-word');
          const highlightLoop = gsap.timeline({ repeat: -1, paused: true });
          
          words.forEach((word, i) => {
            highlightLoop.to(word, { color: '#f0b429', duration: 0.3 }, i === 0 ? "+=0.5" : "+=1");
            if (i > 0) {
              highlightLoop.to(words[i-1], { color: '#0e0e0d', duration: 0.3 }, "<");
            }
          });
          // Reset the last word to black so the loop is seamless
          highlightLoop.to(words[words.length - 1], { color: '#0e0e0d', duration: 0.3 }, "+=1");

          // Start the infinite loop once the words have faded in
          voiceTl.add(() => highlightLoop.play(), "-=0.2");

          // We remove the GSAP from() animation for .f-voice-event-card 
          // because it causes them to stay at opacity 0 if scrollTrigger misses it.
        }
      }
    }
  }

  // 2. Timeline Animation Logic
  function animateTimeline(timelineEl) {
    const progress = timelineEl.querySelector('.f-timeline-progress');
    const nodes = timelineEl.querySelectorAll('.f-timeline-node');
    const dots = timelineEl.querySelectorAll('.f-timeline-dot');

    if (progress) {
      progress.style.width = '100%';
    }

    dots.forEach((dot, i) => {
      setTimeout(() => {
        dot.classList.add('is-visible');
        if (nodes[i].dataset.active === "true") {
          nodes[i].classList.add('active');
        }
      }, 1500 + (i * 40)); // Wait for line (1.5s) then stagger dots
    });
  }

  // 3. Tab Filtering Logic for Press & Recognition
  const filterBtns = document.querySelectorAll('.f-filter-btn');
  const cards = document.querySelectorAll('.f-card');
  const grid = document.querySelector('.f-grid');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      filterBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Fade out grid
      grid.classList.add('is-filtering');

      setTimeout(() => {
        cards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        // Fade back in
        grid.classList.remove('is-filtering');
      }, 300); // match CSS transition duration
    });
  });

  // 3b. Tab Filtering Logic for Section 4 (The Voice)
  const voiceFilterBtns = document.querySelectorAll('.f-voice-filter');
  const voiceCards = document.querySelectorAll('.f-voice-event-card');
  const voiceTimeline = document.querySelector('.f-voice-timeline');

  voiceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all
      voiceFilterBtns.forEach(b => b.classList.remove('active'));
      // Add to clicked
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Fade out grid
      voiceTimeline.style.opacity = '0.5';

      setTimeout(() => {
        voiceCards.forEach(card => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
        // Fade back in
        voiceTimeline.style.opacity = '1';
      }, 300); // short transition
    });
  });

  // 4. Section 05: In Conversation Player Logic
  const convItems = document.querySelectorAll('.f-conv-item');
  const convIframe = document.getElementById('f-conv-iframe');
  const convTitle = document.getElementById('f-conv-title');
  const convPub = document.getElementById('f-conv-pub');
  const convDate = document.getElementById('f-conv-date');
  const convDur = document.getElementById('f-conv-dur');
  const convDesc = document.getElementById('f-conv-desc');
  const convTagsContainer = document.getElementById('f-conv-tags');
  const convOutlink = document.getElementById('f-conv-outlink');

  convItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const type = item.getAttribute('data-type');
      
      if (type === 'link') {
        // If it's just an external link (like an article), open it
        const url = item.getAttribute('data-url');
        if (url) {
          window.open(url, '_blank');
        }
        return; // Don't change the player
      }

      // 1. Update Active State in Playlist
      convItems.forEach(i => {
        i.classList.remove('active');
        const playIcon = i.querySelector('.f-conv-play-icon');
        if (playIcon) playIcon.style.display = 'none';
      });
      item.classList.add('active');
      const activePlayIcon = item.querySelector('.f-conv-play-icon');
      if (activePlayIcon) activePlayIcon.style.display = 'flex';

      // 2. Extract Data
      const vidId = item.getAttribute('data-id');
      const title = item.getAttribute('data-title');
      const pub = item.getAttribute('data-pub');
      const date = item.getAttribute('data-date');
      const dur = item.getAttribute('data-dur');
      const desc = item.getAttribute('data-desc');
      const tagsJSON = item.getAttribute('data-tags');

      // 3. Update Iframe
      if (vidId && convIframe) {
        convIframe.src = `https://www.youtube.com/embed/${vidId}?rel=0&autoplay=1&mute=1`;
        if (convOutlink) {
          convOutlink.href = `https://www.youtube.com/watch?v=${vidId}`;
        }
      }

      // 4. Update Metadata
      if (title && convTitle) convTitle.textContent = title;
      if (pub && convPub) convPub.textContent = pub;
      if (date && convDate) convDate.textContent = date;
      if (dur && convDur) convDur.textContent = dur;
      if (desc && convDesc) convDesc.textContent = desc;

      // 5. Update Tags
      if (tagsJSON && convTagsContainer) {
        try {
          const tags = JSON.parse(tagsJSON);
          convTagsContainer.innerHTML = ''; // Clear old tags
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'f-conv-tag';
            span.textContent = tag;
            convTagsContainer.appendChild(span);
          });
        } catch (e) {
          console.error("Error parsing tags", e);
        }
      }
    });
  });
  /* ==========================================================================
     SECTION 06: ARCHIVE MODAL LOGIC
     ========================================================================== */
  const archiveData = {
    media: [
      { title: "The Merge: 10 Key People Behind Ethereum's Biggest Upgrade", url: "https://www.theblock.co/post/166999/the-merge-10-key-people-behind-ethereums-biggest-upgrade-yet", type: "link" },
      { title: "Meet the 10 Women Who Are Shaping the Future of Ethereum", url: "https://etherworld.co/2025/03/08/meet-the-10-women-who-are-shaping-the-future-of-ethereum/", type: "link" },
      { title: "London Hard Fork on Ethereum Now Live", url: "https://decrypt.co/77746/london-hard-fork-ethereum-live", type: "link" },
      { title: "Everything you need to know about the Ethereum Shapella", url: "https://www.theblock.co/post/225655/ethereum-shapella", type: "link" },
      { title: "Yale Journal of Law & Technology: Ethereum 2.0", url: "https://yjolt.org/blog/ethereum-20-and-prospect-reverse-mutation", type: "link" },
      { title: "Pectra Upgrade: What's New and How to Track It", url: "https://info.etherscan.com/pectra-upgrade-whats-new-and-how-to-track-it-on-etherscan/", type: "link" },
      { title: "The MEV Letter #91", url: "https://collective.flashbots.net/t/the-mev-letter-91/4988/1", type: "link" }
    ],
    articles: [
      { title: "Happy 10 Years of Community Building with Ethereum", url: "https://medium.com/ethereum-cat-herders/happy-10-years-of-community-building-with-ethereum-7786bfff67c6", type: "link" },
      { title: "Ethereum Cat Herders’ Wrap for 2024", url: "https://medium.com/ethereum-cat-herders/ethereum-cat-herders-wrap-for-2024-62b029f1dcee", type: "link" },
      { title: "ProgPoW: The Ethereum Community Speaks", url: "https://hudsonjameson.com/posts/2020-03-02-progpow-the-ethereum-community-speaks/", type: "link" },
      { title: "It’s Pectra Time!", url: "https://medium.com/ethereum-cat-herders/its-pectra-time-0cf5561f662c", type: "link" }
    ],
    community: [
      { title: "Gratitude to women who have made huge contributions", url: "https://www.reddit.com/r/ethereum/comments/11lslel/gratitude_to_women_who_have_made_huge/", type: "link" },
      { title: "An introduction to EIPs with Tim Beiko", url: "https://unstoppabledomains.com/blog/an-introduction-to-eips-with-tim-beiko-from-the-ethereum-foundation", type: "link" },
      { title: "Ethereum Network Upgrades Part 1: The Process", url: "https://blog.metrika.co/ethereum-network-upgrades-part-1-the-process-7112ba57f3fb", type: "link" },
      { title: "How Code Changes Are Made to the World’s Most Sprawling Blockchain", url: "https://www.galaxy.com/insights/research/ethereum-governance", type: "link" },
      { title: "How the Ethereum community reacted to The Merge", url: "https://www.theblock.co/post/170334/an-incredible-feat-how-the-ethereum-community-reacted-to-the-merge", type: "link" },
      { title: "Hudson Jameson Steps Down from Ethereum Core Developers", url: "https://decrypt.co/52240/hudson-jameson-steps-down-from-ethereum-core-developers", type: "link" },
      { title: "Tim Beiko's Tweet inviting support to ECH", url: "https://twitter.com/TimBeiko/status/1734679319430250530", type: "link" },
      { title: "Rhino Review: Ethereum Staking Journal", url: "https://rhinoreview.substack.com/p/rhino-review-ethereum-staking-journal-030", type: "link" }
    ],
    education: [
      { title: "Elements of Protocol Governance | EDCON2023", url: "https://www.youtube.com/watch?v=C1LMqQ10gSM", type: "video" },
      { title: "Shaping Ethereum's Protocol Governance & Decision-Making", url: "https://www.youtube.com/watch?v=U_UN8FRqi5c", type: "video" },
      { title: "ConsenSys: Educational series on Network Upgrades", url: "https://courses.consensys.net/courses/understanding-ethereum-network-upgrades-dencun-december-2023-january-february-2024", type: "link" },
      { title: "EEA Monthly Education Call", url: "https://www.youtube.com/watch?v=LdAlzFPaJpQ", type: "video" },
      { title: "Understand EIPs with Pooja Ranjan | WiEP Cohort 3", url: "https://youtu.be/WxtcBzv05zM?si=-F_-RHg0ealA-PIf", type: "video" },
      { title: "WiEP Cohort 4", url: "https://www.youtube.com/watch?v=equE9PjNtZ0", type: "video" },
      { title: "EIPs Simplified: History and Process Explained", url: "https://www.youtube.com/watch?v=xycI1vbxJo8", type: "video" }
    ],
    events: [
      { title: "Devconnect 2025", url: "https://www.youtube.com/watch?v=wH76j1BDZkc&vl=fr", type: "video" },
      { title: "EEA 6th Anniv: Founder, EtherWorld", url: "https://www.youtube.com/watch?v=GpeOMZQCiLI", type: "video" },
      { title: "Empowering Women in Ethereum: WiEP Introduction", url: "https://www.youtube.com/watch?v=C_zkU-f4tto", type: "video" },
      { title: "Eth Singapore 2024", url: "https://www.youtube.com/watch?v=jfr1UykhQj8", type: "video" },
      { title: "EDCON 2025", url: "https://www.youtube.com/watch?v=uVj7JyTbLbg", type: "video" },
      { title: "EthDenver 2024", url: "https://x.com/EthereumDenver/status/1763697260968186109", type: "link" },
      { title: "Chainlink Panel 2021", url: "https://www.youtube.com/watch?v=f1j2FwKgk7Q", type: "video" },
      { title: "ETHWMN: Opportunities in Web3", url: "https://youtu.be/AbCzQtQWlSE", type: "video" },
      { title: "Mainnet NYC: Exploring Ethereum with Ethereum cat Herders", url: "https://youtu.be/oED02-fqsZI", type: "video" }
    ],
    interviews: [
      { title: "Education and Organization for Ethereum (Unstoppable Domains)", url: "https://www.youtube.com/watch?v=NLjkQnGL5rI", type: "video" },
      { title: "MolochDAO Interview with Pooja Ranjan", url: "https://medium.com/molochdao/molochdao-interview-with-pooja-ranjan-of-ethereum-cat-herders-be037f115961", type: "link" },
      { title: "Meet The Herders’: Pooja Ranjan", url: "https://www.youtube.com/watch?v=XCOdX5UmtU4", type: "video" },
      { title: "Talks with Vitalik: EIP-7706", url: "https://www.youtube.com/watch?v=c3TV6OhjSfc", type: "video" },
      { title: "CNBC Interview", url: "https://youtu.be/6lNgLNnfSoQ?t=360", type: "video" },
      { title: "Coindesk Shorts", url: "https://www.youtube.com/shorts/gpCc_NAtNn0", type: "video" },
      { title: "EthStakers Shorts", url: "https://www.youtube.com/shorts/tRIvDvcRhbU", type: "video" },
      { title: "GM Bus Radio Interview", url: "https://gmbusbus.podbean.com/e/gm-bus-radio-interview-with-pooja-ranjan/", type: "link" }
    ]
  };

  const archiveCards = document.querySelectorAll('.f-archive-card');
  const archiveModal = document.getElementById('archive-modal');
  const archiveModalClose = document.getElementById('archive-modal-close');
  const archiveModalTitle = document.getElementById('archive-modal-title');
  const archiveModalList = document.getElementById('archive-modal-list');

  if (archiveCards.length > 0 && archiveModal) {
    archiveCards.forEach(card => {
      card.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        const title = this.querySelector('h3').textContent;
        const items = archiveData[category] || [];
        
        archiveModalTitle.textContent = title;
        archiveModalList.innerHTML = '';
        
        items.forEach(item => {
          const li = document.createElement('li');
          const iconSVG = item.type === 'video' 
            ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>'
            : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
            
          li.innerHTML = `
            <a href="${item.url}" target="_blank" rel="noopener noreferrer">
              <div class="f-archive-list-icon">${iconSVG}</div>
              <div class="f-archive-list-title">${item.title}</div>
            </a>
          `;
          archiveModalList.appendChild(li);
        });
        
        archiveModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      archiveModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    archiveModalClose.addEventListener('click', closeModal);
    archiveModal.querySelector('.f-archive-modal-backdrop').addEventListener('click', closeModal);
  }

});
