import CardsList from "./CardsList";
import NavbarComponent from "./Navbar";
import MyCarousel from "./UncontrolledCarousal";

const Homepage = () => {
    return(
        <div>
          <MyCarousel />
          <CardsList />
        </div>
    )
}

export default Homepage;