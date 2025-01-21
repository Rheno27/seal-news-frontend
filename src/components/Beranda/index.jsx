import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import imgHeadline from '../../assets/headline1.png'
import imgGayaHidup from '../../assets/hotnews.jpeg'
import omgHiburan1 from '../../assets/gayahidup1.png'
import { getBeritaHiburan, getBeritaGayaHidup, getBeritaOlahraga, getBeritaNasional, getBeritaInternasional } from '../../services/berita'
import { useQuery } from '@tanstack/react-query';

function Beranda({ category }) {
    console.log('Category in Beranda:', category);

  // Function to fetch data based on category
    const fetchData = async () => {
        let fetchedData;
        switch (category) {
            case 'beranda':
            case 'hiburan':
            fetchedData = await getBeritaHiburan();
            break;
            case 'gaya-hidup':
            fetchedData = await getBeritaGayaHidup();
            break;
            case 'olahraga':
            fetchedData = await getBeritaOlahraga();
            break;
            case 'nasional':
            fetchedData = await getBeritaNasional();
            break;
            case 'internasional':
            fetchedData = await getBeritaInternasional();
            break;
            default:
            fetchedData = await getBeritaHiburan();
            break;
        }
        return fetchedData;
    };

    // Menggunakan useQuery dengan format objek
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['berita', category],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });
    
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
     };
    
      // Helper untuk memilih data acak
    const getRandomData = (posts) => {
        if (!posts || posts.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
    };
    
    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    if (isError) {
        return <p>Error: {error.message}</p>;
    }
    
      // Validasi keberadaan data dan posts
    let displayedData = null;
    if (data && data.posts) {
        if (category === 'beranda') {
          displayedData = data.posts[0]; // Data pertama
        } else {
          displayedData = getRandomData(data.posts); // Data acak
        }
    }
    
    if (!displayedData) {
        return <p>No data available</p>;
    }
    
    console.log('Data yang ditampilkan:', displayedData);

    return (    
        <>
            {/* Headline */}
        <Container className="my-5">
            <Row
            style={{
                marginTop: '120px',
                marginBottom: '80px',
            }}
            >
            <Col
                md={5}
                style={{
                marginRight: '90px',
                }}
            >
                <p>Headline {category}</p>
                <h2>
                    {displayedData?.title}
                </h2>
                <br />
                <p
                    style={{
                        fontSize: '16px',
                        color: 'gray',
                    }}
                >
                {displayedData?.description}
                </p>
                <p
                    style={{
                        fontSize: '16px',
                        color: 'gray',
                    }}
                >
                <i className="bi bi-calendar-event me-2"></i>
                <small>{convertDate(displayedData?.pubDate)}</small>
                </p>
                <Button 
                    variant="primary"
                    onClick={() => window.open(displayedData?.link, '_blank')}
                >Baca Selengkapnya</Button>
            </Col>
            <Col md={6}>
                <img
                src={imgHeadline}
                alt="Headline"
                className="img-fluid"
                style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
                />
            </Col>
            <Col
                md={12}
                style={{
                marginTop: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                }}
            >
                <Pagination>
                <Pagination.Prev />
                <Pagination.Item>1</Pagination.Item>
                <Pagination.Ellipsis> dari </Pagination.Ellipsis>
                <Pagination.Item>5</Pagination.Item>
                <Pagination.Next />
                </Pagination>
            </Col>
            </Row>
        </Container>

        {/* Berita Terpopuler */}
        <Container>
            <h3
            style={{
                fontSize: '20px',
                fontWeight: 'bold',
                marginBottom: '20px',
                borderLeft: '4px solid #0099ff',
                paddingLeft: '10px',
            }}
            >
            Berita Terpopuler
            </h3>
            <Row>
            <Col md={4}>
                <Card>
                <Row className="g-0 align-items-center">
                    <Col md={4}>
                    <Card.Img
                        src={omgHiburan1}
                        className="img-fluid"
                        style={{
                        borderRadius: '5px',
                        margin: '10px',
                        }}
                    />
                    </Col>
                    <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '14px' }}>
                        Kenapa Eks Jenderal Israel Kritik Cara IDF Bebaskan
                        Sandera Hamas?
                        </Card.Title>
                        <Card.Text style={{ fontSize: '12px' }}>
                        <span style={{ color: '#0099ff' }}>Politik</span> - 22 Jan
                        2024
                        </Card.Text>
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                <Row className="g-0 align-items-center">
                    <Col md={4}>
                    <Card.Img
                        src={imgGayaHidup}
                        className="img-fluid"
                        style={{
                        borderRadius: '5px',
                        margin: '10px',
                        }}
                    />
                    </Col>
                    <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '14px' }}>
                        Kenapa Eks Jenderal Israel Kritik Cara IDF Bebaskan
                        Sandera Hamas?
                        </Card.Title>
                        <Card.Text style={{ fontSize: '12px' }}>
                        <span style={{ color: '#0099ff' }}>Gaya Hidup</span> - 22
                        Jan 2024
                        </Card.Text>
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
            </Col>
            <Col md={4}>
                <Card>
                <Row className="g-0 align-items-center">
                    <Col md={4}>
                    <Card.Img
                        src={omgHiburan1}
                        className="img-fluid"
                        style={{
                        borderRadius: '5px',
                        margin: '10px',
                        }}
                    />
                    </Col>
                    <Col md={8}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '14px' }}>
                        Kenapa Eks Jenderal Israel Kritik Cara IDF Bebaskan
                        Sandera Hamas?
                        </Card.Title>
                        <Card.Text style={{ fontSize: '12px' }}>
                        <span style={{ color: '#0099ff' }}>Nasional</span> - 22
                        Jan 2024
                        </Card.Text>
                    </Card.Body>
                    </Col>
                </Row>
                </Card>
            </Col>
            </Row>
        </Container>

        {/* Rekomendasi Untuk Anda */}
        <Container>
            <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '120px',
                marginBottom: '20px',
            }}
            >
            <h3
                style={{
                fontSize: '20px',
                fontWeight: 'bold',
                borderLeft: '4px solid #0099ff',
                paddingLeft: '10px',
                }}
            >
                Rekomendasi Untuk Anda
            </h3>

            {/* Wrapper untuk search bar */}
            <div
                style={{
                position: 'relative',
                width: '300px',
                }}
            >
                <input
                type="text"
                placeholder="Cari rekomendasi..."
                style={{
                    width: '100%',
                    padding: '10px 40px 10px 10px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    fontSize: '14px',
                }}
                />
                <i
                className="bi bi-search"
                style={{
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                }}
                ></i>
            </div>
            </div>

            <Row xs={1} md={4} className="g-4">
            {Array.from({ length: 8 }).map((_, idx) => (
                <Col key={idx}>
                <Card
                    style={{
                    border: 'none',
                    marginBottom: '20px',
                    marginTop: '20px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    }}
                >
                    <Card.Img
                    variant="top"
                    src={omgHiburan1}
                    style={{
                        borderRadius: '5px',
                    }}
                    />
                    <Card.Body>
                    <Card.Title
                        style={{
                        fontSize: '16px',
                        color: 'black',
                        }}
                    >
                        Kenapa Eks Jenderal Israel Kritik Cara IDF Bebaskan Sandera
                        Hamas?
                    </Card.Title>
                    <Card.Text style={{ fontSize: '12px' }}>
                        <span style={{ color: '#0099ff' }}>Gaya Hidup</span> - 22
                        Jan 2024
                    </Card.Text>
                    </Card.Body>
                </Card>
                </Col>
            ))}
            <Col md={7}>
                <p
                style={{
                    fontSize: '12px',
                    color: 'gray',
                    marginLeft: '10px',
                }}
                >
                Showing 1 to 10 of 100
                </p>
            </Col>
            <Col md={5}>
                <Pagination
                style={{
                    border: 'none',
                    marginLeft: '25px',
                }}
                >
                <Pagination.First />
                <Pagination.Prev>Previous</Pagination.Prev>
                <Pagination.Item>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Ellipsis />
                <Pagination.Item>{9}</Pagination.Item>
                <Pagination.Item>{10}</Pagination.Item>
                <Pagination.Next>Next</Pagination.Next>
                <Pagination.Last />
                </Pagination>
            </Col>
            </Row>
        </Container>
        </>
    )
}

export default Beranda;