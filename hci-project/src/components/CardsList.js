import MyCard from "./Card"
import {Col, Container, Row} from 'reactstrap'

const CardsList = () => {
    const list =[
        {
            title: "FAQ",
            description: "Get answers to common questions",
            image: '/images/image1.jpg',
            path: '/faq'
        },
        {
            title: "Pricing",
            description: "Various payment cycles to ease the burden",
            image: '/images/image2.avif',
            path: '/pricing'
        }
    ]
    return(
        <Container>
      <Row>
        {list.map((item, index) => (
          <Col
            key={index}
            sm="12" // Full width on small screens
            md={index === list.length - 1 ? "12" : "6"} // Full width for the last card
            lg="6" // 2 cards per row on large screens
            className="mb-4"
          >
            <MyCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
    )
}

export default CardsList