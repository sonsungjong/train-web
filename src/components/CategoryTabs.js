'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CategoryTabs({ category, lectures, tests }) {
    const [activeTab, setActiveTab] = useState('lecture');

    return (
        <div>
            <div className="flex space-x-1 rounded-xl bg-zinc-900/50 p-1 mb-8 border border-zinc-800">
                <button
                    onClick={() => setActiveTab('lecture')}
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
            ${activeTab === 'lecture'
                            ? 'bg-white text-black shadow'
                            : 'text-zinc-400 hover:bg-white/[0.12] hover:text-white'
                        }`}
                >
                    Lecture Notes ({lectures.length})
                </button>
                <button
                    onClick={() => setActiveTab('test')}
                    className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all
            ${activeTab === 'test'
                            ? 'bg-white text-black shadow'
                            : 'text-zinc-400 hover:bg-white/[0.12] hover:text-white'
                        }`}
                >
                    Practice Tests ({tests.length})
                </button>
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'lecture' ? (
                    <div className="grid gap-4">
                        {lectures.length === 0 ? (
                            <div className="text-zinc-500 text-center py-10">No lectures available.</div>
                        ) : (
                            lectures.map((lecture) => (
                                <Link
                                    key={lecture.slug}
                                    href={`/learn/${category}/lecture/${lecture.slug}`}
                                    className="block p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-colors"
                                >
                                    <h3 className="text-lg font-semibold text-zinc-200">{lecture.title}</h3>
                                    <p className="text-sm text-zinc-500 mt-1">Concept Note</p>
                                </Link>
                            ))
                        )}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tests.length === 0 ? (
                            <div className="text-zinc-500 text-center py-10">No tests available.</div>
                        ) : (
                            tests.map((test) => (
                                <Link
                                    key={test.slug}
                                    href={`/learn/${category}/test/${test.slug}`}
                                    className="group flex items-center justify-between p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-mono text-sm font-bold text-zinc-400 group-hover:bg-white group-hover:text-black transition-colors">
                                            T
                                        </div>
                                        <span className="text-lg font-medium text-zinc-200">{test.title}</span>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
