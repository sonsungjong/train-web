'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function TestRunner({ baseId, variants, answers = {} }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', null

    if (!variants || variants.length === 0) {
        return <div className="text-zinc-500 p-10">Problem files not found.</div>;
    }

    const currentVariant = variants[stepIndex];

    // Clean comments from code
    const cleanCode = useMemo(() => {
        let code = currentVariant.content || '';
        const ext = currentVariant.filename.split('.').pop().toLowerCase();

        if (['c', 'java', 'js', 'cpp', 'h'].includes(ext)) {
            // Remove // comments
            code = code.replace(/\/\/.*$/gm, '');
            // Remove /* */ comments
            code = code.replace(/\/\*[\s\S]*?\*\//g, '');
        } else if (['py'].includes(ext)) {
            // Remove # comments
            code = code.replace(/#.*$/gm, '');
        } else if (['sql'].includes(ext)) {
            // Remove -- comments
            code = code.replace(/--.*$/gm, '');
        }

        // Remove multiple empty lines to clean up visually
        code = code.replace(/\n\s*\n\s*\n/g, '\n\n');

        return code;
    }, [currentVariant]);

    const checkAnswer = () => {
        const expected = answers[currentVariant.filename]?.trim();

        if (!expected) {
            setFeedback('no_data');
            return;
        }

        if (userAnswer.trim() === expected) {
            setFeedback('correct');
        } else {
            setFeedback('incorrect');
        }
    };

    const handleNext = () => {
        setStepIndex(stepIndex + 1);
        setUserAnswer('');
        setFeedback(null);
    };

    const handlePrev = () => {
        setStepIndex(stepIndex - 1);
        setUserAnswer('');
        setFeedback(null);
    };

    const getStepLabel = (type) => {
        if (type.includes('_g')) return 'STEP 1 : CONCEPT';
        if (type.includes('_c')) return 'STEP 2 : PRACTICE';
        return 'FINAL CHALLENGE';
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 flex items-center justify-center p-4 lg:p-12">
            <div className="w-full max-w-[1500px] aspect-video min-h-[600px] max-h-[900px] flex border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                {/* LEFT PANEL: CODE */}
                <div className="w-1/2 h-full flex flex-col border-r border-zinc-800 bg-[#0a0a0a]">
                    {/* Code Header */}
                    <div className="flex-none h-14 px-6 border-b border-zinc-800 flex items-center justify-between bg-[#0a0a0a]">
                        <div className="flex items-center gap-2 opacity-50">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                    </div>

                    {/* Code Body */}
                    <div className="flex-1 overflow-auto custom-scrollbar p-8">
                        <pre className="font-mono text-[14px] leading-7 text-zinc-300">
                            {cleanCode}
                        </pre>
                    </div>
                </div>

                {/* RIGHT PANEL: INTERACTION */}
                <div className="w-1/2 h-full flex flex-col bg-black relative">
                    {/* Progress Indicator (Header) - CENTERED */}
                    <div className="flex-none h-16 px-8 border-b border-zinc-900 flex items-center justify-center relative">
                        <div className="flex items-center gap-3">
                            {variants.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === stepIndex ? 'w-12 bg-white' : 'w-3 bg-zinc-800'}`}
                                />
                            ))}
                        </div>
                        <span className="absolute right-8 text-[10px] font-bold text-zinc-600 tracking-widest uppercase">{getStepLabel(currentVariant.type)}</span>
                    </div>

                    {/* Main Content - CENTERED */}
                    <div className="flex-1 flex flex-col justify-center items-center p-12">
                        <div className="w-full max-w-xl text-center">
                            <h2 className="text-3xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                                Output Check
                            </h2>
                            <p className="text-zinc-500 text-base mb-10">
                                Enter the execution result of the code.
                            </p>

                            <div className="space-y-6">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
                                        placeholder="Type output..."
                                        className={`w-full bg-[#111] border-2 rounded-2xl px-6 py-5 text-xl text-center text-white outline-none transition-all font-mono placeholder-zinc-700
                                    ${feedback === 'correct' ? 'border-green-500/50 shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]' :
                                                feedback === 'incorrect' ? 'border-red-500/50 shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]' :
                                                    'border-zinc-800 focus:border-zinc-500 focus:bg-[#151515]'}`}
                                    />

                                    {/* Feedback Messages */}
                                    <div className={`absolute -bottom-8 left-0 w-full text-center text-sm font-medium transition-opacity duration-300 ${feedback ? 'opacity-100' : 'opacity-0'}`}>
                                        {feedback === 'incorrect' && <span className="text-red-500">Incorrect output. Try again.</span>}
                                        {feedback === 'no_data' && <span className="text-amber-500">Answer key missing for this file.</span>}
                                        {feedback === 'correct' && <span className="text-green-500">Correct Answer!</span>}
                                    </div>
                                </div>

                                <button
                                    onClick={checkAnswer}
                                    className={`w-full py-4 rounded-xl font-bold text-base tracking-wide transition-all transform active:scale-[0.98]
                                ${feedback === 'correct'
                                            ? 'bg-green-500 text-black shadow-lg shadow-green-500/20 hover:bg-green-400'
                                            : 'bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5'}`}
                                >
                                    {feedback === 'correct' ? 'CONTINUE NEXT' : 'CHECK ANSWER'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Navigation */}
                    <div className="flex-none p-6 flex justify-between items-center text-sm font-medium border-t border-zinc-900">
                        <button
                            onClick={handlePrev}
                            disabled={stepIndex === 0}
                            className="px-6 py-3 rounded-xl hover:bg-zinc-900 text-zinc-500 hover:text-white disabled:opacity-0 transition-all"
                        >
                            ← Previous
                        </button>

                        {stepIndex < variants.length - 1 ? (
                            <button
                                onClick={handleNext}
                                className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2
                            ${feedback === 'correct'
                                        ? 'bg-zinc-100 text-black hover:bg-white'
                                        : 'text-zinc-500 hover:text-white hover:bg-zinc-900'}`}
                            >
                                Next Step →
                            </button>
                        ) : (
                            <Link
                                href={`/learn/${variants[0].category}`}
                                className="px-6 py-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all flex items-center gap-2"
                            >
                                Finish
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
