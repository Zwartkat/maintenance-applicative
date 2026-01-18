import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const professorsData = [
  {
    firstName: "Rémi",
    lastName: "Cozot",
    email: "remi.cozot@univ-littoral.fr",
    officeNumber: 123,
  },
  {
    firstName: "Rémi",
    lastName: "Synave",
    email: "remi.synave@univ-littoral.fr",
    officeNumber: 123,
  },
  {
    firstName: "Séverine",
    lastName: "Letrez",
    email: "severine.letrez@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "Samuel",
    lastName: "Delepoulle",
    email: "samuel.delepoulle@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "François",
    lastName: "Rousselle",
    email: "francois.rousselle@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "Floriane",
    lastName: "Bouifer",
    email: "iutinfo@univ-littoral.fr",
    officeNumber: 124,
  },
  {
    firstName: "Amani",
    lastName: "Braham",
    email: "amani.braham@univ-littoral.fr",
    officeNumber: 120,
  },
  {
    firstName: "Dany",
    lastName: "Capitaine",
    email: "dany.capitaine@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "Lionnel",
    lastName: "Conoir",
    email: "lionnel.conoir@univ-littoral.fr",
    officeNumber: 120,
  },
  {
    firstName: "Isabelle",
    lastName: "Delignières",
    email: "isabelle.hannequin@univ-littoral.fr",
    officeNumber: 120,
  },
  {
    firstName: "Kevin",
    lastName: "Guerrier",
    email: "kevin.guerrier@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "Marguerite",
    lastName: "Fernandez",
    email: "marguerite.fernandez@univ-littoral.fr",
    officeNumber: 120,
  },
  {
    firstName: "Insaf",
    lastName: "Kerkeni",
    email: "insaf.kerkeni@univ-littoral.fr",
    officeNumber: 120,
  },
  {
    firstName: "Anne",
    lastName: "Pacou",
    email: "anne.pacou@univ-littoral.fr",
    officeNumber: 130,
  },
  {
    firstName: "Pauline",
    lastName: "Malec",
    email: "pauline.malec@univ-littoral.fr",
    officeNumber: 117,
  },
  {
    firstName: "Emanuelle",
    lastName: "André",
    email: "emmanuelle.andre@univ-littoral.fr",
    officeNumber: null,
  },
  {
    firstName: "Gauthier",
    lastName: "Aufort",
    email: "gauthier.aufort@univ-littoral.fr",
    officeNumber: null,
  },
  {
    firstName: "Dominique",
    lastName: "Dussart",
    email: "dominique.dussart@univ-littoral.fr",
    officeNumber: null,
  },
  {
    firstName: "Nicolas",
    lastName: "Tentillier",
    email: "nicolas.tentillier@univ-littoral.fr",
    officeNumber: null,
  },
  {
    firstName: "Franck",
    lastName: "Vandewiele",
    email: "franck.vandewiele@univ-littoral.fr",
    officeNumber: null,
  },
  {
    firstName: "Florence",
    lastName: "Delpierre",
    email: "florence.delpierre@univ-littoral.fr",
    officeNumber: 39,
  },
];

async function main() {
  console.log("🧹 Nettoyage de la table Professors...");
  await prisma.professor.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: { email: "admin@gmail.com", password: "admin" },
  });

  console.log("👩‍🏫 Ajout des professeurs...");
  const createdProfessors = new Set<string>();
  for (const prof of professorsData) {
    if (createdProfessors.has(prof.email)) continue;
    await prisma.professor.create({
      data: {
        firstName: prof.firstName,
        lastName: prof.lastName,
        email: prof.email,
        officeNumber: prof.officeNumber ?? undefined,
      },
    });
    createdProfessors.add(prof.email);
    console.log(`✅ Ajouté professeur : ${prof.firstName} ${prof.lastName}`);
  }

  console.log("🎉 Professors initialisés !");
}

main()
  .catch((error) => console.error("❌ Erreur principale :", error))
  .finally(() => prisma.$disconnect());
