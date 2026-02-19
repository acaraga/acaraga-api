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
    passwordHash: "$2b$10$examplehashedpasswordreplacewithrealhash", // nanti kita ganti
  },
];
