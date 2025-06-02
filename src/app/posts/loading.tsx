export default function Loading() {
  return (
    <section className="max-w-[1280px] p-10 mx-auto pt-40 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="h-96 rounded-lg overflow-hidden bg-gray-200/20 animate-pulse backdrop-blur-2xl"
          >
            {/* 이미지 영역 */}
            <div className="w-full h-1/2 bg-gray-300/20" />
            {/* 텍스트 영역 */}
            <div className="p-4 flex flex-col justify-between h-1/2">
              <div className="space-y-2">
                <div className="w-1/4 h-3 bg-gray-300/20 rounded" />
                <div className="w-3/4 h-6 bg-gray-300/20 rounded" />
                <div className="h-4 bg-gray-300/20 rounded w-full" />
                <div className="h-4 bg-gray-300/20 rounded w-5/6" />
              </div>
              <div className="w-1/6 h-3 bg-gray-300/20 rounded self-end" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
