import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components & Data ---
const HeartIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>);
const KeyIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>);
const LockIcon = ({ className }) => (<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);

const treasureHuntQuestions = [
    { question: "every time a shooting star happens, one thing i wish for you everytime?", answer: "smile", hint: "It's something i want for you, and it starts with 's'." },
    { question: "Your spirit is a radiant force that brightens even the darkest nights. What do I call you for the energy you carry", answer: "sunshine", hint: "It's the name of the star our world revolves around." },
    { question: "We found a place where , and for a moment, time stood still. Where did we first meet?", answer: "kalkaji park", hint: "our go-to place." },
    { question: "You balance the cosmos within you—the playful energy of a nebula and the calm wisdom of a galaxy. What color was i wearing that you complimented the most?", answer: "black", hint: "It's my favourite now." }
];
const galleryImages = [
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871466/IMG-20240515-WA0001_bfvndz.jpg", caption: "The day it all began." },
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871468/Snapchat-1008955613_xijj5s.jpg", caption: "Adventures with you." },
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871466/WhatsApp_Image_2025-08-23_at_19.28.48_n2hqnl.jpg", caption: "My favorite co-star." },
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871466/IMG_20241124_133150_243_isfzm0.jpg", caption: "Who needs sunshine anyway?" },
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871468/Snapchat-1008955613_xijj5s.jpg", caption: "Walking by your side." },
    { src: "https://res.cloudinary.com/dx0kghc8w/image/upload/v1757871466/IMG-20250823-WA0023_yd0udp.jpg", caption: "My favorite smile." }
];
const letters = [
    { title: "To My Sunshine,", content: "They say that we are all made of stardust, and meeting you, I've never been more certain of it. You have a universe within you—the brilliant, chaotic energy of a newborn star, and the calm, profound wisdom of an ancient galaxy. Your soul is pure and kind, a constant source of light. I feel so lucky to be in your orbit." },
    { title: "for you my baby", content: "I wanted to craft an experience that mirrored the magic you bring into my life. This isn't just a website; it's a small galaxy built just for you, full of memories we've made and adventures yet to come. I hope it makes you feel as special as you are to me. Happy Birthday, Avika. Here's to another trip around the sun, together." }
];
const dayPlan = [
    "A peaceful start, aligning our stars at Hanuman Mandir",
    "A supernova of sweetness: the perfect birthday cake",
    "A journey through time and space at the National crafts museum followed by a pottery sesion",
    "A tranquil walk through the lodhi garden, hand in hand",
    "Ending the day with your favorite ramen at mr k ramyun!"
];

// --- Animation Variants for Framer Motion ---
const pageVariants = {
  initial: { opacity: 0, filter: 'blur(4px)', y: 50 },
  in: { opacity: 1, filter: 'blur(0px)', y: 0 },
  out: { opacity: 0, filter: 'blur(4px)', y: -50 }
};

const pageTransition = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  duration: 0.7
};

const AnimatedComponent = ({ children }) => (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
        {children}
    </motion.div>
);

const Section = ({ id, title, children }) => (
    <motion.section 
        id={id} 
        className="py-24 px-4 md:px-8 lg:px-16 min-h-[90vh] border-b border-indigo-500/10 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
    >
        <h2 className="text-5xl md:text-6xl font-display text-center text-amber-100 celestial-heading mb-16">{title}</h2>
        {children}
    </motion.section>
);

const FloatingNav = ({ activeSection }) => {
    const navItems = ['hunt', 'plan', 'letters', 'gallery', 'feedback'];
    return (
        <motion.nav 
            className="fixed top-4 right-4 z-50 bg-black/20 backdrop-blur-md p-2 rounded-full shadow-lg shadow-indigo-500/20"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
        >
            <ul className="flex items-center space-x-1 md:space-x-2">
                {navItems.map(item => (
                    <li key={item}>
                        <a href={`#${item}`} className={`block px-3 py-2 text-xs md:text-sm rounded-full transition-all duration-300 ${activeSection === item ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow' : 'text-amber-200 hover:bg-white/10'}`}>
                            {item.charAt(0).toUpperCase() + item.slice(1)}
                        </a>
                    </li>
                ))}
            </ul>
        </motion.nav>
    );
};

// --- Interactive Flow Components ---

const NewsletterEntry = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); if (email) onSubmit(email); };
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div 
                className="w-full max-w-md text-center glassmorphism-card"
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, type: 'spring' }}
            >
                <h1 className="text-4xl font-display text-amber-100 celestial-heading mb-2">A Message from the Stars</h1>
                <p className="text-indigo-200 mb-6">An experience crafted for Avika awaits. Please verify your identity to begin this celestial journey.</p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="w-full px-4 py-3 bg-black/20 border border-indigo-500/30 rounded-full text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" required />
                    <motion.button 
                        type="submit" 
                        className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-shadow"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Align the Stars
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};
const CountdownTimer = ({ onComplete }) => {
    // const calculateTargetDate = () => { const now = new Date(); now.setSeconds(now.getSeconds() + 5); return now; };
    const [targetDate] = useState(new Date('2025-09-16T00:00:00')); 
    // const [targetDate] = useState(calculateTargetDate);
    const [timeLeft, setTimeLeft] = useState({});

    useEffect(() => {
        const timer = setInterval(() => {
            const difference = targetDate - new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            } else { clearInterval(timer); onComplete(); }
        }, 1000);
        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    const timeParts = ['days', 'hours', 'minutes', 'seconds'];
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-display text-amber-100 mb-4 celestial-heading">The Universe is Aligning...</h1>
                <p className="text-indigo-200 mb-8 max-w-lg mx-auto">A moment of cosmic significance approaches. A day dedicated entirely to celebrating your light.</p>
                <div className="flex justify-center space-x-2 md:space-x-4">
                    {timeParts.map(part => (
                        <div key={part} className="glassmorphism-card p-4 md:p-8 w-24 md:w-32">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={timeLeft[part]}
                                    className="text-4xl md:text-6xl font-bold text-amber-300"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 20, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {String(timeLeft[part] || 0).padStart(2, '0')}
                                </motion.div>
                            </AnimatePresence>
                            <div className="text-sm text-indigo-300 uppercase tracking-widest mt-2">{part}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BirthdayCelebration = ({ onComplete }) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        if (window.Tone && stage === 0) {
             const synth = new window.Tone.FMSynth({
                harmonicity: 3.01, modulationIndex: 14,
                envelope: { attack: 0.2, decay: 0.3, sustain: 0.5, release: 1.5 },
                modulationEnvelope: { attack: 0.2, decay: 0.1, sustain: 0.5, release: 0.1 }
            }).toDestination();
            const now = window.Tone.now();
            const melody = [
                { note: "C4", duration: "8n", time: now + 0.5 }, { note: "D4", duration: "4n", time: now + 1 },
                { note: "C4", duration: "4n", time: now + 1.5 }, { note: "F4", duration: "4n", time: now + 2 },
                { note: "E4", duration: "2n", time: now + 2.5 },
            ];
            melody.forEach(note => synth.triggerAttackRelease(note.note, note.duration, note.time));
        }
        
        const timers = [
            setTimeout(() => setStage(1), 500),   // Stage 1: Text starts appearing
            setTimeout(() => setStage(2), 2500),  // Stage 2: GIF appears
            setTimeout(() => setStage(3), 3500),  // Stage 3: Button appears
        ];
        
        return () => timers.forEach(clearTimeout);
    }, []);

    const title = "Happy Birthday, Avika";
    const titleVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
    };
    const letterVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -90 },
        visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            <div className="z-20 text-center">
                <AnimatePresence>
                    {stage >= 1 && (
                        <motion.h1 
                            className="animated-birthday-text-celestial"
                            variants={titleVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }}
                        >
                            {title.split("").map((char, index) => (
                                <motion.span key={index} variants={letterVariants} className="inline-block">
                                    {char === " " ? "\u00A0" : char}
                                </motion.span>
                            ))}
                        </motion.h1>
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {stage >= 2 && (
                        <motion.img 
                            src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHJsemJkaGU2cjAyZzJzaGY2N3J5OHB0c3FpY3BodHdlbHd4Mjd2ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9rO5Aksmn0dHQKXJAu/giphy.gif" 
                            alt="celebrating another year around the sun"
                            className="w-48 h-48 md:w-64 md:h-64 mx-auto mt-4"
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 1, type: 'spring' }}
                        />
                    )}
                </AnimatePresence>
                <AnimatePresence>
                    {stage >= 3 && (
                        <motion.button
                            onClick={onComplete} className="continue-button"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Continue the Journey &rarr;
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};


const TreasureHunt = ({ onUnlock }) => {
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);

    const nextStep = () => {
        if (step < treasureHuntQuestions.length - 1) {
            setStep(step + 1); setInputValue(''); setFeedback(''); setWrongAttempts(0);
        } else setIsComplete(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.toLowerCase().trim() === treasureHuntQuestions[step].answer) {
            setFeedback('Correct! ✨'); setTimeout(nextStep, 1500);
        } else {
            setWrongAttempts(wrongAttempts + 1); setFeedback('Not quite... the stars haven\'t aligned for that answer.');
        }
    };
    
    if (isComplete) return (
        <div className="text-center glassmorphism-card max-w-2xl mx-auto p-8">
            <h3 className="text-3xl font-display text-amber-200 celestial-heading mb-4">The Constellation is Complete!</h3>
            <p className="text-indigo-200 mb-6">You've solved the cosmic riddles and found the key to your birthday surprise!</p>
            <motion.button onClick={onUnlock} className="key-button" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <KeyIcon className="w-12 h-12" /> <span className="text-lg font-bold">Unlock the Galaxy</span>
            </motion.button>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto glassmorphism-card p-8">
            <div className="w-full bg-black/20 rounded-full h-2.5 mb-6">
                <motion.div className="bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full" initial={{ width: `${(step / treasureHuntQuestions.length) * 100}%`}} animate={{ width: `${((step + 1) / treasureHuntQuestions.length) * 100}%` }}/>
            </div>
            <h3 className="text-2xl text-amber-100 mb-6">{treasureHuntQuestions[step].question}</h3>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="w-full px-4 py-3 bg-black/20 border border-indigo-500/30 rounded-full text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" placeholder="Your answer..." />
                <button type="submit" className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all transform hover:scale-105">Check Answer</button>
                {feedback && <p className="text-center text-sm text-indigo-300 mt-2">{feedback}</p>}
                {wrongAttempts >= 2 && <p className="text-center text-sm text-amber-400 mt-2">Hint: {treasureHuntQuestions[step].hint}</p>}
                {wrongAttempts >= 3 && <button type="button" onClick={nextStep} className="text-sm text-indigo-400 hover:text-amber-300 transition-colors">Let's journey to the next star!</button>}
            </form>
        </div>
    );
};

const DayPlanSection = ({ isUnlocked }) => {
    const [isOpen, setIsOpen] = useState(false);
    const planVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
    const itemVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } };

    if (!isUnlocked) return (
        <motion.div className="flex flex-col items-center" initial={{opacity: 0}} animate={{opacity: 1}}>
            <motion.div className="relative w-48 h-48 mb-4" animate={{ rotate: [0, -5, 5, -5, 0]}} transition={{repeat: Infinity, duration: 0.8}}>
                <LockIcon className="w-24 h-24 text-indigo-500/30 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
            </motion.div>
            <p className="text-indigo-200 mb-8 text-center max-w-sm">A special gift awaits... Solve the Treasure Hunt to find the key and unlock the plan for your perfect day!</p>
        </motion.div>
    );
    
    return (
        <div className="flex flex-col items-center">
             <motion.button onClick={() => setIsOpen(!isOpen)} className="relative w-48 h-48 mb-4 focus:outline-none" whileHover={{scale: 1.1}}>
                <motion.div className="gift-box-lid" variants={{ closed: { y: 0, rotate: 0 }, open: { y: "-100%", rotate: -15 } }} animate={isOpen ? "open" : "closed"} transition={{ type: 'spring', stiffness: 200, damping: 20 }}></motion.div>
                <div className="gift-box-ribbon-v"></div><div className="gift-box-ribbon-h"></div>
                <div className="gift-box-base"></div>
            </motion.button>
            <p className="text-indigo-200 mb-8">{isOpen ? "Here is the plan for our day!" : "Click the gift to reveal your surprise!"}</p>
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="w-full max-w-md glassmorphism-card p-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                        <motion.ul className="space-y-3" variants={planVariants} initial="hidden" animate="visible">
                            {dayPlan.map((item, index) => ( <motion.li key={index} className="flex items-start" variants={itemVariants}><span className="text-amber-400 mr-3 mt-1">✧</span><span className="text-amber-100">{item}</span></motion.li> ))}
                        </motion.ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const LettersSection = ({ letters }) => (
    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {letters.map((letter, index) => (
            <motion.div key={index} className="glassmorphism-card p-8" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <h3 className="text-2xl font-display text-amber-200 mb-4 celestial-heading">{letter.title}</h3>
                <p className="text-indigo-200 leading-relaxed">{letter.content}</p>
            </motion.div>
        ))}
    </div>
);

const MemoryGallery = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
        {galleryImages.map((image, index) => (
             <motion.div key={index} className="polaroid" initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }} whileInView={{ opacity: 1, y: 0, rotate: Math.random() * 6 - 3 }} whileHover={{ scale: 1.05, rotate: 0, zIndex: 10, y: -10 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <img src={image.src} alt={image.caption} className="w-full h-auto bg-stone-700" />
                <p className="caption">{image.caption}</p>
            </motion.div>
        ))}
    </div>
);

const FeedbackForm = () => {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => { e.preventDefault(); console.log({ rating, comment }); setSubmitted(true); };
    if (submitted) return (
        <div className="text-center glassmorphism-card max-w-2xl mx-auto p-8">
            <h3 className="text-3xl font-display text-amber-200 celestial-heading mb-2">Thank you ❤️</h3>
            <p className="text-indigo-200">Your note is now a star in my sky. Thank you.</p>
        </div>
    );
    
    return (
        <div className="max-w-2xl mx-auto glassmorphism-card p-8">
             <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                <div>
                    <p className="text-center text-amber-100 mb-4">Did this journey make you smile?</p>
                    <div className="flex justify-center space-x-2">
                        {[1, 2, 3, 4, 5].map(star => (<motion.button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none" whileHover={{scale: 1.2}} whileTap={{scale: 0.9}}><HeartIcon className={`w-10 h-10 transition-colors duration-300 ${rating >= star ? 'text-amber-400' : 'text-indigo-500/30'}`} /></motion.button>))}
                    </div>
                </div>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows="4" className="w-full px-4 py-3 bg-black/20 border border-indigo-500/30 rounded-xl text-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 transition" placeholder="Leave a little note for me..."></textarea>
                 <button type="submit" className="w-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-amber-500/30 transition-all transform hover:scale-105">Send My Note</button>
             </form>
        </div>
    );
};

const MainContent = ({ userEmail, onUnlockPlan, isPlanUnlocked }) => {
    const [activeSection, setActiveSection] = useState('');
    const sectionRefs = { hunt: useRef(null), plan: useRef(null), letters: useRef(null), gallery: useRef(null), feedback: useRef(null) };
    
    useEffect(() => {
        const observer = new IntersectionObserver( (entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
        }, { rootMargin: '-40% 0px -60% 0px' });
        Object.values(sectionRefs).forEach(ref => { if (ref.current) observer.observe(ref.current); });
        return () => observer.disconnect();
    }, []);

    return (
        <main className="relative z-10">
            <FloatingNav activeSection={activeSection} />
            <header className="text-center pt-24 pb-12 px-4">
                <motion.h1 className="text-5xl md:text-7xl font-display text-amber-100 celestial-heading" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>For The One and Only</motion.h1>
                <motion.p className="text-4xl text-amber-300 mt-2 font-handwriting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>Avika</motion.p>
            </header>
            <div ref={sectionRefs.hunt}><Section id="hunt" title="A Cosmic Hunt"><TreasureHunt onUnlock={onUnlockPlan} /></Section></div>
            <div ref={sectionRefs.plan}><Section id="plan" title="Our Adventure Itinerary"><DayPlanSection isUnlocked={isPlanUnlocked} /></Section></div>
            <div ref={sectionRefs.letters}><Section id="letters" title="From My Universe to Yours"><LettersSection letters={letters} /></Section></div>
            <div ref={sectionRefs.gallery}><Section id="gallery" title="A Constellation of Memories"><MemoryGallery /></Section></div>
            <div ref={sectionRefs.feedback}><Section id="feedback" title="Leave a Little Stardust..."><FeedbackForm userEmail={userEmail}/></Section></div>
            <footer className="text-center py-8 text-indigo-400/50 text-sm"><p>Crafted with love in a universe that brought me to you.</p></footer>
        </main>
    );
};

export default function App() {
    const [currentStep, setCurrentStep] = useState('newsletter');
    const [userEmail, setUserEmail] = useState('');
    const [isPlanUnlocked, setIsPlanUnlocked] = useState(false);
    
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
        script.async = true;
        document.body.appendChild(script);
        return () => { if (script.parentNode) script.parentNode.removeChild(script); }
    }, []);

    const handleStepChange = (newStep, email = '') => {
        if (email) setUserEmail(email);
        setCurrentStep(newStep);
    };
    
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'newsletter': return <NewsletterEntry onSubmit={(email) => handleStepChange('countdown', email)} />;
            case 'countdown': return <CountdownTimer onComplete={() => handleStepChange('celebration')} />;
            case 'celebration': return <BirthdayCelebration onComplete={() => handleStepChange('main')} />;
            case 'main': return <MainContent userEmail={userEmail} onUnlockPlan={() => setIsPlanUnlocked(true)} isPlanUnlocked={isPlanUnlocked} />;
            default: return <NewsletterEntry onSubmit={(email) => handleStepChange('countdown', email)} />;
        }
    };

    return (
        <div className="celestial-theme min-h-screen font-body text-indigo-100">
             <div id="star-background">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars3"></div>
            </div>
             <AnimatePresence mode="wait">
                <motion.div key={currentStep} className="relative z-10">
                    <AnimatedComponent>{renderCurrentStep()}</AnimatedComponent>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

