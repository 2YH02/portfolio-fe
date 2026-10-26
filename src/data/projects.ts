export type Members = { pm?: number; ui?: number; fe?: number; be?: number };

export type Section = {
  title: string;
  description: string;
  items: string[];
  result?: string;
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
}

export const projects: Project[] = [
  {
    id: 5,
    title: "PagerWho",
    category: "인시던트 대응 서비스",
    thumbnail: "/projects/pagerwho-refined-cover.webp",
    thumbnailAlt: "PagerWho의 예시 인시던트와 에스컬레이션 화면",
    teamSize: 2,
    role: "풀스택 · 공동 개발",
    contribution: "운영 화면, 서비스 에이전트, Workflow Canvas UX, 분석 이벤트와 E2E 검증, AI 개발 하네스를 담당했습니다.",
    repository: [],
    repositoryPrivate: true,
    deployUrl: "https://pagerwho.com",
    period: "2026.06 ~ 현재",
    techStack: ["React", "TypeScript", "Vite", "Express", "PostgreSQL", "Prisma", "Playwright", "Ollama", "Amplitude"],
    tagline: "장애 알림부터 담당자 호출, 에스컬레이션과 해결까지 관리하는 서비스",
    highlights: [
      "Incident·Service·Operations 화면 개발",
      "Ollama 기반 서비스 에이전트와 문서 검색 fallback",
      "Workflow Canvas UX 개선 및 주요 흐름 E2E 검증",
    ],
    description: "모니터링 알림을 인시던트로 만들고 상태·담당자·서비스·알림을 관리하는 서비스입니다. 온콜 담당자에게 알림을 보내고, 응답이 없으면 다음 담당자에게 에스컬레이션합니다.",
    sections: [
      {
        title: "운영 화면과 인시던트 대응",
        description: "Incident, Service, Operations에 나뉜 정보를 확인하고 대응할 수 있도록 화면을 구성했습니다.",
        items: [
          "인시던트 상세에 상태, 담당자, 타임라인과 알림 정보를 배치하고 주요 대응 액션을 연결했습니다.",
          "Amplitude의 페이지·클릭 자동 수집과 incident_created 이벤트를 연결했습니다.",
          "Playwright로 인시던트 생성·대응, 웹훅, 에스컬레이션, 온콜과 모바일 주요 흐름을 검증했습니다.",
        ],
      },
      {
        title: "서비스 에이전트",
        description: "Ollama 기반 모델로 서비스 사용법과 운영 절차를 안내합니다. 모델이 응답하지 않을 때는 문서 검색 결과로 안내를 이어가도록 구성했습니다.",
        items: [
          "답변, 추가 정보 요청, 실행 계획과 실행 결과를 구분하고, 데이터 변경 제안은 승인 카드로 표시했습니다.",
          "작업 대상 프로젝트와 응답·실행 상태를 표시하고 실패한 결과도 확인할 수 있도록 했습니다.",
          "키보드 포커스 이동, Esc 닫기, 스크린리더 알림과 움직임 감소 설정을 적용했습니다.",
        ],
      },
      {
        title: "Workflow Canvas",
        description: "노드를 드래그할 때 다른 노드까지 다시 그려지던 문제와 연결·자동 정렬 동작을 개선했습니다.",
        items: [
          "드래그 중 화면 상태는 React Flow의 useNodesState로 관리하고, 드래그가 끝날 때 저장용 폼에 위치를 반영했습니다.",
          "연결 규칙을 드래그 중에 검사하고 연결점과 판정 범위를 넓혔습니다.",
          "BFS로 연결 깊이를 계산해 노드를 왼쪽에서 오른쪽으로 정렬했습니다.",
        ],
      },
      {
        title: "AI 개발 하네스",
        description: "여러 기능을 함께 개발하면서 변경 범위와 검증 기준을 놓치지 않도록 프로젝트 전용 개발 지침을 구성했습니다.",
        items: [
          "Planner·Implementer·Reviewer 역할을 나누고 구현 전에 변경 범위와 완료 조건을 정의했습니다.",
          "구현 후 diff 리뷰와 편집 후 검사 Hook으로 변경을 확인했습니다.",
          "파일 수정 시 lint와 typecheck를 실행하고, 범위 밖 작업은 별도 이슈로 분리했습니다.",
        ],
      },
    ],
    additionalWork: [],
  },
  {
    id: 1,
    title: "대한민국 철봉 지도",
    category: "지도 서비스",
    thumbnail: "/projects/pullup-refined-cover.webp",
    thumbnailAlt: "철봉 지도의 지도와 주변 철봉 목록",
    members: { fe: 1, be: 1 },
    role: "프론트엔드",
    contribution: "지도 UI와 클러스터러 개발, Next.js 전환, SEO와 이미지 업로드 개선을 담당했습니다.",
    repository: ["https://github.com/2YH02/k-pullup"],
    deployUrl: "https://www.k-pullup.com",
    techStack: ["Next.js", "TypeScript", "Zustand", "TanStack Query", "Tailwind CSS", "Storybook"],
    tagline: "전국의 철봉 위치를 찾고 등록하는 지도 서비스",
    highlights: [
      "직접 구현한 클러스터러로 CPU 사용률 100% → 30%",
      "Next.js 전환 후 초기 로딩 6.3초 → 2.3초",
      "검색 메타데이터·사이트맵 개선",
    ],
    description: "주변 철봉의 위치, 사진과 거리뷰를 확인하고 새 장소를 등록할 수 있는 서비스입니다. 즐겨찾기, 댓글과 위치 공유 기능을 제공합니다.",
    sections: [
      {
        title: "지도 클러스터링",
        description: "5,000개 이상의 마커를 표시하면서 지도 탐색이 끊겼습니다. 카카오 지도 기본 클러스터러를 적용한 뒤에도 CPU 사용률이 높아 직접 구현한 클러스터러로 교체했습니다.",
        items: [
          "하버사인 공식으로 지도 중심에서 일정 범위 안의 위치만 연산·표시했습니다.",
          "Grid 기반 알고리즘으로 마커를 묶어 클러스터링 연산을 줄였습니다.",
        ],
        result: "당시 측정한 CPU 사용률이 100% 수준에서 최대 30% 수준으로 낮아졌고 지도 탐색 중 멈춤 현상을 줄였습니다.",
      },
      {
        title: "초기 로딩과 검색 노출",
        description: "첫 화면에 필요하지 않은 코드를 지연 로딩하고, React CSR 구조를 Next.js SSR로 전환했습니다.",
        items: [
          "React.lazy로 코드를 분할한 뒤 초기 로딩이 6,343ms에서 5,776ms로 줄었습니다. Next.js 전환 후에는 2,330ms로 기록됐습니다.",
          "페이지별 메타데이터와 동적 사이트맵을 구성해 검색 엔진에 제출했습니다.",
        ],
        result: "전환 후 검색 지표는 평균 게재 순위 6위 → 1위, 클릭 수 80% 증가, 노출 수 100% 증가로 기록됐습니다.",
      },
    ],
    additionalWork: [
      "Canvas API로 업로드 이미지를 압축하고 포맷을 변환했습니다. 이 기능을 img-toolkit으로 분리해 배포했습니다.",
      "모바일 사용성을 위해 PWA를 도입했고, 이후 React Native Expo 기반 WebView 앱으로 전환했습니다.",
      "Tailwind CSS 기반 공통 UI를 라이브러리로 만들고 CLI로 가져올 수 있도록 구성했습니다.",
    ],
  },
  {
    id: 4,
    title: "img-toolkit",
    category: "이미지 처리 라이브러리",
    thumbnail: "/projects/img-toolkit-refined-cover.webp",
    thumbnailAlt: "img-toolkit의 이미지 업로드와 변환 옵션",
    members: null,
    role: "라이브러리 개발",
    contribution: "Canvas 기반 이미지 처리, Rust·WebAssembly 구현과 npm 배포를 담당했습니다.",
    repository: ["https://github.com/2YH02/img-toolkit", "https://github.com/2YH02/img-toolkit-rust"],
    deployUrl: "https://2yh02.github.io/img-toolkit",
    techStack: ["TypeScript", "Canvas API", "Rust", "WebAssembly", "Vite"],
    tagline: "브라우저에서 이미지를 압축하고 포맷을 변환하는 라이브러리",
    highlights: [
      "업로드 전 이미지 압축·포맷 변환",
      "철봉 지도의 이미지 처리 코드를 npm 패키지로 분리",
      "기존 API를 유지한 Rust·WebAssembly 구현",
    ],
    description: "서버에 업로드하기 전에 브라우저에서 이미지 용량을 줄이는 라이브러리입니다. 철봉 지도에서 사용하던 코드를 분리해 npm에 배포했습니다.",
    sections: [
      {
        title: "Canvas 기반 이미지 처리",
        description: "브라우저에서 이미지 크기와 포맷을 바꿔 서버로 전송하는 데이터 용량을 줄였습니다.",
        items: [
          "Canvas API로 이미지 크기 조정과 압축·포맷 변환을 구현했습니다.",
          "서비스에 묶여 있던 코드를 독립 패키지로 분리하고 압축률을 설정할 수 있는 API를 제공했습니다.",
        ],
      },
      {
        title: "Rust·WebAssembly 구현",
        description: "Canvas 기반 압축보다 이미지 품질을 세밀하게 제어하기 위해 Rust·WebAssembly로 구현을 확장했습니다.",
        items: [
          "Rust로 이미지 압축 기능을 작성하고 WebAssembly를 통해 브라우저에서 사용하도록 연결했습니다.",
          "기존 JavaScript API를 유지해 사용하는 쪽의 코드 변경을 줄였습니다.",
        ],
      },
    ],
    additionalWork: [],
  },
  {
    id: 0,
    title: "포트폴리오 및 블로그",
    category: "개인 웹사이트",
    thumbnail: "/projects/portfolio-refined-cover.webp",
    thumbnailAlt: "포트폴리오 홈의 소개 문구와 원형 효과",
    members: null,
    role: "풀스택",
    contribution: "Next.js 프론트엔드, Rust API, PostgreSQL과 개발·배포 환경을 구성했습니다.",
    repository: ["https://github.com/2YH02/portfolio-fe", "https://github.com/2YH02/portfolio-be"],
    deployUrl: "https://www.yonghun.me",
    techStack: ["Next.js", "TypeScript", "Rust", "Actix Web", "PostgreSQL", "Docker Compose", "Tailwind CSS", "Zustand"],
    tagline: "프로젝트와 기술 글을 정리하는 개인 포트폴리오",
    highlights: [
      "Next.js 프론트엔드·Rust API 개발",
      "프로젝트 SSG·블로그 상세 ISR 적용",
      "글 작성·이미지 업로드·코드 하이라이팅",
    ],
    description: "개인 프로젝트와 기술 글을 공유하는 포트폴리오 겸 블로그입니다. Next.js 프론트엔드와 Rust·Actix Web API, PostgreSQL로 구성했습니다.",
    sections: [
      {
        title: "페이지 렌더링과 데이터 조회",
        description: "변경 주기가 다른 프로젝트 소개와 블로그 글에 각각 SSG와 ISR을 적용했습니다.",
        items: [
          "프로젝트 상세는 빌드 시 정적으로 생성하고, 블로그 상세는 ISR로 갱신합니다.",
          "Rust API에 OFFSET/LIMIT 기반 페이지네이션을 구현했습니다.",
          "페이지별 메타데이터와 동적 사이트맵을 구성했습니다.",
        ],
      },
      {
        title: "글 작성과 본문 표시",
        description: "Markdown 편집기와 실시간 미리보기를 제공하고, 기존 Quill로 작성한 글도 표시할 수 있도록 구성했습니다.",
        items: [
          "Supabase Storage로 이미지를 업로드하고 대표 이미지의 blur 데이터를 생성했습니다.",
          "Markdown과 Quill HTML을 렌더링하고 highlight.js로 코드 블록을 강조했습니다.",
        ],
      },
    ],
    additionalWork: [
      "Docker Compose로 Rust API와 PostgreSQL 로컬 개발 환경을 구성했습니다.",
      "GitHub Actions로 백엔드 테스트를 실행하고 Railway 자동 배포를 연결했습니다.",
      "Framer Motion으로 홈 인터랙션과 프로젝트 이미지 전환을 구현했습니다.",
    ],
  },
];
