import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import heroImage from '../assets/hero-portrait.webp';

/* ─────────────────────────────────────────
   Scroll-driven portrait shared by Hero → About.

   Hero  : face sits centred, facing left (unchanged look).
   Scroll: face glides to the left half, grows slightly and
           turns to face right (towards the About content).
   About : face rests on the left, content reads on the right.

   Rendered inside a sticky, full-viewport layer that spans the
   Hero + About landing panel, so it needs no fixed positioning.
───────────────────────────────────────── */

const useIsDesktop = () => {
    const query = '(min-width: 768px)';
    const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
    useEffect(() => {
        const mql = window.matchMedia(query);
        const onChange = (e) => setDesktop(e.matches);
        mql.addEventListener('change', onChange);
        return () => mql.removeEventListener('change', onChange);
    }, []);
    return desktop;
};

const useMouse = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    useEffect(() => {
        const move = (e) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [x, y]);
    return { x, y };
};

const MASK = 'linear-gradient(to top, transparent 0%, #000 30%), linear-gradient(to left, transparent 0%, #000 12%)';

const Portrait = ({ darkMode, mirrored }) => (
    <img
        src={heroImage}
        alt=""
        draggable={false}
        className={`absolute inset-0 w-full h-full object-contain object-bottom select-none ${
            darkMode
                ? 'drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : 'drop-shadow-[0_0_1px_rgba(0,0,0,0.15)] drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]'
        }`}
        style={{
            // Mirroring the element also mirrors its mask, so the cut shoulder fades on the correct side
            transform: mirrored ? 'scaleX(-1)' : undefined,
            maskImage: MASK,
            WebkitMaskImage: MASK,
            maskComposite: 'intersect',
            WebkitMaskComposite: 'source-in',
        }}
    />
);

const ScrollFace = ({ darkMode, landingRef }) => {
    const desktop = useIsDesktop();
    const reduceMotion = useReducedMotion();

    // 0 = landing panel just below the fold (Hero in view), 1 = landing panel at the top
    const { scrollYProgress } = useScroll({ target: landingRef, offset: ['start end', 'start start'] });
    const p = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    // Travel: centre → middle of the left half
    const x = useTransform(p, [0, 1], ['0vw', desktop ? '-25vw' : '0vw']);
    // Keep the full head in frame (a larger scale crops the top of the hair at the landing)
    const scale = useTransform(p, [0, 1], [1, 1]);
    // On mobile the content stacks over the face, so it settles as a faint backdrop
    const layerOpacity = useTransform(p, [0.5, 1], [1, desktop ? 1 : 0.18]);

    // Head turn: left-facing profile hands over to the mirrored, right-facing one
    const turn = reduceMotion ? 0 : 50;
    const frontRotate = useTransform(p, [0.2, 0.7], [0, turn]);
    // Short overlap + blur peak at the swap so the two profiles never read as a double exposure
    const frontOpacity = useTransform(p, [0.38, 0.52], [1, 0]);
    const backRotate = useTransform(p, [0.35, 0.85], [-turn, 0]);
    const backOpacity = useTransform(p, [0.48, 0.62], [0, 1]);
    const turnBlur = useTransform(p, [0.3, 0.5, 0.7], ['blur(0px)', 'blur(6px)', 'blur(0px)']);

    // Hero-only atmosphere fades away as the face leaves
    const heroFx = useTransform(p, [0, 0.5], [1, 0]);

    // Gentle mouse parallax (kept from the original hero)
    const mouse = useMouse();
    const spring = { stiffness: 80, damping: 20 };
    const mx = useSpring(useTransform(mouse.x, [-0.5, 0.5], [-6, 6]), spring);
    const my = useSpring(useTransform(mouse.y, [-0.5, 0.5], [-4, 4]), spring);

    const bottomGradient = darkMode
        ? 'linear-gradient(to top, #000 0%, #000 10%, transparent 50%)'
        : 'linear-gradient(to top, #fff 0%, #fff 10%, transparent 50%)';
    const radialGradient = darkMode
        ? 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
        : 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.7) 100%)';

    return (
        <motion.div className="absolute inset-0" style={{ opacity: layerOpacity }}>
            <div className="absolute inset-0 flex justify-center items-end pb-[35vh] md:pb-0">
                <motion.div className="relative w-full h-full max-w-[700px] origin-bottom will-change-transform" style={{ x, scale }}>
                    <motion.div className="absolute inset-0" style={{ x: mx, y: my }}>
                        {/* Entrance reveal on its own wrapper so it never fights the scroll values */}
                        <motion.div
                            className="absolute inset-0 [perspective:1400px]"
                            initial={{ opacity: 0, y: 80, clipPath: 'inset(100% 0% 0% 0%)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div className="absolute inset-0" style={{ filter: turnBlur }}>
                                <motion.div className="absolute inset-0" style={{ rotateY: frontRotate, opacity: frontOpacity }}>
                                    <Portrait darkMode={darkMode} />
                                </motion.div>
                                <motion.div className="absolute inset-0" style={{ rotateY: backRotate, opacity: backOpacity }}>
                                    <Portrait darkMode={darkMode} mirrored />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Blend the cut bottom edge into the page */}
                    <div className="absolute inset-0 pointer-events-none" style={{ background: bottomGradient }} />
                </motion.div>
            </div>

            {/* Cinematic vignette, Hero only */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ background: radialGradient, opacity: heroFx }} />
        </motion.div>
    );
};

export default ScrollFace;
