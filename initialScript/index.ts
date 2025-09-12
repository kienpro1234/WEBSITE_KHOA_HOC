import envConfig from 'src/shared/config'
import { RoleName } from 'src/shared/constants/role.constant'
import { HashingService } from 'src/shared/services/hashing.service'
import { PrismaService } from 'src/shared/services/prisma.service'

const prisma = new PrismaService()
const hashingService = new HashingService()

prisma.$connect()

const main = async () => {
  const roleCount = await prisma.role.count()
  if (roleCount > 0) {
    throw new Error('Roles already exist')
  }

  const roles = await prisma.role.createManyAndReturn({
    data: [
      { name: RoleName.Admin, description: 'Admin role' },
      { name: RoleName.LEARNER, description: 'Learner Role' },
      { name: RoleName.INSTRUCTOR, description: 'Instructor Role' },
    ],
  })

  const adminRole = roles.find((role) => role.name === RoleName.Admin)

  if (!adminRole) {
    throw new Error('Admin role not found')
  }

  const hashedPassword = await hashingService.hash(envConfig.ADMIN_PASSWORD)

  const adminUser = await prisma.user.create({
    data: {
      email: envConfig.ADMIN_EMAIL,
      password: hashedPassword,
      name: envConfig.ADMIN_NAME,
      roleId: adminRole.id,
    },
  })

  return {
    createdRoleCount: roles.length,
    adminUser,
  }
}

main()
  .then((result) => {
    console.log('Database seeding completed successfully:', result)
  })
  .catch((error) => {
    console.error('Error during database seeding:', error)
  })
