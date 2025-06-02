export default function Loading() {
  return (
    <div className="relative h-[100dvh] overflow-auto">
      {/* 이미지 스켈레톤 */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gray-300/30 animate-pulse" />

      {/* 본문 스켈레톤 */}
      <div className="absolute top-96 left-1/2 -translate-x-1/2 w-full max-w-[1020px] p-6">
        {/* 제목 */}
        <div className="h-10 bg-gray-300/30 mb-2 animate-pulse rounded w-3/4" />
        {/* 메타 (태그 + 날짜) */}
        <div className="flex gap-4">
          <div className="h-4 bg-gray-300/30 animate-pulse rounded w-2/12" />
          <div className="h-4 bg-gray-300/30 animate-pulse rounded w-1/12" />
        </div>
        {/* 본문 텍스트 블록 */}
        <div className="space-y-2 mt-8">
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-4/6" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-3/5" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-2/3" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-4/5" />
          <div className="mb-6" />
          <div className="h-10 mb-4 bg-gray-300/30 animate-pulse rounded w-2/12" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-4/6" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-3/5" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-2/3" />
          <div className="h-5 bg-gray-300/30 animate-pulse rounded w-4/5" />
        </div>
      </div>
    </div>
  );
}
