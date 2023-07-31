import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import ReactPlayer from 'react-player';

const ffmpeg = createFFmpeg({ log: true });

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Load ffmpeg
    await ffmpeg.load();

    // Read the video file
    ffmpeg.FS('writeFile', file.name, await fetchFile(file));

    // Get video duration
    await ffmpeg.run('-i', file.name, 'output.mp4');
    const durationOutput = ffmpeg.FS('readFile', 'output.mp4.info');
    const durationString = new TextDecoder().decode(durationOutput);
    const duration = Number(durationString.match(/duration.*?(\d+\.\d+)/)[1]);

    // Check if video duration is longer than 1 minute
    if (duration > 60) {
      // Cut the video to the first 60 seconds
      await ffmpeg.run('-i', file.name, '-t', '60', 'cut.mp4');
      const data = ffmpeg.FS('readFile', 'cut.mp4');

      // Create an object URL for the trimmed video and set it in the state
      const trimmedVideoUrl = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
      setVideoUrl(trimmedVideoUrl);
    } else {
      // If video duration is within the limit, use the original video
      const videoUrl = URL.createObjectURL(file);
      setVideoUrl(videoUrl);
    }
  };

  return (
    <div>
      <h1>Video Cutter</h1>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drag and drop a video file here, or click to select a file</p>
          </div>
        )}
      </Dropzone>

      {videoUrl && (
        <div>
          <h2>Preview</h2>
          <ReactPlayer url={videoUrl} controls />
        </div>
      )}
    </div>
  );
};

export default App;
