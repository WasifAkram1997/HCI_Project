import MyCard from "./Card"
import {Col, Container, Row} from 'reactstrap'

const CardsList = () => {
    const list =[
        {
            title: "Leaderboard",
            description: "Track your progress, Create a playlist, Track completion and Ranking against other gym goers",
            image: '/images/image1.jpg',
            path: '/leaderboard'
        },
        {
            title: "Newsletter",
            description: "Get exposed to exciting articles and upcoming events",
            image: '/images/image2.avif',
            path: '/newsletter'
        },
        {
            title: "Scheduler",
            description: "Schedule online classes, personal training session and visualize schedule to maximize gain",
            image: '/images/image3.jpg',
            path: '/scheduler'
        },  {
            title: "Easy Payment",
            description: "Pay online through our fast and secured portal",
            image: '/images/image4.jpeg',
            path: '/payment'
        },
        {
            title: "Contact Us",
            description: "Let us know your thoughts",
            image: '/images/image5.jpg',
            path: '/contact'
        },
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