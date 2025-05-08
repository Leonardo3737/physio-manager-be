import bcrypt from 'bcrypt'

export async function encryptPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password, 13)
  return hash
}