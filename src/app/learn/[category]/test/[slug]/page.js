import Link from 'next/link';
import path from 'path';
import fs from 'fs';
import { getTestVariants } from '@/lib/resources';
import TestRunner from '@/components/TestRunner';

export default async function TestDetail({ params }) {
    const { category, slug } = await params;

    // slug is now the baseId (e.g. C2025_2_12)
    const variants = await getTestVariants(category, slug);

    // Load answers
    let answers = {};
    try {
        const answersPath = path.join(process.cwd(), 'src/lib/answers.json');
        if (fs.existsSync(answersPath)) {
            const fileContent = fs.readFileSync(answersPath, 'utf-8');
            answers = JSON.parse(fileContent);
        }
    } catch (e) {
        console.error("Failed to load answers:", e);
    }

    // Load Problem Image (if exists)
    let problemImage = null;
    try {
        const categoryUpper = category.toUpperCase();
        const imagePath = path.join(process.cwd(), 'src/app/resources', categoryUpper, `${slug}.png`);

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);
            const base64Image = imageBuffer.toString('base64');
            problemImage = `data:image/png;base64,${base64Image}`;
        }
    } catch (e) {
        console.error("Failed to load problem image:", e);
    }

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

            <TestRunner baseId={slug} variants={variants} answers={answers} problemImage={problemImage} />
        </div>
    );
}
