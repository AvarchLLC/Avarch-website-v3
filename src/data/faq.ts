export type Faq = { q: string; a: string };

// Answers may contain simple inline HTML links.
export const faqs: Faq[] = [
  {
    q: "What is Avarch?",
    a: 'Avarch LLC is a blockchain software studio founded in 2017 by <a href="/founder">Pooja Ranjan</a>. We run <a href="https://etherworld.co" target="_blank" rel="noopener">EtherWorld</a>, build <a href="https://eipsinsight.com" target="_blank" rel="noopener">EIPsInsight</a> and <a href="https://bloblens.com" target="_blank" rel="noopener">BlobLens</a>, and are launching EthShala for structured Ethereum courses.',
  },
  {
    q: "Who works at Avarch?",
    a: 'A small core team of engineers and operators led by Pooja, plus student interns each year. You can <a href="/team">meet the team here</a>.',
  },
  {
    q: "Are your tools open source?",
    a: 'Yes. EIPsInsight and BlobLens are developed in the open on <a href="https://github.com/AvarchLLC" target="_blank" rel="noopener">GitHub under AvarchLLC</a>, and EtherWorld articles are free to read.',
  },
  {
    q: "How is the work funded?",
    a: 'Our open-source work has been supported by the Ethereum Foundation\'s Ecosystem Support Program and several Gitcoin Grants rounds. The <a href="/partners">partners page</a> lists each grant.',
  },
  {
    q: "Can Avarch build something for my team?",
    a: 'We take on blockchain project development and consulting, especially work around Ethereum data, standards and education. <a href="/contact/">Tell us about the project</a>.',
  },
  {
    q: "Do you offer internships?",
    a: 'Yes. Since 2020 more than 50 students have done paid internships with us in development, technical writing and video. Pick "Internships" on the <a href="/contact/">contact form</a> to get in touch.',
  },
  {
    q: "Can I write for EtherWorld?",
    a: 'Guest contributions and media partnerships are welcome. Send us your topic or draft through the <a href="/contact/">contact form</a>.',
  },
  {
    q: "How is Avarch related to Ethereum Cat Herders?",
    a: 'They are separate organisations. Pooja serves as President of ECH Institute, the nonprofit behind <a href="https://www.ethereumcatherders.com/" target="_blank" rel="noopener">Ethereum Cat Herders</a>, and founded Avarch independently.',
  },
  {
    q: "What is an EIP?",
    a: 'An Ethereum Improvement Proposal is a design document that proposes a change to Ethereum or a standard for apps built on it. <a href="https://eipsinsight.com" target="_blank" rel="noopener">EIPsInsight</a> tracks every proposal\'s status, and <a href="https://eips.ethereum.org/EIPS/eip-1" target="_blank" rel="noopener">EIP-1</a> explains the process.',
  },
];
