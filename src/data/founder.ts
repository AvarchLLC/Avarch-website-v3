export const founder = {
  name: "Pooja Ranjan",
  role: "Founder, Avarch · President, ECH Institute",
  portrait: "/img/about_pooja_ranjan.png",
  photo: "/img/pooja-pfp.png",
  cutout: "/img/pooja-transparent.png",
  quote:
    "Blockchain is a very deep subject. Keep building and maintain consistency in learning the process. Everyone can make a difference.",
  twitter: "https://twitter.com/poojaranjan19",
  github: "https://github.com/poojaranjan",
  linkedin: "https://www.linkedin.com/in/pooja-r-072899114/",
  farcaster: "https://farcaster.xyz/poojaranjan19",
};

export const journey = [
  {
    year: "2016",
    title: "Discovers Ethereum",
    body: "Starts learning about Ethereum and joins the blockchain community.",
  },
  {
    year: "2017",
    title: "Founds Avarch & EtherWorld",
    body: "Starts Avarch LLC. Its first project, EtherWorld, publishes news, technical articles and project updates to help more people understand blockchain.",
  },
  {
    year: "2019",
    title: "Becomes Herder-in-Chief",
    body: "Starts leading Ethereum Cat Herders, coordinating protocol development processes, EIP management and network-upgrade communication for over five years.",
  },
  {
    year: "2020",
    title: "Launches BlockAction",
    body: "Co-founds BlockAction, an explorer that supported the Beacon Chain multi-client testnet ahead of Ethereum's move to proof-of-stake.",
  },
  {
    year: "2022",
    title: "Launches EIPsInsight",
    body: "Builds a data analytics dashboard and monthly reports for Ethereum Improvement Proposals.",
  },
  {
    year: "2024",
    title: "President of ECH Institute",
    body: "Takes on the presidency of ECH Institute Inc., a US 501(c)(3) nonprofit for education, community engagement and diversity in Ethereum, and helps start Women in Ethereum Protocol.",
  },
  {
    year: "Today",
    title: "Building and teaching",
    body: "Runs Avarch's publications and tools, hosts PEEPanEIP and works on enterprise participation in Ethereum's open-source process.",
  },
];

export const contributions = [
  {
    kicker: "Standards",
    title: "EIPs",
    body: "Contributes to the EIP process and co-authored EIP-5069, the EIP Editor Handbook.",
    href: "https://eips.ethereum.org/",
    cta: "Explore EIPs",
    image: "/img/icons/ethereum_logo_3d.jpg",
  },
  {
    kicker: "Data",
    title: "EIPsInsight",
    body: "Launched EIPsInsight, the analytics dashboard that tracks every proposal's status and history.",
    href: "https://eipsinsight.com/",
    cta: "View dashboard",
    image: "/img/logos/eipsinsight.png",
  },
  {
    kicker: "Nonprofit",
    title: "ECH Institute",
    body: "President of the nonprofit behind Ethereum Cat Herders, after five years as Herder-in-Chief coordinating network upgrades.",
    href: "https://www.ethereumcatherders.com/",
    cta: "Visit ECH",
    image: "/img/logos/ech.png",
  },
  {
    kicker: "Diversity",
    title: "WiEP",
    body: "Women in Ethereum Protocol brings more women into protocol development through mentorship and cohorts.",
    href: "https://x.com/wiepteam",
    cta: "Follow WiEP",
    image: "/img/logos/wiep.png",
  },
  {
    kicker: "Education",
    title: "PEEPanEIP",
    body: "Hosts the video series where EIP authors walk through their own proposals.",
    href: "https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F",
    cta: "Watch series",
    image: "/img/icons/eips.gif",
  },
];

// Thumbnails are stored locally so a removed video can't leave a blank card.
const yt = (id: string) => `/img/thumbs/yt-${id}.jpg`;

export const talks = [
  { year: "2025", title: "From research to reality: an EIP's journey · Devconnect", href: "https://www.youtube.com/watch?v=wH76j1BDZkc", image: "/img/icons/eip_summit_cover.png" },
  { year: "2025", title: "Education and diversity in protocol development · EDCON", href: "https://www.youtube.com/watch?v=uVj7JyTbLbg", image: "/img/icons/edcon_osaka_cover.png" },
  { year: "2024", title: "EIPs simplified: history and process · Devcon SEA", href: "https://www.youtube.com/watch?v=xycI1vbxJo8", image: yt("xycI1vbxJo8") },
  { year: "2024", title: "Shaping protocol governance · W3 Hub at Devcon", href: "https://www.youtube.com/watch?v=U_UN8FRqi5c", image: "/img/icons/w3_cover.png" },
  { year: "2024", title: "WiEP introduction · W3 Hub at Devcon", href: "https://www.youtube.com/watch?v=C_zkU-f4tto", image: yt("C_zkU-f4tto") },
  { year: "2024", title: "Ethereum Singapore", href: "https://ethereumsingapore.com/", image: "/img/icons/ethereum_singapore_cover.png" },
  { year: "2023", title: "How decisions get made on Ethereum · Interop Summit", href: "https://www.youtube.com/watch?v=0t1aN-qaH9E", image: "/img/icons/eth_denver_cover.png" },
  { year: "2023", title: "Elements of protocol governance · EDCON", href: "https://www.youtube.com/watch?v=C1LMqQ10gSM", image: yt("C1LMqQ10gSM") },
  { year: "2023", title: "Enterprise Ethereum Alliance", href: "https://www.youtube.com/watch?v=GpeOMZQCiLI", image: yt("GpeOMZQCiLI") },
  { year: "2023", title: "CoinDesk Consensus", href: "https://www.youtube.com/shorts/gpCc_NAtNn0", image: yt("gpCc_NAtNn0") },
  { year: "2021", title: "The future of Ethereum with EIPs · EDCON keynote", href: "https://www.youtube.com/watch?v=5PmGt1B-SVc", image: yt("5PmGt1B-SVc") },
  { year: "2021", title: "Women in Blockchain panel · Chainlink", href: "https://www.youtube.com/watch?v=f1j2FwKgk7Q&t=242s", image: yt("f1j2FwKgk7Q") },
  { year: "2021", title: "ConsenSys Academy", href: "https://docs.google.com/presentation/d/1d-5HRjt_GPkdMdYa1Bbcyw8Vb0AVWl_hFwrnbXT2PhE/edit", image: "/img/icons/consensys_academy_cover.png" },
];

export const conversations = [
  {
    title: "Education and organization for Ethereum",
    host: "Unstoppable AI, episode 29",
    length: "58:16",
    href: "https://www.youtube.com/watch?v=NLjkQnGL5rI",
    image: yt("NLjkQnGL5rI"),
  },
  {
    title: "Meet The Herders #1: Pooja Ranjan",
    host: "ECH Institute",
    length: "37:34",
    href: "https://www.youtube.com/watch?v=XCOdX5UmtU4",
    image: yt("XCOdX5UmtU4"),
  },
  {
    title: "MolochDAO interview",
    host: "MolochDAO",
    length: "Article",
    href: "https://medium.com/molochdao/molochdao-interview-with-pooja-ranjan-of-ethereum-cat-herders-be037f115961",
    image: "/img/molochdao-thumb.png",
  },
];

// Episodes of PEEPanEIP, the series Pooja hosts, where EIP authors explain their proposals.
export const peepanEip = [
  { n: 154, eip: "EIP-7892", topic: "Blob parameter only hardforks", guest: "Mark Mackey", href: "https://www.youtube.com/watch?v=Q58Wm5gtiJY", image: yt("Q58Wm5gtiJY") },
  { n: 153, eip: "EIP-7939", topic: "CLZ opcode", guest: "Vectorized", href: "https://www.youtube.com/watch?v=MuBxmqDyw_c", image: yt("MuBxmqDyw_c") },
  { n: 142, eip: "EIP-7706", topic: "Separate gas type for calldata", guest: "Vitalik Buterin", href: "https://www.youtube.com/watch?v=c3TV6OhjSfc", image: yt("c3TV6OhjSfc") },
  { n: 46, eip: "Verkle", topic: "Verkle tries for Ethereum state", guest: "Dankrad Feist", href: "https://www.youtube.com/watch?v=RGJOQHzg3UQ", image: yt("RGJOQHzg3UQ") },
];

type ArchiveItem = { title: string; source?: string; url: string; video?: boolean };

export const archive: { key: string; title: string; image: string; items: ArchiveItem[] }[] = [
  {
    key: "media",
    title: "Media features",
    image: "/img/archive_media.jpg",
    items: [
      { title: "The Merge: 10 key people behind Ethereum's biggest upgrade", source: "The Block", url: "https://www.theblock.co/post/166999/the-merge-10-key-people-behind-ethereums-biggest-upgrade-yet" },
      { title: "Meet the 10 women who are shaping the future of Ethereum", source: "EtherWorld", url: "https://etherworld.co/2025/03/08/meet-the-10-women-who-are-shaping-the-future-of-ethereum/" },
      { title: "London hard fork on Ethereum now live", source: "Decrypt", url: "https://decrypt.co/77746/london-hard-fork-ethereum-live" },
      { title: "Everything you need to know about Shapella", source: "The Block", url: "https://www.theblock.co/post/225655/ethereum-shapella" },
      { title: "Ethereum 2.0 and the prospect of reverse mutation", source: "Yale Journal of Law & Technology", url: "https://yjolt.org/blog/ethereum-20-and-prospect-reverse-mutation" },
      { title: "Pectra upgrade: what's new and how to track it", source: "Etherscan", url: "https://info.etherscan.com/pectra-upgrade-whats-new-and-how-to-track-it-on-etherscan/" },
      { title: "The MEV Letter #91", source: "Flashbots", url: "https://collective.flashbots.net/t/the-mev-letter-91/4988/1" },
    ],
  },
  {
    key: "articles",
    title: "Articles by Pooja",
    image: "/img/archive_articles.jpg",
    items: [
      { title: "Happy 10 years of community building with Ethereum", url: "https://medium.com/ethereum-cat-herders/happy-10-years-of-community-building-with-ethereum-7786bfff67c6" },
      { title: "Ethereum Cat Herders' wrap for 2024", url: "https://medium.com/ethereum-cat-herders/ethereum-cat-herders-wrap-for-2024-62b029f1dcee" },
      { title: "It's Pectra time!", url: "https://medium.com/ethereum-cat-herders/its-pectra-time-0cf5561f662c" },
      { title: "ProgPoW: the Ethereum community speaks", url: "https://hudsonjameson.com/posts/2020-03-02-progpow-the-ethereum-community-speaks/" },
    ],
  },
  {
    key: "education",
    title: "Educational resources",
    image: "/img/archive_education.jpg",
    items: [
      { title: "EIPs simplified: history and process explained", url: "https://www.youtube.com/watch?v=xycI1vbxJo8", video: true },
      { title: "Elements of protocol governance", source: "EDCON 2023", url: "https://www.youtube.com/watch?v=C1LMqQ10gSM", video: true },
      { title: "Shaping Ethereum's protocol governance & decision-making", url: "https://www.youtube.com/watch?v=U_UN8FRqi5c", video: true },
      { title: "Understanding Ethereum network upgrades", source: "ConsenSys Academy", url: "https://courses.consensys.net/courses/understanding-ethereum-network-upgrades-dencun-december-2023-january-february-2024" },
      { title: "EEA monthly education call", url: "https://www.youtube.com/watch?v=LdAlzFPaJpQ", video: true },
      { title: "Understand EIPs", source: "WiEP Cohort 3", url: "https://youtu.be/WxtcBzv05zM", video: true },
      { title: "WiEP Cohort 4", url: "https://www.youtube.com/watch?v=equE9PjNtZ0", video: true },
    ],
  },
  {
    key: "events",
    title: "Events & appearances",
    image: "/img/archive_events.jpg",
    items: [
      { title: "From research to reality: an EIP's journey · Devconnect 2025", url: "https://www.youtube.com/watch?v=wH76j1BDZkc", video: true },
      { title: "Education and diversity in protocol development · EDCON 2025", url: "https://www.youtube.com/watch?v=uVj7JyTbLbg", video: true },
      { title: "ETH Singapore 2024", url: "https://ethereumsingapore.com/" },
      { title: "ETHDenver 2024", url: "https://x.com/EthereumDenver/status/1763697260968186109" },
      { title: "EEA 6th anniversary", url: "https://www.youtube.com/watch?v=GpeOMZQCiLI", video: true },
      { title: "Empowering women in Ethereum: WiEP introduction", url: "https://www.youtube.com/watch?v=C_zkU-f4tto", video: true },
      { title: "ETHWMN: opportunities in Web3", url: "https://youtu.be/AbCzQtQWlSE", video: true },
      { title: "Mainnet NYC: exploring Ethereum with Ethereum Cat Herders", url: "https://youtu.be/oED02-fqsZI", video: true },
      { title: "Chainlink panel 2021", url: "https://www.youtube.com/watch?v=f1j2FwKgk7Q", video: true },
    ],
  },
  {
    key: "interviews",
    title: "Interviews & podcasts",
    image: "/img/archive_interviews.jpg",
    items: [
      { title: "PEEPanEIP #142: EIP-7706 with Vitalik Buterin", source: "ECH Institute", url: "https://www.youtube.com/watch?v=c3TV6OhjSfc", video: true },
      { title: "CNBC interview", url: "https://youtu.be/6lNgLNnfSoQ?t=360", video: true },
      { title: "Education and organization for Ethereum", source: "Unstoppable AI", url: "https://www.youtube.com/watch?v=NLjkQnGL5rI", video: true },
      { title: "Meet the Herders: Pooja Ranjan", url: "https://www.youtube.com/watch?v=XCOdX5UmtU4", video: true },
      { title: "MolochDAO interview with Pooja Ranjan", url: "https://medium.com/molochdao/molochdao-interview-with-pooja-ranjan-of-ethereum-cat-herders-be037f115961" },
      { title: "GM Bus radio interview", url: "https://gmbusbus.podbean.com/e/gm-bus-radio-interview-with-pooja-ranjan/" },
      { title: "CoinDesk short", url: "https://www.youtube.com/shorts/gpCc_NAtNn0", video: true },
      { title: "EthStaker short", url: "https://www.youtube.com/shorts/tRIvDvcRhbU", video: true },
    ],
  },
  {
    key: "community",
    title: "Community mentions",
    image: "/img/archive_community.jpg",
    items: [
      { title: "How code changes are made to the world's most sprawling blockchain", source: "Galaxy Research", url: "https://www.galaxy.com/insights/research/ethereum-governance" },
      { title: "How the Ethereum community reacted to The Merge", source: "The Block", url: "https://www.theblock.co/post/170334/an-incredible-feat-how-the-ethereum-community-reacted-to-the-merge" },
      { title: "An introduction to EIPs with Tim Beiko", source: "Unstoppable Domains", url: "https://unstoppabledomains.com/blog/an-introduction-to-eips-with-tim-beiko-from-the-ethereum-foundation" },
      { title: "Ethereum network upgrades part 1: the process", source: "Metrika", url: "https://blog.metrika.co/ethereum-network-upgrades-part-1-the-process-7112ba57f3fb" },
      { title: "Gratitude to women who have made huge contributions", source: "r/ethereum", url: "https://www.reddit.com/r/ethereum/comments/11lslel/gratitude_to_women_who_have_made_huge/" },
      { title: "Tim Beiko inviting support for Ethereum Cat Herders", url: "https://twitter.com/TimBeiko/status/1734679319430250530" },
      { title: "Hudson Jameson steps down from Ethereum core developers", source: "Decrypt", url: "https://decrypt.co/52240/hudson-jameson-steps-down-from-ethereum-core-developers" },
      { title: "Rhino Review: Ethereum staking journal", url: "https://rhinoreview.substack.com/p/rhino-review-ethereum-staking-journal-030" },
    ],
  },
];

// Career before Ethereum, from Pooja's portfolio.
export const earlierCareer = [
  { role: "Senior Software Engineer", org: "Accenture", period: "2007 to 2010", place: "Mumbai" },
  { role: "Project Management Officer", org: "Magna Infotech", period: "2007", place: "Mumbai" },
  { role: "Asst. Manager, Business Development", org: "Moody International", period: "2005 to 2007", place: "New Delhi" },
];

export const education = [
  { degree: "M.Com and PGDM (Marketing & HR)", school: "Institute of Management Education", period: "2003 to 2005" },
  { degree: "B.Sc Computer Science", school: "Magadh University", period: "1998 to 2001" },
];
