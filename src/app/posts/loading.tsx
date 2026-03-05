export default function Loading() {
  return (
    <section className="max-w-[1000px] px-8 mx-auto pt-36 pb-10">
      <div className="mb-6">
        <div className="w-24 h-8 bg-gray-300/20 rounded animate-pulse mb-2" />
        <div className="w-16 h-4 bg-gray-300/20 rounded animate-pulse" />
      </div>
      <div className="flex gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-6 bg-gray-300/20 rounded-full animate-pulse"
          />
        ))}
      </div>
      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0 flex flex-col gap-3">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="h-36 rounded-2xl overflow-hidden bg-gray-200/20 animate-pulse backdrop-blur-2xl flex"
            >
              <div className="w-44 h-full bg-gray-300/20 shrink-0" />
              <div className="flex-1 p-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-1/4 h-3 bg-gray-300/20 rounded" />
                  <div className="w-3/4 h-4 bg-gray-300/20 rounded" />
                </div>
                <div className="w-1/6 h-3 bg-gray-300/20 rounded self-end" />
              </div>
            </div>
          ))}
        </div>
        <div className="hidden lg:block w-64 shrink-0">
          <div className="rounded-2xl bg-gray-200/20 animate-pulse backdrop-blur-2xl p-4 space-y-4">
            <div className="w-16 h-3 bg-gray-300/20 rounded" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-6 h-5 bg-gray-300/20 rounded shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 bg-gray-300/20 rounded w-full" />
                  <div className="h-3 bg-gray-300/20 rounded w-4/5" />
                  <div className="h-2.5 bg-gray-300/20 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
