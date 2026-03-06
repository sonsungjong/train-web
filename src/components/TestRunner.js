'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function TestRunner({ baseId, variants, answers = {}, problemImage }) {
    const [stepIndex, setStepIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

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

    const expectedAnswer = answers[currentVariant.filename]?.trim();

    const handleShowAnswer = () => {
        setShowAnswer(true);
    };

    const handleNext = () => {
        setStepIndex(stepIndex + 1);
        setShowAnswer(false);
    };

    const handlePrev = () => {
        setStepIndex(stepIndex - 1);
        setShowAnswer(false);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white/20 flex items-center justify-center p-4 lg:p-12">
            <div className="w-full max-w-[1500px] flex flex-col lg:flex-row lg:aspect-video min-h-[850px] lg:min-h-[600px] lg:max-h-[900px] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
                {/* LEFT PANEL: CODE */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col border-b lg:border-b-0 lg:border-r border-zinc-800 bg-[#0a0a0a]">
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
                        {problemImage && (
                            <div className="mb-8 p-1 bg-zinc-900 border border-zinc-800 rounded-lg inline-block">
                                <img
                                    src={problemImage}
                                    alt="Problem Reference"
                                    className="max-w-full h-auto max-h-[300px] object-contain rounded"
                                />
                            </div>
                        )}
                        <pre className="font-mono text-[14px] leading-7 text-zinc-300">
                            {cleanCode}
                        </pre>
                    </div>
                </div>

                {/* RIGHT PANEL: INTERACTION */}
                <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col bg-black relative">
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
                                <button
                                    onClick={handleShowAnswer}
                                    className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-zinc-200 shadow-lg shadow-white/5 text-base tracking-wide transition-all transform active:scale-[0.98]"
                                >
                                    SHOW ANSWER
                                </button>
                                
                                <div className={`transition-all ${showAnswer ? 'duration-300 opacity-100 translate-y-0' : 'duration-0 opacity-0 translate-y-4 pointer-events-none'}`}>
                                    <h3 className="text-zinc-500 text-sm font-semibold uppercase tracking-wider mb-2">Correct Answer</h3>
                                    <div className="bg-[#111] border border-zinc-800 rounded-xl p-6">
                                        {expectedAnswer ? (
                                            <p className="font-mono text-xl text-green-400 break-all">
                                                {expectedAnswer.split('\n').map((line, idx) => (
                                                    <span key={idx}>
                                                        {line}
                                                        <br />
                                                    </span>
                                                ))}
                                            </p>
                                        ) : (
                                            <p className="text-zinc-500 italic">No answer data available for this file.</p>
                                        )}
                                    </div>
                                </div>
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
                                className="px-6 py-3 rounded-xl bg-zinc-100 text-black hover:bg-white transition-all flex items-center gap-2"
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
