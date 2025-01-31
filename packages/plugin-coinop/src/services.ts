import { APODResponse, MarsRoverDataResponse } from "./types";

const BASE_URL = "https://api.nasa.gov/planetary/apod\?api_key\=";

export const createCoinopService = (apiKey: string) => {
    const getTemplates = async (
        template: string
    ): Promise<
        {
            image: string;
            type: string;
            category: string;
        }[]
    > => {
        if (!apiKey) {
            throw new Error("Invalid parameters");
        }

        try {
            const data = await getFormatsGraph(template);
            return data?.data?.templates;
        } catch (error: any) {
            console.error("Templates API Error:", error.message);
            throw error;
        }
    };

    const getFormats = async (): Promise<
        {
            image: string;
            type: string;
            category: string;
        }[]
    > => {
        try {
            const data = await getFormatsGraph();
            return data?.data?.formats;
        } catch (error: any) {
            console.error("Formats API Error:", error.message);
            throw error;
        }
    };

    const getPresets = async (): Promise<MarsRoverDataResponse> => {
        try {
            const data = await fetchMarsPhotos(apiKey);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    const synthesize = async (): Promise<MarsRoverDataResponse> => {
        try {
            const data = await fetchMarsPhotos(apiKey);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    const createModelShots = async (): Promise<MarsRoverDataResponse> => {
        try {
            const data = await fetchMarsPhotos(apiKey);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    const mint = async (): Promise<MarsRoverDataResponse> => {
        try {
            const data = await fetchMarsPhotos(apiKey);
            return data;
        } catch (error: any) {
            console.error("NASA Mars Rover API Error:", error.message);
            throw error;
        }
    };

    return {
        getFormats,
        getTemplates,
        getPresets,
        synthesize,
        createModelShots,
        mint,
    };
};
