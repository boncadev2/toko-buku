import PenerbitanClient from "./client";

export const metadata = {
  title: "Penerbitan Buku | Vidara Books",
  description:
    "Layanan penerbitan buku Vidara Books: penyuntingan, desain sampul, tata isi, cetak buku, dan adaptasi karya akademik menjadi buku. Paket mulai Rp725.000.",
  openGraph: {
    title: "Penerbitan Buku | Vidara Books",
    description:
      "Layanan penerbitan buku Vidara Books: penyuntingan, desain sampul, tata isi, cetak buku, dan adaptasi karya akademik menjadi buku. Paket mulai Rp725.000.",
    images: ["/penerbitan-hero.webp"],
  },
};

export default function PenerbitanPage() {
  return <PenerbitanClient />;
}
