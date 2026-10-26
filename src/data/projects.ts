export type Members = { pm?: number; ui?: number; fe?: number; be?: number };

export type Section = {
  title: string;
  context: string;
  decision: string;
  implementation: string[];
  outcome: string;
};

export interface Project {
  id: number;
  title: string;
  category: string;
  thumbnail: string;
  thumbnailAlt: string;
  members?: Members | null;
  teamSize?: number;
  role: string;
  contribution: string;
  repository: string[];
  repositoryPrivate?: boolean;
  deployUrl?: string;
  techStack: string[];
  tagline: string;
  highlights: string[];
  description: string;
  period?: string;
  sections: Section[];
  additionalWork: string[];
  reflection: string;
  evidenceNote?: string;
}

export const projects: Project[] = [
  {
    id: 5,
    title: "PagerWho",
    category: "팀 프로젝트 · 인시던트 대응 서비스",
    thumbnail: "/projects/pagerwho-refined-cover.webp",
    thumbnailAlt: "PagerWho 공개 페이지의 예시 인시던트와 에스컬레이션 단계를 바탕으로 제작한 썸네일",
    teamSize: 2,
    role: "풀스택",
    contribution: "워크플로 캔버스의 편집 상태와 연결·정렬 로직, Copilot 프론트엔드 UI와 접근성, 인증 설정 및 로그인 보호를 개선했습니다. Copilot의 답변 생성·실행 백엔드는 팀원이 구현했으며, 해당 작업에서 API 계약과 실행 권한 로직은 변경하지 않았습니다.",
    repository: [],
    repositoryPrivate: true,
    deployUrl: "https://pagerwho.com",
    period: "2026.06 ~ 2026.10",
    techStack: ["React", "Vite", "TanStack Query", "React Flow", "Express", "Prisma", "PostgreSQL", "Docker Compose", "Vitest", "Playwright"],
    tagline: "장애 알림이 묻히지 않도록, 담당자 호출부터 응답과 에스컬레이션까지 연결합니다.",
    highlights: ["캔버스 화면 상태와 저장 상태 분리", "Copilot 승인·실행 UI와 접근성 개선", "인증 secret 분리와 로그인 시도 제한"],
    description: "모니터링 알림을 인시던트로 만들고 온콜 담당자에게 전달하는 서비스입니다. 서비스와 웹훅을 연결하면 중복 알림을 병합하고 Slack·이메일·SMS·전화로 담당자를 호출합니다. 응답이 없으면 다음 담당자에게 에스컬레이션하며, 사용자는 인시던트를 확인하고 해결 상태를 관리합니다.",
    sections: [
      {
        title: "드래그 중 화면 상태와 저장 시점을 분리하기",
        context: "워크플로 노드를 드래그할 때 움직임이 끊기고, 움직이지 않는 다른 노드도 깜빡였습니다. 매 프레임마다 저장용 폼 전체를 갱신하면서 모든 노드가 다시 렌더링되는 구조가 원인이었습니다. 작은 연결점과 흐름을 반영하지 않는 자동 정렬도 편집을 어렵게 했습니다.",
        decision: "드래그 중 화면 상태는 React Flow에 맡기고, 드래그가 끝날 때 위치를 폼에 반영하도록 분리했습니다. 연결 유효성은 조작 중에 확인하고, 자동 정렬은 연결 흐름의 깊이를 기준으로 구성했습니다.",
        implementation: ["useNodesState로 노드의 화면 상태를 관리하고 드래그 종료 시 저장용 폼과 동기화했습니다.", "잘못된 대상에는 연결되지 않도록 드래그 중 연결 규칙을 검사하고, 연결점과 판정 범위를 넓혔습니다.", "BFS로 연결 흐름의 깊이를 계산해 노드를 왼쪽에서 오른쪽으로 배치하도록 자동 정렬을 변경했습니다."],
        outcome: "드래그 중 발생하던 끊김과 다른 노드의 깜빡임을 해소했습니다. 다중 노드 드래그 시 모든 위치를 저장하는 처리와 캔버스 자동 테스트는 추가 개선 과제로 남았습니다.",
      },
      {
        title: "Copilot의 답변과 데이터 변경 제안을 구분하기",
        context: "질문 답변, 추가 정보 요청, 실행 계획과 결과가 한 패널 안에서 비슷하게 표시됐습니다. 사용자는 AI가 지금 무엇을 하는지, 단순히 답변하는 것인지 실제 데이터를 바꾸려는 것인지 구분하기 어려웠습니다.",
        decision: "팀원이 구현한 답변 생성·실행 API와 권한 로직은 유지하면서, 사용자가 상태를 이해하고 승인 여부를 판단하는 프론트엔드 경험을 개선했습니다. 시각적인 구분과 키보드·스크린리더 접근성을 함께 다뤘습니다.",
        implementation: ["사용자 메시지, AI 답변, 실행 계획과 결과를 구분하고 데이터 변경 제안은 별도 승인 카드로 강조했습니다. 헤더에는 작업 대상 프로젝트를 표시했습니다.", "응답 대기와 실행 중 상태를 진행 표시로 보여주고, 성공·실패 결과를 단계별로 표시했습니다.", "dialog 역할, 포커스 트랩, Esc 닫기와 포커스 복귀를 적용했습니다. aria-live로 새 메시지를 알리고, 움직임 감소 설정을 반영했습니다.", "Playwright E2E 4개로 모바일 사용성, 추가 정보 입력 후 계획 표시, 승인 후 결과 표시, 실패 결과 유지 흐름을 검증했습니다."],
        outcome: "답변과 실행 제안을 구분하고, 승인부터 성공·실패까지의 흐름을 UI에서 확인할 수 있도록 바꿨습니다. 키보드와 스크린리더로 패널을 사용할 수 있도록 접근성을 보완했습니다.",
      },
      {
        title: "인증 설정 누락을 안전한 실패로 바꾸기",
        context: "인증 용도별 secret이 분리되지 않았고, 일부 설정이 누락되면 다른 용도의 값이나 코드에 정의된 값으로 대체됐습니다. 로그인 시도 횟수를 제한하는 처리도 필요했습니다.",
        decision: "설정 오류를 대체 값으로 숨기지 않고 실행·배포 단계에서 검증하도록 바꿨습니다. 인증 요청은 IP와 계정 기준을 함께 적용해 반복 시도를 제한했습니다.",
        implementation: ["OIDC와 전화번호 인증의 secret을 용도별로 분리하고 fallback을 제거했습니다. 누락되거나 운영 환경에서 32자 미만이면 실패하도록 했으며 배포 스크립트에도 같은 검증을 넣었습니다.", "로그인·회원가입·비밀번호 재설정 등에 15분 윈도우의 IP·계정 기준 rate limit을 적용하고 초과 요청은 429로 응답하도록 했습니다."],
        outcome: "인증 설정이 잘못된 상태로 계속 동작하는 대신 문제를 조기에 드러내도록 변경했습니다. 메모리 기반 제한의 인스턴스 간 공유와 프록시를 거친 클라이언트 IP 처리 검증은 운영 환경에서 추가로 다뤄야 할 범위입니다.",
      },
    ],
    additionalWork: ["develop은 개발 환경, main은 운영 환경으로 자동 배포하도록 구성했습니다. 운영 배포는 secret 검증 → DB 마이그레이션 → 헬스 체크 순서로 진행합니다.", "첫 인시던트 온보딩에 테스트 단계를 추가하고, 실제 웹훅 테스트로 생성된 인시던트만 완료로 인정하도록 기존 흐름을 재사용했습니다.", "Docker Compose·nginx 기반 구성을 GitHub Actions, Hetzner, Cloudflare와 연결해 개발·운영 환경을 관리했습니다."],
    reflection: "AI와 협업하는 작업도 계획 → 사람 승인 → 구현 → diff 기준 리뷰 → 커밋 승인으로 단계를 나눴습니다. 파일 수정 시 lint와 typecheck가 자동 실행되도록 하고, 최신 develop에서 브랜치를 만들기, 범위 밖 문제는 별도 이슈로 분리하기, PR에 검증 명령과 연결 이슈를 적기 같은 규칙을 운영 경험에 따라 정리했습니다.",
    evidenceNote: "소스 저장소는 비공개입니다. 캔버스 개선은 정성적으로 확인한 결과이며 성능 수치를 별도로 제시하지 않습니다. Copilot UI의 주요 사용자 흐름은 Playwright E2E 4개로 검증했습니다.",
  },
  {
    id: 1,
    title: "대한민국 철봉 지도",
    category: "서비스 운영 · 지도 성능 최적화",
    thumbnail: "/projects/pullup-refined-cover.webp",
    thumbnailAlt: "철봉 지도의 최신 다크모드 지도와 검색·주변 철봉 패널을 겹쳐 배치한 썸네일",
    members: { fe: 1, be: 1 },
    role: "프론트엔드",
    contribution: "지도 마커 처리와 클러스터링, Next.js 전환, 검색 노출 및 이미지 업로드 개선을 담당했습니다.",
    repository: ["https://github.com/2YH02/k-pullup"],
    deployUrl: "https://www.k-pullup.com",
    techStack: ["Next.js", "TypeScript", "Zustand", "TanStack Query", "Tailwind CSS", "Storybook"],
    tagline: "5,000개 이상의 위치 데이터를 다루며, 지도 탐색과 첫 방문 경험을 개선했습니다.",
    highlights: ["지도 클러스터러 직접 구현", "React CSR에서 Next.js SSR로 전환", "업로드 전 브라우저 이미지 압축"],
    description: "전국의 철봉 위치를 찾고 등록하는 지도 서비스입니다. 위치 상세 정보, 사진, 거리뷰, 즐겨찾기와 댓글을 제공합니다. 실제 운영 과정에서 드러난 지도 멈춤과 느린 초기 진입, 검색 노출 문제를 중심으로 개선했습니다.",
    sections: [
      {
        title: "마커를 묶기 전에, 연산할 데이터부터 줄이기",
        context: "5,000개 이상의 위치를 마커로 표시하면서 지도 탐색 중 끊김이 발생했습니다. 카카오 지도 기본 클러스터러를 적용한 뒤에도 CPU 사용률이 높아지고 화면이 일시적으로 멈췄습니다.",
        decision: "기본 클러스터러를 그대로 사용하는 대신, 처리 범위를 제한하고 Grid 기반으로 마커를 묶는 방식으로 변경했습니다. 화면에 표시할 마커 수뿐 아니라 클러스터링 대상 자체를 줄이는 데 초점을 맞췄습니다.",
        implementation: ["하버사인 공식으로 지도 중심에서 일정 범위 안에 있는 위치만 연산·표시하도록 처리했습니다.", "Grid 기반 클러스터러를 직접 구현해 카카오 지도 기본 클러스터러를 대체했습니다."],
        outcome: "기존 기록 기준 CPU 사용률이 100% 수준에서 최대 30% 수준으로 낮아졌고, 지도 탐색 중 멈춤 현상을 완화했습니다.",
      },
      {
        title: "코드 분할에서 렌더링 방식 변경까지",
        context: "초기 진입이 느렸고, 유사 서비스에 비해 검색 노출과 사용자 유입이 적었습니다. 클라이언트 코드의 로딩 비용과 검색 엔진에 제공하는 콘텐츠를 함께 점검했습니다.",
        decision: "먼저 첫 화면에 필요하지 않은 컴포넌트를 지연 로딩했습니다. 이후에도 초기 로딩 개선이 필요해 React CSR 구조를 Next.js SSR로 전환하고 메타데이터와 사이트맵을 정비했습니다.",
        implementation: ["React.lazy 기반 코드 분할을 적용했습니다. 기존 기록에서 스크립트 실행 시간은 993ms → 828ms, 초기 로딩은 6,343ms → 5,776ms로 줄었습니다.", "Next.js 전환 후 페이지별 메타데이터를 설정하고 동적 사이트맵을 생성·제출했습니다."],
        outcome: "Next.js 전환 후 초기 로딩은 2,330ms로 기록됐습니다. 검색 지표도 평균 게재 순위 6위 → 1위, 클릭 수 80% 증가, 노출 수 100% 증가로 기록됐습니다. 검색 변화는 여러 요인이 영향을 주므로 SSR만의 효과로 단정하지 않습니다.",
      },
    ],
    additionalWork: ["Canvas API로 업로드 이미지의 크기와 포맷을 조정하고, 이미지 처리 기능을 img-toolkit으로 분리·배포했습니다.", "모바일 이용 패턴을 바탕으로 PWA를 도입했고, 이후 Next.js 전환 과정에서 React Native Expo 기반 WebView 앱으로 변경했습니다.", "반복해서 사용하는 UI를 Tailwind CSS 기반 컴포넌트 라이브러리로 만들고 CLI로 가져올 수 있도록 구성했습니다."],
    reflection: "운영 중 이미지 업로드와 회원가입 오류가 반복되면서, 배포 후 수정에 의존하던 방식에서 벗어나 테스트 코드 도입을 시작했습니다. 사용자 피드백은 구현 완료 여부만으로는 발견하기 어려운 불편을 드러냈고, 이후 개선 대상을 정하는 중요한 기준이 됐습니다.",
    evidenceNote: "수치는 기존 프로젝트 기록을 옮긴 값입니다. 측정 기기·브라우저·네트워크 조건과 검색 지표 집계 기간이 함께 남아 있지 않아, 동일 조건의 벤치마크로 해석하기에는 한계가 있습니다.",
  },
  {
    id: 4,
    title: "img-toolkit",
    category: "오픈소스 · 브라우저 이미지 처리",
    thumbnail: "/projects/img-toolkit-refined-cover.webp",
    thumbnailAlt: "Image Toolkit Playground의 실제 업로드와 이미지 처리 옵션 UI를 바탕으로 제작한 썸네일",
    members: null,
    role: "라이브러리 설계·개발·배포",
    contribution: "Canvas 기반 이미지 처리 기능을 패키지화하고, 기존 인터페이스를 유지하면서 Rust·WebAssembly 구현으로 확장했습니다.",
    repository: ["https://github.com/2YH02/img-toolkit", "https://github.com/2YH02/img-toolkit-rust"],
    deployUrl: "https://2yh02.github.io/img-toolkit",
    techStack: ["TypeScript", "Canvas API", "Rust", "WebAssembly", "Vite"],
    tagline: "서비스의 이미지 업로드 문제를, 재사용 가능한 브라우저 라이브러리로 풀었습니다.",
    highlights: ["서비스 코드에서 이미지 처리 기능 분리", "Canvas 기반 압축·포맷 변환", "기존 API를 유지한 Rust·WASM 확장"],
    description: "서버에 업로드하기 전에 브라우저에서 이미지 용량을 줄이는 라이브러리입니다. 철봉 지도에서 사용하던 이미지 처리 기능을 다른 프로젝트에서도 사용할 수 있도록 분리하고 npm에 배포했습니다.",
    sections: [
      {
        title: "업로드 비용을 브라우저에서 먼저 줄이기",
        context: "원본 이미지를 그대로 업로드하면 전송할 데이터가 커집니다. 서비스에서 사용하던 이미지 처리 코드를 다른 프로젝트에서도 반복해서 구현하지 않고 재사용할 필요가 있었습니다.",
        decision: "서버 전송 전에 Canvas API로 이미지를 처리하는 기능을 독립 라이브러리로 분리했습니다. 사용하는 쪽에서는 간단한 API로 압축률을 설정하도록 구성했습니다.",
        implementation: ["클라이언트에서 이미지 크기를 조정하고 출력 포맷을 변경하는 기능을 구현했습니다.", "이미지 처리 로직을 패키지로 구성해 npm에 배포하고 서비스에서 사용했습니다."],
        outcome: "특정 서비스에 묶여 있던 이미지 처리 기능을 재사용 가능한 패키지로 제공했습니다. 용량 감소 폭은 입력 이미지와 설정에 따라 달라집니다.",
      },
      {
        title: "호출 방식은 유지하고, 처리 구현을 확장하기",
        context: "Canvas 기반 구현을 사용하면서 이미지 품질을 더 세밀하게 제어할 필요를 느꼈습니다.",
        decision: "Rust와 WebAssembly로 이미지 처리 구현을 확장하되, 기존 JavaScript 라이브러리의 인터페이스를 유지하는 방향을 선택했습니다.",
        implementation: ["Rust·WebAssembly 기반 이미지 압축 구현을 별도 저장소에서 개발했습니다.", "기존 인터페이스를 유지해 사용하는 코드의 변경 부담을 줄였습니다."],
        outcome: "브라우저 이미지 처리에 Rust·WebAssembly를 연결하는 경험을 쌓았습니다. 구현 간 품질·속도 차이를 수치로 비교한 벤치마크는 이 포트폴리오에 포함하지 않았습니다.",
      },
    ],
    additionalWork: ["라이브러리를 직접 npm에 배포하고 오픈소스 저장소로 관리했습니다."],
    reflection: "서비스 안에서 동작하는 기능을 외부에서 사용할 패키지로 옮기면서, 내부 구현만큼 호출 인터페이스의 일관성이 중요해졌습니다. Rust·WebAssembly로 구현을 바꿀 때도 기존 API를 유지하는 것을 기준으로 삼았습니다.",
  },
  {
    id: 0,
    title: "포트폴리오 및 블로그",
    category: "풀스택 · 콘텐츠 서비스",
    thumbnail: "/projects/portfolio-refined-cover.webp",
    thumbnailAlt: "포트폴리오 홈의 실제 원형 마우스 반응 효과와 소개 문구를 바탕으로 제작한 썸네일",
    members: null,
    role: "풀스택",
    contribution: "Next.js 프론트엔드, Rust·Actix Web API, PostgreSQL과 개발·배포 환경을 직접 구성했습니다.",
    repository: ["https://github.com/2YH02/portfolio-fe", "https://github.com/2YH02/portfolio-be"],
    deployUrl: "https://www.yonghun.me",
    techStack: ["Next.js", "TypeScript", "Rust", "Actix Web", "PostgreSQL", "Docker Compose", "Tailwind CSS", "Zustand"],
    tagline: "글을 작성하고 전달하는 흐름을 프론트엔드부터 API와 배포까지 직접 구성했습니다.",
    highlights: ["Next.js와 Rust API로 콘텐츠 흐름 구성", "페이지 특성에 맞춘 SSG·ISR 적용", "Docker Compose와 테스트·배포 자동화"],
    description: "프로젝트 경험과 기술 글을 함께 공유하는 개인 웹사이트입니다. 방문자가 읽는 페이지뿐 아니라 글 작성, 이미지 저장, API 응답과 배포까지 콘텐츠 서비스의 전체 흐름을 직접 다뤘습니다.",
    sections: [
      {
        title: "콘텐츠 성격에 따라 전달 방식을 나누기",
        context: "프로젝트 소개와 블로그 글은 변경 주기와 데이터 출처가 다릅니다. 게시글이 늘어날 때 전체 데이터를 한 번에 받아오는 부담도 고려해야 했습니다.",
        decision: "프로젝트 상세는 정적 생성하고 블로그 글 상세는 ISR을 적용했습니다. 게시글 목록은 백엔드에서 페이지 단위로 제공하도록 구성했습니다.",
        implementation: ["Rust API에 OFFSET/LIMIT 기반 페이지네이션을 구현했습니다.", "Next.js에서 프로젝트 상세 SSG와 블로그 상세 ISR을 적용하고, 페이지별 메타데이터와 동적 사이트맵을 구성했습니다."],
        outcome: "변경이 적은 프로젝트 소개와 갱신이 필요한 블로그 글에 서로 다른 렌더링 전략을 적용했습니다. 페이지네이션으로 목록 조회 범위를 나눴습니다.",
      },
      {
        title: "작성부터 저장·표시까지 이미지 흐름 연결하기",
        context: "블로그 편집기에 이미지를 넣는 기능만으로는 업로드 대기와 본문 렌더링까지 다루기 어려웠습니다. 저장된 콘텐츠가 사이트의 스타일과 일관되게 표시되어야 했습니다.",
        decision: "Quill 기반 편집기를 커스터마이징하고, 이미지 저장은 Supabase Storage에 연결했습니다. 저장된 HTML을 표시하는 렌더링 경로도 함께 구성했습니다.",
        implementation: ["이미지 업로드 중 로딩 UI, 저장·삭제 처리와 대표 이미지 blur 데이터 생성을 구현했습니다.", "HTML 콘텐츠 렌더링과 highlight.js 코드 블록 하이라이팅을 적용했습니다."],
        outcome: "글 작성, 이미지 저장과 삭제, 본문 표시를 하나의 흐름으로 연결했습니다. 코드 블록과 이미지도 사이트의 스타일 안에서 표시하도록 구성했습니다.",
      },
    ],
    additionalWork: ["Docker Compose로 Rust API와 PostgreSQL 로컬 개발 환경을 구성했습니다.", "GitHub Actions로 백엔드 테스트를 자동화하고 Railway의 main 브랜치 자동 배포를 연결했습니다.", "Framer Motion 인터랙션과 이미지 blur placeholder를 적용했습니다."],
    reflection: "글 CRUD를 직접 연결하면서 데이터베이스와 API 응답 설계가 프론트엔드의 상태 처리와 렌더링 방식으로 이어진다는 점을 경험했습니다. 로컬 실행 환경과 테스트를 자동화하는 작업도 서비스 기능 개발의 일부로 다뤘습니다.",
  },
];
