import Link from 'next/link';
import { getResourceContent } from '@/lib/resources';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

export default async function QuizDetail({ params }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const content = await getResourceContent('quiz', decodedSlug);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <Link
                    href="/quizzes"
                    className="inline-flex items-center text-sm text-zinc-500 hover:text-white mb-8 transition-colors"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Quizzes
                </Link>

                <article className="prose prose-invert prose-zinc max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{content || "# Quiz not found."}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
