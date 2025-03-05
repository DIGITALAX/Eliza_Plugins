import pkg from "@apollo/client";
const { ApolloClient, InMemoryCache, HttpLink, gql } = pkg;

const ALL_WORKFLOWS_QUERY = `query {
    workflowCreateds(first: 1000) {
      workflowMetadata {
        workflow
      }
    }
  }`;

export const createSearchService = (apiKey: string) => {
    const client = new ApolloClient({
        link: new HttpLink({
            uri: `https://api.studio.thegraph.com/query/37770/lucidity/version/latest`,
        }),
        cache: new InMemoryCache(),
    });

    const getAllWorkflows = async (): Promise<string[]> => {
        try {
            let timeoutId: NodeJS.Timeout | undefined;
            const queryPromise = client.query({
                query: gql(ALL_WORKFLOWS_QUERY),
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

            if (result.timedOut) {
                return [];
            } else {
                console.log(
                    "API Response:",
                    JSON.stringify(result.data.workflowCreateds)
                );

                return (
                    result.data.workflowCreateds.map(
                        (workflow) => workflow.workflow
                    ) || []
                );
            }
        } catch (error) {
            console.error("API Error:", error.message);

            throw error;
        }
    };

    return { getAllWorkflows };
};
