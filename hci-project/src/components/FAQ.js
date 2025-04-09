import React, { useEffect, useState } from 'react';
import {  AccordionItem, AccordionHeader, AccordionBody, Container, UncontrolledAccordion } from 'reactstrap';

const FAQAccordion = () => {
  const [faqItems, setFaqItems] = useState([]);

  // Fetch news from localhost:5000/news
  useEffect(() => {
    const fetchFaqItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/faq');
        const data = await response.json();
        setFaqItems(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchFaqItems();
  }, []);

  return (
    <Container className="my-4 rounded p-2">
      <h1>FAQ</h1>
      <UncontrolledAccordion>
        {faqItems.map((item) => (
          <AccordionItem key={item.id}>
            <AccordionHeader targetId={item.id.toString()}>
              {item.question}
            </AccordionHeader>
            <AccordionBody accordionId={item.id.toString()}>
              {item.answer}
            </AccordionBody>
          </AccordionItem>
        ))}
      </UncontrolledAccordion>
    </Container>
  );
};

export default FAQAccordion;
