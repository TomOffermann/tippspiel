export async function comparePasswords(passwordA:string, passwordB:string):Promise<boolean> {
  return passwordA === passwordB;
}