import { expect, describe, it } from 'bun:test';
import * as fs from 'fs';
import * as path from 'path';
import { safeValidateIslands, validateIslands, IslandSchema } from '../utils/validation';

describe('Data Validation Tests', () => {
  it('should validate verified island additions from JSON file', async () => {
    const filePath = path.join(process.cwd(), 'data', 'onePieceData_additions_verified.json');
    
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  Verified additions file not found at ${filePath}. Skipping data validation.`);
      return;
    }

    const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    expect(Array.isArray(rawData)).toBe(true);
    expect(rawData.length).toBeGreaterThan(0);

    // Validate all islands
    const validated = safeValidateIslands(rawData);
    expect(validated.success).toBe(true);
    
    if (validated.success) {
      expect(validated.data.length).toBe(rawData.length);
      console.log(`✅ All ${validated.data.length} verified islands passed schema validation`);
    } else {
      console.error('Validation errors:', validated.error.errors);
      expect(validated.success).toBe(true); // Force test failure with detailed error info
    }
  });

  it('should enforce required fields in island objects', async () => {
    const validIsland = {
      id: 'test-island',
      name: 'Test Island',
      sea: 'East Blue',
      lat: 10.5,
      lon: 20.3,
      arc: 'East Blue Arc',
      episodes: [1, 50],
      characters: ['Luffy'],
      importance: 'Major',
      visual: 'temperate',
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(validIsland);
    expect(result.success).toBe(true);
  });

  it('should reject islands with invalid episode format', () => {
    const invalidIsland = {
      id: 'test-island',
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1], // Should be [start, end]
      characters: [],
      importance: 'Major',
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(invalidIsland);
    expect(result.success).toBe(false);
    if (!result.success) {
      const episodeErrors = result.error.issues.some((e: any) => e.path.includes('episodes'));
      expect(episodeErrors).toBe(true);
    }
  });

  it('should reject islands with invalid importance level', () => {
    const invalidIsland = {
      id: 'test-island',
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1, 50],
      characters: [],
      importance: 'unknown', // Should be 'critical', 'major', 'minor' (or capitalized)
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(invalidIsland);
    expect(result.success).toBe(false);
  });

  it('should allow null values for optional geo/narrative fields', () => {
    const islandWithNulls = {
      id: 'test-island',
      name: 'Test Island',
      sea: null, // Should allow null
      lat: null, // Should allow null
      lon: null, // Should allow null
      arc: null, // Should allow null
      episodes: [1, 50],
      characters: [],
      importance: 'Minor',
      visual: null, // Should allow null
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(islandWithNulls);
    expect(result.success).toBe(true);
  });

  it('should allow empty characters array', () => {
    const island = {
      id: 'test-island',
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1, 50],
      characters: [], // Empty array should be valid
      importance: 'Minor',
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(island);
    expect(result.success).toBe(true);
  });

  it('should validate coordinate ranges', () => {
    const islandWithValidCoords = {
      id: 'test-island',
      name: 'Test Island',
      sea: 'Grand Line',
      lat: 0.0, // Valid latitude
      lon: 180.0, // Valid longitude (as number)
      arc: 'Arc Name',
      episodes: [100, 200],
      characters: ['Char1'],
      importance: 'Critical',
      visual: 'coastal',
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(islandWithValidCoords);
    expect(result.success).toBe(true);
  });

  it('should reject islands with missing id or name', () => {
    const incompleteIsland = {
      // Missing id
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1, 50],
      characters: [],
      importance: 'Minor',
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(incompleteIsland);
    expect(result.success).toBe(false);
  });

  it('should reject islands with empty id string', () => {
    const invalidIsland = {
      id: '', // Empty string should fail
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1, 50],
      characters: [],
      importance: 'Minor',
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(invalidIsland);
    expect(result.success).toBe(false);
  });

  it('should reject islands with extra unknown fields in strict mode', () => {
    const islandWithExtra = {
      id: 'test-island',
      name: 'Test Island',
      sea: null,
      lat: null,
      lon: null,
      arc: null,
      episodes: [1, 50],
      characters: [],
      importance: 'Minor',
      visual: null,
      source: 'https://example.com',
      unknownField: 'should fail', // Extra field not in schema
    };

    const result = IslandSchema.safeParse(islandWithExtra);
    expect(result.success).toBe(false);
  });

  it('should provide detailed validation error messages', () => {
    const invalidIsland = {
      id: 'test',
      name: 'Test',
      sea: null,
      lat: 'not a number', // Wrong type
      lon: null,
      arc: null,
      episodes: [1, 2, 3], // Wrong length
      characters: [],
      importance: 'invalid', // Invalid enum
      visual: null,
      source: 'https://example.com',
    };

    const result = IslandSchema.safeParse(invalidIsland);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.length).toBeGreaterThan(0);
      console.log('Validation errors:', result.error.issues.map((e: any) => e.message).join('; '));
    }
  });
});
