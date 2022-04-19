import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [spotArticles, setSpotArticles] = useState([]);
  const [articles, setArticles] = useState([]);

  AOS.init({
    duration: 1000,
    easing: "ease",
  });

  useEffect(() => {
    getNews();
  }, []);

  const getNews = async () => {
    try {
      const response = await axios.get("http://localhost:4001/getnews");
      if (response.status !== 200) {
        console.log("Please check you url!");
      }
      setSpotArticles(response.data.spotlightarticles);
      setArticles(response.data.articles);
    } catch (err) {
      console.log(err.message);
    }
  };

  //------------------------- spotlight articles -------------------------//
  const listSpotArticles = spotArticles.slice(0, 3) || [];
  const areThereSpotArticles = spotArticles.length > 0;

  console.log(listSpotArticles);
  console.log(areThereSpotArticles);

  const spotArticleCards =
    areThereSpotArticles &&
    listSpotArticles.map((article) => {
      return (
        <div className='card__container' key={article.title}>
          <div className='card__media'>
            <img
              className='card__img'
              src={article.imageUrl}
              alt={article.imgAlt}
            />
          </div>
          <div className='card__content'>
            <h2>{article.title}</h2>
            <a
              className='animation-underline verywell-link article-link'
              href={article.url}
              rel='noreferrer'
              target='_blank'
            >
              Read more
            </a>
          </div>
        </div>
      );
    });

  //------------------------- articles -------------------------//
  const listArticles = articles || [];
  const areThereArticles = listArticles.length > 0;

  const otherArticleCards =
    areThereArticles &&
    listArticles.map((article) => {
      return (
        <div className='card__container other-articles' key={article.title}>
          <div className='card__media'>
            <img
              className='card__img'
              src={article.imageUrl}
              alt={article.imgAlt}
            />
          </div>
          <div className='card__content'>
            <h2>{article.title}</h2>
            <a
              className='animation-underline verywell-link article-link'
              href={article.url}
              rel='noreferrer'
              target='_blank'
            >
              Read more
            </a>
          </div>
        </div>
      );
    });

  return (
    <>
      {!areThereSpotArticles && !areThereArticles ? (
        <Loading title={"Articles"} />
      ) : (
        <div className='hr__home'>
          <Navbar />
          <div className='hr__homeheader'>
            <div className='hr__homeheader-content' data-aos='fade-right'>
              <p>NEWS</p>
              <h1 className='animation-underline'>
                Fitness and Nutrition News
              </h1>
            </div>
          </div>
          <div className='hr__uptodate'>
            <p>
              Stay up-to-date on the latest nutrition and fitness news with
              evidence-based reporting from our team of registered dietitians,
              health journalists, and fitness experts.
            </p>
          </div>
          <div className='hr__card-articles-section'>
            <div className='hr__group-articles'>
              <div className='hr__card-spotlight-title'>
                <h1 className='spot__title'>
                  Highlight Fitness and Nutrition News
                </h1>
                <p>Powered by</p>
                <a
                  className='animation-underline verywell-link'
                  href='https://www.verywellfit.com/'
                  rel='noreferrer'
                  target='_blank'
                >
                  Verywellfit
                </a>
              </div>
              <div className='hr__card-listarticles'>{spotArticleCards}</div>
            </div>
            <div className='hr__group-articles'>
              <div className='hr__card-list-other-articles'>
                {otherArticleCards}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
