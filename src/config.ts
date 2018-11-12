import { Environment } from "./Commons/firebase"
import firebaseConfig from "./Commons/firebase"

// @ts-ignore only one environment at once is used
const production = {
  environment: "production",
  processorURL: "https://yamble-services.appspot.com",
}

// @ts-ignore only one environment at once is used
const staging = {
  environment: "staging",
  processorURL: "https://yamble-services-staging.appspot.com",
}

const config = staging
console.log(`[APP] loading ${config.environment} configuration`)

export default {
  ...config,
  ...firebaseConfig(config.environment as Environment),
}
