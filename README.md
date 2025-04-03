# SEO

# 섬네일

- /public 폴더에 배치한다. (thumbnail.png)

## 아이콘

- /src/app 폴더에 배치 (icon.ico)

### 1. 메타데이터 설정

- http://localhost:3000
- /src/app/layout.tsx

```tsx
export const metadata: Metadata = {
  title: "Todo",
  description: "Todo Supabase",
  openGraph: {
    title: "Todo",
    description: "Todo Supabase",
    images: [{ url: "/thumbnail.png" }],
  },
};
```

### 2. 페이지별 메타데이터 설정

- /src/app/(with-side)/layout.tsx

```tsx
export const metadata: Metadata = {
  title: "Blog",
  description: "Blog Supabase",
  openGraph: {
    title: "Blog",
    description: "Blog Supabase",
    images: [{ url: "/thumbnail.png" }],
  },
};
```

### 3. 동적 페이지 메타데이터 설정

- next-15 깃허브 (deploy) 부분 참조

# Vercel Deoploy

- https://vercel.com/
- 환경변수 등록 주의
  - `SITE_URL 은 로그인 이후 이동할 주소 이므로 주의`
  - `https://til-supabase-steel.vercel.app/`

# 배포 에러 처리

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Prettier 플러그인 추가
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      prettier: eslintPluginPrettier, //  Prettier 플러그인 추가
    },
    rules: {
      ...eslintConfigPrettier.rules, //  Prettier와 충돌하는 ESLint 규칙 비활성화
      "prettier/prettier": ["off", { endOfLine: "auto" }], //  Prettier 스타일을 강제 적용 (오류 발생 시 ESLint에서 표시)
      "@typescript-eslint/no-unused-vars": "off", //  기존 TypeScript 규칙 유지
      "@typescript-eslint/no-explicit-any": "off", //  any 타입 사용 허용
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
```

# 구글 로그인 후 RedirectURL 설정

- https://cloud.google.com/developers?hl=ko
- `콘솔`
- `프로젝트` 선택
- `API 및 서비스` > `OAuth 동의화면 ` > `클라이언트` > `목록 중 해당 프로젝트` 선택
- 승인된 리디렉션 URI 항목에 추가 (`https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/`)

# 네이버 서치 어드바이저 등록하기

- https://searchadvisor.naver.com/
- 웹마스터 도구 클릭 (https://searchadvisor.naver.com/console/board)
- `사이트 소유확인` 페이지로 이동
- html 태그 복사

```html
<meta
  name="naver-site-verification"
  content="fd00fff59dc3c824fac8dc747d56bb3a08f62b6e"
/>
```

- /src/app/layout.tsx

```tsx
export const metadata: Metadata = {
  title: "Todo",
  description: "Todo Supabase",
  openGraph: {
    title: "Todo",
    description: "Todo Supabase",
    images: [{ url: "/thumbnail.png" }],
  },
  other: {
    "naver-site-verification": "fd00fff59dc3c824fac8dc747d56bb3a08f62b6e",
  },
};
```

- `소유권 확인` 성공 시 다음 실행
- `웹마스터 도구 > 요약 > 검증 > robots.txt` 이동

## /public/robots.txt 파일 생성

```txt
# *
User-agent: *
Allow: /

# Host
Host: https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/

# Sitemaps
Sitemap: https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/sitemap.xml
```

## /public/sitemap.xml 파일 생성

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/sitemap-0.xml</loc></sitemap>
</sitemapindex>
```

## /public/sitemap-0.xml 파일 생성

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/</loc><lastmod>2023-09-11T23:52:17.732Z</lastmod><changefreq>todos</changefreq><priority>0.7</priority></url>
<url><loc>https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/blog</loc><lastmod>2023-09-11T23:52:17.732Z</lastmod><changefreq>blog</changefreq><priority>0.7</priority></url>
<url><loc>https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/todos</loc><lastmod>2023-09-11T23:52:17.732Z</lastmod><changefreq>todos</changefreq><priority>0.7</priority></url>
</urlset>
```

## git push 이후 robots.txt 수집 요청

## 웹마스터 도구 > 간단 체크 > `url 입력`

# 구글 서치 등록하기

- https://search.google.com/search-console/about

```html
<meta
  name="google-site-verification"
  content="DGOHRIFNYLbLhXJq4cSUnbit_myyML5aEvgC0getwbo"
/>
```

- layout.tsx

```tsx
export const metadata: Metadata = {
  title: "Todo",
  description: "Todo Supabase",
  openGraph: {
    title: "Todo",
    description: "Todo Supabase",
    images: [{ url: "/thumbnail.png" }],
  },
  other: {
    "naver-site-verification": "fd00fff59dc3c824fac8dc747d56bb3a08f62b6e",
    "google-site-verification": "DGOHRIFNYLbLhXJq4cSUnbit_myyML5aEvgC0getwbo",
  },
};
```

## 로그인 안해도 xml, robots.txt 접근

- middleware.ts 수정
- 제외 처리

```ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## 구글 콘솔

- 승인된 JavaScript 원본

  - http://localhost:3000
  - https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app

- 승인된 리디렉션 URI

  - http://localhost:3000/auth/callback
  - https://til-supabase-git-22-vercel-dongwook-seos-projects.vercel.app/auth/callback
  - https://ntfagkhxfpbutedzmtfp.supabase.co/auth/v1/callback

# 인증시 로그인 안된 경우에 화면에 에러메시지 출력 (ChatGpt 에 검색어로 활용)

- /src/app/auth/callback/route.ts 파일 업데이트

```ts
import { NextRequest, NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createServerSideClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      // 👇 여기가 추가된 에러 메시지 반환 부분입니다
      return new Response("❌ Supabase 인증 에러: " + error.message, {
        status: 500,
      });
    }

    // ✅ 성공 시 정상 리디렉션 처리
    const forwardedHost = request.headers.get("x-forwarded-host");
    const isLocalEnv = process.env.NODE_ENV === "development";

    if (isLocalEnv) {
      return NextResponse.redirect(`${origin}${next}`);
    } else if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // code 값 자체가 없는 경우
  return new Response("❌ 인증 코드 없음 (Missing ?code=)", {
    status: 400,
  });
}
```
