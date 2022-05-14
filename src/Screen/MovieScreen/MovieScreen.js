import { FlexColumn, FlexRow, InnerSection, SpinnerContainer } from "../../Global.Styles";
import {
  CardsContainer,
  HeroSection,
  InnerHeroSection,
  MoviesTitle,
} from "../HomeScreen/HomeScreen.Styles";
import {
  InfoText,
  MovieDetailsBox,
  MovieImage,
  MovieInfoBox,
  NavigatorContainer,
  NavigatorInnerContainer,
  NavigatorSpan,
  ProgressBar,
  ProgressBarContainer,
  ProgressBarPercentage,
} from "./MovieScreen.Styles";
import ActorCard from "../../Components/ActorCard/ActorCard";
import { useEffect, useState, useCallback } from "react";
import CRUDReqests from "../../API";
import { useNavigate, useParams } from "react-router-dom";


function MovieScreen(props) {
  const param = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = useCallback (async ()=>{
    const response = await CRUDReqests.get(`/movie/${param.id}?api_key=dcf2d1463b5703e25fc8d86eb0fce187`);
    console.log(response.data)
    setMovie(prevstat=> 
      response.data
    );
    setIsLoading(false);
  },[param.id]);
  
  useEffect(()=>{
    fetchData()
  },[fetchData]);
  return (
    isLoading? <SpinnerContainer/> :
    <FlexColumn>
      <NavigatorContainer>
        <NavigatorInnerContainer>
          <NavigatorSpan onClick={()=>navigate(-1)}>Back</NavigatorSpan>
          <NavigatorSpan>/{movie.original_title}</NavigatorSpan>
        </NavigatorInnerContainer>
      </NavigatorContainer>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500"+ movie.backdrop_path}
      >
        <InnerHeroSection>
          <MovieInfoBox>
            <MovieImage
              src={"https://image.tmdb.org/t/p/w500"+ movie.poster_path}
              alt={"movie name"}
            />
            <MovieDetailsBox>
              <InfoText margin={"0 0 25px"} fontSize={30} fontWeight={700}>
                 {movie.original_title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                {movie.title}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={500}>
                {movie.overview}
              </InfoText>
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                IMDB RATING
              </InfoText>
              <ProgressBarContainer>
                <ProgressBar>
                  <ProgressBarPercentage width={movie.vote_average * 10} />
                </ProgressBar>
                <InfoText margin={"0 20px"} fontSize={16} fontWeight={500}>
                  {movie.vote_average}
                </InfoText>
              </ProgressBarContainer>{" "}
              <InfoText margin={"0 0 20px"} fontSize={16} fontWeight={700}>
                Tags
              </InfoText>
              <FlexRow>
                 {movie.genres.map(item=><InfoText key={item.id} margin={"5px 10px"} fontSize={16} fontWeight={500}>{item.name}</InfoText>)}
              </FlexRow>
            </MovieDetailsBox>
          </MovieInfoBox>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Production Companies</MoviesTitle>
        <CardsContainer>
          {movie.production_companies.map(company=><ActorCard
              key={company.id}
              id={company.id}
              name={company.name}
              img={"https://image.tmdb.org/t/p/w500"+ company.logo_path}
            />)}
        </CardsContainer>
      </InnerSection>
    </FlexColumn>
  );
}

export default MovieScreen;
