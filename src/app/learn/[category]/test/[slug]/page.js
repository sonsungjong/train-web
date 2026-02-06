import Link from 'next/link';
import { getTestVariants } from '@/lib/resources';
import TestRunner from '@/components/TestRunner';

export default async function TestDetail({ params }) {
    const { category, slug } = await params;

    // slug is now the baseId (e.g. C2025_2_12)
    const variants = await getTestVariants(category, slug);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            {/* Navigation Header only on desktop or overlay? 
            Visual consistency: Let the TestRunner take full screen. 
            We need a Back button though.
        */}
            <div className="absolute top-4 left-4 z-10">
                <Link
                    href={`/learn/${category}`}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/50 border border-white/10 text-white backdrop-blur hover:bg-white hover:text-black transition-all"
                    title="Back to List"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </Link>
            </div>

            <TestRunner baseId={slug} variants={variants} />
        </div>
    );
}
