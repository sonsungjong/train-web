import Link from "next/link";

export default function Home() {
  const categories = [
    {
      id: "c",
      title: "C Language",
      description: "Master pointers, memory management, and low-level logic.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "java",
      title: "Java",
      description: "Object-oriented programming, streams, and concurrency.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "python",
      title: "Python",
      description: "Data structures, algorithms, and clean syntax.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "sql",
      title: "SQL",
      description: "Database queries, joins, and schema design.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className="text-center mb-20 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6">
            Practice for 2026
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            Prepare for the Information Processing Engineer Practical Exam with curated problems in C, Java, Python, and SQL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/learn/${category.id}`}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 p-1 pointer-events-auto transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-white/5 active:scale-[0.98]"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-10" />
              <div className="relative h-full bg-[#0f0f0f] rounded-[22px] p-8 md:p-10 flex flex-col justify-between overflow-hidden">
                <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${category.gradient} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500`} />

                <div>
                  <h3 className="text-3xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-zinc-400 text-lg leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {category.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center text-sm font-medium text-zinc-500 group-hover:text-white transition-colors">
                  <span>Start Learning</span>
                  <svg
                    className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <footer className="fixed bottom-0 w-full p-6 text-center text-zinc-600 text-sm pointer-events-none">
        <p>Engineered for Excellence</p>
      </footer>
    </div>
  );
}
