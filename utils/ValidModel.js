import { STLLoader } from "three/examples/jsm/loaders/STLLoader";

export async function isValidSTLModel(modelUrl) {
    try {
        // Fetch the STL file
        const response = await fetch(modelUrl);

        // Check if the response is OK
        if (!response.ok) {
            console.log("Failed to fetch STL file:", response.statusText);
            return false;
        }   

        // Convert to array buffer
        const arrayBuffer = await response.arrayBuffer();
        
        // Check if the file is empty or too large (set a limit, e.g., 50MB)
        const fileSize = arrayBuffer.byteLength;
        if (fileSize === 0) {
            console.log("STL file is empty.");
            return false;
        }
        if (fileSize > 50 * 1024 * 1024) { // 50MB limit
            console.log("STL file is too large.");
            return false;
        }

        // Try to parse the STL file using STLLoader
        const loader = new STLLoader();
        const geometry = loader.parse(arrayBuffer);

        // If parsed successfully, it's a valid STL model
        return !!geometry;
    } catch (error) {
        console.log("Error validating STL model:", error);
        return false;
    }
}
