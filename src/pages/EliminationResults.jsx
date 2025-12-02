import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import data from '../../public/results.js';
import FlyingBee from '../components/FlyingBee.jsx';
import { ArrowLeft, Award, School, Zap, BookOpen } from 'lucide-react'

const DEFAULT_PASSWORD = 'HISAN@15';
const CUTOFF_SCORE = 105.5;
const MAX_SCORE = 152.0;
const Confetti = ({ x, y, isActive, onComplete }) => {
    useEffect(() => {
        if (!isActive || typeof window === 'undefined') return;

        const canvasConfetti = require('canvas-confetti');
        const end = Date.now() + 1000; // 1 second duration

        const confettiSettings = {
            particleCount: 30,
            angle: 90,
            spread: 45,
            startVelocity: 30,
            decay: 0.9,
            gravity: 1.5,
            drift: -0.5,
            ticks: 200,
            origin: { x: x / window.innerWidth, y: y / window.innerHeight },
            colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493', '#00BFFF', '#32CD32'],
            shapes: ['circle', 'square'],
            scalar: 1.2
        };

        const interval = window.setInterval(() => {
            if (Date.now() > end) {
                window.clearInterval(interval);
                if (onComplete) onComplete();
                return;
            }

            canvasConfetti({
                ...confettiSettings,
                particleCount: 15,
                spread: 60,
                origin: {
                    x: (x + (Math.random() - 0.5) * 50) / window.innerWidth,
                    y: (y + (Math.random() - 0.5) * 30) / window.innerHeight
                }
            });
        }, 100);

        return () => window.clearInterval(interval);
    }, [isActive, x, y, onComplete]);

    return null;
};



const EliminationResults = () => {
    const [regNo, setRegNo] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [confettiTriggered, setConfettiTriggered] = useState(false);
    const [beeConfetti, setBeeConfetti] = useState([]);
    const resultRef = useRef(null);

    // 🔍 Lookup student & scores
    const student = useMemo(() => {
        return data.students?.[regNo] || null;
    }, [regNo]);

    const scores = useMemo(() => {
        return student?.scores || null;
    }, [student]);

    // ✅ Selection logic: total ≥ 85 = Selected
    const isSelected = useMemo(() => {
        return scores && scores.total >= 105.5;
    }, [scores]);

    // 🚀 Submit handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        setTimeout(() => {
            if (!regNo.trim()) {
                setError('Please enter a Registration Number');
                setIsLoading(false);
                return;
            }

            if (!student) {
                setError('Invalid Registration Number');
                setIsLoading(false);
                return;
            }

            if (password !== DEFAULT_PASSWORD) {
                setError('Incorrect password');
                setIsLoading(false);
                return;
            }

            setSubmitted(true);
            setIsLoading(false);
            setConfettiTriggered(false);
        }, 400);
    };



    // Confetti function for scroll
    const triggerConfetti = useCallback(() => {
        if (typeof window !== 'undefined') {
            const canvasConfetti = require('canvas-confetti');
            const duration = 5 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
            const randomInRange = (min, max) => Math.random() * (max - min) + min;

            const interval = window.setInterval(() => {
                const timeLeft = animationEnd - Date.now();
                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }
                const particleCount = 50 * (timeLeft / duration);
                canvasConfetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                });
                canvasConfetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                });
            }, 250);
        }
    }, []);
    function ScrollToTop() {
        const { pathname } = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    }
    // Scroll handler for confetti
    useEffect(() => {
        if (!isSelected || !submitted || confettiTriggered) return;

        const handleScroll = () => {
            if (resultRef.current) {
                const rect = resultRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;

                if (rect.bottom <= windowHeight + 100) {
                    triggerConfetti();
                    setConfettiTriggered(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isSelected, submitted, confettiTriggered, triggerConfetti]);

    // Handler for bee confetti
    const handleBeePass = useCallback((x, y) => {
        const newConfetti = {
            id: Date.now() + Math.random(),
            x,
            y,
            active: true
        };
        setBeeConfetti(prev => [...prev, newConfetti]);

        // Remove confetti after completion
        setTimeout(() => {
            setBeeConfetti(prev => prev.filter(c => c.id !== newConfetti.id));
        }, 2000);
    }, []);

    return (
        <div className="min-h-screen bg-brrown/10 py-8 px-4 sm:px-6  mt-20 relative">
            {/* Flying Bees starting from center */}
            <FlyingBee
                direction={1} // Right
                speed={0.5}
                verticalOffset={-10}
                onBeePass={handleBeePass}
            />
            <FlyingBee
                direction={-1} // Left
                speed={0.6}
                verticalOffset={10}
                onBeePass={handleBeePass}
            />
            <FlyingBee
                direction={-1} // Left
                speed={0.6}
                verticalOffset={20}
                onBeePass={handleBeePass}
            />
            <FlyingBee
                direction={1} // Left
                speed={0.8}
                verticalOffset={20}
                onBeePass={handleBeePass}
            />
            <FlyingBee
                direction={1} // Left
                speed={0.8}
                verticalOffset={0}
                onBeePass={handleBeePass}
            />
            <FlyingBee
                direction={1} // Left
                speed={0.7}
                verticalOffset={35}
                onBeePass={handleBeePass}
            />




            <div className="max-w-3xl mx-auto">
                {/* All Kerala contest */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <div className="w-full max-w-2xl mx-auto text-center mb-8 pt-6">
                        <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm border border-stone-200 mb-4">
                            <BookOpen className="w-6 h-6 text-amber-700" />
                        </div>
                        <h1 className="uppercas  font-sans text-2xl md:text-3xl font-mono font-bold text-stone-900 tracking-tight">
                            All Kerala Spelling Bee
                        </h1>
                        <p className="text-stone-500 mt-2 text-sm md:text-base font-medium">
                            Official Results Portal &bull; 2025
                        </p>
                    </div>
                </motion.div>

                <AnimatePresence mode="wait">
                    {!submitted ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="backdrop-blur-3xl bg-brrown/10 rounded-2xl shadow-2xl p-6 md:p-8 border border-[#d4c9b8]"
                        >
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="regNo" className="block text-sm font-medium text-[#572a01] mb-1 outline-cream">
                                        Registration Number
                                    </label>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            id="regNo"
                                            type="text"
                                            inputMode="numeric"
                                            value={regNo}
                                            onChange={(e) => setRegNo(e.target.value.trim())}
                                            className="w-full pl-10 bg-white/50 pr-4 py-3 border border-[#d4c9b8] rounded-xl focus:ring-2 focus:ring-[#8a4b07] focus:border-transparent outline-none"
                                            placeholder="e.g. 10001"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block  text-sm font-medium text-[#572a01] mb-1">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pr-12 pl-4 py-3 border bg-white/50  border-[#d4c9b8] rounded-xl focus:ring-2 focus:ring-[#8a4b07] focus:border-transparent outline-none"
                                            placeholder="Enter password"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#8a4b07]"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-red-600 text-sm font-medium bg-red-50 py-2 px-3 rounded-lg"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-[#8a4b07] to-[#6c3602] text-cream font-semibold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Check  Result'
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            ref={resultRef}
                            key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-[#F9F5F0] rounded-2xl shadow-lg overflow-hidden border border-[#E6D9CC]"
                        >
                            <div className='h-5 border-b-2 border-brrown'>

                            </div>

                            {/* Student Info */}
                            <div className="p-6 md:p-8 ">
                                {/* Student Identity */}
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8 border-b border-brrown border-dashed">
                                    <div>
                                        <p className="text-xs font-bold text-[#A1887F] uppercase tracking-wider mb-1">Candidate Name</p>
                                        <h2 className="text-xl md:text-2xl font-serif font-bold text-[#4E342E]">{student?.name}</h2>
                                    </div>
                                    <div className="flex flex-col gap-3 text-sm">
                                        <div className="flex items-center gap-3 text-[#5D4037]">
                                            <span className="w-8 h-8 rounded bg-[#FDF9F5] flex items-center justify-center border border-[#E9E2D6] text-[#A1887F]">
                                                #
                                            </span>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase text-[#A1887F] leading-none mb-0.5">Reg No</p>
                                                <p className="font-semibold text-[#4E342E]">{regNo}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 text-[#5D4037]">
                                            <span className="w-8 h-8 rounded bg-[#FDF9F5] flex items-center justify-center border border-[#E9E2D6] text-[#A1887F]">
                                                <School size={16} />
                                            </span>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase text-[#A1887F] leading-none mb-0.5">Institute</p>
                                                <p className="font-medium text-[#4E342E] max-w-[200px] truncate">{student?.college}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Score Table */}
                                <div className="mt-8">
                                    <h4 className="text-sm font-semibold text-[#4E342E] mb-4 flex items-center gap-2">
                                        <Zap size={14} className="text-[#B46C48]" /> Performance Breakdown
                                    </h4>

                                    <div className="border border-[#E9E2D6] rounded-lg overflow-hidden text-sm">
                                        <div className="grid grid-cols-2 bg-[#FDF9F5] border-b border-[#E9E2D6] py-2.5 px-4 font-semibold text-[#795548] text-xs uppercase tracking-wider">
                                            <span>Section</span>
                                            <span className="text-right">Score obtained</span>
                                        </div>
                                        {scores &&
                                            [1, 2, 3, 4, 5, 6, 7].map((i) => (
                                                <div
                                                    key={i}
                                                    className="grid grid-cols-2 py-3 px-4 border-b border-[#F2EDE7] last:border-0 hover:bg-[#FCFAF7] transition-colors"
                                                >
                                                    <span className="text-[#795548] font-medium">Section {i}</span>
                                                    <span className="text-right text-[#4E342E] font-semibold tabular-nums">
                                                        {scores[`s${i}`]?.toFixed(1) || '-'}
                                                    </span>
                                                </div>
                                            ))}

                                    </div>

                                    {/* Total Footer: Score and Percentage */}
                                    {/* Unified Summary Card */}
                                    <div className="mt-6 rounded-xl border border-[#E9E2D6] overflow-hidden shadow-sm">
                                        {/* Status Header (Top Accent Bar) */}
                                        <div
                                            className={`px-2 py-3 flex items-center justify-between bg-gradient-to-r ${isSelected
                                                    ? 'from-[#E8F5F2] to-[#D1E8E2] border-b border-[#B2DFDB]'
                                                    : 'from-[#ee8469] to-[#ee675833] border-b border-[#E9E2D6]'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`p-1.5 rounded-full ${isSelected
                                                            ? 'bg-[#C8E6C9] text-[#0D9488]'
                                                            : 'bg-[#F2E8DC] text-[#A67C52]'
                                                        }`}
                                                >
                                                    {isSelected ? <CheckCircle2 size={20} /> : <Award size={20} />}
                                                </div>
                                                <div>
                                                    <h3
                                                        className={`text-sm font-bold uppercase tracking-wide ${isSelected ? 'text-[#0D9488]' : 'text-[#5D4037]'
                                                            }`}
                                                    >
                                                        {isSelected ? 'Selected for Final Round' : 'You are not selected, Participation Recorded'}
                                                    </h3>
                                                    <p className="text-xs text-[#795548] mt-0.5">
                                                        {isSelected
                                                            ? `Cutoff met: ≥ ${CUTOFF_SCORE.toFixed(1)}`
                                                            : `Cutoff: ${CUTOFF_SCORE.toFixed(1)}`}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Score Summary (Right-aligned) */}
                                            <div className="text-right">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-2xl md:text-3xl font-bold text-[#4E342E] tabular-nums">
                                                        {scores?.total?.toFixed(1) ?? '0.0'}
                                                    </span>
                                                    <span className="text-xs font-medium text-[#A1887F] self-end">/ {MAX_SCORE}</span>
                                                </div>
                                                <div className="mt-1 flex items-center justify-end gap-1.5">
                                                    <span className="text-xs font-semibold text-[#795548]">
                                                        {((scores?.total ?? 0) / 152 * 100).toFixed(1)}%
                                                    </span>
                                                    <span className="inline-block w-2 h-2 rounded-full bg-[#B46C48]"></span>
                                                    <span className="text-[10px] text-[#A1887F] uppercase tracking-wider">Total</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Context Footer (Subtle, Informative) */}
                                        <div className="px-5 py-3 bg-[#FCFAF7] text-[#795548] text-xs flex flex-wrap items-center justify-between gap-2">
                                            <span>
                                                <span className="font-medium text-[#5D4037]">Maximum Marks:</span> {MAX_SCORE.toFixed(0)}
                                            </span>
                                            <span className="hidden sm:inline">•</span>
                                            <span>
                                                <span className="font-medium text-[#5D4037]">{isSelected ? 'Congratulations!' : 'Keep Practicing!, better luck next time'}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Footer */}
                                <div className=" border-t border-[#E9E2D6] flex justify-center">
                                    <button
                                        onClick={() => { setSubmitted(false), ScrollToTop() }}
                                        className="text-sm text-[#795548] hover:text-[#4E342E] font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#FDF9F5] transition-colors"
                                    >
                                        <ArrowLeft size={16} />
                                        Check Another Result
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EliminationResults;