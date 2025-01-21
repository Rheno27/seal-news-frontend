import { Container, Carousel } from 'react-bootstrap';
import imgBanner1 from '../../assets/banner1.png';
import imgBanner2 from '../../assets/banner2.png';
import imgBanner3 from '../../assets/banner3.png';

function Banner() {
    return (
        <>
            {/* Banner */}
            <Container style={{ marginTop: '100px' }}>
                <Carousel>
                    <Carousel.Item>
                        <img src={imgBanner1} alt="First slide" style={{ width: '100%', height: 'auto' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={imgBanner2} alt="Second slide" style={{ width: '100%', height: 'auto' }} />
                </Carousel.Item>
                <Carousel.Item>
                    <img src={imgBanner3} alt="Third slide" style={{ width: '100%', height: 'auto' }} />
                </Carousel.Item>
                </Carousel>
            </Container>
        </>
    )
}

export default Banner;