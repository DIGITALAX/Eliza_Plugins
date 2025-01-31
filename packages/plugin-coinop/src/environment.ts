import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const coinopEnvSchema = z.object({
    THE_GRAPH_KEY: z.string().min(1, "The Graph subgraph API key is required"),
    IPFS_GATEWAY: z.string().min(1, "IPFS Gateway is required"),
});

export type coinopConfig = z.infer<typeof coinopEnvSchema>;

export async function validateCoinopConfig(
    runtime: IAgentRuntime
): Promise<coinopConfig> {
    try {
        const config = {
            THE_GRAPH_KEY: runtime.getSetting("THE_GRAPH_KEY"),
            INFURA_GATEWAY: runtime.getSetting("IPFS_GATEWAY"),
        };
        console.log("config: ", config);
        return coinopEnvSchema.parse(config);
    } catch (error) {
        console.log("error::::", error);
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `The Graph API configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
