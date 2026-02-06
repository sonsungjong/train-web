import Link from 'next/link';
import { getResourceContent } from '@/lib/resources';
import ReactMarkdown from 'react-markdown';

export default async function LectureDetail({ params }) {
    const { category, slug } = await params;
    const content = await getResourceContent('lecture', slug);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <Link
                    href={`/learn/${category}`}
                    className="inline-flex items-center text-sm text-zinc-500 hover:text-white mb-8 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to {category}
                </Link>

                <article className="prose prose-invert prose-zinc max-w-none">
                    {/* 
                  Note: In a real app we'd use a more robust renderer with syntax highlighting.
                  For now, basic markdown rendering.
                */}
                    <ReactMarkdown>{content || "# Lecture not found."}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
