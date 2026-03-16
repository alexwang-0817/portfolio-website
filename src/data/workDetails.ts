export type WorkGallery = {
  type: 'marquee' | 'static';
  images: string[];
};

export type WorkDetail = {
  id: string;
  title: string;
  slug: string;
  detailId: string;
  cover: string;
  typeLabel: string;
  tags: string[];
  date: string;
  icon: string;
  description: string;
  gallery: WorkGallery;
  concept: string;
};

export const WORK_DETAILS: WorkDetail[] = [
  {
    id: '01',
    title: 'Scouties',
    slug: 'scouties',
    detailId: 'work-scouties',
    cover: '/img/scouties.png',
    typeLabel: '虛擬實境解謎遊戲',
    tags: ['Brand Design', 'UIUX Design', 'Product Design', 'Logo Design', 'Color System'],
    date: '20 03 2025',
    icon: '/img/scouties_icon.png',
    description:
      'Scouties是一款結合科技、在地故事與遊戲化互動的沉浸式旅遊平台，我們不只是帶你走訪景點，而是邀請你化身「時空旅人」，透過任務挑戰、故事探索與商家互動，解鎖專屬於每座城市的獨特體驗。',
    gallery: {
      type: 'marquee',
      images: ['/img/scouties01.png', '/img/scouties02.png', '/img/scouties03.png', '/img/scouties04.png'],
    },
    concept: '以年輕、活力為核心，打造一個清新但是又富有色彩的使用體驗。',
  },
  {
    id: '02',
    title: 'Petpro',
    slug: 'petpro',
    detailId: 'work-petpro',
    cover: '/img/petpro.png',
    typeLabel: '寵物健康照護平台',
    tags: ['Brand Design', 'UIUX Design', 'Product Design', 'Color System', 'Business Model'],
    date: '31 01 2026',
    icon: '/img/petpro_icon.png',
    description:
      'Petpro為全台毛小孩打造寵物健康照護平台，讓每個毛孩擁有電子寵物照護卡，隨時記錄、了解身體狀況，並且推薦最合適的日常食品與用品。',
    gallery: {
      type: 'static',
      images: ['/img/petpro01.png', '/img/petpro02.png', '/img/petpro03.png'],
    },
    concept: '將資訊平台與商業結合，並用遊戲化的設計使讓使用者可以更快速方便取得資訊。',
  },
  {
    id: '03',
    title: 'PawFinder',
    slug: 'pawfinder',
    detailId: 'work-pawfinder',
    cover: '/img/pawfinder_work.png',
    typeLabel: '寵物協尋回報平台',
    tags: ['Brand Design', 'UIUX Design', 'Product Design', 'Logo Design', 'Color System', 'Business Model'],
    date: '01 09 2025',
    icon: '/img/Pawfinder_icon.png',
    description:
      'Petfinder是因為許多毛孩爸媽遇到的真實故事而催生的工具，運用社會的善良、社群的激勵以及企業的社會責任，讓更多走失的毛孩可以被快速的回到屬於自己的家。',
    gallery: {
      type: 'marquee',
      images: ['/img/pawfinder01.png', '/img/pawfinder02.png', '/img/pawfinder03.png', '/img/pawfinder04.png'],
    },
    concept: '以能夠快速回報資訊為目標，用最簡化的資訊與社群的回饋，打造溫暖的平台。',
  },
];
