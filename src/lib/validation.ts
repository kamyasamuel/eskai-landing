import { z } from "zod"

export const applicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(200),
  email: z.string().email("Invalid email address"),
  phone: z.string().max(50).optional().default(""),
  company: z.string().max(200).optional().default(""),
  role: z.string().min(1, "Role is required").max(200),
  employees: z.string().max(50).optional().default(""),
  interest: z.array(z.string()).optional().default([]),
  useCase: z.string().min(1, "Use case is required").max(2000),
  currentTools: z.string().max(1000).optional().default(""),
  referral: z.string().max(200).optional().default(""),
})

export const applicationUpdateSchema = z.object({
  status: z.enum(["pending", "approved", "rejected", "contacted"]).optional(),
  notes: z.string().max(5000).optional(),
})

export const pageViewSchema = z.object({
  sessionId: z.string().min(1),
  path: z.string().min(1),
  referrer: z.string().optional().default(""),
  userAgent: z.string().optional().default(""),
  country: z.string().optional().default(""),
  city: z.string().optional().default(""),
  browser: z.string().optional().default(""),
  os: z.string().optional().default(""),
  device: z.string().optional().default(""),
  durationSeconds: z.number().int().min(0).optional().default(0),
  pageTitle: z.string().optional().default(""),
})

export const eventSchema = z.object({
  sessionId: z.string().min(1),
  eventName: z.string().min(1),
  eventProperties: z.record(z.string(), z.any()).optional(),
  pagePath: z.string().optional().default(""),
})

export const sessionHeartbeatSchema = z.object({
  sessionId: z.string().min(1),
  path: z.string().min(1),
  durationSeconds: z.number().int().min(0),
})

export const createApiKeySchema = z.object({
  name: z.string().min(1).max(100),
  scopes: z.array(
    z.enum([
      "read:applications",
      "write:applications",
      "read:analytics",
      "read:stats",
      "admin",
      "export",
    ])
  ).min(1, "At least one scope is required"),
  expiresAt: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).optional().default(1),
  limit: z.coerce.number().int().min(1).max(100).optional().default(20),
  sort: z.string().optional().default("created_at"),
  order: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().optional(),
  status: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
})