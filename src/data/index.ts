export { projects, type Project, type Members, type Section } from "./projects";

export type Skill = {
  title: string;
  description: string;
};

interface About {
  name: string;
  text: string;
  approach: { title: string; description: string }[];
  skills: Skill[];
}

export const about: About = {
  name: "이용훈",
  text: `개발자 이용훈입니다. 서비스 기획과 기능 설계에 참여하고, 구현부터 출시와 운영 중 개선까지 작업해 왔습니다. 성능과 사용성을 중요하게 생각하며, 사용자 피드백과 측정 결과를 바탕으로 개선할 부분을 찾습니다.

반복해서 사용하는 기능은 라이브러리로 분리하고, 검증과 배포 작업은 자동화합니다. AI 코딩 도구를 활용할 때도 프로젝트 규칙과 검토 절차를 정리해 팀이 함께 사용할 수 있는 개발 환경을 구성합니다.`,
  approach: [
    {
      title: "기획과 구현을 함께 검토합니다",
      description: "기능의 목적과 사용 순서를 확인하고, 구현 과정에서 발견한 문제를 기획·디자인 논의에 반영합니다.",
    },
    {
      title: "반복 작업을 줄입니다",
      description: "반복하는 작업은 자동화하고, 여러 곳에서 쓰는 코드는 라이브러리로 분리합니다. AI 도구를 쓸 때도 프로젝트에 맞는 규칙과 검증 과정을 마련합니다.",
    },
    {
      title: "피드백과 측정으로 개선합니다",
      description: "사용자 테스트와 실제 사용 중 발생한 문제를 확인합니다. 로딩 시간과 렌더링 성능, 입력·탐색 과정의 불편을 개선합니다.",
    },
  ],
  skills: [
    {
      title: "JavaScript, TypeScript",
      description:
        "웹과 앱 개발에 주로 사용합니다. API 응답과 화면에서 사용하는 데이터의 타입을 정의하며 개발합니다.",
    },
    {
      title: "React, Next.js",
      description:
        "페이지 특성에 맞춰 렌더링 방식을 선택하고, 초기 로딩과 검색 노출을 개선해 왔습니다.",
    },
    {
      title: "Rust",
      description:
        "WebAssembly를 활용한 이미지 처리 라이브러리 개발 및 HTTP 서버 구축 경험이 있습니다.",
    },
    {
      title: "Tailwind CSS",
      description:
        "반응형 화면과 공통 UI를 구현합니다. 재사용할 컴포넌트를 라이브러리로 분리해 배포했습니다.",
    },
    {
      title: "Zustand, React Query",
      description:
        "화면의 입력 상태와 서버 데이터를 나눠 관리하고, 캐시와 갱신 시점을 조정합니다.",
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
