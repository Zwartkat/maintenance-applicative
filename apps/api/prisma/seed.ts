import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const professorsData = [
  {
    firstName: "Remus",
    lastName: "Corza",
    officeNumber: 123,
  },
  {
    firstName: "Romulus",
    lastName: "Solave",
    officeNumber: 123,
  },
  {
    firstName: "Christianne",
    lastName: "Lentre",
    officeNumber: 130,
  },
  {
    firstName: "Emmanuel",
    lastName: "Vandenpoul",
    officeNumber: 130,
  },
  {
    firstName: "Francis",
    lastName: "Costelle",
    officeNumber: 130,
  },
  {
    firstName: "Lauranne",
    lastName: "Bolter",
    officeNumber: 124,
  },
  {
    firstName: "Amira",
    lastName: "Bradan",
    officeNumber: 120,
  },
  {
    firstName: "Daniel",
    lastName: "Chef",
    officeNumber: 130,
  },
  {
    firstName: "Cristiano",
    lastName: "Lovoie",
    officeNumber: 120,
  },
  {
    firstName: "Estelle",
    lastName: "Delinguen",
    officeNumber: 120,
  },
  {
    firstName: "Maxime",
    lastName: "Gallier",
    officeNumber: 130,
  },
  {
    firstName: "Rose",
    lastName: "Rodriguez",
    officeNumber: 120,
  },
  {
    firstName: "Iman",
    lastName: "Korneki",
    officeNumber: 120,
  },
  {
    firstName: "Annie",
    lastName: "Cadot",
    officeNumber: 130,
  },
  {
    firstName: "Emeline",
    lastName: "Molecco",
    officeNumber: 117,
  },
  {
    firstName: "Gauthier",
    lastName: "Fortau",
    officeNumber: null,
  },
  {
    firstName: "Damien",
    lastName: "Dossar",
    officeNumber: null,
  },
  {
    firstName: "Nicolas",
    lastName: "Liert",
    officeNumber: null,
  },
  {
    firstName: "Francky",
    lastName: "Wielen",
    officeNumber: null,
  },
  {
    firstName: "Lorence",
    lastName: "Delapierre",
    officeNumber: 39,
  },
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
