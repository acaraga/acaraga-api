type SeedUser = {
  username: string;
  email: string;
  fullName: string;
  role: "USER" | "ORGANIZER" | "ADMIN";
  passwordHash: string;
};

export const dataUsers: SeedUser[] = [
  {
    username: "organizer1",
    email: "organizer@acaraga.com",
    fullName: "Acaraga Organizer",
    role: "ORGANIZER",
    passwordHash:
      "$2y$10$SiRoBzaj8K1l26n9DZ935OW5.iCVyMvUocGoN2Zgxe9EpJ2ZH5EJq", // nanti kita ganti
  },
];
