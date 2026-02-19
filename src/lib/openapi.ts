import { OpenAPIHono } from "@hono/zod-openapi";
import type { Env } from "../types/env";

export const createOpenAPI = () => new OpenAPIHono<Env>();
