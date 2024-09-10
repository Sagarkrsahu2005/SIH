// Cache chatbotMessages element
let cachedChatbotMessages = null;

// Define the responses map with general and culture-related questions
const responses = new Map([
    ['hello', 'Hi there! How can I help you today?'],
    ['what is the taj mahal?', 'The Taj Mahal is a white marble mausoleum located in Agra, India, built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. It is considered one of the most beautiful buildings in the world.'],
    ['who was mahatma gandhi?', 'Mahatma Gandhi was a prominent leader in the Indian independence movement against British rule. He is known for his philosophy of nonviolent resistance and his role in achieving India’s independence in 1947.'],
    ['what is diwali?', 'Diwali, also known as Deepavali, is a major Hindu festival celebrating the victory of light over darkness. It is marked by lighting lamps, fireworks, and feasting, and it symbolizes the return of Lord Rama to Ayodhya after defeating the demon Ravana.'],
    ['what is ayurveda?', 'Ayurveda is an ancient system of medicine originating in India that emphasizes balance in the body’s energies. It uses natural remedies, including herbs, diet, and lifestyle changes, to promote health and well-being.'],
    ['who built the qutub minar?', 'The Qutub Minar was commissioned by Qutb-ud-din Aibak, the founder of the Delhi Sultanate, and its construction was completed by his successor, Iltutmish, in 1193. It is one of the tallest brick minarets in the world.'],
    ['what is yoga?', 'Yoga is a physical, mental, and spiritual practice that originated in ancient India. It involves various postures, breathing exercises, and meditation techniques to improve overall health and achieve inner peace.'],
    ['what is the significance of the ganges river?', 'The Ganges River, or Ganga, is considered sacred in Hinduism. It is believed to be a goddess who purifies sins and bestows blessings. Many Hindus travel to the river for religious ceremonies and rituals.'],
    ['who was jawaharlal nehru?', 'Jawaharlal Nehru was the first Prime Minister of India, serving from 1947 to 1964. He was a central figure in Indian politics both before and after independence and is remembered for his role in shaping modern India.'],
    ['what is the significance of the lotus in indian culture?', 'The lotus is a symbol of purity, enlightenment, and rebirth in Indian culture. It is associated with various deities and represents spiritual awakening.'],
    ['who was the first emperor of india?', 'Chandragupta Maurya was the first emperor of India, establishing the Maurya Empire in 322 BCE. His reign marked the beginning of significant political and economic developments in ancient India.'],
    ['what is the ramayana?', 'The Ramayana is an ancient Indian epic that narrates the life of Prince Rama, his wife Sita, and his loyal companion Hanuman. It is a major Hindu text and holds significant cultural and religious value.'],
    ['what is the mahabharata?', 'The Mahabharata is one of the longest epic poems in the world, detailing the story of the Kurukshetra War and the fates of the Kaurava and Pandava princes. It includes the Bhagavad Gita, a key Hindu scripture.'],
    ['who was akbar the great?', 'Akbar the Great was a Mughal Emperor who reigned from 1556 to 1605. He is known for his administrative reforms, religious tolerance, and the promotion of arts and culture in his empire.'],
    ['what is the indian national flag made of?', 'The Indian national flag, known as the Tricolor, is made of three horizontal stripes: saffron at the top, white in the middle with a blue Ashoka Chakra, and green at the bottom.'],
    ['who was the founder of the indian national congress?', 'The Indian National Congress was founded by Allan Octavian Hume in 1885. It played a crucial role in the Indian independence movement.'],
    ['what is the significance of the sari?', 'The sari is a traditional Indian garment worn by women. It symbolizes grace and elegance and is often worn during cultural and religious events.'],
    ['who was bhagat singh?', 'Bhagat Singh was a prominent freedom fighter and revolutionary who fought against British rule in India. He is remembered for his activism and sacrifice for the country’s independence.'],
    ['what is the indian currency?', 'The currency of India is the Indian Rupee (INR), symbolized as ₹. It is issued and regulated by the Reserve Bank of India.'],
    ['what is the indian space research organization?', 'The Indian Space Research Organisation (ISRO) is the space agency of the Indian government. It is responsible for the development and launch of satellites and space missions.'],
    ['who was rabindranath tagore?', 'Rabindranath Tagore was a renowned poet, philosopher, and Nobel laureate in Literature. He is known for his work "Gitanjali" and contributions to Indian literature and music.'],
    ['what is the role of the president of india?', 'The President of India is the ceremonial head of state and the highest constitutional authority. They play a key role in upholding the Constitution and representing India at official functions.'],
    ['what is the significance of holi?', 'Holi is a vibrant Hindu festival known as the Festival of Colors. It celebrates the arrival of spring and the victory of good over evil, marked by throwing colored powders and water.'],
    ['who was indira gandhi?', 'Indira Gandhi was the first and only female Prime Minister of India, serving from 1966 to 1977 and then from 1980 until her assassination in 1984. She was known for her political leadership and economic policies.'],
    ['what is the importance of the ajanta and ellora caves?', 'The Ajanta and Ellora Caves are ancient rock-cut caves in Maharashtra, India, known for their intricate Buddhist, Hindu, and Jain temples and frescoes. They are significant for their historical and artistic value.'],
    ['who was sardar vallabhbhai patel?', 'Sardar Vallabhbhai Patel was a key figure in the Indian independence movement and the first Deputy Prime Minister and Home Minister of India. He played a crucial role in integrating princely states into India.'],
    ['what is the significance of raksha bandhan?', 'Raksha Bandhan is a Hindu festival celebrating the bond between brothers and sisters. Sisters tie a protective thread, or rakhi, around their brothers\' wrists, symbolizing love and protection.'],
    ['who was subhas chandra bose?', 'Subhas Chandra Bose was a prominent leader in the Indian independence movement who advocated for armed struggle against British rule. He led the Indian National Army (INA) and sought international support for India’s independence.'],
    ['what is the importance of the red fort?', 'The Red Fort in Delhi is a historic fortification built by Mughal Emperor Shah Jahan. It is a UNESCO World Heritage Site and a symbol of India’s rich history and cultural heritage.'],
    ['what is the significance of ganesh chaturthi?', 'Ganesh Chaturthi is a Hindu festival celebrating the birth of Lord Ganesha, the elephant-headed god of wisdom and prosperity. The festival involves installing Ganesha idols and celebrating with prayers and festivities.'],
    ['who was dr. apj abdul kalam?', 'Dr. APJ Abdul Kalam was an Indian scientist and the 11th President of India. He is known for his work in missile development and his contributions to science and education.'],
    ['what is the significance of the indian monsoon?', 'The Indian monsoon is a seasonal wind pattern that brings heavy rains to India, essential for agriculture and water resources. It significantly impacts the country’s climate and economy.'],
    ['who was the last viceroy of india?', 'Lord Mountbatten was the last British Viceroy of India, serving from 1947 to 1948. He oversaw the transition of India from British rule to independence and the partition of India and Pakistan.'],
    ['what is the importance of the sun temple at konark?', 'The Sun Temple at Konark is a 13th-century Hindu temple dedicated to the sun god Surya. It is renowned for its architectural grandeur and intricate stone carvings, and is a UNESCO World Heritage Site.'],
    ['what is the significance of the indian epics?', 'The Indian epics, such as the Ramayana and the Mahabharata, are ancient texts that provide moral, philosophical, and spiritual guidance. They reflect the cultural and religious heritage of India.'],
    ['who was chandrayaan?', 'Chandrayaan is India’s lunar exploration program. The Chandrayaan-1 mission, launched by ISRO in 2008, was India’s first mission to the Moon, discovering water molecules on the lunar surface.'],
    ['what is the significance of the jagannath temple?', 'The Jagannath Temple in Puri, Odisha, is a major Hindu pilgrimage site dedicated to Lord Jagannath, a form of Lord Krishna. It is known for the annual Ratha Yatra, a grand chariot procession.'],
    ['what is heritage', 'Heritage refers to the legacy of physical artifacts, traditions, practices, and cultural elements passed down through generations. It encompasses both tangible items like buildings, monuments, and artworks, and intangible aspects such as languages, customs, and oral traditions. Heritage is vital for preserving the identity and history of a community or nation, offering insights into past civilizations and cultural values. It helps maintain continuity and fosters a sense of belonging and pride among people.'],
    ['culture place to visit in india', `
        Heritage represents the collective legacy of cultural elements passed through generations, shaping a community's identity and history. In India, this rich heritage is embodied in:

        - Varanasi: Celebrated for its ancient temples and ghats, it offers a profound spiritual experience along the Ganges River.
        - Jaipur: Known as the Pink City, it boasts historical forts and palaces like Amber Fort and Hawa Mahal, reflecting royal splendor.
        - Agra: Home to the Taj Mahal, a UNESCO World Heritage site that symbolizes Mughal architectural brilliance.
        - Mumbai: A vibrant city with landmarks like the Gateway of India and Elephanta Caves, and a dynamic Bollywood culture.
        - Udaipur: Renowned for its picturesque lakes and grand palaces, showcasing Rajasthan’s regal heritage.
        - Kerala: Offers tranquil backwaters and rich cultural practices, including Kathakali dance and Ayurvedic traditions.
        - Rishikesh: Known for its yoga and meditation centers, it provides a serene, spiritually enriching experience by the Ganges.
    `],
    ['tell me about indian festival', `
        Indian festivals are vibrant, diverse celebrations that reflect the country's rich cultural tapestry. They are marked by elaborate rituals, colorful decorations, traditional music and dance, and festive foods. Major festivals include:

        - Diwali: The Festival of Lights, celebrating the victory of light over darkness with fireworks, lamps, and sweets.
        - Holi: The Festival of Colors, where people throw colored powders and water, symbolizing the arrival of spring and the victory of good over evil.
        - Eid: Celebrated by Muslims, marking the end of Ramadan with feasting and communal prayers.
        - Navratri: A nine-night festival honoring the goddess Durga with fasting, dance, and devotion.
        - Durga Puja: A major festival in Bengal, celebrating the goddess Durga with elaborate pandals and cultural performances.
    `],
    ['tell me about indian culture & heritage', 'Indian culture and heritage encompass a vast and diverse range of traditions, languages, art forms, and practices that have evolved over thousands of years. The culture is deeply rooted in spirituality and philosophy, with major religions including Hinduism, Buddhism, Jainism, and Sikhism originating in India. Festivals like Diwali, Holi, Eid, and Pongal celebrate the rich tapestry of beliefs and traditions.'],
    // ['give me a roadmap to visit indian culture & heritage', 'Chandrayaan is India’s lunar exploration program. The Chandrayaan-1 mission, launched by ISRO in 2008, was India’s first mission to the Moon, discovering water molecules on the lunar surface.'],
    ['give me a roadmap to visit indian culture & heritage', `
        Here's a roadmap to explore Indian culture and heritage, offering a blend of historical sites, cultural experiences, and traditional practices across various regions of India:

        **1. Northern India**

        **Delhi**
        - *Red Fort*: Explore this UNESCO World Heritage site, a symbol of India’s rich history.
        - *Qutub Minar*: Visit this ancient minaret and its surrounding ruins.
        - *India Gate*: A war memorial with historical significance.
        - *Lotus Temple*: A stunning example of modern architecture and spiritual harmony.

        **Agra**
        - *Taj Mahal*: Admire the world-famous white marble mausoleum and its intricate designs.
        - *Agra Fort*: Discover the historical fort and its beautiful architecture.

        **Jaipur**
        - *Amber Fort*: Experience the grandeur of this hilltop fort.
        - *City Palace*: Visit the palace complex with its impressive courtyards and museums.
        - *Hawa Mahal*: See the iconic "Palace of Winds" known for its unique façade.

        **2. Western India**

        **Mumbai**
        - *Gateway of India*: A landmark symbolizing Mumbai’s colonial history.
        - *Elephanta Caves*: Explore the ancient cave temples on Elephanta Island.
        - *Chor Bazaar*: Wander through one of Mumbai’s bustling markets for antiques and artifacts.

        **Goa**
        - *Old Goa*: Visit the historical churches and cathedrals, including the Basilica of Bom Jesus.
        - *Goa’s Beaches*: Enjoy the beaches while learning about local Portuguese-influenced culture.

        **Rajasthan**
        - *Udaipur*: Explore the City Palace and enjoy a boat ride on Lake Pichola.
        - *Jaisalmer*: Discover the golden fort and traditional havelis.

        **3. Southern India**

        **Kolkata**
        - *Victoria Memorial*: Explore this grand monument dedicated to Queen Victoria.
        - *Indian Museum*: Visit India’s largest and oldest museum with diverse collections.

        **Kerala**
        - *Backwaters*: Take a houseboat ride through the tranquil backwaters.
        - *Fort Kochi*: Experience the fusion of Dutch, Portuguese, and British colonial influences.

        **Tamil Nadu**
        - *Madurai*: Visit the Meenakshi Amman Temple, a masterpiece of Dravidian architecture.
        - *Chennai*: Explore the Government Museum and the traditional arts scene.

        **4. Eastern India**

        **Bengaluru (Bangalore)**
        - *Tipu Sultan’s Summer Palace*: Learn about the ruler’s history and architecture.
        - *Nandi Hills*: Enjoy the scenic beauty and historical significance.

        **Odisha**
        - *Konark Sun Temple*: Marvel at this UNESCO World Heritage site known for its chariot-like structure.
        - *Puri*: Visit the Jagannath Temple, a significant pilgrimage site.

        **5. Northeastern India**

        **Assam**
        - *Kaziranga National Park*: Experience the rich wildlife and biodiversity.
        - *Majuli*: Explore the world's largest river island and its unique cultural heritage.

        **Sikkim**
        - *Gangtok*: Enjoy the vibrant culture and scenic beauty of the Himalayan state.
        - *Rumtek Monastery*: Visit this important Tibetan Buddhist monastery.

        **6. Cultural Experiences**
        - *Festivals*: Attend major Indian festivals such as Diwali, Holi, Durga Puja, and Pongal to experience local traditions and celebrations.
        - *Cuisine*: Savor regional cuisines from North to South India, including street food and traditional dishes.
        - *Crafts and Handlooms*: Explore local crafts such as Kanjivaram silk, Pashmina shawls, and handcrafted jewelry.

        **7. Travel Tips**
        - *Plan Ahead*: Research and plan your visit to each site based on historical significance, accessibility, and local events.
        - *Local Guides*: Consider hiring local guides for a more immersive experience and deeper understanding of the heritage sites.
        - *Respect Traditions*: Be mindful of local customs and dress codes, especially when visiting religious sites.
    `],
    ['how to buy craft', `
        Here's how you can buy handicrafts from our store:
  
        1. **Go to the Craft Section**: Navigate to the crafts page to explore the available handmade items.
        2. **Click on "Buy Handicrafts"**: Once you find the product category you are interested in, click on the 'Buy Handicrafts' button.
        3. **Choose Your Product**: Browse the available items and select the one you wish to purchase.
        4. **Click on the "Buy" Button**: After selecting your product, click the 'Buy' button to add it to your cart.
        5. **Fill Your Details**: Provide your personal and shipping information.
        6. **Choose Payment Method**: Select your preferred payment option from the available choices.
        7. **Press the Continue Button**: Confirm your order by pressing the 'Continue' button.
        8. **Your Order is Confirmed**: Once everything is completed, you'll receive an order confirmation!`
      ],

    // ['culture place to visit in india1', '<img src="https://4.bp.blogspot.com/-nYhrh2d0xSg/VKPGb46bnaI/AAAAAAAAAMg/MeMLiPmoVxs/s1600/03.jpg" alt="Description of Image" />'],


]);

export function handleBotResponse(chatbotMessages, userMessageText) {
    // Cache the chatbotMessages element if not cached
    if (!cachedChatbotMessages) {
        cachedChatbotMessages = chatbotMessages;
    }

    // Get the response based on the user message
    const response = responses.get(userMessageText.toLowerCase()) || "Sorry, I don't understand yet!";

    // Auto bot response
    const botMessage = document.createElement('div');
    botMessage.classList.add('message', 'bot');
    botMessage.innerText = response;
    cachedChatbotMessages.appendChild(botMessage);

    // Scroll to bottom after bot response
    cachedChatbotMessages.scrollTop = cachedChatbotMessages.scrollHeight;
}
