import { CreateWorkflowContent } from "./types";

export function isCreateWorkflowContent(
    content: CreateWorkflowContent
): content is CreateWorkflowContent {
    return (
        content.description === "string" &&
        content.tags === "string" &&
        content.name === "string" &&
        content.workflow === "string"
    );
}
