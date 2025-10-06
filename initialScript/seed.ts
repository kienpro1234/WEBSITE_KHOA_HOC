// // // prisma/seed.ts
// import { PrismaClient } from '@prisma/client'
// import { faker } from '@faker-js/faker'

// const prisma = new PrismaClient()

// async function seedUsers(count: number) {
//   const users = Array.from({ length: count }).map(() => {
//     return {
//       name: faker.person.fullName(),
//       email: faker.internet.email(),
//       password: '123456', // hoặc hash nếu muốn bảo mật
//       phoneNumber: faker.phone.number({ style: 'international' }),
//       roleId: 1, // Role test mặc định, bạn có thể đổi tùy DB
//     }
//   })

//   await prisma.user.createMany({
//     data: users,
//     skipDuplicates: true, // tránh trùng email
//   })

//   console.log(`✅ Đã tạo ${count} user test`)
// }

// seedUsers(20)
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })

import { PrismaClient, Category } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  const categories: Omit<
    Category,
    'id' | 'children' | 'courses' | 'translations' | 'createdBy' | 'updatedBy' | 'deletedBy' | 'parent'
  >[] = []

  for (let i = 0; i < 10; i++) {
    categories.push({
      name: faker.commerce.department(),
      parentId: faker.helpers.arrayElement([null, faker.datatype.number({ min: 1, max: 5 })]),
      createdAt: faker.date.past(1), // chỉ truyền số, không phải object
      updatedAt: new Date(),
      deletedAt: faker.helpers.arrayElement([null, faker.date.recent()]),
      createdById: null,
      updatedById: null,
      deletedById: null,
    })
  }

  await prisma.category.createMany({
    data: categories,
  })

  console.log('✅ Seeded 10 categories!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
