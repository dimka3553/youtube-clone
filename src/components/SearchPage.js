import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Container = styled.div`
    padding: 20px;

`;
const SearchInput = styled.input`
margin-bottom: 20px;

`;

const Thumbnail = styled.img`
  width: 100px;
  height: auto;
  margin-right: 10px; 
`;

const VideoInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
    &:hover {
        animation: spin 0.5s linear infinite;
        }
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
`;

const VideoDetails = styled.div`
`;


const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`https://youtube.thorsteinsson.is/api/search?q=${searchTerm}`);
    console.log(response.data);
    setResults(response.data);
  };

  const resultVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <Container>
      <SearchInput
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search videos"
      />
      <button onClick={handleSearch}>Search</button>
      {results.map((video, index) => (
        <motion.div
          key={video.id.videoId}
          variants={resultVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
        >
          <VideoInfo>
            <Thumbnail src={video.snippet.thumbnails.url} alt="Thumbnail" />
            <VideoDetails>
              <Link to={`/video/${video.id.videoId}`}>{video.snippet.title}</Link>
            </VideoDetails>
          </VideoInfo>
        </motion.div>
      ))}
    </Container>
  );
};

export default SearchPage;
