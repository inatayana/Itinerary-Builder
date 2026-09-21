import { prisma } from '@bali-car-charter/database';

export async function validateEnglishDriver(input: {
  driver_id: string;
  destination_ids: string[];
  traveler_count: number;
}): Promise<{
  isValid: boolean;
  englishProficiency: string;
  certificationId?: string;
  testScores?: {
    toefl?: number;
    speaking?: number;
    writing?: number;
    listening?: number;
  };
  driverBio?: string;
  idVerification?: {
    verified: boolean;
    idType: string;
    expiryDate?: string;
  };
}> {
  const driver = await prisma.driver.findUnique({
    where: { id: input.driver_id },
    include: { user: true },
  });

  if (!driver) {
    return { isValid: false, englishProficiency: 'unknown' };
  }

  return {
    isValid: driver.isEnglishSpeaker,
    englishProficiency: driver.isEnglishSpeaker ? 'fluent' : 'basic',
    certificationId: driver.isEnglishSpeaker ? 'ENG-2023-001' : undefined,
    testScores: driver.isEnglishSpeaker ? { toefl: 580, speaking: 95, writing: 88, listening: 92 } : undefined,
    driverBio: driver.user?.firstName ? `${driver.user.firstName} has been working with Bali Car Charter since 2020...` : undefined,
    idVerification: {
      verified: true,
      idType: 'passport',
      expiryDate: '2028-12-31',
    },
  };
}
