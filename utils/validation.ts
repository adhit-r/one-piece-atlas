import { z } from 'zod';

/**
 * Zod schema for validating One Piece Island objects.
 * Ensures all required fields are present and have correct types.
 */

export const IslandSchema = z.object({
  id: z.string().min(1, 'Island ID must not be empty').describe('Unique slugified identifier'),
  name: z.string().min(1, 'Island name must not be empty').describe('Display name of the island'),
  sea: z.string().nullable().describe('Sea region (e.g., East Blue, Grand Line)'),
  lat: z.number().nullable().describe('Latitude coordinate'),
  lon: z.number().nullable().describe('Longitude coordinate'),
  arc: z.string().nullable().describe('Main story arc where island appears'),
  episodes: z.array(z.number()).length(2, 'Episodes must be a two-element array [start, end]').describe('Episode range [start, end]'),
  characters: z.array(z.string()).describe('Character names associated with island'),
  importance: z.enum(['Critical', 'Major', 'Minor', 'critical', 'major', 'minor']).describe('Narrative importance level'),
  visual: z.string().nullable().describe('Visual type or biome (e.g., volcanic, snow, desert)'),
  source: z.string().describe('Data source URL or attribution'),
  note: z.string().optional().describe('Additional notes or metadata'),
}).strict();

export const IslandsArraySchema = z.array(IslandSchema);

export type Island = z.infer<typeof IslandSchema>;

/**
 * Validates a single island object against the schema.
 * @param data - Raw island data to validate
 * @returns Validated Island object or throws error
 */
export function validateIsland(data: unknown): Island {
  return IslandSchema.parse(data);
}

/**
 * Validates an array of island objects.
 * @param data - Raw array of islands to validate
 * @returns Validated Island[] or throws error
 */
export function validateIslands(data: unknown): Island[] {
  return IslandsArraySchema.parse(data);
}

/**
 * Safely validates islands and returns a result with errors if validation fails.
 * @param data - Raw island data to validate
 * @returns { success: true, data } or { success: false, errors }
 */
export function safeValidateIsland(data: unknown) {
  const result = IslandSchema.safeParse(data);
  return result;
}

/**
 * Safely validates an array of islands.
 * @param data - Raw array of islands to validate
 * @returns { success: true, data } or { success: false, errors }
 */
export function safeValidateIslands(data: unknown) {
  const result = IslandsArraySchema.safeParse(data);
  return result;
}
