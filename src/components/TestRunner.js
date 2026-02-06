'use client';

import { useState } from 'react';

export default function TestRunner({ baseId, variants }) {
    const [stepIndex, setStepIndex] = useState(0);

    // If no variants found?
    if (!variants || variants.length === 0) {
        return <div className="text-zinc-500">Problem files not found.</div>;
    }

    const currentVariant = variants[stepIndex];

    // Custom Labels
    const getStepLabel = (type) => {
        if (type === 'practice_g') return 'Practice 1';
        if (type === 'practice_c') return 'Practice 2';
        return 'Final Problem';
    };

    return (
        <div className="flex flex-col h-screen lg:flex-row">
            {/* Left: Code Viewer */}
            <div className="flex-1 flex flex-col border-r border-zinc-900 overflow-hidden h-1/2 lg:h-auto">
                <div className="px-6 py-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-white">{baseId}</span>
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
                            Step {stepIndex + 1} of {variants.length}
                        </span>
                    </div>

                    {/* Step Navigation Tabs */}
                    <div className="flex bg-black rounded-lg p-1 border border-zinc-800">
                        {variants.map((v, idx) => (
                            <button
                                key={v.filename}
                                onClick={() => setStepIndex(idx)}
                                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${stepIndex === idx
                                        ? 'bg-white text-black'
                                        : 'text-zinc-500 hover:text-zinc-300'
                                    }`}
                            >
                                {getStepLabel(v.type)}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 bg-[#111] overflow-auto custom-scrollbar p-6">
                    <pre className="font-mono text-sm leading-relaxed text-zinc-300">
                        <code>{currentVariant.content}</code>
                    </pre>
                </div>
            </div>

            {/* Right: Interaction */}
            <div className="flex-1 p-6 md:p-12 lg:max-w-xl bg-[#0a0a0a] flex flex-col h-1/2 lg:h-auto overflow-auto">
                <div className="my-auto">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {getStepLabel(currentVariant.type)}
                    </h2>
                    <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8" />

                    <p className="text-zinc-400 mb-8 leading-relaxed">
                        Analyze the code on the left. What is the output or the answer to the question in the comments?
                    </p>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-zinc-300">
                            Your Answer
                        </label>
                        <input
                            type="text"
                            placeholder="Type answer here..."
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                        />
                        <button className="w-full bg-white text-black font-bold py-3.5 px-4 rounded-xl hover:bg-gray-200 transition-colors active:scale-[0.98]">
                            Check Answer
                        </button>
                    </div>

                    {/* Progress Controls */}
                    <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-between">
                        <button
                            onClick={() => setStepIndex(Math.max(0, stepIndex - 1))}
                            disabled={stepIndex === 0}
                            className="text-zinc-500 hover:text-white disabled:opacity-30 disabled:hover:text-zinc-500 transition-colors font-medium text-sm flex items-center"
                        >
                            ← Previous
                        </button>
                        {stepIndex < variants.length - 1 ? (
                            <button
                                onClick={() => setStepIndex(stepIndex + 1)}
                                className="text-white hover:text-blue-400 transition-colors font-medium text-sm flex items-center"
                            >
                                Next Step →
                            </button>
                        ) : (
                            <span className="text-green-500 font-medium text-sm">Completed</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
