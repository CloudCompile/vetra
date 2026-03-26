import { NextRequest } from 'next/server';
import { isAdmin } from './auth';

export async function assertAdminAccess(_request: NextRequest): Promise<boolean> {
  void _request;
  return isAdmin();
}
