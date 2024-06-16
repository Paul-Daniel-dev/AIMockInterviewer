/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://mock-interviewer_owner:xFX03aQEOPyA@ep-morning-art-a7sgv3ft.ap-southeast-2.aws.neon.tech/mock-interviewer?sslmode=require",
    }
  };