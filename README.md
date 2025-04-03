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
