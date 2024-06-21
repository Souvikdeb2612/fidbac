import client from '@/db'

export async function getCurrency(userId:number ) {
  try {
    const user = await client.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        currency: true,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    return user.currency;
  } catch (error) {
    console.error("Error retrieving currency:", error);
    throw error;
  } finally {
    await client.$disconnect();
  }
}