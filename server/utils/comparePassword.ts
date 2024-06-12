import bcrypt from 'bcryptjs';

const comparePasswords = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export default comparePasswords;