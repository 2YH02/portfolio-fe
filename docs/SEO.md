# SEO 검증과 운영

## 배포 전 검사

- `npm run lint`, `npm test`, `npm run build`
- 실행 중인 앱에 대해 `npm run seo:check`. 다른 주소는 `SEO_BASE_URL`로 지정합니다.
- `seo:check`는 공개 페이지·모든 프로젝트의 canonical, 제목, 설명, 공유 이미지, H1, JSON-LD와 초기 HTML의 프로젝트 링크·게임 설명을 확인합니다. 사이트맵·robots와 잘못된 프로젝트 URL의 404도 검사합니다.
- 블로그 Markdown·Quill 본문은 클라이언트 코드 실행 전에도 정제된 HTML로 렌더링합니다. 하이라이팅과 이미지 속성 처리는 클라이언트에서 이어집니다.
- `/login`, `/posts/add`는 검색 색인에서 제외합니다.

## CI

`.github/workflows/seo-audit.yml`은 운영 사이트 대신 해당 커밋을 production build하고 로컬에서 검사합니다. `scripts/seo-fixture.mjs`의 읽기 전용 블로그 데이터와 가짜 공개 Supabase 설정은 CI에서만 사용합니다. 운영 데이터·인증·업로드 검증은 이 검사 범위에 포함되지 않습니다.

- 사이트맵의 모든 URL을 검사하므로 새 프로젝트·게임도 자동 포함됩니다.
- 먼저 `seo:check`가 실제 운영 canonical 값과 초기 HTML을 검사합니다.
- 고정 커밋의 `seo-better`로 SSR/렌더링 후 DOM을 비교합니다. 로컬 주소를 검사하므로 운영 canonical과 주소가 다르다는 경고는 예상됩니다. canonical 자체의 정확성은 앞 단계에서 별도로 검사합니다.
- 감사 실패와 실행 오류를 실패 처리하며 JSON 보고서와 앱·fixture 로그를 아티팩트로 남깁니다. 도구는 `SEO_BETTER_TOKEN`에 접근 가능한 저장소에서 체크아웃합니다.
- 외부 fork PR은 secret이 필요한 외부 감사 도구와 PR 댓글 단계를 건너뛰며, 로컬 빌드·테스트·`seo:check`는 계속 실행합니다.
- 로컬 재현: `node scripts/seo-fixture.mjs` → API 주소를 `http://127.0.0.1:8086`으로 설정해 빌드 → `npm run start` → `SEO_FIXTURE=1 npm run seo:check`. PowerShell은 `$env:SEO_FIXTURE='1'`처럼 환경변수를 설정합니다.

## 사이트맵

`/sitemap.xml`은 1시간 재검증합니다. 블로그 API 요청에는 8초 제한이 있으며 실패해도 고정 페이지와 프로젝트, 이미 가져온 글은 유지합니다. `lastModified`는 글의 실제 생성일만 사용하며, 알 수 없는 날짜나 고정 페이지의 수정일을 현재 시각으로 꾸미지 않습니다. 최신 글이 빠졌다면 API 복구 후 다음 재검증을 확인합니다.

## 사이트 소유자가 확인할 일

배포 완료 후 Google Search Console에서 다음을 확인합니다.

1. `yonghun.me` 도메인 속성 소유권을 확인합니다. 도메인 속성을 쓰면 서브도메인도 범위에 포함됩니다. URL 접두어 속성을 쓴다면 각 서비스 주소를 별도로 등록합니다.
2. 포폴 `/sitemap.xml`, `wizard.yonghun.me/sitemap.xml`, `castmorrow.yonghun.me/sitemap.xml`을 제출합니다.
3. 홈, `/projects`, `/games`, 새 프로젝트 상세와 각 게임·가이드 URL을 검사하고 필요한 페이지의 색인을 요청합니다.
4. 페이지 색인 보고서의 제외 이유와 Google이 선택한 canonical을 확인합니다. 노출·검색어·클릭수는 실적 보고서로 확인합니다.
5. 네이버 유입도 원하면 Search Advisor에서 서비스별 소유권과 사이트맵을 확인합니다. 포폴에는 기존 네이버 확인 태그를 유지합니다.

코드 검사 통과가 검색 색인이나 상위 노출을 보장하지는 않습니다. 소유권·색인 상태·검색 실적은 실제 계정에서 확인해야 합니다.

참고: [Google Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start), [사이트맵](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
