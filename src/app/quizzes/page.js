import Link from 'next/link';
import { getQuizzes } from '@/lib/resources';

export default async function QuizList() {
    const quizzes = await getQuizzes();

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
                    <h1 className="text-4xl font-bold text-white mb-2">
                        📝 이론 문제풀이
                    </h1>
                    <p className="text-zinc-500">정보처리기사 실기 대비 단답형/서술형 연습</p>
                </div>

                {/* List */}
                <div className="grid gap-4">
                    {quizzes.length === 0 ? (
                        <div className="p-12 text-center border border-dashed border-zinc-800 rounded-2xl text-zinc-500">
                            아직 등록된 문제가 없습니다.
                        </div>
                    ) : (
                        quizzes.map((quiz, index) => (
                            <Link
                                key={quiz.slug}
                                href={`/quizzes/${encodeURIComponent(quiz.slug)}`}
                                className="group relative p-6 rounded-2xl bg-[#0a0a0a] border border-zinc-800 hover:border-emerald-900/40 hover:bg-emerald-950/5 transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold border border-white/5 bg-emerald-500/10 text-emerald-500">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-zinc-200 group-hover:text-emerald-400 transition-colors">
                                                {quiz.title}
                                            </h3>
                                            <span className="text-xs text-zinc-600">
                                                Practice Quiz
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 flex items-center justify-center text-zinc-700 group-hover:text-emerald-500 transition-colors">
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
