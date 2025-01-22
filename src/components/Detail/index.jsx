import { Container, Row, Col } from 'react-bootstrap';

// components/Detail.jsx
function Detail({ newsDetail }) {

    return (
        <>
        <Container
            className="pt-4 mb-4"
            style={{
                paddingLeft: "0",
                paddingRight: "0",
                marginTop: "100px",
            }}
        >
            <div className="progress-bar">
                <div className="d-flex flex-column ">
                    <div className="progress-steps mb-2 d-flex flex-collum align-items-start mx-4 ">
                        <div
                            className="progress-step"
                            style={{
                                fontSize: "14px",
                                color:  "gray",
                                fontWeight: "normal", 
                                marginRight: "10px",
                            }}
                        >
                            {newsDetail?.category}
                        </div>
                        <div className="arrow"
                        style={{
                            fontSize: "14px",
                            color: "gray",
                            fontWeight: "normal", 
                            marginRight: "10px",
                        }}
                        >
                        &gt;
                        </div>
                        <div 
                            className="progress-step"
                            style={{
                                fontSize: "14px",
                                color: "gray",
                                fontWeight: "normal", 
                                marginRight: "10px",
                                marginLeft: "10px",
                            }}
                        >
                            Detail
                        </div> 
                        <div className="arrow"
                        style={{
                            fontSize: "14px",
                            color: "gray",
                            fontWeight: "normal", 
                            marginRight: "10px",
                        }}
                        >
                        </div>
                    </div>
                </div>
            </div>
        </Container>
        <Container>
            <Row>
                <Col md={9}>
                    <h1 style={{ color: 'black', marginTop: '120px' }}>{newsDetail?.title}</h1>
                    <p>{newsDetail?.description}</p>
                    {/* Tampilan lainnya */}
                </Col>
                <Col md={3}>
                </Col>
            </Row>
        </Container>
        </>
    );
}


export default Detail;
