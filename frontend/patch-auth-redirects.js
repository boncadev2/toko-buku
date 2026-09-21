const fs = require('fs');

// Patch 1: Keranjang (keranjang/page.jsx)
let keranjang = fs.readFileSync('src/app/keranjang/page.jsx', 'utf8');
keranjang = keranjang.replace(
  'const checkout = () => { if (!selected.length) return setMessage("Pilih minimal satu buku untuk checkout."); localStorage.setItem("checkout_item_ids", JSON.stringify(selected)); window.location.href="/checkout"; };',
  'const checkout = () => { if (!selected.length) return setMessage("Pilih minimal satu buku untuk checkout."); localStorage.setItem("checkout_item_ids", JSON.stringify(selected)); if (!localStorage.getItem("token")) { window.location.href = "/auth/login?redirect=/checkout"; return; } window.location.href="/checkout"; };'
);
fs.writeFileSync('src/app/keranjang/page.jsx', keranjang);

// Patch 2: Checkout (checkout/page.jsx)
let checkout = fs.readFileSync('src/app/checkout/page.jsx', 'utf8');
checkout = checkout.replace(
  'useEffect(() => {\n    if (!localStorage.getItem("token")) return;',
  'useEffect(() => {\n    if (!localStorage.getItem("token")) { window.location.href = "/auth/login?redirect=/checkout"; return; }'
);
// Also remove the guest form block entirely if we want to clean up, but just checking auth is enough. Let's keep it clean by not doing too much regex matching for the form.
fs.writeFileSync('src/app/checkout/page.jsx', checkout);

// Patch 3: Auth Client (auth/[mode]/client.jsx)
let authClient = fs.readFileSync('src/app/auth/[mode]/client.jsx', 'utf8');
authClient = authClient.replace(
  'router.push(data.data.user?.is_admin ? "/admin" : "/akun");',
  'const redirectParams = new URLSearchParams(window.location.search);\n      const redirectTo = redirectParams.get("redirect") || (data.data.user?.is_admin ? "/admin" : "/akun");\n      router.push(redirectTo);'
);
fs.writeFileSync('src/app/auth/[mode]/client.jsx', authClient);

