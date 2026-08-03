import { Bookmark, Tags, BarChart2 } from "lucide-react";

const features = [
  {
    name: "Track Your Journey",
    description:
      "Categorize your books into intuitive reading statuses: 'Want to Read', 'Reading', or 'Completed'.",
    icon: Bookmark,
    bgGradient: "from-white/10 via-white/5 to-transparent",
    borderGradient: "from-blue-300/50 to-purple-300/50",
    iconBg: "from-blue-400 to-blue-300",
    iconColor: "text-white",
    glowColor: "shadow-blue-400/30",
  },
  {
    name: "Organize with Ease",
    description:
      "Add books by easily specifying the title, author, and custom tags, making your collection perfectly searchable.",
    icon: Tags,
    bgGradient: "from-white/10 via-white/5 to-transparent",
    borderGradient: "from-purple-300/50 to-pink-300/50",
    iconBg: "from-purple-400 to-pink-400",
    iconColor: "text-white",
    glowColor: "shadow-purple-400/30",
  },
  {
    name: "Insights at a Glance",
    description:
      "View dynamic dashboard metrics that display the total number of books in your collection right alongside your lists.",
    icon: BarChart2,
    bgGradient: "from-white/10 via-white/5 to-transparent",
    borderGradient: "from-green-300/50 to-cyan-300/50",
    iconBg: "from-cyan-400 to-emerald-400",
    iconColor: "text-white",
    glowColor: "shadow-cyan-400/30",
  },
];

export function CoreFeatures() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">

      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-2xl text-center">
        <div className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold tracking-widest text-gray-900 backdrop-blur-sm ring-1 ring-white/20 uppercase">
          Why use BookManager?
        </div>
        <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
          Your books, <br />
          <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 bg-clip-text text-transparent">
            beautifully organized.
          </span>
        </h2>
        <p className="mt-6 text-lg leading-8 text-blue-100 max-w-xl mx-auto">
          A quiet space to reflect on your reading habits without the clutter of
          social feeds or complex algorithms.
        </p>
      </div>

      {/* 3-Column Feature Grid */}
      <div className="relative mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-6 lg:max-w-none lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={feature.name}
              className={`group relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${feature.bgGradient} p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl ${feature.glowColor}`}
              style={{
                border: "1px solid",
                borderImage: `linear-gradient(135deg, ${feature.borderGradient}) 1`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div
                className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${feature.borderGradient} opacity-20 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-40`}
              />

              <dt className="relative flex items-center gap-x-4 text-lg font-bold leading-7 text-white">
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.iconBg} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <div className="absolute inset-0 rounded-xl bg-white/20 blur-sm" />
                  <feature.icon
                    className={`relative h-6 w-6 ${feature.iconColor}`}
                    aria-hidden="true"
                  />
                </div>

                <span className="relative">{feature.name}</span>
              </dt>

              <dd className="relative mt-4 flex flex-auto flex-col text-base leading-7 text-blue-100/80">
                <p className="flex-auto">{feature.description}</p>
                <div className="mt-6 h-0.5 w-12 bg-gradient-to-r from-white/20 to-transparent transition-all duration-500 group-hover:w-full group-hover:from-white/40" />
              </dd>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
