import { Content } from "@elizaos/core";

export interface CreateWorkflowContent extends Content {
    name: string;
    description: string;
    tags: string;
    workflow: string;
}
