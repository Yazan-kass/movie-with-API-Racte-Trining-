import {
  FlexColumn,
  InnerSection,
  SpinnerContainer,
} from "../../Global.Styles";
import {
  CardsContainer,
  Description,
  HeroSection,
  InnerHeroSection,
  LoadMore,
  MoviesTitle,
  Title,
} from "./HomeScreen.Styles";
import Card from "../../Components/Card/Card";
import { useState, useEffect, useCallback } from "react";
import CRUDReqests from "../../API";
function HomeScreen(props) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageNumper, setPageNumper] = useState(1);

  const fetchData = useCallback(async () => {
    const response = await CRUDReqests.get(
      `/movie/popular?api_key=dcf2d1463b5703e25fc8d86eb0fce187&page=${pageNumper}`
    );
    console.log(response);
    setMovieList((prevstat) => [...prevstat, ...response.data.results]);
    setIsLoading(false);
  }, [pageNumper]);
  const handelMore = () => {
    setPageNumper((prevstat) => prevstat + 1);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, pageNumper]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return isLoading ? (
    <SpinnerContainer />
  ) : (
    <FlexColumn>
      <HeroSection
        img={"https://image.tmdb.org/t/p/w500" + movieList[0].backdrop_path}
      >
        <InnerHeroSection>
          <Title >{movieList[0].title}</Title>
          <Description>{movieList[0].overview}</Description>
        </InnerHeroSection>
      </HeroSection>
      <InnerSection>
        <MoviesTitle>Popular Movies</MoviesTitle>
        <CardsContainer>
          {movieList.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              name={item.title}
              img={"https://image.tmdb.org/t/p/w500" + item.poster_path}
            />
          ))}
        </CardsContainer>
        <LoadMore
          theme={props.theme}
          isLoading={isLoading}
          onClick={handelMore}
        >
          Load more...
        </LoadMore>
      </InnerSection>
    </FlexColumn>
  );
}

export default HomeScreen;
