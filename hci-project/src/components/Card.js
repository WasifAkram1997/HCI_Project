import { CardBody, Card, CardTitle, CardText } from "reactstrap";
import { useNavigate } from "react-router-dom";

const MyCard = ({ item }) => {
    const navigate = useNavigate()
  return (
    <Card
      color="secondary"
      outline
      style={{
        width: '40rem', // Fixed width
        height: '350px', // Fixed height for the card
        display: 'flex', // Use flexbox to manage the layout
        flexDirection: 'column', // Stack content vertically
      }}

      className="cursor-pointer"
      onClick={() => navigate(item.path)}
    >
      <img
        alt={item.altText}
        src={item.image}
        style={{
          height: '200px', // Fixed image height
          objectFit: 'cover', // Ensure the image covers the space without distorting
          width: '100%', // Full width for the image
        }}
      />
      <CardBody style={{ flexGrow: 1 }}> {/* Ensures the card body grows to fill available space */}
        <CardTitle tag="h5">{item.title}</CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
};

export default MyCard;
