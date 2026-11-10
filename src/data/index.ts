export { projects, type Project, type Members, type Section } from "./projects";

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
  text: `사용자에게 필요한 경험을 고민하고, 아이디어를 실제 제품으로 구현하는 개발자 이용훈입니다. 웹과 모바일 환경을 두루 경험하며, 복잡한 기능도 이해하기 쉬운 흐름으로 풀어내는 데 관심이 있습니다.

새로운 기술은 목적에 맞게 선택하고, 제품의 성능과 사용성을 꾸준히 개선합니다. AI 도구를 활용한 개발 환경과 협업 방식도 함께 고민하며, 더 나은 제품을 만드는 과정에 기여하고자 합니다.`,
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
        "Expo와 React Native로 네이티브 모바일 앱을 개발하고, 위치·사진·소셜 로그인 등 모바일 기능을 연결한 경험이 있습니다.",
    },
    {
      title: "Go",
      description:
        "Go 표준 라이브러리로 HTTP API와 이벤트 수집·집계 기능을 구현한 경험이 있습니다.",
    },
  ],
};
