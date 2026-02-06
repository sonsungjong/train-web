import Link from 'next/link';
import { getLectures, getTests } from '@/lib/resources';
import CategoryTabs from '@/components/CategoryTabs';

export default async function Page({ params }) {
    const { category } = await params;
    const lectures = await getLectures(category);
    const tests = await getTests(category);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center text-zinc-500 hover:text-white mb-8 transition-colors"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </Link>

                <h1 className="text-4xl font-bold mb-2 capitalize bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
                    {category} Training
                </h1>
                <p className="text-zinc-400 mb-8">Study concepts and practice with real code.</p>

                <CategoryTabs category={category} lectures={lectures} tests={tests} />
            </div>
        </div>
    );
}
