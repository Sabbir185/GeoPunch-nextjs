import { PrismaClient, UserStatus, Roles } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const seed = async () => {
  try {
    console.log("Seeding started...");
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user = await prisma.user.upsert({
      where: { email: "admin@gmail.com" },
      update: {},
      create: {
        name: "Mr. Admin",
        email: "admin@gmail.com",
        phone: "0123456789",
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        role: Roles.ADMIN,
      },
    });
    return user;
  } catch (error) {
    console.error("Error in seeding:", error);
  } finally {
    await prisma.$disconnect();
    console.log("Seeding completed.");
  }
};

seed()
  .then(() => {
    console.log("Seed script finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seed script failed:", error);
    process.exit(1);
  });
