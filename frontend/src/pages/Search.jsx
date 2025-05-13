import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const videos = await axios({
        method: 'get',
        url: `http://127.0.0.1:8000/predict?text=${query}`,
        proxy: false
      });
      const videos_list = videos.data.index
      console.log(videos_list)
      if(videos_list){
        const res = await axios.post(`/videos/search`, {videos_list});
        setVideos(res.data);
      }
    };
    fetchVideos();
  }, [query]);

  return <Container>
    {videos.map(video=>(
      <Card key={video._id} video={video}/>
    ))}
  </Container>;
};

export default Search;