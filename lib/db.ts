import { neon } from '@neondatabase/serverless';

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL är inte satt. Skapa .env.local med en giltig Neon-anslutningssträng.');
  }
  return neon(url);
}
