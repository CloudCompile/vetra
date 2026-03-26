import { isAdmin } from './auth';

export async function assertAdminAccess(): Promise<boolean> {
  return isAdmin();
}
