import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const defaultHash = await bcrypt.hash("ফুলচিত্র", 12);

  await prisma.studioConfig.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      studioName: "ফুলচিত্র",
      curatorName: "স্টুডিও আর্কাইভ",
      curatorBio: "আমাদের একান্ত শিল্প ও স্কেচবুক আর্কাইভ।",
      theme: "paper",
      passwordHash: defaultHash,
    },
  });

  const col1 = await prisma.collection.upsert({
    where: { id: "col-dhaka-chronicles" },
    update: {},
    create: {
      id: "col-dhaka-chronicles",
      name: "পুরান ঢাকা ও বর্ষার দিনলিপি",
      description: "পুরান ঢাকার স্থাপত্য, গোধূলির আলো এবং শ্রাবণের বুড়িগঙ্গা পারাপারের আবহমান চিত্রমালা।",
    },
  });

  const col2 = await prisma.collection.upsert({
    where: { id: "col-quiet-interiors" },
    update: {},
    create: {
      id: "col-quiet-interiors",
      name: "নীরব অন্দরমহল ও প্রতিকৃতি",
      description: "জানালার মৃদু আলো, নিস্তব্ধতা এবং মানবিক প্রতিকৃতির সংবেদনশীল রঙিন অধ্যয়ন।",
    },
  });

  const sampleWorks = [
    {
      id: "art-001",
      title: "পুরান ঢাকার গোধূলি (Old Dhaka)",
      year: "২০২৫",
      medium: "তুলোট কাগজে গুয়াশ ও প্রাকৃতিক রঞ্জক",
      dimensions: "৫৬ × ৭৬ সেমি",
      status: "Finished",
      collectionId: col1.id,
      tags: "পুরান ঢাকা, স্থাপত্য, গোধূলি",
      privateNotes: "লালবাগের একটি পুরনো ছাদ থেকে আঁকা; অস্তগামী সূর্যের সোনালী আভায় পোড়ামাটির গম্বুজগুলো উদ্ভাসিত।",
      svgKey: "old-dhaka",
      favorite: true,
    },
    {
      id: "art-002",
      title: "বর্ষার বুড়িগঙ্গা পারাপার (Monsoon)",
      year: "২০২৬",
      medium: "জলরং ও নীল কালির ওয়াশ",
      dimensions: "৪৫ × ৬০ সেমি",
      status: "Finished",
      collectionId: col1.id,
      tags: "বর্ষা, নদী, বৃষ্টি",
      privateNotes: "শ্রাবণের ঝোড়ো বিকেলে ছইওয়ালা কাঠের নৌকায় নদী পারাপারের মুহূর্ত।",
      svgKey: "monsoon",
      favorite: true,
    },
    {
      id: "art-003",
      title: "বিকেলের আলো ও টেবিল (Afternoon Light)",
      year: "২০২৫",
      medium: "অয়েল প্যাস্টেল ও কেসিন",
      dimensions: "৪০ × ৫০ সেমি",
      status: "Work in Progress",
      collectionId: col2.id,
      tags: "বিকেলের আলো, নিস্তব্ধতা, ছায়া",
      privateNotes: "বিকেল চারটার তির্যক রোদ যখন স্টুডিওর কাঠের টেবিলের ওপর জ্যামিতিক ছায়া ফেলে।",
      svgKey: "afternoon-light",
      favorite: false,
    },
    {
      id: "art-004",
      title: "গেরুয়া ও স্লেট রঙে প্রতিকৃতি (Portrait)",
      year: "২০২৬",
      medium: "লিনেন ক্যানভাসে টেম্পেরা ও চারকোল",
      dimensions: "৫০ × ৬৫ সেমি",
      status: "Finished",
      collectionId: col2.id,
      tags: "প্রতিকৃতি, মুখাবয়ব",
      privateNotes: "শান্ত দৃষ্টি এবং মাটির রঙের আবহে আঁকা একটি অন্তরঙ্গ প্রতিকৃতি।",
      svgKey: "portrait",
      favorite: true,
    },
    {
      id: "art-005",
      title: "উত্তরের জানালা (Window)",
      year: "২০২৫",
      medium: "কাগজে অ্যাক্রিলিক ওয়াশ ও গ্রাফাইট",
      dimensions: "৩৮ × ৪৮ সেমি",
      status: "Sketch",
      collectionId: col2.id,
      tags: "জানালা, অন্দরমহল",
      privateNotes: "মেঘলা সকালের নরম আলো কাঠের খড়খড়ি ভেদ করে মাটির পাত্রের ওপর এসে পড়েছে।",
      svgKey: "window",
      favorite: false,
    },
    {
      id: "art-006",
      title: "নীরবতার পাঠ — ৪ (Silence)",
      year: "২০২৬",
      medium: "মালবেরি কাগজে সুমি কালি",
      dimensions: "৩৫ × ৪৫ সেমি",
      status: "Sketch",
      collectionId: col2.id,
      tags: "নীরবতা, কালি",
      privateNotes: "শূন্যস্থান, গ্রহণ এবং ভারসাম্যের এক ন্যূনতম দার্শনিক অন্বেষণ।",
      svgKey: "silence",
      favorite: false,
    },
  ];

  for (const work of sampleWorks) {
    await prisma.artwork.upsert({
      where: { id: work.id },
      update: {},
      create: work,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
