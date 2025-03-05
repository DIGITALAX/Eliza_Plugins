import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const comfystreamEnvSchema = z.object({
    GRAPH_API_KEY: z.string().min(1, "Graph API key is required"),
});

export type ComfyStreamConfig = z.infer<typeof comfystreamEnvSchema>;

export async function validateComfyStreamConfig(
    runtime: IAgentRuntime
): Promise<ComfyStreamConfig> {
    try {
        const config = {
            GRAPH_API_KEY: runtime.getSetting("GRAPH_API_KEY"),
        };

        return comfystreamEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `ComfyStream configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
