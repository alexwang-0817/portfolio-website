import RevealText from './RevealText';

export default function AboutPage2() {
  return (
    <section className="about-detail">
      <div className="about-detail__headline">
        <RevealText as="p" block>
          從數位設計品牌
        </RevealText>
        <RevealText as="p" block>
          故事使人感動
        </RevealText>
      </div>
      <div className="about-detail__columns">
        <div className="about-detail__column">
          <RevealText as="p" block>
            嗨！我是牧德，是一個對創新創意有熱情的人，正在朝多邊形戰士的路上前進。
          </RevealText>
          <RevealText as="p" block>
            從藝術、音樂、體育、研究、科技、商業、甚至創業，我試著在各個地方盡力學習，遇到了很多人，也獲得了很多。
          </RevealText>
        </div>
        <div className="about-detail__column">
          <RevealText as="p" block>
            我從不認為設計只是為了「眼睛」，為了誰、為了什麼、如何做到，太多的問題需要思考。
          </RevealText>
          <RevealText as="p" block>
            好看的東西，誰都做得到，而我想做的就是了解人在想什麼，聊聊天說說話，沒有什麼比這些更能夠打動人心。
          </RevealText>
        </div>
        <RevealText as="div" className="about-detail__label" block>
          關於我
        </RevealText>
      </div>
    </section>
  );
}
