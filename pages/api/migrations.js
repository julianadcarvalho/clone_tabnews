import migrationRunner from "node-pg-migrate";
import { join } from "path";

export default async function migrations(request, response) {

  const databaseUrl = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`

  if (request.method === "GET") {
    const migrations = await migrationRunner({
      databaseUrl: databaseUrl,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
      noLock: true,
    });
    return response.status(200).json(migrations);
  }

  if (request.method === "POST") {
    const migrations = await migrationRunner({
      databaseUrl: databaseUrl,
      dryRun: false,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
      noLock: true,
    });
    return response.status(200).json(migrations);
  }
}