export type GameStatus = "playable" | "developing";

export interface Game {
  projectId: number;
  slug: string;
  title: string;
  url: string;
  thumbnail: string;
  thumbnailAlt: string;
  description: string;
  genres: string[];
  techStack: string[];
  status: GameStatus;
}

export const games: Game[] = [
  {
    slug: "tiny-wizard",
    projectId: 7,
    title: "Tiny Wizard · 작은 마법사",
    url: "https://wizard.yonghun.me/",
    thumbnail: "/projects/tiny-wizard-cover.webp",
    thumbnailAlt: "픽셀 3D 정원에서 마법사가 불꽃 마법으로 몬스터를 상대하는 Tiny Wizard",
    description: "마법을 조합하고 적의 공격을 피하며 살아남는 픽셀 3D 액션 로그라이크.",
    genres: ["액션", "로그라이크", "생존"],
    techStack: ["TypeScript", "React Three Fiber", "Three.js", "Vite"],
    status: "playable",
  },
  {
    slug: "castmorrow",
    projectId: 6,
    title: "Castmorrow",
    url: "https://castmorrow.yonghun.me/",
    thumbnail: "/projects/castmorrow-cover.webp",
    thumbnailAlt:
      "등대가 보이는 픽셀 바다에서 노란 우비의 낚시꾼이 작은 배 위에서 낚시하는 Castmorrow",
    description: "마우스로 던지고 휠로 감는 픽셀 낚시 게임.",
    genres: ["캐주얼 낚시", "탐험", "수집"],
    techStack: ["JavaScript", "Three.js", "WebGL", "Vite"],
    status: "playable",
  },
];
