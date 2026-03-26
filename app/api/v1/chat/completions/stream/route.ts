import { NextRequest } from 'next/server';
import { handleChatCompletion } from '@/lib/chat-handler';

export async function POST(request: NextRequest) {
  return handleChatCompletion(request, { forceStream: true });
}
