# API Reference

## Endpoints
- `POST /api/v1/chat/completions`
- `POST /api/v1/chat/completions/stream`
- `GET /api/v1/models`
- `GET|POST|DELETE /api/v1/keys`
- `DELETE /api/v1/keys/{id}`
- `GET /api/v1/account`
- `GET|POST /api/v1/plans`
- `GET|PUT|DELETE /api/v1/plans/{id}`
- `GET /api/health`
- `GET /api/ready`

## OpenAI Compatibility
The chat completion routes return OpenAI-compatible responses, including SSE streaming chunks for `stream: true`.
Set your client base URL to `/api/v1` and send an API key in the `Authorization: Bearer <key>` header.
