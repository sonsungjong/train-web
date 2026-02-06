import Link from 'next/link';
import { getTests } from '@/lib/resources';

export default async function PracticeList({ params }) {
    const { category } = await params;
    const tests = await getTests(category);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <Link
                            href="/"
                            className="text-zinc-500 hover:text-white text-sm font-medium transition-colors mb-4 inline-block"
                        >
                            ← Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold text-white uppercase tracking-tight">
                            {category} <span className="text-zinc-600">Training</span>
                        </h1>
                        <p className="text-zinc-500 mt-2">
                            Select a problem to start practicing.
                        </p>
                    </div>

                    <div className="text-right hidden md:block">
                        <div className="text-4xl font-bold text-white">{tests.length}</div>
                        <div className="text-zinc-600 text-xs uppercase tracking-widest">Problems</div>
                    </div>
                </div>

                {/* List */}
                <div className="space-y-4">
                    {tests.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-500">
                            No practice problems available yet.
                        </div>
                    ) : (
                        tests.map((test) => (
                            <Link
                                key={test.slug}
                                href={`/learn/${category}/test/${test.slug}`}
                                className="group flex items-center justify-between p-6 rounded-xl bg-[#0a0a0a] border border-zinc-800 hover:border-zinc-600 hover:bg-[#0f0f0f] transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 font-bold group-hover:bg-white group-hover:text-black transition-colors">
                                        P
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">
                                            {test.title}
                                        </h3>
                                        {/* 
                                   Show "Practice available" badge if variants exist?
                                   Actually getTests() returns grouped items now.
                                */}

                                    </div>
                                </div>

                                <div className="w-8 h-8 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 group-hover:border-zinc-500 group-hover:text-white transition-all">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
