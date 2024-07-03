import prisma from '@repo/db/client'
import bcrypt from 'bcryptjs';

async function main() {
  try {

    const alicePassword = await bcrypt.hash('alice', 10)
    const bobPassword = await bcrypt.hash('bob', 10)

    const alice = await prisma.user.upsert({
      where: { number: '9999999999' },
      update: {},
      create: {
        number: '9999999999',
        password: alicePassword,
        name: 'alice',
        onramptransactions: {
          create: {
            createdAt: new Date(),
            status: "Success",
            amount: 20000,
            token: "122",
            provider: "HDFC Bank",
          },
        },
      },
    })

    const bob = await prisma.user.upsert({
      where: { number: '9999999998' },
      update: {},
      create: {
        number: '9999999998',
        password: bobPassword,
        name: 'bob',
        onramptransactions: {
          create: {
            createdAt: new Date(),
            status: "Failure",
            amount: 2000,
            token: "123",
            provider: "HDFC Bank",
          },
        },
      },
    })

    console.log({ alice, bob })
  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
