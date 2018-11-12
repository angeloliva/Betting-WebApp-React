export type Environment = "production" | "staging"

export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  databaseURL: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
}

const production: FirebaseConfig = {
  apiKey: "AIzaSyDBOmRK2E0u7FcRFlgFR4eD0gp8YWH6oEc",
  authDomain: "engamed-app.firebaseapp.com",
  databaseURL: "https://engamed-app.firebaseio.com",
  projectId: "engamed-app",
  storageBucket: "engamed-app.appspot.com",
  messagingSenderId: "851279580765",
}

const staging: FirebaseConfig = {
  apiKey: "AIzaSyB0Cw2EKwfy3LEkCIxdr-7Fl65q9pzyQZo",
  authDomain: "yamble-staging.firebaseapp.com",
  databaseURL: "https://yamble-staging.firebaseio.com",
  projectId: "yamble-staging",
  storageBucket: "engamed-app.appspot.com",
  messagingSenderId: "851279580765",
}

export default function firebaseConfig(
  environment: Environment,
): FirebaseConfig {
  console.log(`[FIREBASE] loading ${environment} configuration`)
  return environment === "production" ? production : staging
}
