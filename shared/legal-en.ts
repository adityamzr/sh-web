// Faithful English versions of the existing Indonesian pages. No policy changes.
type Section = { id: string; title: string; paragraphs: string[]; bullets?: string[] }
export const legalEnglish: Record<string, Section[]> = {
  about: [
    { id: 'apa-itu', title: 'More than a place to find information.', paragraphs: [
      'Sudut Haramain helps Indonesians get to know Makkah and Madinah more closely.',
      'It is not only about travelling to the two holy cities, but also about life within them: getting from place to place, understanding your surroundings, discovering local culture, finding everyday essentials, and accessing relevant information while in Haramain.',
      'We want information about Makkah and Madinah to feel closer, be easier to understand, and genuinely useful when you need it.',
    ] },
    { id: 'mengapa', title: 'Why does Sudut Haramain exist?', paragraphs: [
      'Information about Makkah and Madinah is scattered across many places. Some changes quickly, some is difficult to find, and some only becomes important once you are there.',
      'Sudut Haramain brings this information together from a practical perspective that is easy to explore.',
      'Our aim is simple: to help readers understand Haramain better before travelling, during their stay, and after returning home.',
    ] },
    { id: 'yang-ditemukan', title: 'What you can find on Sudut Haramain', paragraphs: ['Daily life and culture, information about Makkah and Madinah, travel, worship, stories and highlights from Haramain, as well as practical guides.'] },
    { id: 'prinsip', title: 'Information grounded in real needs.', paragraphs: [
      'We aim to present information in accessible language, with clear context and practical value for readers.',
      'We also recognise that conditions in Makkah and Madinah can change. Schedules, rules, access, transport, prices, and local policies may be updated over time. Readers are therefore encouraged to check official information and current conditions when making decisions on the ground.',
    ] },
    { id: 'ekosistem', title: 'The Sudut Haramain ecosystem', paragraphs: [
      'Sudut Haramain is growing as an ecosystem rooted in Indonesians’ needs relating to Haramain.',
      'Sudut Haramain — Digital media and practical information on Makkah and Madinah.',
      'Sudut Haramain Tour — Independent Umrah and Land Arrangement services.',
    ] },
    { id: 'penutup', title: 'See Makkah and Madinah more closely through genuinely useful information, stories, and guides.', paragraphs: ['Welcome to Sudut Haramain. Enjoy exploring.'] },
  ],
  privacy: [
    { id: 'informasi', title: '1. Information We Receive', paragraphs: [
      'Sudut Haramain may receive information that you provide directly when using certain features of the website. This may include data submitted through contribution forms, information corrections, place recommendations, tips, experiences, or other interactions available on the website.',
      'We may also receive simple feedback on content, such as whether an article was helpful or less helpful.',
    ] },
    { id: 'penggunaan', title: '2. How Information Is Used', paragraphs: ['The information received may be used to:'], bullets: [
      'review contributions submitted by users;', 'correct or update information on the website;', 'understand whether content is useful to readers;', 'improve content quality and the website experience;', 'maintain the security and operation of the service.', 'User contributions are not automatically published on the website.',
    ] },
    { id: 'teknis', title: '3. Technical Information', paragraphs: ['To run the website, our systems and infrastructure providers may process basic technical information needed to display, secure, and operate the service. This may include information such as IP addresses, device or browser types, access times, and other technical information commonly processed by web hosting and infrastructure services.'] },
    { id: 'cookie', title: '4. Cookies and Analytics', paragraphs: ['Sudut Haramain does not use cookies or similar technologies to build individual user profiles, except where required for the technical operation of the website. If Sudut Haramain uses analytics services or similar technologies in the future, this Privacy Policy may be updated to explain their use.'] },
    { id: 'pihak-ketiga', title: '5. Third-Party Services', paragraphs: ['Sudut Haramain uses certain third-party services to support the website, including hosting, image storage and delivery, and other technical infrastructure. In performing their functions, these providers may process technical information in accordance with their own policies and terms.'] },
    { id: 'keamanan', title: '6. Information Security', paragraphs: ['We endeavour to take reasonable measures to protect information handled through the website. However, no system for storing or transmitting data over the internet can be guaranteed to be entirely free from risk.'] },
    { id: 'penyimpanan', title: '7. Information Retention', paragraphs: ['Information may be retained for as long as it is needed to operate website features, review contributions, maintain security, address operational needs, or meet applicable obligations. Information that is no longer needed may be deleted or cease to be used in accordance with Sudut Haramain’s operational needs.'] },
    { id: 'permintaan', title: '8. Requests About Your Information', paragraphs: ['If you have questions or requests about information you have submitted through Sudut Haramain, you may contact us through the official contact channels available.'] },
    { id: 'perubahan', title: '9. Changes to This Privacy Policy', paragraphs: ['This Privacy Policy may be updated from time to time to reflect changes to Sudut Haramain’s features, services, technology, or operational needs. The latest update date will be displayed on this page.'] },
  ],
  terms: [
    { id: 'tentang', title: '1. About Sudut Haramain', paragraphs: ['Sudut Haramain is a digital media platform providing information, practical guides, stories, and content about Makkah, Madinah, travel, local life, and related topics. The content on this website is intended as general information and is not necessarily a substitute for official information from the relevant authorities.'] },
    { id: 'penggunaan', title: '2. Using the Website', paragraphs: ['You may use Sudut Haramain to obtain information and explore available content, provided you do so reasonably and lawfully. You may not use the website to:'], bullets: [
      'disrupt the security or functionality of the website;', 'attempt to gain unauthorised access to systems;', 'submit harmful, misleading, or unlawful content;', 'use automated systems excessively in a way that disrupts the service;', 'misuse Sudut Haramain’s content or services.',
    ] },
    { id: 'akurasi', title: '3. Accuracy and Changes to Information', paragraphs: ['We strive to provide useful and relevant information. However, conditions in Makkah and Madinah may change at any time. Information about schedules, rules, location access, transport, prices, facilities, authority policies, travel procedures, and conditions on the ground may change after content is published. Users are therefore encouraged to check the latest information with official sources or relevant parties.'] },
    { id: 'ibadah', title: '4. Worship and Religious Information', paragraphs: ['Content about worship and religion is presented to help readers understand the topics discussed. For matters requiring a specific religious ruling on personal circumstances, users are encouraged to consult qualified scholars or other competent authorities.'] },
    { id: 'kontribusi', title: '5. User Contributions', paragraphs: ['Sudut Haramain may provide features allowing users to submit information corrections, place recommendations, tips, experiences, or other information. Submitting a contribution does not guarantee publication. The Sudut Haramain team may review, use as reference, edit, follow up on, or disregard contributions according to editorial and operational needs. Users are responsible for ensuring that submitted material does not infringe the rights of others or contain unlawful material.'] },
    { id: 'konten', title: '6. Content Rights', paragraphs: ['Original content, visual identity, designs, writing, illustrations, and other materials created by Sudut Haramain are protected under applicable rules. Reasonable personal use and sharing of links are permitted. Copying, republication, commercial use, or substantial distribution without permission is not permitted unless otherwise stated.'] },
    { id: 'pihak-ketiga', title: '7. Third-Party Links and Services', paragraphs: ['Sudut Haramain may display links to third-party websites, applications, maps, services, or information sources. Sudut Haramain does not control their content, policies, availability, or changes.'] },
    { id: 'tanggung-jawab', title: '8. Limitation of Liability', paragraphs: ['Users are responsible for decisions made based on information available on the website. To the extent permitted by applicable rules, Sudut Haramain is not responsible for losses arising from changes to conditions on the ground, third-party information, service disruptions, or use of information outside its context.'] },
    { id: 'ekosistem', title: '9. Services in the Sudut Haramain Ecosystem', paragraphs: ['Some services in the Sudut Haramain ecosystem may have their own websites, processes, prices, policies, or terms of use. If you use those services, their specific terms may apply in addition to the terms of the Sudut Haramain media website.'] },
    { id: 'perubahan-situs', title: '10. Changes to the Website and Services', paragraphs: ['Sudut Haramain may update, change, add, restrict, or discontinue parts of the website as needed for development, maintenance, security, or operational purposes.'] },
    { id: 'perubahan-syarat', title: '11. Changes to These Terms & Conditions', paragraphs: ['These Terms & Conditions may be updated from time to time. The latest version will be displayed on this page together with the date of the most recent update.'] },
    { id: 'kontak', title: '12. Contact', paragraphs: ['If you have questions about these Terms & Conditions, please contact Sudut Haramain through the official contact channels available on the website.'] },
  ],
}
