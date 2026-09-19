const fs = require('fs');

let content = fs.readFileSync('src/app/checkout/page.jsx', 'utf8');

const originalLogic = `        const selectedIds=savedIds.length?savedIds:availableIds;
        setItemIds(selectedIds); localStorage.setItem("checkout_item_ids",JSON.stringify(selectedIds));`;

const newLogic = `        const selectedIds=savedIds.length?savedIds:availableIds;
        if (!selectedIds.length) {
          window.location.href = localStorage.getItem("token") ? "/akun/pesanan" : "/keranjang";
          return;
        }
        setItemIds(selectedIds); localStorage.setItem("checkout_item_ids",JSON.stringify(selectedIds));`;

content = content.replace(originalLogic, newLogic);
fs.writeFileSync('src/app/checkout/page.jsx', content);

