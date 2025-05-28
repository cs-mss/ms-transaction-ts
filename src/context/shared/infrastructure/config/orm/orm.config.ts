import { DataSource } from 'typeorm';

/**
 * Configuración de TypeORM para migraciones
 * Esta configuración se utiliza para ejecutar migraciones desde la línea de comandos
 */
export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.{ts,js}'],
  migrations: [
    'src/context/shared/infrastructure/database/migrations/*.{ts,js}',
  ],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: true,
});
