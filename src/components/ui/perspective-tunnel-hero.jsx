import {
    motion,
    useTransform,
    useReducedMotion,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import reactIcon from "../../assets/reactjs3d.png";
import reactNativeIcon from "../../assets/reactnatif3d.png";
import nodeIcon from "../../assets/node.png";
import expressIcon from "../../assets/express3d.png";
import laravelIcon from "../../assets/laravel3d.png";
import springbootIcon from "../../assets/SPRINGBOOT.png";
import mongodbIcon from "../../assets/MONGODB.png";
import flutterIcon from "../../assets/flutter3d.png";
import javaIcon from "../../assets/java3d.png";
import csharpIcon from "../../assets/csharp.png";
import gitIcon from "../../assets/git.png";
import biIcon from "../../assets/bi.png";
import vsIcon from "../../assets/vs.png";
import cursorIcon from "../../assets/cursor3d.png";
import intellijIcon from "../../assets/sticker_intellijidea (2).png";

const IMAGES = [
    { src: reactIcon, title: "ReactJS" },
    { src: laravelIcon, title: "Laravel" },
    { src: nodeIcon, title: "NodeJS" },
    { src: flutterIcon, title: "Flutter" },
    { src: springbootIcon, title: "Spring Boot" },
    { src: mongodbIcon, title: "MongoDB" },
    { src: reactNativeIcon, title: "React Native" },
    { src: javaIcon, title: "Java" },
    { src: expressIcon, title: "Express" },
    { src: gitIcon, title: "Git" },
    { src: csharpIcon, title: "C#" },
    { src: vsIcon, title: "Visual Studio" },
    { src: biIcon, title: "Power BI" },
    { src: cursorIcon, title: "Cursor" },
    { src: intellijIcon, title: "IntelliJ IDEA" },
];

const TUNNEL_CARDS = IMAGES.map((item, i) => {
    const goldenAngle = i * 137.5 * (Math.PI / 180);
    return {
        item,
        angleCos: Math.cos(goldenAngle),
        angleSin: Math.sin(goldenAngle),
        radiusFactorX: 0.28 + (i % 3) * 0.08,
        radiusFactorY: 0.26 + (i % 2) * 0.09,
        rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
        index: i,
    };
});

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

function useCameraParallax(enabled) {
    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, SPRING_CONFIG);
    const y = useSpring(rawY, SPRING_CONFIG);

    useEffect(() => {
        if (!enabled) return;
        const onMove = (e) => {
            rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
            rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    return { x, y };
}

function TunnelCard({ card, progress, pointer, total, stage }) {
    const staggerSpan = 0.55;
    const start = (card.index / total) * (1 - staggerSpan);
    const end = start + staggerSpan;

    const localProgress = useTransform(progress, [start, end], [0, 1]);
    const farZ = stage.isMobile ? -1200 : -1700;
    const nearZ = stage.isMobile ? 350 : 500;
    const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
    const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

    const cardWidth = stage.isMobile
        ? Math.max(130, Math.min(180, stage.width * 0.38))
        : Math.max(180, Math.min(270, stage.width * 0.18));

    const baseX = card.angleCos * (stage.width * card.radiusFactorX);
    const baseY = card.angleSin * (stage.height * card.radiusFactorY);
    const panStrength = stage.isMobile ? 20 : 45;

    const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]) => {
        const offsetX = baseX - px * panStrength;
        const offsetY = baseY - py * panStrength;
        return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
    });

    return (
        <motion.div
            style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
            className="absolute left-1/2 top-1/2 will-change-transform select-none"
        >
            <img
                src={card.item.src}
                alt={card.item.title}
                draggable={false}
                className="block w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]"
            />
        </motion.div>
    );
}

export default function PerspectiveTunnelHero({ onComplete, onReveal, initialProgress = 0 }) {
    const containerRef = useRef(null);
    const doneRef = useRef(false);
    const revealRef = useRef(false);
    const reduce = useReducedMotion();

    const [stage, setStage] = useState({ width: 1440, height: 900, isMobile: false });

    useEffect(() => {
        const update = () =>
            setStage({
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: window.innerWidth < 768,
            });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const rawProgress = useMotionValue(initialProgress);
    const smoothProgress = useSpring(rawProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

    // Re-entry from the home page: glide back into the tunnel automatically
    useEffect(() => {
        if (initialProgress > 0) rawProgress.set(0.4);
    }, [initialProgress, rawProgress]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const advance = (delta) => {
            rawProgress.set(Math.min(1, Math.max(0, rawProgress.get() + delta)));
        };
        const onWheel = (e) => {
            e.preventDefault();
            advance(e.deltaY * 0.0008);
        };
        let lastY = null;
        const onTouchStart = (e) => { lastY = e.touches[0].clientY; };
        const onTouchMove = (e) => {
            e.preventDefault();
            const y = e.touches[0].clientY;
            if (lastY !== null) advance((lastY - y) * 0.003);
            lastY = y;
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchmove", onTouchMove, { passive: false });
        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
        };
    }, [rawProgress]);

    // When the tunnel is fully traversed, go to the home page
    useEffect(() => {
        const unsub = smoothProgress.on("change", (v) => {
            if (v >= 0.78 && !revealRef.current) {
                revealRef.current = true;
                onReveal?.();
            }
            if (v >= 0.985 && !doneRef.current) {
                doneRef.current = true;
                onComplete?.();
            }
        });
        return unsub;
    }, [smoothProgress, onComplete, onReveal]);

    const skip = () => {
        if (doneRef.current) return;
        rawProgress.set(1);
    };

    const overlayOpacity = useTransform(smoothProgress, [0.78, 0.97], [1, 0]);

    const pointer = useCameraParallax(!reduce);

    const titleScale = useTransform(smoothProgress, [0, 0.5, 1], [0.7, 1, 1.35]);
    const titleOpacity = useTransform(smoothProgress, [0, 0.12, 0.85, 1], [0.25, 1, 1, 0]);
    const promptOpacity = useTransform(smoothProgress, [0, 0.12], [1, 0]);

    return (
        <motion.div
            ref={containerRef}
            className="fixed inset-0 z-[100] h-[100svh] w-screen overflow-hidden bg-black text-white select-none flex items-center justify-center touch-none"
            style={{
                opacity: overlayOpacity,
                perspective: stage.isMobile ? "900px" : "1200px",
                transformStyle: "preserve-3d",
            }}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#3f3f46_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_60%,transparent_100%)] opacity-65" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)]" />
            <div className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-white/10" />
            <div className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-white/10" />

            <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="pointer-events-none z-0 flex flex-col items-center text-center px-6 max-w-xl"
            >
                <p className="text-xs font-mono uppercase tracking-[0.4em] text-neutral-400 mb-4">
                    Portfolio
                </p>
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.9] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
                    HAMZA
                    <br />
                    EZ-ZOUEK.
                </h1>
                <p className="mt-4 max-w-[36ch] text-sm sm:text-base font-light text-neutral-400">
                    Scrollez pour traverser le tunnel et découvrir mon portfolio.
                </p>
            </motion.div>

            <motion.div
                style={{ opacity: promptOpacity }}
                className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-neutral-400"
            >
                <span>Scroll to Explore</span>
                <div className="h-6 w-px bg-gradient-to-b from-white to-transparent" />
            </motion.div>

            <button
                type="button"
                id="tunnel-skip"
                onClick={skip}
                className="absolute right-6 top-6 z-30 rounded-full border border-white/20 px-4 py-2 text-xs font-mono uppercase tracking-widest text-white/80 hover:bg-white hover:text-black transition-colors"
            >
                Passer →
            </button>

            <div
                className="absolute inset-0 pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
            >
                {TUNNEL_CARDS.map((card) => (
                    <TunnelCard
                        key={card.index}
                        card={card}
                        progress={smoothProgress}
                        pointer={pointer}
                        total={TUNNEL_CARDS.length}
                        stage={stage}
                    />
                ))}
            </div>
        </motion.div>
    );
}
