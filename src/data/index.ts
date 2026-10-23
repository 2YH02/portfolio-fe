export type Members = {
  pm?: number;
  ui?: number;
  fe?: number;
  be?: number;
};

export type SectionContent = {
  problem?: string[];
  solution?: string[];
  text?: string[];
};

export type Section = {
  title: string;
  titleSum?: string;
  summary: string[];
  content: SectionContent;
};

export interface Project {
  id: number;
  title: string;
  thumbnail: string;
  members?: Members | null;
  role: string;
  repository: string[];
  deployUrl?: string;
  techStack: string[];
  tagline: string;
  highlights: string[];
  description: string;
  period?: string;
  sections?: Section[];
  reflection: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "대한민국 철봉 지도",
    thumbnail: "/pullup.png",
    members: {
      fe: 1,
      be: 1,
    },
    role: "프론트엔드",
    repository: ["https://github.com/2YH02/k-pullup"],
    deployUrl: "https://www.k-pullup.com",
    techStack: [
      "Next.js",
      "Typescript",
      "Zustand",
      "TanStackQuery",
      "TailwindCSS",
      "Storybook",
    ],
    tagline: "전국의 철봉 위치를 지도에서 찾고, 등록하고, 공유하는 서비스",
    highlights: [
      "Grid 기반 클러스터러 직접 구현으로 CPU 점유율 100% → 30%",
      "Next.js SSR 전환 후 구글 평균 게재 순위 6위 → 1위",
      "초기 로딩 시간 6.3s → 2.3s (약 60% 단축)",
    ],
    description:
      "사용자가 지도에서 원하는 위치를 검색하여 주변의 철봉 위치를 확인할 수 있고, 발견한 철봉을 지도에 등록하는 기능을 제공합니다. 사용자는 등록된 철봉의 상세 정보, 사진, 거리뷰를 조회할 수 있으며, 즐겨찾기 기능을 통해 특정 위치를 저장하고 관리할 수 있습니다. 또한, 각 철봉 위치에 대한 댓글을 작성, 위치 공유를 통해 다른 사용자와 정보를 공유할 수 있습니다.",
    sections: [
      {
        title: "카카오 지도 클러스터러 직접 구현 및 성능 최적화",
        titleSum: "클러스터러 최적화",
        summary: [
          "여러 위치에 대한 클러스터링 기능을 Grid-Based 클러스터링 알고리즘을 사용해 직접 구현하여 최적화",
        ],
        content: {
          problem: [
            "서버에서 5,000개 이상의 위치 데이터를 받아 카카오 지도 API를 통해 마커를 표시하였습니다.",
            "표시되는 마커 수가 너무 많아 지도를 탐색할 때 버벅임이 발생하였습니다.",
            "카카오 지도 API에서 제공하는 클러스터러를 적용하여도 연산량 자체가 많아져 CPU 점유율이 100%를 넘기며 화면이 잠깐씩 멈추는 문제가 발생했습니다.",
          ],
          solution: [
            `
          이를 개선하기 위해 하버사인 공식을 활용해 지도의 중심을 기준으로 특정 범위 내의 마커만 연산·표시하도록 처리하였고, 시간복잡도가 낮은 Grid-Based 클러스터링 알고리즘을 사용해 
          클러스터러를 직접 구현하여 카카오 지도 API의 클러스터러를 대체했습니다.
          `,
            `
          그 결과 CPI 점유율이 최대 30% 수준으로 안정화되었고, 사용자 경험도 크게 향상되었습니다.
          `,
          ],
        },
      },
      {
        title: "기존 React에서 Next.js로 변경 및 SEO 최적화",
        titleSum: "SEO 최적화",
        summary: [
          "Next.js(SSR)로 변경 및 메타데이터 최적화 수행",
          "구글 평균 게재순위 6등애서 1등으로 상승",
          "총 클릭수 80% 상승",
          "총 노출 수 100% 상승",
        ],
        content: {
          problem: [
            `
          비슷한 서비스를 제공하는 다른 사이트들의 비해 검색엔진 노출과 사용자 유입이 적은것을 확인했습니다.
          `,
          ],
          solution: [
            `
          기존 React로 CSR이 적용되어 있던 프로젝트를 Next.js로 변경하여 SSR을 적용하였습니다.
          `,
            `
          각 페이지의 메타데이터를 적절하게 설정하고, 동적 사이트맵을 생성하여 제출하였습니다.
          `,
            `
          그 결과 기존 대비 구글 평균 게재 순위가 6등에서 1등으로 상승, 총 클릭수 80% 증가,  총 노출 수 100% 증가하였습니다.
          `,
          ],
        },
      },
      {
        title: "초기 로딩 시간 단축",
        summary: [
          "React의 lazy함수를 사용한 코드 스플리팅",
          "SSR 적용",
          "초기 로딩시간 6343ms에서 2330ms으로 약 60% 개선",
        ],
        content: {
          problem: [
            `
          기존 React 프로젝트에서 첫 화면에 로드되는 컨텐츠가 많아 첫 페이지 로딩 시간이 길어지는 문제를 확인했습니다.
          `,
          ],
          solution: [
            `
          우선 React의 lazy함수를 사용해 첫 화면에 필요하지 않은 컴포넌트들을 지연 로딩하는 코드 스플리팅 기술을 적용하였습니다.
          `,
            `
          그 결과 스크립트 실행 시간을 993ms에서 828ms로 약 17% 단축되었고, 첫 페이지 로딩 시간도 6,343ms에서 5,776ms로 약 9% 개선되었습니다.
          `,
            `
          하지만 여전히 느린 로딩 시간을 인식하고 프로젝트를 Next.js로 변경하여 SSR을 적용하면서 로딩시간을 2,330ms로 총 약 60% 개선하였습니다.
          `,
          ],
        },
      },
      {
        title: "모바일 사용성 확장",
        summary: ["PWA 도입", "React Native Expo 기반 WebView 도입"],
        content: {
          problem: [
            `
          Google Analytics 분석 결과, 웹보다 모바일에서 사용하는 사용자가 약 70% 더 많은 것으로 나타났습니다.
          `,
          ],
          solution: [
            `
          모바일 사용성을 높이기 위해 PWA를 도입하였고, User Agent를 활용해 접속 브라우저(카카오, Safari, Chrome 등)를 식별한 뒤 
          PWA 설치를 유도하는 안내 창을 노출하도록 구현했습니다.
          `,
            `
          이후 프로젝트를 Next.js로 전환하면서 기존 PWA는 제거하고, React Native Expo 기반의 WebView 앱을 도입하였습니다.
          `,
          ],
        },
      },
      {
        title: "이미지 용량 감소를 위한 접근",
        summary: ["JavaScript의 Canvas API를 활용한 이미지 압축 구현"],
        content: {
          problem: [
            `
          서비스에 거리뷰 기능을 도입하면서 기존 정보로 제공하던 이미지 해상도의 중요도가 낮아졌다고 판단하였습니다.
          `,
          ],
          solution: [
            `
          이미지 해상도 감소는 감안하고 서비스의 로딩 속도와 사용자 경험 향상을 위해 이미지 용량을 줄이는 전략을 채택하였습니다.
          `,
            `
          JavaScript의 Canvas API를 활용하여 사용자가 업로드하는 이미지의 크기를 실시간으로 80% 줄이고, 이미지 형식을 Webp로 변경하는 기능을 구현했습니다.
          `,
            `
          이를 통해 서버로의 데이터 전송 시간을 단축하였고, 페이지 로딩 속도를 개선하는 데 기여했습니다.
          `,
          ],
        },
      },
      {
        title: "라이브러리 개발 경험",
        summary: [
          "이미지 압축 라이브러리인 img-toolkit 개발·배포",
          "UI 라이브러리인 radici-ui 개발·배포",
        ],
        content: {
          text: [
            `
          프로젝트에서 사용하는 Canvas API를 활용한 이미지 압축 기능을 패키지화 하여 img-toolkit이라는 라이브러리를 개발하고 배포하여 사용하였습니다.
          `,
            `
          UI 일관성 및 개발 효율성 향상을 위해 Tailwind CSS 기반 React 컴포넌트 라이브러리를 제작하였고, 
          필요한 컴포넌트만 지정해 가져올 수 있도록 CLI기반으로 저장소에서 가져올 수 있도록 개발하였습니다.
          `,
          ],
        },
      },
    ],
    reflection: `프로젝트를 실제로 배포하고 운영하면서, 사용자로부터 받은 피드백을 통해 제공하는 서비스의 사용자 경험(UX)에 많은 부분을 개선해야 할 필요성을 실감했습니다. 사용자들은 종종 저에게 예상치 못한 사소한 부분에서조차 불편함을 느끼고 있었습니다. 이는 저의 개발 과정이 주로 제 자신의 관점에만 초점을 맞추었음을 반영합니다. 이에 따라 사용자 경험을 세심하게 고려하고 개선하기 위한 노력을 기울였습니다. 비록 아직 부족한 부분이 많지만, 사용자 경험을 지속적으로 공부하고 발전시켜 나가는 프론트엔드 개발자가 되겠다는 각오를 다졌습니다.

또한, 실제 서비스 중인 사이트에서 다양한 오류가 발생하면서, 지속해서 메인 브랜치를 수정하고 다시 배포하는 과정을 반복했습니다. 특히 이미지 업로드, 회원가입 과정에서의 오류가 예상치 못하게 지속해서 발생하였습니다. 저는 이 과정에서 배포 이전에 개발 환경에서 문제점을 발견하고 미리 깨뜨려 보면서 해결하는것의 중요성을 깨닫게 되었습니다. 따라서 저는 테스트 코드의 도입을 결정했고, 배포 전 필수 로직에 대한 검증을 통해 사이트의 안정성을 높이기 시작했습니다. 테스트 코드에 대한 이해와 활용은 아직 초보 단계이지만, 이를 계속해서 학습하고 적용함으로써 사이트를 더욱 견고하게 만들고자 합니다.

이번 프로젝트는 저에게 정말 의미 있는 프로젝트입니다. 사용자는 많지 않지만 개발자로서 어떤 기능을 제공하고, 어떤 노력을 해야 사용자에게 만족감을 주는지, 기존 비슷한 서비스와 비교하여 어떤 부분을 장점으로 가져갈지, 어떤 식으로 코드를 작성하고 프로젝트를 만들어야 검색엔진에서 다른 사이트들보다 우선순위가 높아질지, 이런 고민들은 저를 제가 꿈꾸고 이상적으로 생각하는 개발자로 성장하기 위한 작지만, 매우 의미 있는 한걸음이었습니다. 볼수록 개선해야 될 것들이 눈에 보이고, 불편한 점들도 많이 남아있습니다. 저는 계속해서 해당 프로젝트를 조금씩 바꿔 나가려 합니다.`,
  },
  {
    id: 4,
    title: "img-toolkit",
    thumbnail: "/img-toolkit.png",
    members: null,
    role: "프론트엔드",
    repository: [
      "https://github.com/2YH02/img-toolkit",
      "https://github.com/2YH02/img-toolkit-rust",
    ],
    deployUrl: "https://2yh02.github.io/img-toolkit",
    techStack: [
      "JavaScript",
      "Canvas API",
      "TypeScript",
      "Vite",
      "Rust",
      "WebAssembly",
    ],
    tagline: "업로드 전에 브라우저에서 이미지를 바로 압축하는 라이브러리",
    highlights: [
      "Canvas API 기반 실시간 이미지 압축 및 포맷 변환",
      "Rust WebAssembly로 재구현해 압축 품질 개선",
      "기존 인터페이스를 유지한 채 npm 배포",
    ],
    description:
      "JavaScript의 Canvas API를 활용해 실시간으로 이미지 크기를 압축하는 기능을 제공하는 라이브러리입니다. 프론트엔드에서 사용자가 업로드한 이미지를 서버에 전송하기 전에 즉시 용량을 줄여 업로드 및 로딩 속도를 크게 개선할 수 있도록 돕습니다. 사용자는 간단한 API로 이미지 압축률을 설정하고, 브라우저 환경에서 즉시 결과물을 확인할 수 있습니다.",
    sections: [
      {
        title: "Canvas API를 활용 이미지 압축 구현",
        summary: ["Canvas API를 활용하여 이미지 압축 기능 구현"],
        content: {
          text: [
            "Canvas API를 활용하여 클라이언트 측에서 이미지를 압축하거나 포맷을 변경해 용량을 줄이는 기능을 구현했습니다. 이는 이미지의 서버 전송 속도 향상 및 로딩 시간 단축에 기여했습니다.",
          ],
        },
      },
      {
        title: "Rust WebAssembly를 활용한 이미지 품질 최적화",
        summary: ["Rust WebAssembly 기반 고품질 이미지 압축 기능 구현"],
        content: {
          problem: [
            "기존 JavaScript 기반 Canvas API를 활용한 이미지 압축은 속도는 빠르지만 품질 저하가 발생하여, 이미지 품질을 중요시하는 상황에서는 적합하지 않은 문제가 있었습니다.",
          ],
          solution: [
            "Rust와 WebAssembly를 활용하여 이미지 압축 기능을 재구현하고, JavaScript보다 정밀한 제어와 고품질 압축이 가능하도록 개선했습니다. 이를 통해 이미지 품질 저하를 최소화하면서도 효율적인 압축이 가능해졌습니다.",
          ],
        },
      },
    ],
    reflection: `라이브러리 개발을 통해 범용적으로 재사용 가능한 코드를 작성하고 유지보수하는 경험을 쌓았습니다. 처음으로 npm에 직접 라이브러리를 배포하면서, 오픈소스로 프로젝트를 관리하고 사용자와 소통하는 과정의 중요성을 배웠습니다.

특히 기존 JavaScript 기반 라이브러리의 인터페이스를 그대로 유지한 채 Rust WebAssembly로 재작성하면서, 언어 간 호환성과 설계 일관성에 대한 이해를 넓힐 수 있었고, 이미지 압축 과정에서 성능과 품질 모두를 최적화할 수 있었습니다.`,
  },
  {
    id: 0,
    title: "포트폴리오 및 블로그",
    thumbnail: "/portfolio.png",
    members: null,
    role: "풀스택",
    repository: [
      "https://github.com/2YH02/portfolio-fe",
      "https://github.com/2YH02/portfolio-be",
    ],
    deployUrl: "https://www.yonghun.me",
    techStack: [
      "Next.js",
      "Rust",
      "Actix Web",
      "Typescript",
      "TailwindCSS",
      "Zustand",
      "Docker",
      "Docker Compose",
      "PostgreSQL",
    ],
    tagline: "Next.js와 Rust로 직접 만든 포트폴리오 겸 기술 블로그",
    highlights: [
      "Rust(Actix Web) 백엔드와 Docker Compose 개발 환경 구축",
      "GitHub Actions 테스트 및 Railway 자동 배포",
      "SSG/ISR 혼합 렌더링과 동적 sitemap으로 SEO 대응",
    ],
    description:
      "개인 포트폴리오와 기술 블로그를 하나의 웹사이트로 통합하여, 기술적 경험과 프로젝트를 효과적으로 공유할 수 있도록 구성하였습니다. Next.js 기반의 프론트엔드와 Rust 및 Actix Web 기반의 백엔드로 구성된 풀스택 웹사이트이며 포트폴리오, 블로그 글 관리, 사용자 경험(UX) 중심의 애니메이션과 UI를 구현했습니다",
    sections: [
      {
        title: "Docker Compose 기반 로컬 개발 환경 구축",
        summary: ["Docker Compose 기반 로컬 개발 환경 통합 구축"],
        content: {
          problem: [
            "개발 환경마다 백엔드 서버와 데이터베이스 설정이 달라 실행 오류나 환경 불일치 문제가 자주 발생했습니다.",
          ],
          solution: [
            "Docker Compose를 활용하여 Rust(Actix Web) 백엔드와 PostgreSQL 데이터베이스가 포함된 통합 개발 환경을 구성함으로써, 다른 곳에서도 동일한 환경에서 작업할 수 있도록 했으며, 환경 차이로 인한 오류를 최소화했습니다.",
          ],
        },
      },
      {
        title: "CI/CD 파이프라인 구축 및 자동화 배포",
        summary: ["GitHub Actions 기반 CI/CD 자동화 및 배포 효율화"],
        content: {
          problem: [
            "Rust 백엔드의 테스트 및 배포 과정을 수동으로 처리하면 실수 가능성과 반복 작업의 비효율성이 존재했습니다.",
          ],
          solution: [
            "GitHub Actions를 사용해 Rust 백엔드의 테스트 자동화 환경을 구축하고, Docker 기반 PostgreSQL 세팅을 포함시켜 테스트 환경을 일관되게 유지했습니다.",
            "또한 Railway와 연동하여 main 브랜치에 push될 경우 자동으로 빌드 및 배포가 진행되도록 설정함으로써, 배포 과정의 효율성과 안정성을 높였습니다.",
          ],
        },
      },
      {
        title: "Quill 기반 블로그 텍스터 에디터 구현",
        summary: ["Quill 에디터 커스터마이징 및 이미지 업로드 UX 개선"],
        content: {
          problem: [
            "기본 Quill 에디터는 프로젝트 디자인과 스타일이 맞지 않고, 이미지 업로드 시 로딩 상태나 블러 이미지 처리 기능이 없어 사용자 경험이 부족했습니다.",
          ],
          solution: [
            "Quill.js의 블록 클래스를 확장하여 프로젝트 디자인에 맞는 커스텀 스타일을 적용하고, 이미지 업로드 중 로딩 UI가 표시되도록 구현했습니다.",
            "또한 Supabase Storage와 연동하여 이미지를 업로드하고, 삭제 처리와 함께 대표 이미지는 blur 이미지도 자동으로 생성 및 저장되도록 구성해 이미지 관련 UX를 향상시켰습니다.",
          ],
        },
      },
      {
        title: "블로그 글 렌더링 컴포넌트 및 코드 블럭 하이라이팅",
        summary: ["Quill HTML 콘텐츠 렌더링 및 코드 하이라이팅 적용"],
        content: {
          problem: [
            "Quill 에디터에서 저장된 HTML 콘텐츠를 클라이언트에서 그대로 출력할 경우, 스타일이 적용되지 않거나 코드 블록이 가독성이 떨어지는 문제가 있었습니다.",
          ],
          solution: [
            "Quill에서 저장된 HTML을 파싱해 렌더링하는 전용 컴포넌트를 제작하고, highlight.js를 활용해 코드 블록에 프로젝트 스타일에 맞는 하이라이팅을 적용하여 콘텐츠의 가독성과 일관된 UI를 확보했습니다.",
          ],
        },
      },
      {
        title: "Framer Motion 기반 인터랙티브 UI 구현",
        summary: ["Framer Motion 및 이미지 블러 로딩을 통한 UX 개선"],
        content: {
          problem: [
            "페이지 전환이나 주요 UI 요소의 등장 시 전환이 급격하게 이루어져 사용자 경험이 다소 부자연스럽고, 이미지 로딩 지연 시 빈 공간이 발생하여 체감 성능이 저하되었습니다.",
          ],
          solution: [
            "Framer Motion을 활용해 페이지 전환 및 주요 요소 등장 시 부드러운 애니메이션을 적용하여 자연스럽고 몰입감 있는 UX를 제공했습니다.",
            "또한 이미지 로딩 시 blur placeholder를 함께 적용해 콘텐츠의 레이아웃 안정성과 체감 성능을 개선했습니다.",
          ],
        },
      },
      {
        title: "블로그 페이지네이션 및 SEO 최적화",
        summary: ["서버 페이지네이션 및 SEO 최적화를 위한 SSR/SSG/ISR 구현"],
        content: {
          problem: [
            "게시글 수가 증가함에 따라 클라이언트 측에서 전체 데이터를 받아오는 방식은 성능 저하와 초기 로딩 지연을 유발했고, 검색 엔진에 노출되지 않는 문제가 있었습니다.",
          ],
          solution: [
            "Rust 백엔드에서 OFFSET/LIMIT 기반의 서버 페이지네이션 기능을 구현하고, Next.js의 동적 라우팅 및 SSR을 통해 글 목록을 효율적으로 로드하도록 구성했습니다.",
            "프로젝트 상세 페이지에는 정적 생성(SSG), 블로그 글 상세 페이지에는 ISR(Incremental Static Regeneration)을 적용하여 페이지별 특성에 맞는 렌더링 전략으로 성능과 실시간성을 동시에 확보했습니다.",
            "또한 동적 sitemap.ts 및 robots.txt를 구성하여 Google과 Naver Search Console에 등록함으로써 검색 엔진 최적화를 수행했습니다.",
          ],
        },
      },
    ],
    reflection: `사용자에게 과하지 않은 자연스러운 인터랙션을 제공하고자 많은 고민을 했습니다. Framer Motion과 Canvas API 등을 통해 시각적인 효과를 주되, 사용자가 불편함을 느끼지 않도록 세심하게 조절했습니다. 특히 정보 제공 목적의 웹사이트에서는 인터랙션의 강도와 빈도가 사용자 경험에 큰 영향을 미친다는 점을 새삼 느낄 수 있었고, 이 과정에서 인터페이스 설계에 대한 감각을 키울 수 있었습니다.

또한 단순한 블로그 글 CRUD 기능이더라도, 프론트엔드에서 어떤 구조로 데이터를 다루면 사용자에게 유용할지, 백엔드에서는 어떤 형식으로 응답을 보내야 하는지를 고민하며 전체적인 데이터 흐름을 직접 설계해보는 경험이 매우 뜻깊었습니다. 데이터베이스 구조와 API 설계, 프론트엔드 렌더링 방식까지 웹 서비스 전반에 대한 이해를 넓힐 수 있는 기회였고, 기술적인 성장을 체감할 수 있던 프로젝트였습니다.`,
  },
];

export type Skill = {
  title: string;
  description: string;
};

interface About {
  name: string;
  text: string;
  skills: Skill[];
}

export const about: About = {
  name: "이용훈",
  text: `안녕하세요, 사용자와의 상호작용을 통해 매력적인 웹 경험을 만들어가는 웹 개발자입니다. 저는 인터랙티브한 UI와 최적화된 성능을 중요하게 생각하며, 새로운 기술에 대한 꾸준한 관심을 통해 사용자에게 최상의 경험을 제공하고자 합니다.

기술을 통해 복잡한 문제를 해결하며, 사용자의 기억에 남는 순간을 만드는 것이 웹 개발자의 역할이라고 생각합니다. 끊임없는 호기심과 배움의 자세로 성장하고, 항상 사용자 중심의 서비스를 만드는 개발자가 되고자 합니다.`,
  skills: [
    {
      title: "JavaScript, TypeScript",
      description:
        "개인 및 팀 프로젝트를 통해 지속적으로 익혀왔으며, 타입스크립트를 사용하여 개발할 수 있습니다.",
    },
    {
      title: "React, Next.js",
      description:
        "SSR, CSR, SSG, ISR에 대한 개념을 이해하고, CSR에서 SSR로 전환 경험, SEO 최적화 및 퍼포먼스 개선 경험이 있습니다.",
    },
    {
      title: "Rust",
      description:
        "WebAssembly를 활용한 이미지 처리 라이브러리 개발 및 HTTP 서버 구축 경험이 있습니다.",
    },
    {
      title: "Tailwind CSS",
      description:
        "UI 컴포넌트 라이브러리 개발 및 배포 경험이 있고, 반응형 UI 등 사용자 경험 개선에 적극 활용할 수 있습니다.",
    },
    {
      title: "Zustand, React Query",
      description:
        "Flux패턴을 이해할 수 있으며, 데이터의 캐싱, 동기화 등을 이해하고 상황에 맞는 상태관리 방식을 선택할 수 있습니다.",
    },
    {
      title: "Node.js",
      description: "Nest.js를 활용한 HTTP 서버 구축 경험이 있습니다.",
    },
    {
      title: "React Native Expo",
      description:
        "Webview 기반 앱 구축, 모바일-웹 연동(GPS 연동 및 postMessage 처리) 경험이 있습니다.",
    },
  ],
};
