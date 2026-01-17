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
    slug: "gapuro-to-gapuro",
    name: "Gapuro to Gapuro",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/64ce8443-379c-4591-8fe9-cf0c8d7aedb1/-/preview/800x1000",
    description:
      "Gapuro to Gapuro Run Solo adalah event lari yang mengajak peserta menjelajahi keunikan Kota Solo melalui rute ikonik dari satu gapura ke gapura lainnya.",
    locationSlug: "gapuro-kleco",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-04T06:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-04T11:00:00+07:00"),
    registrationUrl: "https://linktr.ee/soloberlari",
    registrationFee: 300000,
  },
  {
    slug: "oxy-fun-run",
    name: "OXY Fun Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/d7f95692-6692-4386-8a5f-d4afe6ca99bf/-/preview/1000x1000",
    description:
      "OXY Fun Run 2026 hadir kembali dengan semangat “Wangi, Glowing, dan Penuh Energi!”",
    locationSlug: "tenis-indoor-jombang",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-04T05:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-04T10:00:00+07:00"),
    registrationUrl: "https://oxyparfume.com/funrun",
    registrationFee: 159000,
  },
  {
    slug: "lintas-sentul-trail-run",
    name: "Lintas Sentul Trail Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/8a85b57b-6d48-4fd1-b8d7-5a467edca53c/-/preview/801x999",
    description:
      "LINTAS SENTUL kembali hadir dengan tema Feel The Jungle. Nikmati pengalaman berlari menyusuri keindahan alam Sentul melalui rute Hutan di kawasan Sentul dan sekitarnya.",
    locationSlug: "camp-de-katarina",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-10T03:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-11T10:10:00+07:00"),
    registrationUrl: "https://lintasentul.com",
    registrationFee: 400000,
  },
  {
    slug: "minion-run-2026",
    name: "Minion Run 2026",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/f2e0ebcc-f7c8-4de5-b3ae-927207b5ceeb/-/preview/800x1000",
    description:
      "Get ready for the most fun-filled run of the year! Join the Minions in an exciting 5K Fun Run filled with energy. Brought to you by Universal, Provaliant, and Lippo Mall Nusantara.",
    locationSlug: "lippo-mall-nusantara",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-11T06:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-11T10:00:00+07:00"),
    registrationUrl: "https://event.tix.id/event/minionrunindonesia",
    registrationFee: 460000,
  },
  {
    slug: "esalta-fun-run",
    name: "Esalta Fun Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/a608b571-4111-4e9b-ab1d-3aa81e39dbff/-/preview/800x1000",
    description:
      "ESALTA FUN RUN 5K 2026 hadir untuk kamu yang ingin memulai tahun dengan ritme yang positif. Nikmati 5 kilometer yang berkesan, penuh tawa dan hangatnya suasana komunitas.",
    locationSlug: "gw-food-grand-wisata",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-11T06:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-11T10:10:00+07:00"),
    registrationUrl:
      "https://esalta-sports.myr.id/event/esalta-fun-run-5k-grand-wisata",
    registrationFee: 180000,
  },
  {
    slug: "wonderkindness-fun-run",
    name: "Wonderkindness Fun Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/5ae66046-cbdf-424a-aecb-a7bb6a2b2ec7/-/preview/800x1000/",
    description:
      "Wonderkindness Fun Run adalah ajang lari sehat yang penuh semangat serta mengusung konsep sportainment untuk menginspirasi gaya hidup aktif dan kebersamaan. Menghadirkan rute lari yang ramah peserta dari berbagai kalangan, kegiatan ini tidak hanya fokus pada olahraga, tetapi juga hiburan, edukasi kesehatan, dan aktivitas keluarga.",
    locationSlug: "indonesia-science-center-isc",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-03T06:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-03T10:00:00+07:00"),
    registrationUrl: "https://tiketqu.pro/product/wokefunrun",
    registrationFee: 265000,
  },
  {
    slug: "borobudur-edurun",
    name: "Borobudur EduRun",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/d703aa80-ee77-4413-935f-e3e586068301/-/preview/800x1000",
    description:
      "Acara Borobudur Edu Run 7 merupakan salah satu acara dari rangkaian kegiatan yang dilaksanakan dalam rangka memperingati ulang tahun ke-7 Nusantara Learning Center. ",
    locationSlug: "gerbang-gajah-kembanglimus",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-18T05:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-18T10:00:00+07:00"),
    registrationUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSeDBCF4uLlXElcc-A5QCubIVJwRPZ-QzCca7jMVrQfygBNdag/viewform",
    registrationFee: 225000,
  },
  {
    slug: "emba-jetbus-run-malang-10k",
    name: "EMBA | JETBUS Run Malang 10K",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/633d4b68-589b-4781-991f-d9d504fafa03/-/preview/800x1000",
    description:
      "Malang 10K 2026 returns with a bold invitation: Push beyond your limits on a course that weaves through the scenic charm of Malang, ignited by the electric spirit of competition and the relentless pace of Indonesias finest runners.",
    locationSlug: "alun-alun-tugu",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-18T05:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-18T10:00:00+07:00"),
    registrationUrl: "https://malangrun10k.com",
    registrationFee: 375000,
  },
  {
    slug: "bogor-color-run-festival",
    name: "Bogor Color Run Festival",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/5e8d406a-d47b-49f5-9455-ad2ff59330ab/-/preview/800x1000",
    description:
      "Siap-siap warnai awal tahunmu dengan keseruan lari penuh warna di kota hujan! Bergabunglah di Bogor Color Run Festival yang akan digelar di Ah Poong Sentul, Bogor pada tanggal 25 Januari 2026.",
    locationSlug: "ah-poong-sentul-city",
    categorySlug: "running",
    dateTimeStart: new Date("2026-01-25T06:00:00+07:00"),
    dateTimeEnd: new Date("2026-01-25T10:00:00+07:00"),
    registrationUrl: "https://colorrunfestival.id/event/bogor",
    registrationFee: 250000,
  },
  {
    slug: "garuda-running-5k",
    name: "Garuda Running 5K",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/e293c43d-fe10-4d8e-aa58-82453f7967ac/-/preview/760x540",
    description:
      "Bersiaplah untuk merasakan ledakan energi dan semangat di G-Fest Run 5K ! Ini bukan sekadar ajang lari biasa, melainkan sebuah perayaan akbar yang menyatukan olahraga, musik, dan komunitas dalam satu acara spektakuler.",
    locationSlug: "lapangan-mengwi",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-25T06:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-25T10:00:00+07:00"),
    registrationUrl: "https://pytixs.com/event/g-fest-5k-running-2026",
    registrationFee: 180000,
  },
  {
    slug: "lira-fun-run-2026",
    name: "LIRA FUN RUN 2026",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/2bf2e823-0343-4840-be7d-a2eabbdd7661/-/preview/800x1000",
    description:
      "LIRA FUN RUN 2026 — LET'S GO! Siap lari dengan kualitas terbaik? Event fun run paling seru di Karawang hadir lagi dengan paket lengkap yang bikin pengalaman lari kamu makin maksimal!",
    locationSlug: "summarecon-villaggio-outlets",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-25T06:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-25T10:00:00+07:00"),
    registrationUrl: "https://www.instagram.com/lirasports.id",
    registrationFee: 215000,
  },
  {
    slug: "spindo-run",
    name: "SPINDO Run",
    imageUrl:
      "https://3zwxtcw6a1.ucarecd.net/a93072e6-b272-431a-b8cb-4dac65e88d3e/-/preview/800x1000",
    description:
      "LIRA FUN RUN 2026 — LET'S GO! Siap lari dengan kualitas terbaik? Event fun run paling seru di Karawang hadir lagi dengan paket lengkap yang bikin pengalaman lari kamu makin maksimal!",
    locationSlug: "grand-city-convex",
    categorySlug: "running",
    dateTimeStart: new Date("2025-12-18T06:00:00+07:00"),
    dateTimeEnd: new Date("2025-12-18T10:00:00+07:00"),
    registrationUrl: "https://www.spindo.com",
    registrationFee: 150000,
  },
];
