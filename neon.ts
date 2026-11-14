import { defineConfig } from "@neon/config/v1";

// Neon Auth issues the JWTs the chat function verifies.
export default defineConfig({
  auth: true,
  aiGateway: true,
  buckets: {
    uploads: {},
  },
  functions: {
    chat: {
      name: "chat with neon",
      source: "src/index.ts",
      env: {
        NEON_FUNCTION_CHAT_BASE_URL:
          "https://br-sweet-cake-bck9vcvy-chat.compute.c-16.us-east-1.aws.neon.tech/",
      },
    },
  },
});
