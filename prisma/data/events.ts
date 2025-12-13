type Event = {
  slug: string;
  name: string;
  imageUrl: string | null;
  description: string;
  locationSlug: string;
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
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/16bc6d2d-32f6-4db7-88b9-25ea45adcd27/-/preview/800x1000",
    description:
      "Jejakkan langkahmu menyusuri sejarah dari Trowulan Mojokerto menuju Universitas Brawijaya Malang.",
    locationSlug: "gw-food-grand-wisata", // fallback Bekasi
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://www.instagram.com/p/DQYyzrzgejt",
    registrationFee: 300000,
  },
  {
    slug: "nusanta-run",
    name: "NusantaRun",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/549cd610-3985-445f-81fc-5cfb0f7cab0f/-/preview/800x1000",
    description:
      "Ultra marathon charity event raising awareness and funds for education across Indonesia.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://www.nusantarun.com",
    registrationFee: 13000000,
  },
  {
    slug: "ui-ultra",
    name: "UI Ultra",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/fe305651-bc99-4dfe-bdf0-91541c63e88e/-/preview/800x1000",
    description: "Pengalaman lari penuh energi di penghujung tahun.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-06T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://uiultra.com",
    registrationFee: 1400000,
  },
  {
    slug: "gorontalo-half-marathon",
    name: "Gorontalo Half Marathon",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/d2ad3667-5434-4bf8-96a5-f2cc50557893/-/preview/800x1000",
    description: "Event lari tahunan dalam rangka HUT Provinsi Gorontalo.",
    locationSlug: "gw-food-grand-wisata",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://gorontalohalfmarathon.id",
    registrationFee: 40000,
  },
  {
    slug: "air-force-run",
    name: "Air Force Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "Lomba lari Air Force Run 2025 di Lanud Halim.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://airforcerun96.id",
    registrationFee: 375000,
  },
  {
    slug: "wonderkindness-fun-run",
    name: "Wonderkindness Fun Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "Wonderkindness Fun Run di ISC.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-03T00:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-03T23:59:00+07:00"),
    registrationUrl: "https://tiketqu.pro/product/wokefunrun",
    registrationFee: 265000,
  },
  {
    slug: "oxy-fun-run-2026",
    name: "Oxy Fun Run 2026",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "Oxy Fun Run 2026 di Jombang.",
    locationSlug: "tenis-indoor-jombang",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-04T00:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-04T23:59:00+07:00"),
    registrationUrl: "https://oxyparfume.com/funrun",
    registrationFee: 149000,
  },
  {
    slug: "vn-run-ponorogo",
    name: "VN Run Ponorogo",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "VN Run di HOS VN Clothes Store Ponorogo.",
    locationSlug: "hos-vn-clothes-store-ponorogo",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-04T00:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-04T23:59:00+07:00"),
    registrationUrl: "https://gelar.in/event/vnrun",
    registrationFee: 35000,
  },
  {
    slug: "bali-ultra-trail",
    name: "Bali Ultra Trail",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "Bali Ultra Trail di Bedugul.",
    locationSlug: "bedugul",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-10T00:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-10T23:59:00+07:00"),
    registrationUrl: "https://worldsmarathons.com/marathon/bali-ultra-trail",
    registrationFee: 880000,
  },
  {
    slug: "esalta-fun-run-2026",
    name: "Esalta Fun Run 2026",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/308442d4-1845-4a62-b9ab-20c1810ebbe7/-/preview/800x1000",
    description: "Esalta Fun Run 2026 di Bekasi.",
    locationSlug: "gw-food-grand-wisata",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-11T00:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-11T23:59:00+07:00"),
    registrationUrl: "https://esaltra.com/funrun2026",
    registrationFee: 180000,
  },
  {
    slug: "mainsepeda-malang-century-journey-2025",
    name: "MAINSEPEDA MALANG CENTURY JOURNEY 2025",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/9307d7fc-5c45-4a48-8193-777fe6a46700/-/preview/201x251",
    description: "Event sepeda menantang sejauh 160 km.",
    locationSlug: "gw-food-grand-wisata",
    categorySlug: "biking",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://mainsepeda.id/event/malang-century-journey-2025",
    registrationFee: 400000,
  },
  {
    slug: "garuda-youth-swim-series-1",
    name: "Garuda Youth Swim Series 1",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/9cf312aa-41fc-473d-9796-9365c236a19b/-/preview/194x259",
    description: "Garuda Youth Swim Series di Ciracas.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "swimming",
    dateTimeStart: new Date("2025-12-07T00:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-07T23:59:00+07:00"),
    registrationUrl: "https://garudayouthswim.com",
    registrationFee: 375000,
  },
];
