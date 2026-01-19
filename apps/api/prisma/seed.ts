import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const professorsData = [
  {
    "firstName": "Jiraya",
    "lastName": "Sannin",
    "officeNumber": 1
  },
  {
    "firstName": "Koro",
    "lastName": "Sensei",
    "officeNumber": 3
  },
  {
    "firstName": "Satoru",
    "lastName": "Gojo",
    "officeNumber": 7
  },
  {
    "firstName": "Kakashi",
    "lastName": "Hatake",
    "officeNumber": 6
  },
  {
    "firstName": "Shota",
    "lastName": "Aizawa",
    "officeNumber": 11
  },
  {
    "firstName": "Genkai",
    "lastName": "Toguro",
    "officeNumber": 2
  },
  {
    "firstName": "Izumi",
    "lastName": "Curtis",
    "officeNumber": 14
  },
  {
    "firstName": "All",
    "lastName": "Might",
    "officeNumber": 10
  },
  {
    "firstName": "Silvers",
    "lastName": "Rayleigh",
    "officeNumber": 8
  },
  {
    "firstName": "Master",
    "lastName": "Roshi",
    "officeNumber": 5
  }
];

async function main() {
  console.log("🧹 Nettoyage de la table Professors...");
  await prisma.professor.deleteMany();
  
  console.log("👩‍🏫 Ajout des professeurs...");
  const createdProfessors = new Set<string>();
  for (const prof of professorsData) {
    await prisma.professor.create({
      data: {
        firstName: prof.firstName,
        lastName: prof.lastName,
        officeNumber: prof.officeNumber ?? undefined,
      },
    });
    console.log(`✅ Ajouté professeur : ${prof.firstName} ${prof.lastName}`);
  }

  console.log("🎉 Professors initialisés !");
}

main()
  .catch((error) => console.error("❌ Erreur principale :", error))
  .finally(() => prisma.$disconnect());
