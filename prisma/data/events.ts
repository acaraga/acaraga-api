type Event = {
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  location: string;
  categorySlug: string;
  dateTimeStart: Date;
  dateTimeEnd: Date;
  registrationUrl: string;
  registrationFee: number;
};

export const dataEvents: Event[] = [
  {
    slug: "napak-tilas-raden-wijaya",
    name: "Napak Tilas Raden Wijaya",
    imageUrl: null,
    description:
      "Jejakkan langkahmu menyusuri sejarah dari Trowulan Mojokerto menuju Universitas Brawijaya Malang, sejauh 70 KM dengan elevasi menantang 1600 MDPL!",
    location: "Mojokerto",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://www.instagram.com/p/DQYyzrzgejt",
    registrationFee: 300000,
  },
  {
    slug: "nusanta-run",
    name: "NusantaRun",
    imageUrl: null,
    description:
      "Yayasan Lari Nusantara is the founder and organizer of NusantaRun, an annual ultra marathon charity event who go the distance—city by city—to raise awareness and funds for education in underserved communities across Indonesia.",
    location: "Indonesia",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://www.nusantarun.com",
    registrationFee: 13000000,
  },
  {
    slug: "ui-ultra",
    name: "UI Ultra",
    imageUrl: null,
    description:
      "Bersiaplah untuk menyalakan pengalaman lari yang tak terlupakan dan penuh energi di penghujung tahun 2025",
    location: "Depok",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://uiultra.com",
    registrationFee: 1400000,
  },
  {
    slug: "mainsepeda-malang-century-journey-2025",
    name: "MAINSEPEDA MALANG CENTURY JOURNEY 2025",
    imageUrl: null,
    description:
      "Bekerja sama dengan Pemerintah Kota Malang, event ini akan menantang kita untuk menaklukkan rute Century Mile, sekitar 160 km.  Start dan Finish di Balai Kota Malang, kita akan menyusuri tempat-tempat keren dan segmen-segmen seru.",
    location: "Malang",
    categorySlug: "biking",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://mainsepeda.id/event/malang-century-journey-2025",
    registrationFee: 400000,
  },
  {
    slug: "garuda-youth-swim-series-1",
    name: "Garuda Youth Swim Series 1",
    imageUrl: null,
    description: "Garuda Youth Swim Series 1 2025 di Ciracas",
    location: "Ciracas",
    categorySlug: "swimming",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://garudayouthswim.com",
    registrationFee: 375000,
  },
];
