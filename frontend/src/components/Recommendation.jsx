import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
`;

const Recommendation = ({ des }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
        const fetchVideos = async () => {
            const videos = await axios({
                method: 'get',
                url: `http://127.0.0.1:8000/predict?text=${des}`,
                proxy: false
            })
            const videos_list = videos.data.index
            const res = await axios.post(`/videos/search`, {videos_list});
            setVideos(res.data);
        }
        fetchVideos();
    }, [des]);

  return (
    <Container>
      {videos.map((video) => (
        <Card type="sm" key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;