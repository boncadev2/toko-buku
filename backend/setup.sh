Script started on Fri Sep 18 14:39:00 2026
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro backend % [K[?2004hccd fro   fr  c  ccd ..[?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hccd frontend[1m/[0m[0m [?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mnpm run build[27m[13D[27mn[27mp[27mm[27m [27mr[27mu[27mn[27m [27mb[27mu[27mi[27ml[27md[?2004l

> frontend@0.1.0 build
> next build

[1G[0K[1m[38;2;173;127;168m▲ Next.js 16.3.5[39m[22m (Turbopack)
[32m[1m✓[22m[39m Running next.config.mjs took 11ms

[37m[1m [22m[39m Creating an optimized production build ...

> Build error occurred
Error: Turbopack build failed with 9 errors:
./src/app/auth/[mode]/page.jsx:2:1
[1m[31mError[39m: The "use client" directive must be placed before other expressions. Move it to the top of the file to resolve this issue.[22m
  [90m1 |[0m [36mexport[0m [36mfunction[0m generateStaticParams() { [36mreturn[0m [{ mode: [32m'login'[0m }, { mode: [32m'register'[0m }, { mode: [32m'forgot-password'[0m }]; }
[31m[1m>[0m [90m2 |[0m [32m"use client"[0m;
  [90m  |[0m [31m[1m^^^^^^^^^^^^^[0m
  [90m3 |[0m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m5 |[0m [36mimport[0m { use, useState } [36mfrom[0m [32m"react"[0m;

Ecmascript file had an error


./src/app/buku/[slug]/page.jsx:16:1
[1m[31mError[39m: The "use client" directive must be placed before other expressions. Move it to the top of the file to resolve this issue.[22m
  [90m14 |[0m   }
  [90m15 |[0m }
[31m[1m>[0m [90m16 |[0m [32m"use client"[0m;
  [90m   |[0m [31m[1m^^^^^^^^^^^^^[0m
  [90m17 |[0m
  [90m18 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m19 |[0m [90m/* eslint-disable react-hooks/set-state-in-effect */[0m

Ecmascript file had an error


./src/app/info/[slug]/page.jsx:2:1
[1m[31mError[39m: The "use client" directive must be placed before other expressions. Move it to the top of the file to resolve this issue.[22m
  [90m1 |[0m [36mexport[0m [36mfunction[0m generateStaticParams() { [36mreturn[0m [{ slug: [32m'tentang-kami'[0m }, { slug: [32m'syarat-ketentuan'[0m }, { slug: [32m'kebijakan-privasi'[0m }]; }
[31m[1m>[0m [90m2 |[0m [32m"use client"[0m;
  [90m  |[0m [31m[1m^^^^^^^^^^^^^[0m
  [90m3 |[0m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m5 |[0m [90m/* eslint-disable @next/next/no-img-element */[0m

Ecmascript file had an error


./src/app/buku/[slug]/page.jsx:20:15
[1m[31mError[39m: You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m18 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m19 |[0m [90m/* eslint-disable react-hooks/set-state-in-effect */[0m
[31m[1m>[0m [90m20 |[0m [36mimport[0m { use, useEffect, useState } [36mfrom[0m [32m"react"[0m;
  [90m   |[0m               [31m[1m^^^^^^^^^[0m
  [90m21 |[0m [36mimport[0m [33mStoreMobileControls[0m [36mfrom[0m [32m"../../../components/StoreMobileControls"[0m;
  [90m22 |[0m
  [90m23 |[0m [36mconst[0m base = process.env.[33mNEXT_PUBLIC_API_URL[0m ?? [32m"http://localhost:8080/api"[0m;

Ecmascript file had an error


./src/app/info/[slug]/page.jsx:6:15
[1m[31mError[39m: You're importing a module that depends on `useEffect` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m5 |[0m [90m/* eslint-disable @next/next/no-img-element */[0m
[31m[1m>[0m [90m6 |[0m [36mimport[0m { use, useEffect, useState } [36mfrom[0m [32m"react"[0m;
  [90m  |[0m               [31m[1m^^^^^^^^^[0m
  [90m7 |[0m [36mimport[0m { api } [36mfrom[0m [32m"../../../lib/api"[0m;
  [90m8 |[0m
  [90m9 |[0m [36mconst[0m pages = {

Ecmascript file had an error


./src/app/auth/[mode]/page.jsx:6:10
[1m[31mError[39m: You're importing a module that depends on `useRouter` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m5 |[0m [36mimport[0m { use, useState } [36mfrom[0m [32m"react"[0m;
[31m[1m>[0m [90m6 |[0m [36mimport[0m { useRouter } [36mfrom[0m [32m"next/navigation"[0m;
  [90m  |[0m          [31m[1m^^^^^^^^^[0m
  [90m7 |[0m [36mimport[0m [33mLink[0m [36mfrom[0m [32m"next/link"[0m;
  [90m8 |[0m [36mimport[0m { api } [36mfrom[0m [32m"../../../lib/api"[0m;
  [90m9 |[0m

Ecmascript file had an error


./src/app/auth/[mode]/page.jsx:5:15
[1m[31mError[39m: You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m3 |[0m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
[31m[1m>[0m [90m5 |[0m [36mimport[0m { use, useState } [36mfrom[0m [32m"react"[0m;
  [90m  |[0m               [31m[1m^^^^^^^^[0m
  [90m6 |[0m [36mimport[0m { useRouter } [36mfrom[0m [32m"next/navigation"[0m;
  [90m7 |[0m [36mimport[0m [33mLink[0m [36mfrom[0m [32m"next/link"[0m;
  [90m8 |[0m [36mimport[0m { api } [36mfrom[0m [32m"../../../lib/api"[0m;

Ecmascript file had an error


./src/app/buku/[slug]/page.jsx:20:26
[1m[31mError[39m: You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m18 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m19 |[0m [90m/* eslint-disable react-hooks/set-state-in-effect */[0m
[31m[1m>[0m [90m20 |[0m [36mimport[0m { use, useEffect, useState } [36mfrom[0m [32m"react"[0m;
  [90m   |[0m                          [31m[1m^^^^^^^^[0m
  [90m21 |[0m [36mimport[0m [33mStoreMobileControls[0m [36mfrom[0m [32m"../../../components/StoreMobileControls"[0m;
  [90m22 |[0m
  [90m23 |[0m [36mconst[0m base = process.env.[33mNEXT_PUBLIC_API_URL[0m ?? [32m"http://localhost:8080/api"[0m;

Ecmascript file had an error


./src/app/info/[slug]/page.jsx:6:26
[1m[31mError[39m: You're importing a module that depends on `useState` into a React Server Component module. This API is only available in Client Components. To fix, mark the file (or its parent) with the `"use client"` directive.
    Learn more: https://nextjs.org/docs/app/api-reference/directives/use-client[22m
  [90m4 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m
  [90m5 |[0m [90m/* eslint-disable @next/next/no-img-element */[0m
[31m[1m>[0m [90m6 |[0m [36mimport[0m { use, useEffect, useState } [36mfrom[0m [32m"react"[0m;
  [90m  |[0m                          [31m[1m^^^^^^^^[0m
  [90m7 |[0m [36mimport[0m { api } [36mfrom[0m [32m"../../../lib/api"[0m;
  [90m8 |[0m
  [90m9 |[0m [36mconst[0m pages = {

Ecmascript file had an error


    at <unknown> (./src/app/auth/[mode]/page.jsx:2:1)
    at <unknown> (./src/app/buku/[slug]/page.jsx:16:1)
    at <unknown> (./src/app/info/[slug]/page.jsx:2:1)
    at <unknown> (./src/app/buku/[slug]/page.jsx:20:15)
    at <unknown> (./src/app/info/[slug]/page.jsx:6:15)
    at <unknown> (./src/app/auth/[mode]/page.jsx:6:10)
    at <unknown> (./src/app/auth/[mode]/page.jsx:5:15)
    at <unknown> (./src/app/buku/[slug]/page.jsx:20:26)
    at <unknown> (./src/app/info/[slug]/page.jsx:6:26)
[1G[0K⠙[1G[0K[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hnnpm run bi uild[?2004l

> frontend@0.1.0 build
> next build

[1G[0K[1m[38;2;173;127;168m▲ Next.js 16.3.5[39m[22m (Turbopack)
[32m[1m✓[22m[39m Running next.config.mjs took 10ms

[37m[1m [22m[39m Creating an optimized production build ...

> Build error occurred
Error: Turbopack build failed with 1 error:
./src/app/buku/[slug]/client.jsx:2:5
[1m[31mError[39m: Expression expected[22m
  [90m1 |[0m [32m"use client"[0m;
[31m[1m>[0m [90m2 |[0m     ];
  [90m  |[0m     [31m[1m^[0m
  [90m3 |[0m   }
  [90m4 |[0m }
  [90m5 |[0m [90m/* eslint-disable @next/next/no-html-link-for-pages */[0m

Parsing ecmascript source code failed

Import trace:
  Server Component:
    ./src/app/buku/[slug]/client.jsx
    ./src/app/buku/[slug]/page.jsx


    at <unknown> (./src/app/buku/[slug]/client.jsx:2:5)
[1G[0K⠙[1G[0K[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hnnpm run build[?2004l

> frontend@0.1.0 build
> next build

[1G[0K[1m[38;2;173;127;168m▲ Next.js 16.3.5[39m[22m (Turbopack)
[32m[1m✓[22m[39m Running next.config.mjs took 9ms

[37m[1m [22m[39m Creating an optimized production build ...
[32m[1m✓[22m[39m Compiled successfully in 1916ms
[?25l[37m[1m [22m[39m Running TypeScript  [36m.[39m[2K[1G[?25h[?25l[37m[1m [22m[39m Finished TypeScript in 3ms  [36m.[39m[2K[1G[?25h[37m[1m [22m[39m Finished TypeScript in 3ms    [32m[1m✓[22m[39m Finished TypeScript in 3ms 
[?25l[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m..[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m...[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m..[39mError: export const dynamic = "force-static"/export const revalidate not configured on route "/robots.txt" with "output: export". See more info here: https://nextjs.org/docs/advanced-features/static-html-export
    at Object.<anonymous> (.next/server/app/robots.txt/route.js:5:3)
[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m...[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[?25h
[?25l [36m.[39m [2K[1G[?25h> Build error occurred
[?25l [36m.[39m [2K[1G[?25hError: Failed to collect page data for /robots.txt
    at [3mignore-listed frames[23m {
  type: [32m'Error'[39m
}
[?25l [36m.[39m [?25h[1G[0K⠙[1G[0K[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hggit status[?2004l
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	[31mmodified:   ../backend/app/Http/Controllers/Api/AdminCustomerController.php[m
	[31mmodified:   ../backend/app/Http/Controllers/Api/AdminDashboardController.php[m
	[31mmodified:   ../backend/app/Http/Controllers/Api/PublicCatalogController.php[m
	[31mmodified:   ../backend/app/Http/Resources/BookResource.php[m
	[31mmodified:   ../backend/app/Models/Book.php[m
	[31mmodified:   ../backend/app/Services/Auth/AuthService.php[m
	[31mmodified:   ../backend/routes/web.php[m
	[31mmodified:   next.config.mjs[m
	[31mmodified:   src/app/admin/page.jsx[m
	[31mmodified:   src/app/admin/produk/page.jsx[m
	[31mmodified:   src/app/akun/alamat/page.jsx[m
	[31mmodified:   src/app/akun/page.jsx[m
	[31mmodified:   src/app/akun/pesanan/page.jsx[m
	[31mmodified:   src/app/akun/profil/page.jsx[m
	[31mmodified:   src/app/auth/[mode]/page.jsx[m
	[31mmodified:   src/app/buku/[slug]/page.jsx[m
	[31mmodified:   src/app/cari/page.jsx[m
	[31mmodified:   src/app/globals.css[m
	[31mmodified:   src/app/info/[slug]/page.jsx[m
	[31mmodified:   src/app/page.jsx[m
	[31mmodified:   src/components/AccountMobileMenu.jsx[m
	[31mmodified:   src/components/AdminShell.jsx[m
	[31mmodified:   src/components/CustomerHeader.jsx[m

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	[31m../backend/database_dump.sql[m
	[31m../backend/fix-discounts.js[m
	[31m../backend/fix.php[m
	[31m../backend/public/test.php[m
	[31m../backend/setup.sh[m
	[31mfix-client-pages.js[m
	[31mpatch-bookcard.js[m
	[31mpatch-cari.js[m
	[31mpatch-detail.js[m
	[31mpatch-empty.js[m
	[31mpatch-footer.js[m
	[31mpatch-related.js[m
	[31mpatch-shelves.js[m
	[31mpatch-state.js[m
	[31mpatch-static.js[m
	[31mpatch.js[m
	[31msrc/app/auth/[mode]/client.jsx[m
	[31msrc/app/buku/[slug]/client.jsx[m
	[31msrc/app/info/[slug]/client.jsx[m
	[31mtest-api.js[m

no changes added to commit (use "git add" and/or "git commit -a")
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hggit add .[?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hggit commit -m "test"[?2004l
[main 7f367ae] test
 31 files changed, 980 insertions(+), 126 deletions(-)
 create mode 100644 frontend/fix-client-pages.js
 create mode 100644 frontend/patch-bookcard.js
 create mode 100644 frontend/patch-cari.js
 create mode 100644 frontend/patch-detail.js
 create mode 100644 frontend/patch-empty.js
 create mode 100644 frontend/patch-footer.js
 create mode 100644 frontend/patch-related.js
 create mode 100644 frontend/patch-shelves.js
 create mode 100644 frontend/patch-state.js
 create mode 100644 frontend/patch-static.js
 create mode 100644 frontend/patch.js
 create mode 100644 frontend/src/app/auth/[mode]/client.jsx
 create mode 100644 frontend/src/app/buku/[slug]/client.jsx
 create mode 100644 frontend/src/app/info/[slug]/client.jsx
 create mode 100644 frontend/test-api.js
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hggit push[?2004l
Enumerating objects: 83, done.
Counting objects:   1% (1/83)Counting objects:   2% (2/83)Counting objects:   3% (3/83)Counting objects:   4% (4/83)Counting objects:   6% (5/83)Counting objects:   7% (6/83)Counting objects:   8% (7/83)Counting objects:   9% (8/83)Counting objects:  10% (9/83)Counting objects:  12% (10/83)Counting objects:  13% (11/83)Counting objects:  14% (12/83)Counting objects:  15% (13/83)Counting objects:  16% (14/83)Counting objects:  18% (15/83)Counting objects:  19% (16/83)Counting objects:  20% (17/83)Counting objects:  21% (18/83)Counting objects:  22% (19/83)Counting objects:  24% (20/83)Counting objects:  25% (21/83)Counting objects:  26% (22/83)Counting objects:  27% (23/83)Counting objects:  28% (24/83)Counting objects:  30% (25/83)Counting objects:  31% (26/83)Counting objects:  32% (27/83)Counting objects:  33% (28/83)Counting objects:  34% (29/83)Counting objects:  36% (30/83)Counting objects:  37% (31/83)Counting objects:  38% (32/83)Counting objects:  39% (33/83)Counting objects:  40% (34/83)Counting objects:  42% (35/83)Counting objects:  43% (36/83)Counting objects:  44% (37/83)Counting objects:  45% (38/83)Counting objects:  46% (39/83)Counting objects:  48% (40/83)Counting objects:  49% (41/83)Counting objects:  50% (42/83)Counting objects:  51% (43/83)Counting objects:  53% (44/83)Counting objects:  54% (45/83)Counting objects:  55% (46/83)Counting objects:  56% (47/83)Counting objects:  57% (48/83)Counting objects:  59% (49/83)Counting objects:  60% (50/83)Counting objects:  61% (51/83)Counting objects:  62% (52/83)Counting objects:  63% (53/83)Counting objects:  65% (54/83)Counting objects:  66% (55/83)Counting objects:  67% (56/83)Counting objects:  68% (57/83)Counting objects:  69% (58/83)Counting objects:  71% (59/83)Counting objects:  72% (60/83)Counting objects:  73% (61/83)Counting objects:  74% (62/83)Counting objects:  75% (63/83)Counting objects:  77% (64/83)Counting objects:  78% (65/83)Counting objects:  79% (66/83)Counting objects:  80% (67/83)Counting objects:  81% (68/83)Counting objects:  83% (69/83)Counting objects:  84% (70/83)Counting objects:  85% (71/83)Counting objects:  86% (72/83)Counting objects:  87% (73/83)Counting objects:  89% (74/83)Counting objects:  90% (75/83)Counting objects:  91% (76/83)Counting objects:  92% (77/83)Counting objects:  93% (78/83)Counting objects:  95% (79/83)Counting objects:  96% (80/83)Counting objects:  97% (81/83)Counting objects:  98% (82/83)Counting objects: 100% (83/83)Counting objects: 100% (83/83), done.
Delta compression using up to 8 threads
Compressing objects:   2% (1/42)Compressing objects:   4% (2/42)Compressing objects:   7% (3/42)Compressing objects:   9% (4/42)Compressing objects:  11% (5/42)Compressing objects:  14% (6/42)Compressing objects:  16% (7/42)Compressing objects:  19% (8/42)Compressing objects:  21% (9/42)Compressing objects:  23% (10/42)Compressing objects:  26% (11/42)Compressing objects:  28% (12/42)Compressing objects:  30% (13/42)Compressing objects:  33% (14/42)Compressing objects:  35% (15/42)Compressing objects:  38% (16/42)Compressing objects:  40% (17/42)Compressing objects:  42% (18/42)Compressing objects:  45% (19/42)Compressing objects:  47% (20/42)Compressing objects:  50% (21/42)Compressing objects:  52% (22/42)Compressing objects:  54% (23/42)Compressing objects:  57% (24/42)Compressing objects:  59% (25/42)Compressing objects:  61% (26/42)Compressing objects:  64% (27/42)Compressing objects:  66% (28/42)Compressing objects:  69% (29/42)Compressing objects:  71% (30/42)Compressing objects:  73% (31/42)Compressing objects:  76% (32/42)Compressing objects:  78% (33/42)Compressing objects:  80% (34/42)Compressing objects:  83% (35/42)Compressing objects:  85% (36/42)Compressing objects:  88% (37/42)Compressing objects:  90% (38/42)Compressing objects:  92% (39/42)Compressing objects:  95% (40/42)Compressing objects:  97% (41/42)Compressing objects: 100% (42/42)Compressing objects: 100% (42/42), done.
Writing objects:   2% (1/50)Writing objects:   4% (2/50)Writing objects:   6% (3/50)Writing objects:   8% (4/50)Writing objects:  10% (5/50)Writing objects:  12% (6/50)Writing objects:  14% (7/50)Writing objects:  16% (8/50)Writing objects:  18% (9/50)Writing objects:  20% (10/50)Writing objects:  22% (11/50)Writing objects:  24% (12/50)Writing objects:  26% (13/50)Writing objects:  28% (14/50)Writing objects:  30% (15/50)Writing objects:  32% (16/50)Writing objects:  34% (17/50)Writing objects:  36% (18/50)Writing objects:  38% (19/50)Writing objects:  40% (20/50)Writing objects:  42% (21/50)Writing objects:  44% (22/50)Writing objects:  46% (23/50)Writing objects:  48% (24/50)Writing objects:  50% (25/50)Writing objects:  52% (26/50)Writing objects:  54% (27/50)Writing objects:  56% (28/50)Writing objects:  58% (29/50)Writing objects:  60% (30/50)Writing objects:  62% (31/50)Writing objects:  64% (32/50)Writing objects:  68% (34/50)Writing objects:  70% (35/50)Writing objects:  72% (36/50)Writing objects:  74% (37/50)Writing objects:  76% (38/50)Writing objects:  78% (39/50)Writing objects:  80% (40/50)Writing objects:  82% (41/50)Writing objects:  84% (42/50)Writing objects:  86% (43/50)Writing objects:  88% (44/50)Writing objects:  90% (45/50)Writing objects:  92% (46/50)Writing objects:  94% (47/50)Writing objects:  96% (48/50)Writing objects:  98% (49/50)Writing objects: 100% (50/50)Writing objects: 100% (50/50), 29.90 KiB | 7.47 MiB/s, done.
Total 50 (delta 17), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas:   0% (0/17)[Kremote: Resolving deltas:   5% (1/17)[Kremote: Resolving deltas:  11% (2/17)[Kremote: Resolving deltas:  17% (3/17)[Kremote: Resolving deltas:  23% (4/17)[Kremote: Resolving deltas:  29% (5/17)[Kremote: Resolving deltas:  35% (6/17)[Kremote: Resolving deltas:  41% (7/17)[Kremote: Resolving deltas:  47% (8/17)[Kremote: Resolving deltas:  52% (9/17)[Kremote: Resolving deltas:  58% (10/17)[Kremote: Resolving deltas:  64% (11/17)[Kremote: Resolving deltas:  70% (12/17)[Kremote: Resolving deltas:  76% (13/17)[Kremote: Resolving deltas:  82% (14/17)[Kremote: Resolving deltas:  88% (15/17)[Kremote: Resolving deltas:  94% (16/17)[Kremote: Resolving deltas: 100% (17/17)[Kremote: Resolving deltas: 100% (17/17), completed with 14 local objects.[K
To github.com:boncadev2/toko-buku.git
   13a1ab3..7f367ae  main -> main
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hccd ..[?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hlls[?2004l
README.md		docker			docs			scripts
backend			docker-compose.yml	frontend
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hggit status[?2004l
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	[31mmodified:   backend/app/Http/Controllers/Api/AdminCustomerController.php[m
	[31mmodified:   backend/app/Http/Controllers/Api/AdminDashboardController.php[m
	[31mmodified:   backend/app/Http/Controllers/Api/PublicCatalogController.php[m
	[31mmodified:   backend/app/Http/Resources/BookResource.php[m
	[31mmodified:   backend/app/Models/Book.php[m
	[31mmodified:   backend/app/Services/Auth/AuthService.php[m
	[31mmodified:   backend/routes/web.php[m

Untracked files:
  (use "git add <file>..." to include in what will be committed)
	[31mbackend/database_dump.sql[m
	[31mbackend/fix-discounts.js[m
	[31mbackend/fix.php[m
	[31mbackend/public/test.php[m
	[31mbackend/setup.sh[m

no changes added to commit (use "git add" and/or "git commit -a")
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hggit add .[?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hggit commit -m "backend"[?2004l
[main 096538c] backend
 12 files changed, 366 insertions(+), 5 deletions(-)
 create mode 100644 backend/database_dump.sql
 create mode 100644 backend/fix-discounts.js
 create mode 100644 backend/fix.php
 create mode 100644 backend/public/test.php
 create mode 100644 backend/setup.sh
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hggit push[?2004l
Enumerating objects: 42, done.
Counting objects:   2% (1/42)Counting objects:   4% (2/42)Counting objects:   7% (3/42)Counting objects:   9% (4/42)Counting objects:  11% (5/42)Counting objects:  14% (6/42)Counting objects:  16% (7/42)Counting objects:  19% (8/42)Counting objects:  21% (9/42)Counting objects:  23% (10/42)Counting objects:  26% (11/42)Counting objects:  28% (12/42)Counting objects:  30% (13/42)Counting objects:  33% (14/42)Counting objects:  35% (15/42)Counting objects:  38% (16/42)Counting objects:  40% (17/42)Counting objects:  42% (18/42)Counting objects:  45% (19/42)Counting objects:  47% (20/42)Counting objects:  50% (21/42)Counting objects:  52% (22/42)Counting objects:  54% (23/42)Counting objects:  57% (24/42)Counting objects:  59% (25/42)Counting objects:  61% (26/42)Counting objects:  64% (27/42)Counting objects:  66% (28/42)Counting objects:  69% (29/42)Counting objects:  71% (30/42)Counting objects:  73% (31/42)Counting objects:  76% (32/42)Counting objects:  78% (33/42)Counting objects:  80% (34/42)Counting objects:  83% (35/42)Counting objects:  85% (36/42)Counting objects:  88% (37/42)Counting objects:  90% (38/42)Counting objects:  92% (39/42)Counting objects:  95% (40/42)Counting objects:  97% (41/42)Counting objects: 100% (42/42)Counting objects: 100% (42/42), done.
Delta compression using up to 8 threads
Compressing objects:   4% (1/23)Compressing objects:   8% (2/23)Compressing objects:  13% (3/23)Compressing objects:  17% (4/23)Compressing objects:  21% (5/23)Compressing objects:  26% (6/23)Compressing objects:  30% (7/23)Compressing objects:  34% (8/23)Compressing objects:  39% (9/23)Compressing objects:  43% (10/23)Compressing objects:  47% (11/23)Compressing objects:  52% (12/23)Compressing objects:  56% (13/23)Compressing objects:  60% (14/23)Compressing objects:  65% (15/23)Compressing objects:  69% (16/23)Compressing objects:  73% (17/23)Compressing objects:  78% (18/23)Compressing objects:  82% (19/23)Compressing objects:  86% (20/23)Compressing objects:  91% (21/23)Compressing objects:  95% (22/23)Compressing objects: 100% (23/23)Compressing objects: 100% (23/23), done.
Writing objects:   4% (1/24)Writing objects:   8% (2/24)Writing objects:  12% (3/24)Writing objects:  16% (4/24)Writing objects:  20% (5/24)Writing objects:  25% (6/24)Writing objects:  29% (7/24)Writing objects:  33% (8/24)Writing objects:  37% (9/24)Writing objects:  41% (10/24)Writing objects:  45% (11/24)Writing objects:  50% (12/24)Writing objects:  54% (13/24)Writing objects:  58% (14/24)Writing objects:  62% (15/24)Writing objects:  66% (16/24)Writing objects:  70% (17/24)Writing objects:  75% (18/24)Writing objects:  79% (19/24)Writing objects:  83% (20/24)Writing objects:  87% (21/24)Writing objects:  91% (22/24)Writing objects:  95% (23/24)Writing objects: 100% (24/24)Writing objects: 100% (24/24), 7.58 KiB | 2.53 MiB/s, done.
Total 24 (delta 14), reused 0 (delta 0), pack-reused 0 (from 0)
remote: Resolving deltas:   0% (0/14)[Kremote: Resolving deltas:   7% (1/14)[Kremote: Resolving deltas:  14% (2/14)[Kremote: Resolving deltas:  21% (3/14)[Kremote: Resolving deltas:  28% (4/14)[Kremote: Resolving deltas:  35% (5/14)[Kremote: Resolving deltas:  42% (6/14)[Kremote: Resolving deltas:  50% (7/14)[Kremote: Resolving deltas:  57% (8/14)[Kremote: Resolving deltas:  64% (9/14)[Kremote: Resolving deltas:  71% (10/14)[Kremote: Resolving deltas:  78% (11/14)[Kremote: Resolving deltas:  85% (12/14)[Kremote: Resolving deltas:  92% (13/14)[Kremote: Resolving deltas: 100% (14/14)[Kremote: Resolving deltas: 100% (14/14), completed with 14 local objects.[K
To github.com:boncadev2/toko-buku.git
   7f367ae..096538c  main -> main
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hccd frontend[1m/[0m[0m [?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mgrep -R "process.env" \[27m
[7m  --exclude-dir=node_modules \[27m[K
[7m  --exclude-dir=.next \[27m[K[A[A[22C[27mg[27mr[27me[27mp[27m [27m-[27mR[27m [27m"[27mp[27mr[27mo[27mc[27me[27ms[27ms[27m.[27me[27mn[27mv[27m"[27m [27m\[1B[27m [27m [27m-[27m-[27me[27mx[27mc[27ml[27mu[27md[27me[27m-[27md[27mi[27mr[27m=[27mn[27mo[27md[27me[27m_[27mm[27mo[27md[27mu[27ml[27me[27ms[27m [27m\[1B[27m [27m [27m-[27m-[27me[27mx[27mc[27ml[27mu[27md[27me[27m-[27md[27mi[27mr[27m=[27m.[27mn[27me[27mx[27mt[27m [27m\[?2004l
[0m[27m[24m[J> [K[?2004h[?2004l
./patch-cari.js:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./patch-shelves.js:  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);'
./patch.js:  'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })\n      .then(async (response) => { if (!response.ok) throw new Error("Sesi tidak valid"); return response.json(); })\n      .then((response) => { setUser(response.data); setAuthLoading(false); })\n      .catch(() => { localStorage.removeItem("token"); setAuthLoading(false); });'
./patch-state.js:  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);'
./src/app/sitemap.js:export default function sitemap() { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080"; return ["/","/cari","/buku/laut-bercerita","/buku/atomic-habits"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
./src/app/akun/profil/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/health`).then(async (response) => { if (!response.ok) throw new Error("Health check failed"); return response.json(); }).then(({ data }) => setHealth(data)).catch(() => setHealthError(true));
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`, { headers: { Accept: "application/json" } }).then((response) => response.ok ? response.json() : null).then((payload) => setMarketplace((old) => ({ ...old, ...(payload?.data || {}) }))).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })
./src/app/admin/pengaturan/page.jsx:      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/admin/settings`, { method: "POST", headers: adminHeaders(), body });
./src/app/admin/produk/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/checkout/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/keranjang/page.jsx:const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/cari/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/robots.js:export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080"}/sitemap.xml` }; }
./src/app/buku/[slug]/client.jsx:const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/StoreFooter.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/MarketplaceFloatingButtons.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/MarketplaceFloatingButtons.jsx:    ["Shopee", settings.shopee_url || process.env.NEXT_PUBLIC_SHOPEE_URL || "", "bg-[#EE4D2D]", <ShopeeLogo key="shopee" />],
./src/components/MarketplaceFloatingButtons.jsx:    ["Tokopedia", settings.tokopedia_url || process.env.NEXT_PUBLIC_TOKOPEDIA_URL || "", "bg-[#42B549]", <TokopediaLogo key="tokopedia" />],
./src/components/MarketplaceFloatingButtons.jsx:    ["WhatsApp", settings.whatsapp_url || process.env.NEXT_PUBLIC_WHATSAPP_URL || "", "bg-[#25D366]", <WhatsAppLogo key="whatsapp" />],
./src/lib/api.js:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hcclear[?2004l
[H[2J[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mcd frontend[27m
[K
[7mgrep -R "process.env" \[27m[K
[7m  --exclude-dir=node_modules \[27m[K
[7m  --exclude-dir=.next \[27m[K
[7m  .[27m[K[5A[42C[27mc[27md[27m [27mf[27mr[27mo[27mn[27mt[27me[27mn[27md[2B[27mg[27mr[27me[27mp[27m [27m-[27mR[27m [27m"[27mp[27mr[27mo[27mc[27me[27ms[27ms[27m.[27me[27mn[27mv[27m"[27m [27m\[1B[27m [27m [27m-[27m-[27me[27mx[27mc[27ml[27mu[27md[27me[27m-[27md[27mi[27mr[27m=[27mn[27mo[27md[27me[27m_[27mm[27mo[27md[27mu[27ml[27me[27ms[27m [27m\[1B[27m [27m [27m-[27m-[27me[27mx[27mc[27ml[27mu[27md[27me[27m-[27md[27mi[27mr[27m=[27m.[27mn[27me[27mx[27mt[27m [27m\[1B[27m [27m [27m.[?2004l
cd: no such file or directory: frontend
./patch-cari.js:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./patch-shelves.js:  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);'
./patch.js:  'fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })\n      .then(async (response) => { if (!response.ok) throw new Error("Sesi tidak valid"); return response.json(); })\n      .then((response) => { setUser(response.data); setAuthLoading(false); })\n      .catch(() => { localStorage.removeItem("token"); setAuthLoading(false); });'
./patch-state.js:  '$&\n    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);'
./src/app/sitemap.js:export default function sitemap() { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080"; return ["/","/cari","/buku/laut-bercerita","/buku/atomic-habits"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() })); }
./src/app/akun/profil/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/health`).then(async (response) => { if (!response.ok) throw new Error("Health check failed"); return response.json(); }).then(({ data }) => setHealth(data)).catch(() => setHealthError(true));
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/settings`, { headers: { Accept: "application/json" } }).then((response) => response.ok ? response.json() : null).then((payload) => setMarketplace((old) => ({ ...old, ...(payload?.data || {}) }))).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=promo&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setPromoBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=newest&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setLatestBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/books?sort=bestseller&per_page=4`).then((r) => r.ok ? r.json() : null).then((payload) => payload?.data && setBestsellerBooks(payload.data)).catch(() => null);
./src/app/page.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/page.jsx:    fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/auth/me`, { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } })
./src/app/admin/pengaturan/page.jsx:      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api"}/admin/settings`, { method: "POST", headers: adminHeaders(), body });
./src/app/admin/produk/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/checkout/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/keranjang/page.jsx:const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/cari/page.jsx:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/app/robots.js:export default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080"}/sitemap.xml` }; }
./src/app/buku/[slug]/client.jsx:const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/StoreFooter.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/MarketplaceFloatingButtons.jsx:    const base = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
./src/components/MarketplaceFloatingButtons.jsx:    ["Shopee", settings.shopee_url || process.env.NEXT_PUBLIC_SHOPEE_URL || "", "bg-[#EE4D2D]", <ShopeeLogo key="shopee" />],
./src/components/MarketplaceFloatingButtons.jsx:    ["Tokopedia", settings.tokopedia_url || process.env.NEXT_PUBLIC_TOKOPEDIA_URL || "", "bg-[#42B549]", <TokopediaLogo key="tokopedia" />],
./src/components/MarketplaceFloatingButtons.jsx:    ["WhatsApp", settings.whatsapp_url || process.env.NEXT_PUBLIC_WHATSAPP_URL || "", "bg-[#25D366]", <WhatsAppLogo key="whatsapp" />],
./src/lib/api.js:const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hcclear[?2004l
[H[2J[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mcd frontend[27m
[7mnano src/app/robots.js[27m[K[A[23C[27mc[27md[27m [27mf[27mr[27mo[27mn[27mt[27me[27mn[27md[1B[27mn[27ma[27mn[27mo[27m [27ms[27mr[27mc[27m/[27ma[27mp[27mp[27m/[27mr[27mo[27mb[27mo[27mt[27ms[27m.[27mj[27ms[?2004l
cd: no such file or directory: frontend
[?1049h[1;12r[1;1H[J[7m  UW PICO 5.09                                                                New Buffer                                                                  [27m[11;1H[K[12;1H[K[11;1H[7m^[27m[7mG[27m Get Help              [7m^[27m[7mO[27m WriteOut              [7m^[27m[7mR[27m Read File             [7m^[27m[7mY[27m Prev Pg               [7m^[27m[7mK[27m Cut Text              [7m^[27m[7mC[27m Cur Pos               [K[12;1H[7m^[27m[7mX[27m Exit                  [7m^[27m[7mJ[27m Justify               [7m^[27m[7mW[27m Where is              [7m^[27m[7mV[27m Next Pg               [7m^[27m[7mU[27m UnCut Text            [7m^[27m[7mT[27m To Spell              [K[3;1H[10;1H                                                                                                                                                          [10;70H[7m[ Reading file ][27m[10;1H                                                                                                                                                          [10;70H[7m[ Read 1 line ][27m[1;1H[J[7m  UW PICO 5.09                                                         File: src/app/robots.js                                                            [27m[3;1Hexport default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080$[11;1H[K[12;1H[K[11;1H[7m^[27m[7mG[27m Get Help              [7m^[27m[7mO[27m WriteOut              [7m^[27m[7mR[27m Read File             [7m^[27m[7mY[27m Prev Pg               [7m^[27m[7mK[27m Cut Text              [7m^[27m[7mC[27m Cur Pos               [K[12;1H[7m^[27m[7mX[27m Exit                  [7m^[27m[7mJ[27m Justify               [7m^[27m[7mW[27m Where is              [7m^[27m[7mV[27m Next Pg               [7m^[27m[7mU[27m UnCut Text            [7m^[27m[7mT[27m To Spell              [K[3;1H[10;1H                                                                                                                                                          [10;66H[7m[ Unknown Command: ^Z ][27m[3;1H[10;1H                                                                                                                                                          [10;66H[7m[ Unknown Command: ^Z ][27m[3;1H[10;1H                                                                                                                                                          [10;54H[7m[ line 1 of 2 (50%), character 0 of 174 (0%) ][27m[3;1H[11;1H[K[12;1H[K[?1049l[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mcd frontend[27m
[7mnano src/app/robots.js[27m[K[A[23C[27mc[27md[27m [27mf[27mr[27mo[27mn[27mt[27me[27mn[27md[1B[27mn[27ma[27mn[27mo[27m [27ms[27mr[27mc[27m/[27ma[27mp[27mp[27m/[27mr[27mo[27mb[27mo[27mt[27ms[27m.[27mj[27ms[?2004l
cd: no such file or directory: frontend
[?1049h[1;12r[1;1H[J[7m  UW PICO 5.09                                                                New Buffer                                                                  [27m[11;1H[K[12;1H[K[11;1H[7m^[27m[7mG[27m Get Help              [7m^[27m[7mO[27m WriteOut              [7m^[27m[7mR[27m Read File             [7m^[27m[7mY[27m Prev Pg               [7m^[27m[7mK[27m Cut Text              [7m^[27m[7mC[27m Cur Pos               [K[12;1H[7m^[27m[7mX[27m Exit                  [7m^[27m[7mJ[27m Justify               [7m^[27m[7mW[27m Where is              [7m^[27m[7mV[27m Next Pg               [7m^[27m[7mU[27m UnCut Text            [7m^[27m[7mT[27m To Spell              [K[3;1H[10;1H                                                                                                                                                          [10;70H[7m[ Reading file ][27m[10;1H                                                                                                                                                          [10;70H[7m[ Read 1 line ][27m[1;1H[J[7m  UW PICO 5.09                                                         File: src/app/robots.js                                                            [27m[3;1Hexport default function robots() { return { rules: { userAgent: "*", allow: "/" }, sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8080$[11;1H[K[12;1H[K[11;1H[7m^[27m[7mG[27m Get Help              [7m^[27m[7mO[27m WriteOut              [7m^[27m[7mR[27m Read File             [7m^[27m[7mY[27m Prev Pg               [7m^[27m[7mK[27m Cut Text              [7m^[27m[7mC[27m Cur Pos               [K[12;1H[7m^[27m[7mX[27m Exit                  [7m^[27m[7mJ[27m Justify               [7m^[27m[7mW[27m Where is              [7m^[27m[7mV[27m Next Pg               [7m^[27m[7mU[27m UnCut Text            [7m^[27m[7mT[27m To Spell              [K[3;1H[11;1H[K[12;1H[K[?1049l[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004h[7mnpm run build[27m[13D[27mn[27mp[27mm[27m [27mr[27mu[27mn[27m [27mb[27mu[27mi[27ml[27md[?2004l

> frontend@0.1.0 build
> next build

[1G[0K[1m[38;2;173;127;168m▲ Next.js 16.3.5[39m[22m (Turbopack)
[32m[1m✓[22m[39m Running next.config.mjs took 9ms

[37m[1m [22m[39m Creating an optimized production build ...
[32m[1m✓[22m[39m Compiled successfully in 1604ms
[?25l[37m[1m [22m[39m Running TypeScript  [36m.[39m[2K[1G[?25h[?25l[37m[1m [22m[39m Finished TypeScript in 3ms  [36m.[39m[2K[1G[?25h[37m[1m [22m[39m Finished TypeScript in 3ms    [32m[1m✓[22m[39m Finished TypeScript in 3ms 
[?25l[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m..[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m...[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m..[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m...[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m..[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m...[39m[2K[1G[37m[1m [22m[39m Collecting page data using 7 workers  [36m.[39m[2K[1G[?25h[37m[1m [22m[39m Collecting page data using 7 workers in 1986ms    [32m[1m✓[22m[39m Collecting page data using 7 workers in 1986ms 
[?25l[37m[1m [22m[39m Generating static pages using 7 workers (0/38)  [36m[    ][39m[2K[1G[37m[1m [22m[39m Generating static pages using 7 workers (8/38)  [36m[=   ][39m[2K[1G[?25h[32m[1m✓[22m[39m Generating static pages using 7 workers (38/38) in 343ms
[?25l[37m[1m [22m[39m Finalizing page optimization  [36m.[39m[2K[1G[37m[1m [22m[39m Finalizing page optimization  [36m..[39m[2K[1G[37m[1m [22m[39m Finalizing page optimization  [36m...[39m[2K[1G[?25h[37m[1m [22m[39m Finalizing page optimization in 569ms    [32m[1m✓[22m[39m Finalizing page optimization in 569ms 

[4mRoute (app)[24m
┌ ○ /
├ ○ /_not-found
├ ○ /admin
├ ○ /admin/inventori
├ ○ /admin/keuangan
├ ○ /admin/pelanggan
├ ○ /admin/pengaturan
├ ○ /admin/pesanan
├ ○ /admin/produk
├ ○ /akun
├ ○ /akun/alamat
├ ○ /akun/pesanan
├ ○ /akun/profil
├   /auth/[mode]
│ ├ ● /auth/login
│ ├ ● /auth/register
│ └ ● /auth/forgot-password
├   /buku/[slug]
│ ├ ● /buku/laut-bercerita
│ ├ ● /buku/bumi-manusia
│ ├ ● /buku/atomic-habits
│ └ ● [+5 more paths]
├ ○ /cari
├ ○ /checkout
├   /info/[slug]
│ ├ ● /info/tentang-kami
│ ├ ● /info/syarat-ketentuan
│ ├ ● /info/kebijakan-privasi
│ └ ● [+4 more paths]
├ ○ /keranjang
├ ○ /robots.txt
└ ○ /sitemap.xml


○  (Static)  prerendered as static content
●  (SSG)     prerendered as static HTML (uses [36mgenerateStaticParams[39m)

[?25h[1G[0K⠙[1G[0K[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro frontend % [K[?2004hccd ..[?2004l
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004hggit status[?2004l
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	[31mmodified:   backend/setup.sh[m
	[31mmodified:   frontend/src/app/robots.js[m
	[31mmodified:   frontend/src/app/sitemap.js[m

no changes added to commit (use "git add" and/or "git commit -a")
[1m[7m%[27m[1m[0m                                                                                                                                                          [0m[27m[24m[Jmacbookprom1@Macbooks-MacBook-Pro toko-buku % [K[?2004h