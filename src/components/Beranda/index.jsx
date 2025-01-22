import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import { useState } from 'react';
import { getBeritaHiburan, getBeritaGayaHidup, getBeritaOlahraga, getBeritaNasional, getBeritaInternasional, getBeritaEkonomi, getBeritaTeknologi, getBeritaTerbaru } from '../../services/berita'
import { useQuery } from '@tanstack/react-query';
function Beranda({ category }) {
    const [popularArticles, setPopularArticles] = useState([]);

    const fetchData = async () => {
        let fetchedData;
        switch (category) {
            case 'beranda':
                fetchedData = await getBeritaTerbaru();
            break;
            case 'hiburan':
                fetchedData = await getBeritaHiburan();
            break;
            case 'gaya hidup':
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
            case 'ekonomi':
                fetchedData = await getBeritaEkonomi();
            break;
            case 'teknologi':
                fetchedData = await getBeritaTeknologi();
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
    
    // Convert tanggal ke bahasa indonesia
    const convertDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };
    
    // random 1 berita untuk bagian headline
    const getRandomData = (posts) => {
        if (!posts || posts.length < 1) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
    };

    // random 3 berita untuk bagian populer
    const getRandomArticles = (posts) => {
        if (!posts || posts.length < 3) return [];
        const randomIndexes = Array.from({ length: 3 }, () =>
            Math.floor(Math.random() * posts.length)
        );
        return randomIndexes.map((index) => posts[index]);
    };

    //random 8 berita untuk bagian rekomendasi
    const getRandomRecommendations = (posts) => {
        if (!posts || posts.length < 8) return [];
        const randomIndexes = Array.from({ length: 8 }, () =>
            Math.floor(Math.random() * posts.length)
        );
        return randomIndexes.map((index) => posts[index]);
    };

    // Validasi keberadaan data dan posts
    let displayedData = null;
    if (data && data.posts) {
        if (category === 'beranda') {
            displayedData = data.posts[0]; // Data pertama
        } else {
            displayedData = getRandomData(data.posts); // Data acak
        }
    }

    //berita populer
    let displayedPopular = null;
    if (data && data.posts) {
        displayedPopular = getRandomArticles(data.posts);
    }

    //berita rekomendasi
    let displayedRecommendations = null;
    if (data && data.posts) {
        displayedRecommendations = getRandomRecommendations(data.posts);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    
    if (isError) {
        return <p>Error: {error.message}</p>;
    }
    
    if (!displayedData) {
        return <p>No data available</p>;
    }
    
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
                        as={Link} to={`/detail/${encodeURIComponent(displayedData?.title)}`}
                        variant="primary"
                        onClick={() => window.open(displayedData?.link, '_blank')}
                    >Baca Selengkapnya</Button>
                </Col>
                <Col md={6}>
                    <img
                    src={displayedData?.thumbnail}
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
                    {displayedPopular.length > 0 ? (
                        displayedPopular.map((article, index) => (
                            <Col md={4} key={index}>
                                <Card>
                                    <Row className="g-0 align-items-center">
                                        <Col md={4}>
                                            <Card.Img
                                                src={article.thumbnail}
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
                                                    {article.title}
                                                </Card.Title>
                                                <Card.Text style={{ fontSize: '12px' }}>
                                                    <span style={{ color: '#0099ff' }}>{category}</span> - {convertDate(article.pubDate)}
                                                </Card.Text>
                                            </Card.Body>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>Tidak ada artikel populer tersedia.</p>
                    )}
                </Row>
            </Container>;

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

                    {/* Search Bar */}
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
                    {displayedRecommendations.map((article, idx) => (
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
                                    src={article.thumbnail}
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
                                        {article.title}
                                    </Card.Title>
                                    <Card.Text style={{ fontSize: '12px' }}>
                                        <span style={{ color: '#0099ff' }}>{category}</span> - {convertDate(article.pubDate)}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                {/* Bagian Pagination */}
                <Row className="mt-3">
                    <Col md={7}>
                        <p
                            style={{
                                fontSize: '14px',
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