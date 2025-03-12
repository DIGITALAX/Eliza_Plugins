import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache, HttpLink, gql } = pkg;
import { Workflow } from "./types";

export const searchService = (apiKey: string) => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: `https://api.studio.thegraph.com/query/37770/lucidity/version/latest`,
        }),
        cache: new InMemoryCache(),
    });

    const getWorkflows = async (search: string): Promise<Workflow[]> => {
        try {
            const searchTerms = search.split(" ").filter(Boolean);
            const orConditions = searchTerms.flatMap((term) => [
                { description_contains_nocase: term },
                { name_contains_nocase: term },
                { tags_contains_nocase: term },
                { workflow_contains_nocase: term },
            ]);

            const where = serializeQuery({
                workflowMetadata_: {
                    or: orConditions,
                },
            });

            let timeoutId: NodeJS.Timeout | undefined;
            const queryPromise = client.query({
                query: gql(`query {
    workflowCreateds(
  where: {${where}}
    ) {
        creator
        workflowMetadata {
            name
            description
            workflow
            tags
            cover
            setup
            links
        }
    }
  }`),
                variables: {
                    search,
                },
                fetchPolicy: "no-cache",
                errorPolicy: "all",
            });

            const timeoutPromise = new Promise((resolve) => {
                timeoutId = setTimeout(() => {
                    resolve({ timedOut: true });
                }, 60000);
            });

            const result: any = await Promise.race([
                queryPromise,
                timeoutPromise,
            ]);

            timeoutId && clearTimeout(timeoutId);

            console.log("result logged: ", result);

            if (result.timedOut) {
                return [];
            } else {
                console.log(
                    "API Response:",
                    JSON.stringify(result.data.workflowCreateds)
                );

                return result.data.workflowCreateds || [];
            }
        } catch (error) {
            console.error("API Error:", error);

            throw error;
        }
    };

    return { getWorkflows };
};

const serializeQuery = (
    obj: { [key: string]: any },
    depth: number = 0
): string => {
    const indent: string = "  ".repeat(depth);
    const entries: string[] = Object.entries(obj).map(
        ([key, value]): string => {
            if (Array.isArray(value)) {
                const arrayValues: string = value
                    .map((val) => {
                        if (typeof val === "object" && val !== null) {
                            return `{\n${serializeQuery(val, depth + 1)}\n${indent}}`;
                        } else {
                            return serializeQuery(val, depth + 1);
                        }
                    })
                    .join(",\n" + indent);
                return `${key}: [\n${indent}${arrayValues}\n${indent}]`;
            } else if (typeof value === "object" && value !== null) {
                return `${key}: {\n${serializeQuery(value, depth + 1)}\n${indent}}`;
            } else {
                return `${key}: ${JSON.stringify(value)}`;
            }
        }
    );
    return entries.join(",\n" + indent);
};
