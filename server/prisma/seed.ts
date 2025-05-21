import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/helpers/bcrypt";

const prisma = new PrismaClient();

async function main() {
  // Hashing password untuk semua user
  const plainPassword = "123456";
  const hashedPassword = hashPassword(plainPassword);

  // Seed Users
  const users = await prisma.user.createMany({
    data: [
      { name: "Nouval", email: "nouval@mail.com", password: hashedPassword },
      { name: "Ayu", email: "dasha@mail.com", password: hashedPassword },
      { name: "Dimas", email: "emma@mail.com", password: hashedPassword },
    ],
  });

  // Ambil user pertama untuk relasi
  const user = await prisma.user.findFirst();

  // Seed Skills
  await prisma.skill.createMany({
    data: [
      {
        name: "JavaScript",
        category: "Frontend",
        status: "Mastered",
        userId: user!.id,
      },
      {
        name: "TypeScript",
        category: "Frontend",
        status: "Learning",
        userId: user!.id,
      },
      {
        name: "SQL",
        category: "Database",
        status: "To Review",
        userId: user!.id,
      },
      {
        name: "React",
        category: "Frontend",
        status: "Mastered",
        userId: user!.id,
      },
      { name: "Prisma", category: "ORM", status: "Learning", userId: user!.id },
    ],
  });

  // Seed Tags
  const tags = await prisma.tag.createMany({
    data: [
      { name: "Fullstack" },
      { name: "API" },
      { name: "Frontend" },
      { name: "Dashboard" },
      { name: "Personal" },
    ],
  });

  // Ambil semua tag dan user
  const tagList = await prisma.tag.findMany();

  // Seed Projects
  const projects = await prisma.project.createMany({
    data: [
      {
        title: "EzGigs",
        description: "Ticketing platform with AI analytics.",
        techStack: "Next.js, MongoDB, TypeScript",
        githubUrl: "https://github.com/nouval/ezgigs",
        deployUrl: "https://ezgigs.vercel.app",
        userId: user!.id,
      },
      {
        title: "MovieFlix",
        description: "Streaming web app with category and pagination.",
        techStack: "React, Tailwind, Vite",
        githubUrl: "https://github.com/nouval/movieflix",
        deployUrl: "https://movieflix.vercel.app",
        userId: user!.id,
      },
      {
        title: "SkillUp",
        description: "Skill tracker app for developers.",
        techStack: "Express, PostgreSQL, Prisma",
        githubUrl: "https://github.com/nouval/skillup",
        deployUrl: "",
        userId: user!.id,
      },
      {
        title: "DevDash",
        description: "Personal dev dashboard with GitHub integration.",
        techStack: "React, Chart.js, Express",
        githubUrl: "https://github.com/nouval/devdash",
        deployUrl: "",
        userId: user!.id,
      },
      {
        title: "TaskZone",
        description: "Todo app with tagging and priorities.",
        techStack: "React, Node.js, Prisma",
        githubUrl: "https://github.com/nouval/taskzone",
        deployUrl: "",
        userId: user!.id,
      },
    ],
  });

  const projectList = await prisma.project.findMany();

  // Seed ProjectTag (many-to-many relasi)
  await prisma.projectTag.createMany({
    data: [
      { projectId: projectList[0].id, tagId: tagList[0].id },
      { projectId: projectList[0].id, tagId: tagList[2].id },
      { projectId: projectList[1].id, tagId: tagList[2].id },
      { projectId: projectList[2].id, tagId: tagList[1].id },
      { projectId: projectList[3].id, tagId: tagList[3].id },
    ],
  });

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
