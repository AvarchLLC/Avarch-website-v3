$(window).load(function () {

    // preloader
    $('#status').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(550).css({
        'overflow': 'visible'
    });
    setTimeout(function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 580);
    setTimeout(function () {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 1100);


    //  isotope
    var $container = $('.portfolio_container');
    if ($container.length > 0 && $.fn.isotope) {
        $container.isotope({
            filter: '*',
        });
    }

    $('.portfolio_filter a').click(function () {
        $('.portfolio_filter .active').removeClass('active');
        $(this).addClass('active');

        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 500,
                animationEngine: "jquery"
            }
        });
        return false;
    });

    // back to top
    var offset = 300,
        offset_opacity = 1200,
        scroll_top_duration = 700,
        $back_to_top = $('.cd-top');

    //hide or show the "back to top" link
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });

    //smooth scroll to top
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });

    // input
    $(".input-contact input, .textarea-contact textarea").focus(function () {
        $(this).next("span").addClass("active");
    });
    $(".input-contact input, .textarea-contact textarea").blur(function () {
        if ($(this).val() === "") {
            $(this).next("span").removeClass("active");
        }
    });

    // prevent empty links from adding hash to URL
    $('a[href="#"], a[href="#0"]').on('click', function (event) {
        event.preventDefault();
    });

    // GSAP Editorial Animations for Vision Panel
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            gsap.set(".vision-paragraph", { color: "#555555" });
            return;
        }

        function splitVisionParagraphLines() {
            var $para = $(".vision-paragraph");
            if (!$para.length || $para.find(".vision-line").length > 0) return;

            var text = $para.text().trim();
            var words = text.split(/\s+/);
            $para.empty();

            var wordSpans = [];
            words.forEach(function (word, i) {
                var span = document.createElement("span");
                span.className = "vision-word";
                span.style.display = "inline-block";
                span.innerHTML = word + (i < words.length - 1 ? "&nbsp;" : "");
                $para.append(span);
                wordSpans.push(span);
            });

            var lines = [];
            var currentLine = [];
            var lastTop = null;

            wordSpans.forEach(function (span) {
                var top = span.offsetTop;
                if (lastTop === null || Math.abs(top - lastTop) <= 4) {
                    currentLine.push(span);
                    lastTop = top;
                } else {
                    lines.push(currentLine);
                    currentLine = [span];
                    lastTop = top;
                }
            });
            if (currentLine.length) {
                lines.push(currentLine);
            }

            $para.empty();
            lines.forEach(function (lineWords) {
                var mask = document.createElement("span");
                mask.className = "vision-line-mask";
                var lineInner = document.createElement("span");
                lineInner.className = "vision-line";

                lineWords.forEach(function (w) {
                    lineInner.appendChild(w);
                });

                mask.appendChild(lineInner);
                $para.append(mask);
            });
        }

        splitVisionParagraphLines();

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(function () {
                ScrollTrigger.refresh();
            });
        }

        // Set initial states for clean, effortless reveal inside white card
        gsap.set(".vision-label", { x: -10, opacity: 0 });
        gsap.set(".vision-heading", { y: "105%" });
        gsap.set(".vision-line", { y: "105%", opacity: 0, color: "#A8ADB8" });

        // Constellation initial state
        gsap.set(".constellation-lines line", { strokeDasharray: 350, strokeDashoffset: 350 });
        gsap.set(".constellation-nodes circle, .constellation-gold-node", { scale: 0, transformOrigin: "50% 50%", opacity: 0 });

        var visionTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".vision-card",
                start: "top 82%",
                once: true
            }
        });

        // 1. "01 VISION" slides in from left (10px) while fading in (0.7s, power2.out)
        visionTimeline.to(".vision-label", {
            x: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out"
        }, 0.08)
        // 2. "Our Vision" reveals using vertical mask reveal (0.7s, power2.out)
        .to(".vision-heading", {
            y: "0%",
            duration: 0.7,
            ease: "power2.out"
        }, 0.16)
        // 3. Paragraph reveals line-by-line with slight stagger (0.7s, power2.out, stagger 0.09s)
        .to(".vision-line", {
            y: "0%",
            opacity: 1,
            duration: 0.7,
            stagger: 0.09,
            ease: "power2.out"
        }, 0.24)
        // 4. Constellation lines draw in dynamically and nodes pop up
        .to(".constellation-lines line", {
            strokeDashoffset: 0,
            duration: 1.2,
            stagger: 0.03,
            ease: "power2.out"
        }, 0.2)
        .to(".constellation-nodes circle, .constellation-gold-node", {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.03,
            ease: "back.out(1.7)"
        }, 0.4);

        // Setup dynamic line-to-node mapping for live constellation animation
        var allNodes = [];
        var circleNodes = document.querySelectorAll(".constellation-nodes circle");
        var goldNode = document.querySelector(".constellation-gold-node");

        circleNodes.forEach(function (circle) {
            circle.baseX = parseFloat(circle.getAttribute("cx")) || 0;
            circle.baseY = parseFloat(circle.getAttribute("cy")) || 0;
            allNodes.push(circle);
        });
        if (goldNode) {
            goldNode.baseX = 480;
            goldNode.baseY = 110;
            allNodes.push(goldNode);
        }

        var lines = document.querySelectorAll(".constellation-lines line");
        var connections = [];
        lines.forEach(function (line) {
            var x1 = parseFloat(line.getAttribute("x1")) || 0;
            var y1 = parseFloat(line.getAttribute("y1")) || 0;
            var x2 = parseFloat(line.getAttribute("x2")) || 0;
            var y2 = parseFloat(line.getAttribute("y2")) || 0;

            var nodeA = null, nodeB = null;
            allNodes.forEach(function (node) {
                if (Math.abs(node.baseX - x1) < 4 && Math.abs(node.baseY - y1) < 4) nodeA = node;
                if (Math.abs(node.baseX - x2) < 4 && Math.abs(node.baseY - y2) < 4) nodeB = node;
            });

            if (nodeA && nodeB) {
                connections.push({ line: line, nodeA: nodeA, nodeB: nodeB });
            }
        });

        function getNodePos(node) {
            if (node.classList && node.classList.contains("constellation-gold-node")) {
                return {
                    x: gsap.getProperty(node, "x") || 480,
                    y: gsap.getProperty(node, "y") || 110
                };
            } else {
                return {
                    x: node.baseX + (gsap.getProperty(node, "x") || 0),
                    y: node.baseY + (gsap.getProperty(node, "y") || 0)
                };
            }
        }

        // Keep connecting lines attached to nodes on every frame
        gsap.ticker.add(function () {
            connections.forEach(function (conn) {
                var posA = getNodePos(conn.nodeA);
                var posB = getNodePos(conn.nodeB);
                conn.line.setAttribute("x1", posA.x);
                conn.line.setAttribute("y1", posA.y);
                conn.line.setAttribute("x2", posB.x);
                conn.line.setAttribute("y2", posB.y);
            });
        });

        // Multi-layered organic wandering movement for every node ("here and there")
        allNodes.forEach(function (node, i) {
            var isGold = node.classList && node.classList.contains("constellation-gold-node");
            var rangeX = isGold ? 18 : 24 + (i % 3) * 8;
            var rangeY = isGold ? 16 : 20 + (i % 2) * 10;
            var duration = 2.8 + (i % 5) * 0.65;

            function wander() {
                var targetX = isGold ? 480 + (Math.random() * 2 - 1) * rangeX : (Math.random() * 2 - 1) * rangeX;
                var targetY = isGold ? 110 + (Math.random() * 2 - 1) * rangeY : (Math.random() * 2 - 1) * rangeY;

                gsap.to(node, {
                    x: targetX,
                    y: targetY,
                    duration: duration,
                    ease: "sine.inOut",
                    onComplete: wander
                });
            }
            setTimeout(wander, i * 150);
        });

        // Interactive 3D mouse parallax on the constellation card
        var cardEl = document.querySelector(".vision-card");
        var constellationContainer = document.querySelector(".vision-constellation");
        if (cardEl && constellationContainer) {
            cardEl.addEventListener("mousemove", function (e) {
                var rect = cardEl.getBoundingClientRect();
                var normX = (e.clientX - rect.left) / rect.width - 0.5;
                var normY = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(constellationContainer, {
                    x: normX * -36,
                    y: normY * -24,
                    rotationY: normX * 14,
                    rotationX: normY * -14,
                    duration: 1.4,
                    ease: "power2.out"
                });
            });

            cardEl.addEventListener("mouseleave", function () {
                gsap.to(constellationContainer, {
                    x: 0,
                    y: 0,
                    rotationY: 0,
                    rotationX: 0,
                    duration: 1.6,
                    ease: "power2.out"
                });
            });
        }

        // Pulse effect on golden halo
        gsap.to(".gold-halo-outer", {
            scale: 1.5,
            opacity: 0,
            transformOrigin: "50% 50%",
            duration: 2.2,
            repeat: -1,
            ease: "power1.out"
        });
        gsap.to(".gold-halo-inner", {
            scale: 1.18,
            opacity: 0.15,
            transformOrigin: "50% 50%",
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 5. Reading-progress color transition from muted gray (#A8ADB8) to crisp dark charcoal (#111111)
        gsap.to(".vision-line", {
            scrollTrigger: {
                trigger: ".vision-paragraph",
                start: "top 78%",
                end: "bottom 55%",
                scrub: 0.5
            },
            color: "#111111",
            stagger: 0.1,
            ease: "none"
        });

        /* ==========================================================================
           GSAP Animations for 02 LATEST NEWS Section
           ========================================================================== */
        // Phase 1: EtherWorld Major Card (Featured 2-Column Showcase)
        var ewMajorSection = document.querySelector(".etherworld-major-section");
        if (ewMajorSection && !prefersReducedMotion) {
            gsap.set(".etherworld-image-side", { x: -80, opacity: 0, scale: 0.95 });
            gsap.set(".etherworld-info-side", { x: 80, opacity: 0 });
            gsap.set(".etherworld-info-side > *", { y: 20, opacity: 0 });

            var ewTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".etherworld-major-section",
                    start: "top 85%",
                    once: true
                }
            });

            ewTimeline.to(".etherworld-image-side", {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 1.0,
                ease: "power3.out"
            }, 0)
            .to(".etherworld-info-side", {
                x: 0,
                opacity: 1,
                duration: 1.0,
                ease: "power3.out"
            }, 0.1)
            .to(".etherworld-info-side > *", {
                y: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: "power2.out"
            }, 0.25);

            var ewRect = ewMajorSection.getBoundingClientRect();
            if (ewRect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.88 && ewRect.bottom >= 0) {
                ewTimeline.play();
            }
            setTimeout(function () {
                var r = ewMajorSection.getBoundingClientRect();
                if (r.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9 && r.bottom >= 0) {
                    ewTimeline.play();
                }
            }, 1150);
        }

        // Phase 2: 4 Subparts Reveal & Slow Dual Marquee Carousels
        var subpartsSection = document.querySelector(".news-subparts-section");
        if (subpartsSection && !prefersReducedMotion) {
            gsap.set(".subparts-header", { y: 20, opacity: 0 });
            gsap.set(".news-marquee-row.row-top", { y: 45, opacity: 0 });
            gsap.set(".news-marquee-row.row-bottom", { y: 55, opacity: 0 });

            var subpartsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".news-subparts-section",
                    start: "top 86%",
                    once: true
                }
            });

            subpartsTimeline.to(".subparts-header", {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power2.out"
            }, 0)
            .to(".news-marquee-row.row-top", {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out"
            }, 0.15)
            .to(".news-marquee-row.row-bottom", {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out"
            }, 0.3);

            var spRect = subpartsSection.getBoundingClientRect();
            if (spRect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.88 && spRect.bottom >= 0) {
                subpartsTimeline.play();
            }
            setTimeout(function () {
                var r = subpartsSection.getBoundingClientRect();
                if (r.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.92 && r.bottom >= 0) {
                    subpartsTimeline.play();
                }
            }, 1150);
        }

        // Top Marquee: Left to Right very slowly
        var trackLeftToRight = document.querySelector(".track-left-to-right");
        if (trackLeftToRight) {
            gsap.set(trackLeftToRight, { xPercent: -50 });
            var tweenTop = gsap.to(trackLeftToRight, {
                xPercent: 0,
                duration: 38,
                ease: "none",
                repeat: -1
            });

            var rowTop = document.querySelector(".row-top");
            if (rowTop) {
                rowTop.addEventListener("mouseenter", function () {
                    gsap.to(tweenTop, { timeScale: 0.15, duration: 0.6 });
                });
                rowTop.addEventListener("mouseleave", function () {
                    gsap.to(tweenTop, { timeScale: 1, duration: 0.6 });
                });
            }
        }

        // Bottom Marquee: Right to Left very slowly
        var trackRightToLeft = document.querySelector(".track-right-to-left");
        if (trackRightToLeft) {
            gsap.set(trackRightToLeft, { xPercent: 0 });
            var tweenBottom = gsap.to(trackRightToLeft, {
                xPercent: -50,
                duration: 42,
                ease: "none",
                repeat: -1
            });

            var rowBottom = document.querySelector(".row-bottom");
            if (rowBottom) {
                rowBottom.addEventListener("mouseenter", function () {
                    gsap.to(tweenBottom, { timeScale: 0.15, duration: 0.6 });
                });
                rowBottom.addEventListener("mouseleave", function () {
                    gsap.to(tweenBottom, { timeScale: 1, duration: 0.6 });
                });
            }
        }

        /* ==========================================================================
           GSAP & Interactive Logic for 03 TIMELINE Section (Autoplay Story Mode)
           ========================================================================== */
        function initAvarchTimelineSection() {
            var timelineSection = document.querySelector(".avarch-timeline-section");
            if (!timelineSection || timelineSection.dataset.init === "true") return;
            timelineSection.dataset.init = "true";

            var timelineData = [
                {
                    logo: "img/icons/etherworld_badge.png",
                    title: "EtherWorld",
                    badge: "Jan 2017 — Present",
                    category: "Blockchain News, Projects & Technology",
                    desc: "Started as a premier blockchain media platform to educate, inform and empower the early Ethereum community through news, research updates and in-depth technical coverage.",
                    url: "https://www.etherworld.co/",
                    started: "Jan 2017",
                    status: '<span class="status-dot">●</span> Active',
                    duration: "7+ Years",
                    focus: "Education & News",
                    impact: [
                        "Reached thousands of developers during Ethereum's early years",
                        "Published 1000+ articles, guides and technical breakdowns",
                        "Built a strong foundation for community trust and grassroots growth"
                    ],
                    fallbackPct: "12%"
                },
                {
                    logo: "img/icons/eipsinsight_icon.png",
                    title: "EIPsInsight",
                    badge: "Nov 2022 — Present",
                    category: "Ethereum Improvement Proposal Analytics Hub",
                    desc: "The definitive research and tracking hub for all Ethereum Improvement Proposals (EIPs) and ERC standards, visualizing governance lifecycle, author contributions, and consensus progress.",
                    url: "https://eipsinsight.com/",
                    started: "Nov 2022",
                    status: '<span class="status-dot">●</span> Active',
                    duration: "3+ Years",
                    focus: "Protocol Governance",
                    impact: [
                        "Empowered core developers and researchers with live EIP progress dashboards",
                        "Tracked over 1,200+ protocol proposals and standardizations",
                        "Bridged complex governance discussions into accessible data visualizations"
                    ],
                    fallbackPct: "37%"
                },
                {
                    logo: "img/icons/bloblens_logo.png",
                    title: "BlobLens",
                    badge: "Jan 2026 — Present",
                    category: "EIP-4844 Blob Space & L2 Data Explorer",
                    desc: "An ultra-specialized analytics platform and visualizer dedicated to Ethereum blob space, tracking Layer 2 data availability costs, blob gas dynamics, and rollup efficiency.",
                    url: "https://bloblens.co/",
                    started: "Jan 2026",
                    status: '<span class="status-dot">●</span> Active',
                    duration: "Current",
                    focus: "L2 Scaling & Blobs",
                    impact: [
                        "Provided granular real-time analytics on EIP-4844 blob utilization",
                        "Optimized data posting strategies for major Ethereum Layer 2 rollups",
                        "Set a new industry design standard for specialized blockchain telemetry"
                    ],
                    fallbackPct: "62%"
                },
                {
                    logo: "img/icons/ethshala_logo.png",
                    title: "Ethshala",
                    badge: "2026 — Present",
                    category: "Ethereum & Web3 Academy for Next-Gen Builders",
                    desc: "An immersive educational platform and academy dedicated to simplifying Ethereum core concepts, smart contract development, protocol mechanics, and decentralized engineering for developers across the globe.",
                    url: "https://www.etherworld.co/",
                    started: "2026",
                    status: '<span class="status-dot">●</span> Active',
                    duration: "Current",
                    focus: "Education & Academy",
                    impact: [
                        "Fostering the next wave of core developers and protocol researchers",
                        "Providing structured, high-quality technical curriculum on Ethereum architecture",
                        "Empowering regional communities through open-access knowledge sharing"
                    ],
                    fallbackPct: "88%"
                }
            ];

            var activeIndex = -1;
            var milestones = timelineSection.querySelectorAll(".timeline-milestone");
            var progressBar = document.getElementById("timeline-progress-bar");
            var detailPanel = document.getElementById("timeline-detail-panel");
            if (progressBar) progressBar.style.transition = "none";

            var isSectionInViewport = false;
            var isUserInteracting = false;
            var storyTimer = null;
            var idleResumeTimer = null;
            var entrancePlayed = false;

            // Dynamically calculate exact milestone dot center along the track
            function getMilestoneTargetPct(index) {
                var m = milestones[index];
                var track = timelineSection.querySelector(".timeline-base-line");
                if (!m || !track || track.offsetWidth === 0) {
                    return timelineData[index] ? timelineData[index].fallbackPct : "10%";
                }
                var centerPx = m.offsetLeft + (m.offsetWidth / 2);
                var pct = Math.min(100, Math.max(0, (centerPx / track.offsetWidth) * 100));
                return pct + "%";
            }

            // Card Transitions: container remains fixed, inner content crossfades smoothly
            function updateTimelineDetail(index, isManual, onTransitionDone) {
                if (index < 0 || index >= timelineData.length) return;
                if (index === activeIndex && detailPanel && detailPanel.dataset.loaded === "true") {
                    if (onTransitionDone) onTransitionDone();
                    return;
                }
                activeIndex = index;
                if (detailPanel) detailPanel.dataset.loaded = "true";

                // Update active class on milestones
                milestones.forEach(function (m, idx) {
                    if (idx === index) {
                        m.classList.add("active");
                    } else {
                        m.classList.remove("active");
                    }
                });

                // If manual or immediate adjustment, sync progress bar to this milestone
                if (isManual && progressBar) {
                    if (typeof gsap !== 'undefined') {
                        gsap.killTweensOf(progressBar);
                        gsap.to(progressBar, {
                            width: getMilestoneTargetPct(index),
                            duration: 0.45,
                            ease: "power2.out"
                        });
                    } else {
                        progressBar.style.width = getMilestoneTargetPct(index);
                    }
                }

                // Animate inner contents transition (Crossfade + translateY 12px + Image scale 0.98 -> 1)
                var innerElements = detailPanel ? detailPanel.querySelectorAll(".tl-detail-left, .tl-detail-right") : [];
                if (innerElements.length > 0 && typeof gsap !== 'undefined' && !prefersReducedMotion) {
                    gsap.killTweensOf(innerElements);
                    gsap.to(innerElements, {
                        opacity: 0,
                        y: -8,
                        duration: 0.22,
                        ease: "power2.out",
                        onComplete: function () {
                            populateDetailDOM(index);
                            gsap.fromTo(innerElements,
                                { opacity: 0, y: 12 },
                                {
                                    opacity: 1,
                                    y: 0,
                                    duration: 0.65,
                                    ease: "power2.out",
                                    onComplete: function () {
                                        if (onTransitionDone) onTransitionDone();
                                    }
                                }
                            );

                            var logoBox = document.getElementById("tl-detail-logo-box");
                            if (logoBox) {
                                gsap.fromTo(logoBox, { scale: 0.98 }, { scale: 1, duration: 0.65, ease: "power2.out" });
                            }
                        }
                    });
                } else {
                    populateDetailDOM(index);
                    if (innerElements.length > 0) {
                        innerElements.forEach(function (el) {
                            el.style.opacity = "1";
                            el.style.transform = "none";
                        });
                    }
                    if (onTransitionDone) onTransitionDone();
                }
            }

            function populateDetailDOM(index) {
                var item = timelineData[index];
                if (!item) return;

                var logoImg = document.getElementById("tl-detail-logo-img");
                if (logoImg) logoImg.src = item.logo;

                var dateBadge = document.getElementById("tl-detail-date-badge");
                if (dateBadge) dateBadge.textContent = item.badge;

                var titleEl = document.getElementById("tl-detail-title");
                if (titleEl) titleEl.textContent = item.title;

                var categoryEl = document.getElementById("tl-detail-category");
                if (categoryEl) categoryEl.textContent = item.category;

                var descEl = document.getElementById("tl-detail-desc");
                if (descEl) descEl.textContent = item.desc;

                var urlEl = document.getElementById("tl-detail-url");
                if (urlEl) urlEl.href = item.url;

                var startedEl = document.getElementById("tl-meta-started");
                if (startedEl) startedEl.textContent = item.started;

                var statusEl = document.getElementById("tl-meta-status");
                if (statusEl) statusEl.innerHTML = item.status;

                var durationEl = document.getElementById("tl-meta-duration");
                if (durationEl) durationEl.textContent = item.duration;

                var focusEl = document.getElementById("tl-meta-focus");
                if (focusEl) focusEl.textContent = item.focus;

                var impactList = document.getElementById("tl-impact-list");
                if (impactList && item.impact) {
                    impactList.innerHTML = "";
                    item.impact.forEach(function (imp) {
                        var li = document.createElement("li");
                        li.innerHTML = '<span class="impact-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFB400" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></span> ' + imp;
                        impactList.appendChild(li);
                    });
                }
            }

            // Autoplay Story Engine
            function scheduleNextStoryStep(fromIdx) {
                clearTimeout(storyTimer);
                if (!isSectionInViewport || isUserInteracting || prefersReducedMotion) return;

                storyTimer = setTimeout(function () {
                    if (!isSectionInViewport || isUserInteracting) return;
                    var nextIndex = (fromIdx + 1) % timelineData.length;
                    playStoryToMilestone(nextIndex);
                }, 5200);
            }

            function playStoryToMilestone(targetIndex) {
                if (!isSectionInViewport || isUserInteracting || prefersReducedMotion) return;
                clearTimeout(storyTimer);
                if (progressBar && typeof gsap !== 'undefined') gsap.killTweensOf(progressBar);

                var targetPct = getMilestoneTargetPct(targetIndex);

                if (targetIndex === 0) {
                    // Looping back to start: smoothly animate progress back to beginning
                    if (progressBar && typeof gsap !== 'undefined') {
                        gsap.to(progressBar, {
                            width: "0%",
                            duration: 0.8,
                            ease: "power2.inOut",
                            onComplete: function () {
                                if (!isSectionInViewport || isUserInteracting) return;
                                gsap.to(progressBar, {
                                    width: targetPct,
                                    duration: 0.8,
                                    ease: "power1.inOut",
                                    onComplete: function () {
                                        onReachedMilestone(targetIndex);
                                    }
                                });
                            }
                        });
                    } else {
                        onReachedMilestone(targetIndex);
                    }
                } else {
                    // Animating progress toward the next milestone
                    if (progressBar && typeof gsap !== 'undefined') {
                        gsap.to(progressBar, {
                            width: targetPct,
                            duration: 2.2,
                            ease: "power1.inOut",
                            onComplete: function () {
                                onReachedMilestone(targetIndex);
                            }
                        });
                    } else {
                        onReachedMilestone(targetIndex);
                    }
                }
            }

            function onReachedMilestone(index) {
                if (!isSectionInViewport || isUserInteracting) return;

                // Pulse the milestone once per spec
                if (milestones[index] && typeof gsap !== 'undefined') {
                    var logoCircle = milestones[index].querySelector(".milestone-logo-circle");
                    if (logoCircle) {
                        gsap.fromTo(logoCircle,
                            { scale: 1 },
                            { scale: 1.15, duration: 0.25, yoyo: true, repeat: 1, ease: "power2.out" }
                        );
                    }
                }

                updateTimelineDetail(index, false, function () {
                    scheduleNextStoryStep(index);
                });
            }

            // Pause autoplay on interaction and set 10s resume timer
            function pauseAutoplayTemporarily() {
                isUserInteracting = true;
                clearTimeout(storyTimer);
                clearTimeout(idleResumeTimer);
                if (progressBar && typeof gsap !== 'undefined') gsap.killTweensOf(progressBar);

                idleResumeTimer = setTimeout(function () {
                    isUserInteracting = false;
                    if (isSectionInViewport && !prefersReducedMotion) {
                        scheduleNextStoryStep(activeIndex >= 0 ? activeIndex : 0);
                    }
                }, 10000);
            }

            // Manual Navigation Interactions
            milestones.forEach(function (m) {
                m.addEventListener("click", function () {
                    var idx = parseInt(m.getAttribute("data-index"), 10);
                    if (isNaN(idx)) return;
                    pauseAutoplayTemporarily();
                    updateTimelineDetail(idx, true);
                });
                m.addEventListener("mouseenter", function () {
                    var idx = parseInt(m.getAttribute("data-index"), 10);
                    if (isNaN(idx)) return;
                    pauseAutoplayTemporarily();
                    updateTimelineDetail(idx, true);
                });
            });

            // Viewport tracking & GSAP Entrance Animations
            if (!prefersReducedMotion && typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.set(progressBar, { width: "0%" });
                gsap.set(".timeline-milestone", { y: 28, opacity: 0 });
                if (detailPanel) gsap.set(detailPanel, { y: 24, opacity: 0 });

                function triggerEntrance() {
                    if (entrancePlayed) {
                        isSectionInViewport = true;
                        if (!isUserInteracting) scheduleNextStoryStep(activeIndex >= 0 ? activeIndex : 0);
                        return;
                    }
                    entrancePlayed = true;
                    isSectionInViewport = true;

                    var tlTimeline = gsap.timeline({
                        onComplete: function () {
                            if (isSectionInViewport && !isUserInteracting) {
                                scheduleNextStoryStep(activeIndex >= 0 ? activeIndex : 0);
                            }
                        }
                    });

                    tlTimeline.to(progressBar, {
                        width: getMilestoneTargetPct(0),
                        duration: 0.8,
                        ease: "power2.out"
                    }, 0)
                    .to(".timeline-milestone", {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.12,
                        ease: "power2.out"
                    }, 0.1);

                    if (detailPanel) {
                        tlTimeline.to(detailPanel, {
                            y: 0,
                            opacity: 1,
                            duration: 0.65,
                            ease: "power2.out",
                            onStart: function () {
                                updateTimelineDetail(0, false);
                            }
                        }, 0.35);
                    } else {
                        updateTimelineDetail(0, false);
                    }
                }

                ScrollTrigger.create({
                    trigger: ".avarch-timeline-section",
                    start: "top 85%",
                    end: "bottom 15%",
                    onEnter: triggerEntrance,
                    onEnterBack: triggerEntrance,
                    onLeave: function () {
                        isSectionInViewport = false;
                        clearTimeout(storyTimer);
                        if (progressBar) gsap.killTweensOf(progressBar);
                    },
                    onLeaveBack: function () {
                        isSectionInViewport = false;
                        clearTimeout(storyTimer);
                        if (progressBar) gsap.killTweensOf(progressBar);
                    }
                });

                // Immediately check if section is already visible right on load/refresh
                var rect = timelineSection.getBoundingClientRect();
                if (rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.86 && rect.bottom >= 0) {
                    triggerEntrance();
                }
            } else {
                if (progressBar) progressBar.style.width = getMilestoneTargetPct(0);
                updateTimelineDetail(0, true);
            }
        }

        // Initialize immediately and also check on document ready / window load
        initAvarchTimelineSection();
        if (typeof $ !== 'undefined') {
            $(document).ready(initAvarchTimelineSection);
        }

        /* ==========================================================================
           GSAP & Interaction Engine for 04 PLAYLISTS Section
           ========================================================================== */
        function initAvarchPlaylistsSection() {
            var playlistsSection = document.querySelector(".avarch-playlists-section");
            if (!playlistsSection) return;

            var playlistsData = [
                {
                    title: "Ethereum Explained",
                    videoCount: "42 VIDEOS",
                    image: "img/portfolio/Ethereum-video.jpeg",
                    url: "https://www.youtube.com/playlist?list=PLZmWIkdMcWY4IsrNbjEO3qfREoV-OX4zF",
                    desc: "The complete Ethereum guide for beginners. Understand the architecture, accounts, transactions, gas, smart contracts and everything in between."
                },
                {
                    title: "Ethereum Development",
                    videoCount: "28 VIDEOS",
                    image: "img/portfolio/Ethereum.jpeg",
                    url: "https://www.youtube.com/playlist?list=PLZmWIkdMcWY4IsrNbjEO3qfREoV-OX4zF",
                    desc: "A technical deep-dive into Ethereum smart contract development, Solidity programming, EVM internals, deployment pipelines and testing frameworks."
                },
                {
                    title: "Web3 & Blockchain Basics",
                    videoCount: "31 VIDEOS",
                    image: "img/portfolio/Blockchain.jpeg",
                    url: "https://www.youtube.com/playlist?list=PLZmWIkdMcWY5q8HkaMk06AnZQFkmCVBxT",
                    desc: "Essential building blocks of distributed ledger technology. Explore cryptographic hashing, peer-to-peer networks, consensus algorithms and decentralized systems."
                },
                {
                    title: "MetaMask",
                    videoCount: "19 VIDEOS",
                    image: "img/portfolio/Metamask.jpeg",
                    url: "https://www.youtube.com/playlist?list=PLZmWIkdMcWY4ZnMEFTcfiR83Br-rb_8nG",
                    desc: "Step-by-step tutorials mastering the world's most popular Web3 wallet. Learn secure key management, custom RPC networks, dApp connectivity and safety best practices."
                },
                {
                    title: "Blockipedia",
                    videoCount: "24 VIDEOS",
                    image: "img/portfolio/Blockipedia.jpeg",
                    url: "https://www.youtube.com/playlist?list=PLZmWIkdMcWY4Y3esuIWdVsi-s9pHtZN9F",
                    desc: "The ultimate video glossary explaining complex crypto terminology, DeFi protocols, Layer 2 scaling solutions, zero-knowledge proofs and governance models."
                }
            ];

            var currentPlaylistIdx = 0;
            var isPlaylistsInViewport = false;
            var playlistsEntrancePlayed = false;
            var autoplayTween = null;
            var isPaused = false;

            var featuredCard = document.getElementById("featured-playlist-card");
            var featuredThumbImg = document.getElementById("featured-thumb-img");
            var featuredProgressFill = document.getElementById("featured-progress-fill");
            var featuredVideoCount = document.getElementById("featured-video-count");
            var featuredTitle = document.getElementById("featured-title");
            var featuredDesc = document.getElementById("featured-desc");
            var featuredViewBtn = document.getElementById("featured-view-btn");
            var navRows = document.querySelectorAll(".playlist-nav-row");

            function startPlaylistProgress(index) {
                if (autoplayTween) {
                    autoplayTween.kill();
                    autoplayTween = null;
                }
                if (featuredProgressFill) {
                    gsap.killTweensOf(featuredProgressFill);
                    featuredProgressFill.style.width = "0%";
                }
                for (var i = 0; i < navRows.length; i++) {
                    var f = navRows[i].querySelector(".nav-row-progress-fill");
                    if (f) {
                        gsap.killTweensOf(f);
                        f.style.width = "0%";
                    }
                }

                if (!isPlaylistsInViewport || !playlistsEntrancePlayed) return;

                var activeRow = navRows[index];
                var activeRowFill = activeRow ? activeRow.querySelector(".nav-row-progress-fill") : null;

                if (typeof gsap !== 'undefined') {
                    var targets = [];
                    if (featuredProgressFill) targets.push(featuredProgressFill);
                    if (activeRowFill) targets.push(activeRowFill);

                    if (targets.length > 0) {
                        autoplayTween = gsap.to(targets, {
                            width: "100%",
                            duration: 6,
                            ease: "none",
                            onComplete: function () {
                                var nextIndex = (currentPlaylistIdx + 1) % playlistsData.length;
                                switchToPlaylist(nextIndex, true);
                            }
                        });
                        if (isPaused) {
                            autoplayTween.pause();
                        }
                    }
                }
            }

            function switchToPlaylist(index, auto) {
                if (index < 0 || index >= playlistsData.length) return;
                if (index === currentPlaylistIdx && !auto && playlistsEntrancePlayed) return;

                var data = playlistsData[index];
                currentPlaylistIdx = index;

                for (var i = 0; i < navRows.length; i++) {
                    if (i === index) {
                        navRows[i].classList.add("active");
                    } else {
                        navRows[i].classList.remove("active");
                        var fill = navRows[i].querySelector(".nav-row-progress-fill");
                        if (fill) {
                            gsap.killTweensOf(fill);
                            fill.style.width = "0%";
                        }
                    }
                }

                if (typeof gsap !== 'undefined') {
                    gsap.to([featuredTitle, featuredDesc, featuredVideoCount], {
                        opacity: 0,
                        y: 8,
                        duration: 0.22,
                        ease: "power2.in",
                        onComplete: function () {
                            if (featuredTitle) featuredTitle.textContent = data.title;
                            if (featuredDesc) featuredDesc.textContent = data.desc;
                            if (featuredVideoCount) featuredVideoCount.innerHTML = '<span class="count-icon">:=</span> ' + data.videoCount;
                            if (featuredViewBtn) featuredViewBtn.setAttribute("href", data.url);

                            gsap.to([featuredTitle, featuredDesc, featuredVideoCount], {
                                opacity: 1,
                                y: 0,
                                duration: 0.35,
                                ease: "power2.out"
                            });
                        }
                    });

                    if (featuredThumbImg) {
                        gsap.to(featuredThumbImg, {
                            opacity: 0,
                            scale: 1.02,
                            duration: 0.25,
                            ease: "power2.in",
                            onComplete: function () {
                                featuredThumbImg.src = data.image;
                                gsap.set(featuredThumbImg, { scale: 1, opacity: 0 });
                                gsap.to(featuredThumbImg, {
                                    opacity: 1,
                                    scale: 1.02,
                                    duration: 0.65,
                                    ease: "power2.out"
                                });
                            }
                        });
                    }
                } else {
                    if (featuredTitle) featuredTitle.textContent = data.title;
                    if (featuredDesc) featuredDesc.textContent = data.desc;
                    if (featuredVideoCount) featuredVideoCount.innerHTML = '<span class="count-icon">:=</span> ' + data.videoCount;
                    if (featuredViewBtn) featuredViewBtn.setAttribute("href", data.url);
                    if (featuredThumbImg) featuredThumbImg.src = data.image;
                }

                startPlaylistProgress(index);
            }

            function triggerPlaylistsEntrance() {
                isPlaylistsInViewport = true;
                if (playlistsEntrancePlayed) {
                    if (autoplayTween && !isPaused) autoplayTween.play();
                    else startPlaylistProgress(currentPlaylistIdx);
                    return;
                }
                playlistsEntrancePlayed = true;

                if (typeof gsap !== 'undefined') {
                    gsap.set(".playlists-header-bar", { y: 30, opacity: 0 });
                    gsap.set(".featured-playlist-card", { y: 35, opacity: 0 });
                    gsap.set(".playlist-nav-row", { y: 25, opacity: 0 });

                    gsap.to(".playlists-header-bar", {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: "power2.out"
                    });

                    gsap.to(".featured-playlist-card", {
                        y: 0,
                        opacity: 1,
                        duration: 0.65,
                        ease: "power2.out",
                        delay: 0.15
                    });

                    gsap.to(".playlist-nav-row", {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.25,
                        onComplete: function () {
                            startPlaylistProgress(currentPlaylistIdx);
                        }
                    });
                } else {
                    startPlaylistProgress(currentPlaylistIdx);
                }
            }

            var showcaseGrid = document.querySelector(".playlists-showcase-grid");
            if (showcaseGrid) {
                showcaseGrid.addEventListener("mouseenter", function () {
                    isPaused = true;
                    if (autoplayTween) autoplayTween.pause();
                });
                showcaseGrid.addEventListener("mouseleave", function () {
                    isPaused = false;
                    if (autoplayTween && isPlaylistsInViewport) autoplayTween.play();
                });
            }

            for (var r = 0; r < navRows.length; r++) {
                (function (rowEl) {
                    rowEl.addEventListener("click", function () {
                        var idx = parseInt(rowEl.getAttribute("data-index"), 10);
                        if (isNaN(idx)) return;

                        if (idx === currentPlaylistIdx && playlistsEntrancePlayed) {
                            var url = playlistsData[idx] && playlistsData[idx].url;
                            if (url) window.open(url, "_blank");
                        } else {
                            switchToPlaylist(idx, false);
                        }
                    });
                })(navRows[r]);
            }

            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.create({
                    trigger: ".avarch-playlists-section",
                    start: "top 85%",
                    end: "bottom 15%",
                    onEnter: triggerPlaylistsEntrance,
                    onEnterBack: triggerPlaylistsEntrance,
                    onLeave: function () {
                        isPlaylistsInViewport = false;
                        if (autoplayTween) autoplayTween.pause();
                    },
                    onLeaveBack: function () {
                        isPlaylistsInViewport = false;
                        if (autoplayTween) autoplayTween.pause();
                    }
                });

                var plRect = playlistsSection.getBoundingClientRect();
                if (plRect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.88 && plRect.bottom >= 0) {
                    triggerPlaylistsEntrance();
                }
                setTimeout(function () {
                    var r = playlistsSection.getBoundingClientRect();
                    if (r.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.92 && r.bottom >= 0) {
                        triggerPlaylistsEntrance();
                    }
                }, 1150);
            } else {
                triggerPlaylistsEntrance();
            }
        }

        initAvarchPlaylistsSection();
        initAvarchTestimonialsCarousel();
        if (typeof $ !== 'undefined') {
            $(document).ready(function() {
                initAvarchPlaylistsSection();
                initAvarchTestimonialsCarousel();
            });
        }
    }
});

/* ==========================================================================
   AVARCH TESTIMONIALS SECTION - 3D Focal Coverflow Carousel Engine
   ========================================================================== */
function initAvarchTestimonialsCarousel() {
    var stageEl = document.getElementById("testimonials-focal-stage");
    if (!stageEl) return;
    if (stageEl._testimonialsInitialized) return;
    stageEl._testimonialsInitialized = true;

    var cards = Array.from(stageEl.querySelectorAll(".testimonial-focal-card"));
    if (cards.length === 0) return;

    var dotsTrack = document.getElementById("t-dots-track");
    var prevBtn = document.getElementById("t-prev-btn");
    var nextBtn = document.getElementById("t-next-btn");

    var totalCards = cards.length;
    var activeIndex = 0;
    var autoplayInterval = null;
    var isTestimonialsPaused = false;
    var isAnimating = false;

    // Create dots
    var dots = [];
    if (dotsTrack) {
        dotsTrack.innerHTML = "";
        cards.forEach(function(_, idx) {
            var dot = document.createElement("div");
            dot.className = "t-dot" + (idx === 0 ? " active" : "");
            dot.addEventListener("click", function() {
                if (isAnimating || idx === activeIndex) return;
                rotateTestimonials(idx);
            });
            dotsTrack.appendChild(dot);
            dots.push(dot);
        });
    }

    function updateDots() {
        dots.forEach(function(dot, idx) {
            if (idx === activeIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

    function getPositions(centerIdx) {
        var leftIdx = (centerIdx - 1 + totalCards) % totalCards;
        var rightIdx = (centerIdx + 1) % totalCards;
        var farLeftIdx = (centerIdx - 2 + totalCards) % totalCards;
        var farRightIdx = (centerIdx + 2) % totalCards;
        return {
            center: centerIdx,
            left: leftIdx,
            right: rightIdx,
            farLeft: farLeftIdx,
            farRight: farRightIdx
        };
    }

    // Initial Layout positioning (no animation)
    function setInitialPositions() {
        var pos = getPositions(activeIndex);
        var isMobile = window.innerWidth <= 767;

        cards.forEach(function(card, idx) {
            card.classList.remove("t-center", "t-left", "t-right");
            if (typeof gsap !== "undefined") {
                gsap.killTweensOf(card);
            }

            if (idx === pos.center) {
                card.classList.add("t-center");
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, scale: isMobile ? 1 : 1.12, opacity: 1, zIndex: 10 });
                } else {
                    card.style.left = "50%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(" + (isMobile ? 1 : 1.12) + ")";
                    card.style.opacity = "1";
                    card.style.zIndex = "10";
                }
            } else if (idx === pos.left) {
                card.classList.add("t-left");
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: isMobile ? "-15%" : "20%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.85, opacity: isMobile ? 0 : 0.65, zIndex: 5 });
                } else {
                    card.style.left = isMobile ? "-15%" : "20%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(0.85)";
                    card.style.opacity = isMobile ? "0" : "0.65";
                    card.style.zIndex = "5";
                }
            } else if (idx === pos.right) {
                card.classList.add("t-right");
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: isMobile ? "115%" : "80%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.85, opacity: isMobile ? 0 : 0.65, zIndex: 5 });
                } else {
                    card.style.left = isMobile ? "115%" : "80%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(0.85)";
                    card.style.opacity = isMobile ? "0" : "0.65";
                    card.style.zIndex = "5";
                }
            } else if (idx === pos.farLeft) {
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: "-10%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.65, opacity: 0, zIndex: 1 });
                } else {
                    card.style.left = "-10%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(0.65)";
                    card.style.opacity = "0";
                    card.style.zIndex = "1";
                }
            } else if (idx === pos.farRight) {
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: "110%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.65, opacity: 0, zIndex: 1 });
                } else {
                    card.style.left = "110%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(0.65)";
                    card.style.opacity = "0";
                    card.style.zIndex = "1";
                }
            } else {
                if (typeof gsap !== "undefined") {
                    gsap.set(card, { left: "50%", top: "50%", xPercent: -50, yPercent: -50, scale: 0.65, opacity: 0, zIndex: 0 });
                } else {
                    card.style.left = "50%";
                    card.style.top = "50%";
                    card.style.transform = "translate(-50%, -50%) scale(0.65)";
                    card.style.opacity = "0";
                    card.style.zIndex = "0";
                }
            }
        });
        updateDots();
    }

    function rotateTestimonials(targetIndex) {
        if (isAnimating || targetIndex === activeIndex) return;
        isAnimating = true;

        var oldPos = getPositions(activeIndex);
        activeIndex = targetIndex;
        var newPos = getPositions(activeIndex);
        var isMobile = window.innerWidth <= 767;

        updateDots();

        // Animate each card
        cards.forEach(function(card, idx) {
            card.classList.remove("t-center", "t-left", "t-right");

            var targetLeft = "50%";
            var targetScale = 0.65;
            var targetOpacity = 0;
            var targetZ = 0;

            if (idx === newPos.center) {
                card.classList.add("t-center");
                targetLeft = "50%";
                targetScale = isMobile ? 1 : 1.12;
                targetOpacity = 1;
                targetZ = 10;
            } else if (idx === newPos.left) {
                card.classList.add("t-left");
                targetLeft = isMobile ? "-15%" : "20%";
                targetScale = 0.85;
                targetOpacity = isMobile ? 0 : 0.65;
                targetZ = 5;
            } else if (idx === newPos.right) {
                card.classList.add("t-right");
                targetLeft = isMobile ? "115%" : "80%";
                targetScale = 0.85;
                targetOpacity = isMobile ? 0 : 0.65;
                targetZ = 5;
            } else if (idx === newPos.farLeft) {
                targetLeft = "-10%";
                targetScale = 0.65;
                targetOpacity = 0;
                targetZ = 1;
            } else if (idx === newPos.farRight) {
                targetLeft = "110%";
                targetScale = 0.65;
                targetOpacity = 0;
                targetZ = 1;
            } else {
                // If it was on stage before, slide it out towards far side
                if (idx === oldPos.left) { targetLeft = "-10%"; targetScale = 0.65; targetOpacity = 0; targetZ = 1; }
                else if (idx === oldPos.right) { targetLeft = "110%"; targetScale = 0.65; targetOpacity = 0; targetZ = 1; }
                else { targetLeft = "50%"; targetScale = 0.65; targetOpacity = 0; targetZ = 0; }
            }

            if (typeof gsap !== "undefined") {
                gsap.to(card, {
                    left: targetLeft,
                    top: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    scale: targetScale,
                    opacity: targetOpacity,
                    zIndex: targetZ,
                    duration: 0.75,
                    ease: "power3.inOut",
                    onComplete: function() {
                        if (idx === cards.length - 1) {
                            isAnimating = false;
                        }
                    }
                });
            } else {
                card.style.left = targetLeft;
                card.style.top = "50%";
                card.style.transform = "translate(-50%, -50%) scale(" + targetScale + ")";
                card.style.opacity = targetOpacity;
                card.style.zIndex = targetZ;
                setTimeout(function() { isAnimating = false; }, 750);
            }
        });
    }

    function nextTestimonial() {
        rotateTestimonials((activeIndex + 1) % totalCards);
    }

    function prevTestimonial() {
        rotateTestimonials((activeIndex - 1 + totalCards) % totalCards);
    }

    // Autoplay logic
    function startAutoplay() {
        stopAutoplay();
        autoplayInterval = setInterval(function() {
            if (!isTestimonialsPaused && !isAnimating) {
                nextTestimonial();
            }
        }, 3800);
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    // Hover pauses autoplay, leaving resumes
    stageEl.addEventListener("mouseenter", function() {
        isTestimonialsPaused = true;
    });

    stageEl.addEventListener("mouseleave", function() {
        isTestimonialsPaused = false;
    });

    // Clicking side cards rotates to them
    cards.forEach(function(card, idx) {
        card.addEventListener("click", function(e) {
            // Don't intercept clicks on links
            if (e.target.tagName.toLowerCase() === "a" || e.target.closest("a")) return;
            if (isAnimating) return;
            if (card.classList.contains("t-left")) {
                rotateTestimonials((activeIndex - 1 + totalCards) % totalCards);
            } else if (card.classList.contains("t-right")) {
                rotateTestimonials((activeIndex + 1) % totalCards);
            }
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener("click", function() {
            if (isAnimating) return;
            prevTestimonial();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", function() {
            if (isAnimating) return;
            nextTestimonial();
        });
    }

    window.addEventListener("resize", function() {
        if (!isAnimating) {
            setInitialPositions();
        }
    });

    setInitialPositions();
    startAutoplay();
}