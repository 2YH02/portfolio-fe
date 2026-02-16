# AGENTS.md

이 문서는 `/Users/dd/Dev/portfolio-fe` 저장소에서 작업하는 사람/에이전트를 위한 실행 가이드입니다.

## 1) 프로젝트 요약

- 스택: Next.js App Router + TypeScript + Tailwind CSS + Zustand
- 런타임: React 19, Next 15
- 데이터: 외부 백엔드 API(`https://api.yonghun.me`) + Supabase Storage
- 주요 도메인:
  - 포트폴리오/소개 페이지
  - 블로그 목록/상세/작성 페이지
  - SEO(메타데이터, sitemap, robots)

## 2) 핵심 디렉터리

- `src/app`: 라우트 및 페이지(App Router)
- `src/app/posts`: 블로그 목록/상세/작성 UI
- `src/components`: 공통 UI, provider, 레이아웃 컴포넌트
- `src/lib/api`: API 호출 유틸 및 도메인 API 함수
- `src/lib/supabase`: Supabase 클라이언트
- `src/data`: 정적 데이터
- `src/store`: Zustand 스토어

## 3) 환경변수

현재 코드 기준으로 아래 키를 사용합니다.

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_GOOGLE_ANALYTICS`

주의:
- `NEXT_PUBLIC_*` 값은 클라이언트에 노출됩니다. 비밀값(secret)은 절대 넣지 않습니다.
- API 기본값 fallback은 `http://localhost:8080` 입니다(`src/lib/api/apiClient.tsx`).

## 4) 실행/검증 명령어

- 개발 서버: `npm run dev`
- 빌드: `npm run build`
- 프로덕션 실행: `npm run start`
- 린트: `npm run lint`

작업 완료 전 최소 검증:
1. `npm run lint`
2. 변경한 라우트 수동 확인(특히 `posts`, `posts/[id]`, `posts/add`)
3. SEO 변경 시 메타데이터/OG/canonical 값 확인

## 5) 커밋 규칙 (이 저장소 표준)

최근 커밋 로그를 보면 `feat/fix/docs/refactor/style` 타입은 잘 사용되지만, 대소문자(`Feat`, `Fix`, `Docs`)가 섞여 있습니다.  
앞으로는 아래 규칙으로 통일합니다.

형식:
- `<type>: <subject>`

규칙:
- `type`은 반드시 **소문자**
- `subject`는 한국어/영어 모두 가능, 짧고 구체적으로 작성
- 마침표(`.`) 생략
- 한 커밋에는 하나의 목적만 담기

허용 타입:
- `feat`: 기능 추가/확장
- `fix`: 버그 수정
- `refactor`: 동작 변화 없는 구조 개선
- `style`: UI 스타일 변경(로직 영향 없음)
- `docs`: 문서 수정
- `chore`: 빌드/설정/의존성/기타 유지보수

좋은 예시:
- `feat: posts 페이지 성능 및 SEO 최적화`
- `fix: posts 목록 빈 상태 처리 오류 수정`
- `refactor: blog API 응답 타입 분리`
- `docs: README 배포 섹션 업데이트`

피해야 할 예시:
- `Feat: 수정` (타입 대문자 + 의미 불명확)
- `fix: 이것저것 수정` (범위 과다)

## 6) 브랜치/PR 권장 규칙

- 브랜치명: `feature/*`, `fix/*`, `refactor/*`, `docs/*`
- PR 제목도 커밋 규칙과 동일한 톤 권장
- PR 본문에 반드시 포함:
  - 변경 목적
  - 주요 변경 파일
  - 사용자 영향(화면/API/SEO)
  - 테스트/검증 결과

## 7) 코드 작업 원칙

- TypeScript `strict`를 깨는 `any` 남발 금지
- 기존 import alias(`@/*`) 우선 사용
- API 레이어(`src/lib/api/*`)에서 타입 우선 정의 후 페이지에 전달
- 네트워크 요청 실패 경로를 고려하고, 사용자 노출 메시지/상태를 처리
- 불필요한 클라이언트 컴포넌트(`"use client"`) 증가 지양
- 이미지/콘텐츠 변경 시 성능(LCP), 접근성(alt), SEO 메타데이터를 함께 확인

## 8) 변경 시 주의 포인트 (이 프로젝트 특화)

- `next.config.ts`의 `/api/:path*` rewrites는 백엔드 연동 핵심 경로이므로 함부로 변경하지 않습니다.
- `src/lib/api/blog.tsx`의 `revalidate`(ISR) 정책 변경 시 캐시 전략을 PR에 명시합니다.
- `posts/add` 인증 흐름(`AuthForm`, `Auth`) 변경 시 Guest/Admin 분기 동작을 반드시 수동 검증합니다.
- Supabase 업로드 로직 변경 시 public URL, placeholder, blur 데이터 동작까지 함께 확인합니다.

## 9) 작업 완료 체크리스트

1. 코드가 린트 오류 없이 통과한다.
2. 변경 범위의 핵심 페이지가 의도대로 동작한다.
3. 커밋 메시지가 소문자 타입 규칙을 지킨다.
4. 문서/타입/코드가 서로 모순되지 않는다.

