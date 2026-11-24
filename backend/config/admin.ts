export default ({ env }: { env: any }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'admin_jwt_secret_verdant_2026'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'api_token_salt_verdant_2026'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT', 'transfer_token_salt_verdant_2026'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', false),
    promoteEE: env.bool('FLAG_PROMOTE_EE', false),
  },
})
