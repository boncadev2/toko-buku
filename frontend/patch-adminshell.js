const fs = require('fs');
let content = fs.readFileSync('src/components/AdminShell.jsx', 'utf8');

content = content.replace('export default function AdminShell({ title, description, children }) {', 'export default function AdminShell({ title, description, children, headerRight }) {');

const oldHeader = '<div className="rounded-3xl bg-gradient-to-r from-blue-800 to-indigo-700 p-6 text-white shadow-lg sm:p-7"><p className="text-sm font-semibold text-blue-100">{site.app_name || ""} Admin</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-blue-100">{description}</p></div>';

const newHeader = '<div className="rounded-3xl bg-gradient-to-r from-blue-800 to-indigo-700 p-6 text-white shadow-lg sm:p-7 flex flex-col sm:flex-row justify-between sm:items-center gap-4"><div><p className="text-sm font-semibold text-blue-100">{site.app_name || ""} Admin</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">{title}</h1><p className="mt-2 text-sm text-blue-100">{description}</p></div>{headerRight && <div>{headerRight}</div>}</div>';

content = content.replace(oldHeader, newHeader);

fs.writeFileSync('src/components/AdminShell.jsx', content);
