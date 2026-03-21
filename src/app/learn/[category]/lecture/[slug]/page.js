import Link from 'next/link';
import { getResourceContent } from '@/lib/resources';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GITHUB_OWNER = 'sonsungjong';
const GITHUB_REPO = 'train-web';
const GITHUB_BRANCH = 'master';

async function checkPptxExists(category, slug) {
    // category가 'LECTURE'인 경우에만 PPTX 확인
    if (category.toUpperCase() !== 'LECTURE') return null;

    const filePath = `pptx/LECTURE/${slug}.pptx`;
    const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURIComponent(filePath)}?ref=${GITHUB_BRANCH}`;

    try {
        const res = await fetch(apiUrl, {
            headers: { 'Accept': 'application/vnd.github+json' },
            // 1분 캐시 (너무 자주 API 호출 방지)
            next: { revalidate: 60 },
        });

        if (!res.ok) return null;

        const rawUrl = `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${filePath}`;
        return rawUrl;
    } catch {
        return null;
    }
}

export default async function LectureDetail({ params }) {
    const { category, slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const content = await getResourceContent('lecture', decodedSlug);
    const pptxUrl = await checkPptxExists(category, decodedSlug);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <div className="max-w-3xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <Link
                        href="/lectures"
                        className="inline-flex items-center text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Lectures
                    </Link>

                    {pptxUrl && (
                        <a
                            href={pptxUrl}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium hover:bg-amber-500/20 hover:border-amber-500/50 transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            PPT 다운로드
                        </a>
                    )}
                </div>

                <article className="prose prose-invert prose-zinc max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{content || "# Lecture not found."}</ReactMarkdown>
                </article>
            </div>
        </div>
    );
}
