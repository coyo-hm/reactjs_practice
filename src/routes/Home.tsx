import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import { SITE_URL } from "../App";
import { theme } from "../style/theme";

const DEFAULT_GAP = 5;

const Wrapper = styled.div`
  /* background-color: whitesmoke; */
  background-color: black;
  height: 200vh;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
`;

const Overview = styled.p`
  font-size: 36px;
  width: 50%;
  margin-bottom: 20px;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${DEFAULT_GAP + "px"};
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }

  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;

  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const MovieModal = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};

  h2 {
    color: ${(props) => props.theme.white.lighter};
    text-align: left;
    font-size: 36px;
    font-weight: 600;
    position: relative;
    top: -30px;
    padding: 20px;
  }

  p {
    position: relative;
    top: -30px;
    padding: 20px;
    color: ${(props) => props.theme.white.lighter};
    font-weight: 300;
  }
`;

const MovieModalCover = styled.div`
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center center;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + DEFAULT_GAP,
  },
  visible: {
    x: 0,
  },
  exit: { x: -window.outerWidth - DEFAULT_GAP },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -50,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.1, type: "tween" },
  },
};

const DEFAULT_PAGE_SIZE = 6;

function Home() {
  const navigate = useNavigate();
  const movieModalMatch: PathMatch<string> | null = useMatch(SITE_URL.MOVIE);
  const { scrollY } = useScroll();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const clickedMovie =
    movieModalMatch?.params.movieId &&
    data?.results.find(
      (movie) => movie.id === Number(movieModalMatch.params.movieId)
    );

  const increaseIndex = () => {
    if (data) {
      if (leaving) {
        return;
      }
      setLeaving(true);
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / DEFAULT_PAGE_SIZE) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onOverlayClicked = () => navigate(SITE_URL.HOME);

  const onBoxClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  console.log(data, isLoading);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(1)
                  .slice(
                    DEFAULT_PAGE_SIZE * index,
                    DEFAULT_PAGE_SIZE * index + DEFAULT_PAGE_SIZE
                  )
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path || "", "w500")}
                      onClick={() => onBoxClicked(movie.id)}
                    >
                      {/* <img
                        src={makeImagePath(movie.backdrop_path || "", "w500")}
                        alt={movie.title}
                        title={movie.title}
                      /> */}
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieModalMatch && (
              <>
                <Overlay
                  onClick={onOverlayClicked}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <MovieModal
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={movieModalMatch.params?.movieId}
                >
                  {clickedMovie && (
                    <>
                      <MovieModalCover
                        style={{
                          backgroundImage: `linear-gradient(transparent, ${
                            theme.black.lighter
                          }), url(${makeImagePath(
                            clickedMovie.backdrop_path || ""
                          )})`,
                        }}
                      />
                      <h2>{clickedMovie.title}</h2>
                      <p>{clickedMovie.overview}</p>
                    </>
                  )}
                </MovieModal>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
