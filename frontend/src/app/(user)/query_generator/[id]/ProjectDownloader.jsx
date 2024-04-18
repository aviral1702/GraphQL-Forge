import JSZip from 'jszip';
import React from 'react'

const ProjectDownloader = () => {


    const zip = new JSZip(); // instance of JSZip

    // Function for make zip file and download it

    async function handleZip() {
        // Add Images to the zip file
        for (var i = 0; i < images.length; i++) {
            const response = await fetch(images[i]);
            const blob = await response.blob();
            console.log(blob);
            zip.file(images[i].split("/").pop(), blob);



            if (i == selectedImages.length - 1) {
                // Generate the zip file
                const zipData = await zip.generateAsync({
                    type: "blob",
                    streamFiles: true,
                });
                console.log(zipData);
                // Create a download link for the zip file
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(zipData);
                link.download = "snapcial-ai.zip";
                link.click();
            }

        }
    }
    return (
        <div>ProjectDownloader</div>
    )
}

export default ProjectDownloader