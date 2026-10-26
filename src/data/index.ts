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
