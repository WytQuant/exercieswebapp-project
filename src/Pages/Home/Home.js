import React, { useContext } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { Context } from "../../Context/Context";

const Home = () => {
  const { listArticles } = useContext(Context);

  //------------------------- spotlight articles -------------------------//
  const spotArticles = listArticles.spotlightarticles.slice(0, 3) || [];
  const areThereSpotArticles = spotArticles.length > 0;

  // console.log(spotArticles);
  // console.log(areThereSpotArticles);

  const spotArticleCards =
    areThereSpotArticles &&
    spotArticles.map((article) => {
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
  const otherArticles = listArticles.articles || [];
  const areThereArticles = otherArticles.length > 0;

  // console.log(otherArticles);
  // console.log(areThereArticles);

  const otherArticleCards =
    areThereArticles &&
    otherArticles.map((article) => {
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
    <div className='hr__home'>
      <Navbar />
      <div className='hr__homeheader'>
        <div className='hr__homeheader-content'>
          <p>NEWS</p>
          <h1 className='animation-underline'>Fitness and Nutrition News</h1>
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
    </div>
  );
};

export default Home;
