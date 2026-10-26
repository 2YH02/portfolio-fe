export type GameStatus = "playable" | "developing";

export interface Game {
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
    slug: "castmorrow",
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
