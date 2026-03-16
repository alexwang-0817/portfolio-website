import myPhoto from '../../img/my_photo.png';
import RevealText from './RevealText';

export default function AboutPage1() {
  return (
    <section className="about-hero" id="about">
      <div className="about-hero__inner">
        <div className="about-hero__content">
          <RevealText as="p" block>
            我是牧德
          </RevealText>
          <RevealText as="p" block>
            所以叫MOOD
          </RevealText>
        </div>
        <div className="about-hero__profile">
          <img className="about-hero__photo" src={myPhoto} alt="牧德" />
          <div className="about-hero__profile-meta">
            <div className="about-hero__profile-col">
              <p>國立清華大學 藝術學院學士班</p>
              <p>國立清華大學 環境與文化資源研究所</p>
            </div>
            <div className="about-hero__profile-col">
              <p>清大創業車庫 Scouties 團隊 Product Designer</p>
              <p>牧羊人集團 Product Design intern</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
