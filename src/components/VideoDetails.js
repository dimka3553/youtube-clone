import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import SearchPage from './SearchPage';

const Container = styled.div`
padding: 20px;
`;

const VideoDetails = () => {
  const { videoId } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const response = await axios.get(`https://youtube.thorsteinsson.is/api/videos/${videoId}`);
      console.log(response.data)
      setVideoDetails(response.data);
    };

    fetchVideoDetails();
  }, [videoId]);

  if (!videoDetails) return <div>Loading...</div>;

  return (
    <Container>
      <h1>{videoDetails.title}</h1>
      <iframe
        title="videoPlayer"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p>{videoDetails.description}</p>
      <div style={{margin:"-20px"}}>
      <SearchPage/>
      </div>

    </Container>
  );
};

export default VideoDetails;
