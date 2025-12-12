type Location = {
  slug: string;
  name: string;
  address: string;
  city: string;
  province: string;
  latitude: number | null;
  longitude: number | null;
};

export const dataLocations: Location[] = [
  {
    slug: "indonesia-science-center-isc",
    name: "Indonesia Science Center (ISC)",
    address:
      "Jl. Raya Tmii, Jl. Taman Mini Indonesia Indah, RW.10, Ceger, Kec. Cipayung, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13820",
    city: "Jakarta Timur",
    province: "DKI Jakarta",
    latitude: -6.302111453681511,
    longitude: 106.90349749292744,
  },
  {
    slug: "tenis-indoor-jombang",
    name: "Tenis Indoor Jombang",
    address:
      "Jl. Ahmad Yani No.1, Kepanjen, Kec. Jombang, Kabupaten Jombang, Jawa Timur 61418",
    city: "Jombang",
    province: "Jawa Timur",
    latitude: -7.549973211849301,
    longitude: 112.22884004454052,
  },
  {
    slug: "hos-vn-clothes-store-ponorogo",
    name: "HOS VN Clothes Store Ponorogo",
    address:
      "Jl. HOS Cokroaminoto No. 2B, Kec. Ponorogo, Kabupaten Ponorogo, Jawa Timur 63416",
    city: "Ponorogo",
    province: "Jawa Timur",
    latitude: -7.871282620408677,
    longitude: 111.47074414639914,
  },
  {
    slug: "bedugul",
    name: "Bedugul",
    address: "Jl. Bedugul, Candi Kuning, Tabanan Regency, Bali 82191",
    city: "Tabanan",
    province: "Bali",
    latitude: -8.274934831481788,
    longitude: 115.16583463193258,
  },
  {
    slug: "gw-food-grand-wisata",
    name: "GW Food Grand Wisata",
    address:
      "Jl. Grand Wisata Raya, Lambangjaya, Kec. Tambun Selatan, Bekasi 17510",
    city: "Bekasi",
    province: "Jawa Barat",
    latitude: -6.279794926845786,
    longitude: 107.04634712917644,
  },
];
