import { defineConfig } from "@neon/config/v1";

// Neon Auth issues the JWTs the chat function verifies. Mastra Function
// secrets stay on the live deployment so local drizzle/parseEnv can load
// without them.
export default defineConfig({
  auth: false,
  aiGateway: true,
  buckets: {
    uploads: {},
  },
  functions: {
    chat: {
      name: "chat with neon",
      source: "src/index.ts",
      env: {
        // parseEnv(config) requires this; the Function runtime does not inject it.
        NEON_FUNCTION_CHAT_BASE_URL:
          "https://br-sweet-cake-bck9vcvy-chat.compute.c-16.us-east-1.aws.neon.tech",
      },
    },
  },
});
