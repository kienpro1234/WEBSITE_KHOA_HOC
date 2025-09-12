// // prisma/seed.ts
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
