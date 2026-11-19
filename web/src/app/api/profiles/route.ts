import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { auth } from "@/lib/auth/server";

export async function GET() {
  const { data: session } = await auth.getSession();

  const user = session?.user;

  if (!user) {
    return Response.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // Create or update the authenticated user's profile
  await db
    .insert(profiles)
    .values({
      userId: user.id,
      name: user.name ?? null,
      email: user.email ?? null,
      avatarUrl: null,
    })
    .onConflictDoUpdate({
      target: profiles.userId,
      set: {
        name: user.name ?? null,
        email: user.email ?? null,
        updatedAt: new Date(),
      },
    });

  // Load profile pictures
  const rows = await db
    .select({
      userId: profiles.userId,
      avatarUrl: profiles.avatarUrl,
    })
    .from(profiles);

  const map: Record<string, string> = {};

  for (const row of rows) {
    if (row.avatarUrl) {
      map[row.userId] = row.avatarUrl;
    }
  }

  return Response.json({
    profiles: map,
  });
}
