# 📝 Yonghun's Portfolio Blog - Frontend

> 기술 블로그 및 프로젝트 회고, 개인 작업물을 정리하며 기록하는 포트폴리오 사이트 입니다.

## 검증

- `npm test`: Markdown·Quill HTML 정제와 JSON-LD 안전 출력 회귀 테스트
- `npm run lint`: ESLint 검사
- `npx tsc --noEmit`: 타입 검사

본문 정제는 서버와 브라우저에서 같은 DOMPurify 정책을 사용합니다. 기존 CI의 Node.js 20과 호환되는 `isomorphic-dompurify` 3.19.x를 사용하며, Node.js 20에서는 20.19 이상, 22에서는 22.13 이상이 필요합니다.

## 🌐 사이트 주소

👉 [https://www.yonghun.me](https://www.yonghun.me)

## 🔧 기술 스택

- **Frontend**: [Next.js](https://nextjs.org/) (App Router), [Zustand](https://zustand-demo.pmnd.rs/), [TanStack Query](https://tanstack.com/query/latest),
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://motion.dev/)
- **Backend**: [Rust (Actix-web)](https://actix.rs/) + PostgreSQL
- **Storage**: [Supabase Storage](https://supabase.com/)
- **CI/CD**(백엔드): GitHub Actions (Docker 기반 PostgreSQL 설정, Rust 테스트 실행, Railway 배포 자동화)
- **SEO**: Next.js SSG/SSR, robots.txt 및 동적 sitemap.ts 구성
- **Analytics**: Google Analytics
- **Infrastructure**(백엔드): Docker, Docker Compose

## ✨ 주요 기능

SEO 검사 방법과 Search Console에서 확인할 항목은 [SEO 운영 가이드](docs/SEO.md)에 정리했습니다.

### 🔹 블로그 기능

- 글 작성/수정/삭제 기능 (서버 연동)
- 이미지 업로드 및 Supabase Storage 연동
- 썸네일 및 blur 처리 이미지 지원
- Quill.js를 커스터마이징하여 직관적인 에디터 제공

### 🔹 사용자 경험 개선

- 프로젝트 상세와 Games 카드에서 블로그와 같은 하트 애니메이션을 사용합니다. `games.ts`의 `projectId`로 같은 게임의 좋아요를 공유합니다.
- 좋아요 API는 `GET /api/projects/{id}/likes`, `POST`·`DELETE /api/projects/{id}/like`입니다. 백엔드의 project 모듈과 migration 2를 먼저 배포해야 합니다. 새 프로젝트 추가 시 백엔드의 허용 ID도 추가합니다.
- `portfolio_like_client` 쿠키의 브라우저 식별자로 중복을 방지하며, 쿠키를 지우거나 다른 브라우저를 쓰면 다른 방문자로 취급됩니다.

- Framer Motion을 활용한 부드러운 페이지 전환 애니메이션
- 주요 콘텐츠 이미지에 Blur Placeholder 적용 (LCP 최적화)
- Skeleton UI 적용

### 🔹 SEO 및 성능

- 주요 페이지 SSR, 블로그 페이지 SSG 구성
- robots.txt, sitemap.xml 자동 생성
- Open Graph / Twitter 메타 태그 구성
  <br/>
  <br/>
