import Link from "next/link";

export default function Home() {
  const languageCategories = [
    {
      id: "c",
      title: "C Language",
      description: "Pointers, Structs, and Memory.",
      gradient: "from-blue-600 to-cyan-500",
    },
    {
      id: "java",
      title: "Java",
      description: "OOP, Inheritance, and Streams.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: "python",
      title: "Python",
      description: "Data Structures & Algorithms.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: "sql",
      title: "SQL",
      description: "Queries, Joins, and DDL.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            2026 정보처리기사 실기
          </h1>
        </div>

        {/* Section 1: Practice Tests */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">
            연습문제
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {languageCategories.map((category) => (
              <Link
                key={category.id}
                href={`/learn/${category.id}`}
                className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-zinc-800 p-6 pointer-events-auto transition-all hover:border-zinc-600 hover:-translate-y-1 block"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${category.gradient} opacity-10 blur-[60px] group-hover:opacity-20 transition-opacity`} />

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-zinc-500 text-sm mb-6">
                  {category.description}
                </p>

                <div className="flex items-center text-xs font-bold text-zinc-600 uppercase tracking-widest group-hover:text-white transition-colors">
                  Start Practice →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Section 2: Lecture Notes */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-amber-500 pl-4">
            강의 자료
          </h2>
          <Link
            href="/lectures"
            className="group relative overflow-hidden rounded-2xl bg-[#0a0a0a] border border-zinc-800 p-8 md:p-12 block transition-all hover:border-amber-900/50 hover:bg-amber-950/5"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500 to-yellow-500 opacity-5 blur-[100px] group-hover:opacity-10 transition-opacity" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  강의 자료
                </h3>
              </div>

              <div className="px-6 py-3 rounded-full bg-amber-500/10 text-amber-500 font-bold border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-all">
                View All Notes
              </div>
            </div>
          </Link>
        </div>

      </div>

      <footer className="fixed bottom-0 w-full p-6 text-center text-zinc-800 text-xs pointer-events-none">
        <p>2026 Exam Prep</p>
      </footer>
    </div>
  );
}
