import type { Result } from "@/utils/result";

export type GatewayResponse<T> = Promise<Result<T>>;
