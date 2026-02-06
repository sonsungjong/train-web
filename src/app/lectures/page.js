import Link from 'next/link';
import { getLectures } from '@/lib/resources';

export default async function LectureList() {
    // Aggregate all lectures
    const categories = ['c', 'java', 'python', 'sql'];
    let allLectures = [];

    for (const cat of categories) {
        const lectures = await getLectures(cat);
        // Add category info explicitly if needed
        if (lectures) {
            allLectures = [...allLectures, ...lectures];
        }
    }

    // Sort by name or date? 
    // currently filenames are like C20260207...
    allLectures.sort((a, b) => b.slug.localeCompare(a.slug));

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-12">
                    <Link
                        href="/"
                        className="text-zinc-500 hover:text-white text-sm font-medium transition-colors mb-4 inline-block"
                    >
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        강의자료
                    </h1>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {allLectures.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-500">
                            No lecture notes available.
                        </div>
                    ) : (
                        allLectures.map((lecture) => (
                            <Link
                                key={lecture.slug}
                                // Reuse the existing lecture view route: /learn/[category]/lecture/[slug]
                                href={`/learn/${lecture.category}/lecture/${lecture.slug}`}
                                className="group relative p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800 hover:border-amber-900/40 hover:bg-amber-950/5 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border border-white/5
                                    ${lecture.category === 'c' ? 'bg-blue-500/10 text-blue-500' :
                                                lecture.category === 'java' ? 'bg-orange-500/10 text-orange-500' :
                                                    lecture.category === 'python' ? 'bg-green-500/10 text-green-500' :
                                                        'bg-purple-500/10 text-purple-500'
                                            }`}>
                                            {lecture.category.toUpperCase().slice(0, 1)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-200 group-hover:text-amber-400 transition-colors">
                                                {lecture.title}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs font-medium text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded uppercase">
                                                    {lecture.category}
                                                </span>
                                                <span className="text-xs text-zinc-600">
                                                    Concept Note
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 flex items-center justify-center text-zinc-700 group-hover:text-amber-500 transition-colors">
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
