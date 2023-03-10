import 'dotenv/config';

const REQUIRED_ENV_VARS = ['AC_ACCOUNT', 'AC_API_VERSION', 'AC_API_TOKEN'];

REQUIRED_ENV_VARS.forEach((envVar) => {
  const val = process.env[envVar];
  if (val === '' || val === null || val === undefined) {
    throw new Error(`Required ENV VAR not set: ${envVar}`);
  }
});

export const activeCampaign = {
  account: process.env.AC_ACCOUNT,
  apiVersion: process.env.AC_API_VERSION,
  token: process.env.AC_API_TOKEN,
};

export const app = {
  port: process.env.APP_PORT || 3000,
};
