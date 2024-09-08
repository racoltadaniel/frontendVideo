document.getElementById('generateButton').addEventListener('click', async function () {
    const inputText = document.getElementById('inputText').value;
    const statusElement = document.getElementById('status');
    const downloadButton = document.getElementById('downloadButton');

    if (!inputText.trim()) {
        alert('Please enter some text!');
        return;
    }

    statusElement.innerText = 'Generating video, please wait...';

    try {
        // Call your API to generate the video
        const response = await fetch('http://localhost:3000/generate-video', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputText })
        });

        if (!response.ok) {
            throw new Error('Error generating video');
        }

        // Assuming the API returns a link to the generated video
        const data = await response.json();
        const videoUrl = data.videoUrl;

        // Update UI once the video is ready
        statusElement.innerText = 'Video is ready!';
        downloadButton.style.display = 'block';

        // Set the download button to download the video
        downloadButton.addEventListener('click', function () {
            const a = document.createElement('a');
            a.href = videoUrl;
            a.download = 'generated-video.mp4';
            a.click();
        });

    } catch (error) {
        console.error('Error:', error);
        statusElement.innerText = 'Failed to generate video.';
    }
});
