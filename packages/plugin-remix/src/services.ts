export const createRemixService = (apiKey: string) => {
    const getRemixables = async (): Promise<
        {
            image: string;
            title: string;
        }[]
    > => {
        if (!apiKey) {
            throw new Error("Invalid parameters");
        }

        try {
            const data = await getRemixablesGraph();
            return data?.data?.templates;
        } catch (error: any) {
            console.error("Templates API Error:", error.message);
            throw error;
        }
    };

    const synthesize = async (preset: string): Promise<string> => {
        try {
            const data = await fetchMarsPhotos(preset);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    const mint = async (): Promise<string> => {
        try {
            const data = await fetchMarsPhotos(apiKey);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    return {
        getRemixables,
        synthesize,
        mint,
    };
};
