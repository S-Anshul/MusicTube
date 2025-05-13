import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Comments from "../components/Comments";
import Recommendation from "../components/Recommendation";
import { useLocation } from "react-router-dom";
import {useSelector} from "react-redux"
import axios from "axios"

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = ({ src, controls }) => (
  <iframe
    width="560"
    height="315"
    src={src}
    frameBorder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube video player"
  ></iframe>
);

const Video = () => {
  const {currentUser} = useSelector((state) => state.user);
  const token = useLocation().pathname.split("/")[2]

  const [video, setVideo] = useState({})
  const [channel, setChannel] = useState({})
  const [exist, setExist] = useState(0)

  useEffect(() => {
    setExist(channel.subscribedUser?.includes(currentUser._id))
  }, [channel, currentUser])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const videoRes = await axios.get(`/videos/find/${token}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
        setVideo(videoRes.data)
        setChannel(channelRes.data)
      } 
      catch (err){
      }
    }
    fetchData()
  }, [token, exist])

  const handleLike = async () => {
    const updatedVideo = await axios.put(`/users/like/${video._id}`);
    setVideo(updatedVideo.data)
  };

  const handleDislike = async () => {
    const updatedVideo = await axios.put(`/users/dislike/${video._id}`);
    setVideo(updatedVideo.data)
  };

  const handleSubscription = async () => {
    if(exist){
      await axios.put(`/users/unsub/${channel._id}`)
    }
    else{
      await axios.put(`/users/sub/${channel._id}`)
    }
     setExist(exist => exist ^ 1)
  }

  function get_url(url) {
    if(!url){
      return null;
    }
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
}

  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src= {get_url(video.videoUrl)} controls />
        </VideoWrapper>
        <Title>{video.title}</Title>
        <Details>
          <Info>
            {video.views} views
          </Info>
          <Buttons>
            <Button onClick={handleLike}>
              {video.likes?.includes(currentUser?._id) ? (
                <ThumbUpIcon />
              ) : (
                <ThumbUpOutlinedIcon />
              )}{" "}
              {video.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {video.dislikes?.includes(currentUser?._id) ? (
                <ThumbDownIcon />
              ) : (
                <ThumbDownOffAltOutlinedIcon />
              )}{" "}
              Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
              <Description>{video.desc}</Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSubscription}>
            {exist
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={video._id} />
      </Content>
      <Recommendation tags={video.title} />
    </Container>
  );
};

export default Video