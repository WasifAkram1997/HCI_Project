import React, { useEffect, useState } from 'react';
import {  AccordionItem, AccordionHeader, AccordionBody, Container, UncontrolledAccordion } from 'reactstrap';

const NewsAccordion = () => {
  const [newsItems, setNewsItems] = useState([]);

  // Fetch news from localhost:5000/news
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/news');
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container className="my-4 rounded p-2">
      <h1>Exciting News For Gym Goers</h1>
      <UncontrolledAccordion>
        {newsItems.map((news) => (
          <AccordionItem key={news.id}>
            <AccordionHeader targetId={news.id.toString()}>
              {news.title}
            </AccordionHeader>
            <AccordionBody accordionId={news.id.toString()}>
              {news.description}
            </AccordionBody>
          </AccordionItem>
        ))}
      </UncontrolledAccordion>
    </Container>
  );
};

export default NewsAccordion;
