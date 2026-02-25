type SeedUser = {
  username: string;
  email: string;
  fullName: string;
  role: "USER" | "ORGANIZER";
  passwordHash: string;
};

const DEV_HASH = "REPLACE_WITH_VALID_HASH";
const DEV_ORGANIZER =
  "$argon2id$v=19$m=65536,t=2,p=1$ZGtVERRU1VG8smGEGRhkToBmpkpCq9ixlLk1hDczKEk$aLPby1kQB9qMg/KN5yCWuOmGCgpA29lcShFXlJrkLw8";

export const dataUsers: SeedUser[] = [
  {
    username: "gapurotogapuro",
    email: "gapurotogapuro@acaraga.com",
    fullName: "Gapuro to Gapuro Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_ORGANIZER,
  },
  {
    username: "provaliantsport",
    email: "minionsrun@acaraga.com",
    fullName: "Minion Run Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_ORGANIZER,
  },
  {
    username: "spindorun",
    email: "spindorun@acaraga.com",
    fullName: "SPINDO Run Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_ORGANIZER,
  },
  {
    username: "oxyparfume",
    email: "oxyparfume@acaraga.com",
    fullName: "OXY Parfume Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "lintassentul",
    email: "lintassentul@acaraga.com",
    fullName: "Lintas Sentul Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },

  {
    username: "grandwisata",
    email: "grandwisata@acaraga.com",
    fullName: "Grand Wisata Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "quproindonesia",
    email: "quproindonesia@acaraga.com",
    fullName: "Qupro Indonesia Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "borobuduredurun",
    email: "borobuduredurun@acaraga.com",
    fullName: "Borobudur EduRun Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "embajetbus",
    email: "embajetbus@acaraga.com",
    fullName: "EMBA Jetbus Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "ahpongsentul",
    email: "ahpongsentul@acaraga.com",
    fullName: "Ah Poong Sentul Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "smataruna",
    email: "smataruna@acaraga.com",
    fullName: "Smata Runa Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "liramedika",
    email: "liramedika@acaraga.com",
    fullName: "Lira Medika Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },
  {
    username: "spindorun",
    email: "spindorun@acaraga.com",
    fullName: "SPINDO Run Organizer",
    role: "ORGANIZER",
    passwordHash: DEV_HASH,
  },

  {
    username: "acaraga_user",
    email: "user@acaraga.com",
    fullName: "Acaraga User",
    role: "USER",
    passwordHash: DEV_HASH,
  },
];
