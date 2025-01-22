import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Pagination } from 'react-bootstrap'
import { getBeritaHiburan, getBeritaGayaHidup, getBeritaOlahraga, getBeritaNasional, getBeritaInternasional, getBeritaEkonomi, getBeritaTeknologi, getBeritaTerbaru } from '../../services/berita'
import { useQuery } from '@tanstack/react-query';

function Beranda({ newCategory }) {
    const navigate = useNavigate()

    const fetchData = async () => {
        let fetchedData;
        switch (newCategory) {
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
            default:
                fetchedData = await getBeritaTerbaru();
                break;
        }
        return fetchedData;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['berita', newCategory],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    const convertDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Tanggal tidak valid";
        }
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    // Fungsi untuk mendapatkan 1 berita acak (headline)
    const getRandomData = (posts) => {
        if (!posts || posts.length < 1) return null;
        const randomIndex = Math.floor(Math.random() * posts.length);
        return posts[randomIndex];
    };

    // Fungsi untuk mendapatkan 3 berita acak (populer)
    const getRandomArticles = (posts) => {
        if (!posts || posts.length < 3) return [];
        const randomIndexes = Array.from({ length: 3 }, () =>
            Math.floor(Math.random() * posts.length)
        );
        return randomIndexes.map((index) => posts[index]);
    };

    // Fungsi untuk mendapatkan 8 berita acak (rekomendasi)
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
        if (newCategory === 'beranda') {
            displayedData = data.posts[0];
        } else {
            displayedData = getRandomData(data.posts);
        }
    }

    // Berita Populer
    let displayedPopular = null;
    if (data && data.posts) {
        displayedPopular = getRandomArticles(data.posts);
    }

    // Berita Rekomendasi
    let displayedRecommendations = null;
    if (data && data.posts) {
        displayedRecommendations = getRandomRecommendations(data.posts);
    }

    const handleDetailClick = () => {
        const params = new URLSearchParams();
        params.set('title', displayedData?.title);
        params.set('pubDate', displayedData?.pubDate);
        params.set('description', displayedData?.description);
        params.set('thumbnail', displayedData?.thumbnail);
        params.set('category', newCategory);
    
        navigate(`/detail?${params.toString()}`);
    };

    // Handler untuk klik pada Berita Populer
    const handleArticleClick = (article) => {
        if (!article) return;
        const params = new URLSearchParams();
        params.set('title', article?.title);
        params.set('pubDate', article?.pubDate);
        params.set('description', article?.description);
        params.set('thumbnail', article?.thumbnail);
        params.set('category', newCategory); 
        navigate(`/detail?${params.toString()}`);
    };

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
                    <Col md={5} style={{ marginRight: '90px' }}>
                    <p>Headline {newCategory}</p>
                    <h2>{displayedData?.title}</h2>
                    <br />
                    <p style={{ fontSize: '16px', color: 'gray' }}>
                        {displayedData?.description}
                    </p>
                    <p style={{ fontSize: '16px', color: 'gray' }}>
                        <i className="bi bi-calendar-event me-2"></i>
                        <small>{convertDate(displayedData?.pubDate)}</small>
                    </p>
                    <Button
                        variant="primary"
                        onClick={handleDetailClick}
                    >
                        Baca Selengkapnya
                    </Button>
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
                    {displayedPopular?.length > 0 ? (
                        displayedPopular.map((article, index) => {
                            const thumbnail = article?.thumbnail || '/default-thumbnail.jpg'; 
                            const title = article?.title || 'No title available';
                            const pubDate = article?.pubDate ? convertDate(article.pubDate) : 'No date available'; 

                            return (
                                <Col md={4} key={index}>
                                    <Card onClick={() => handleArticleClick(article)} style={{ cursor: 'pointer' }}>
                                        <Row className="g-0 align-items-center">
                                            <Col md={4}>
                                                <Card.Img
                                                    src={thumbnail}
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
                                                        {title}
                                                    </Card.Title>
                                                    <Card.Text style={{ fontSize: '12px' }}>
                                                        <span style={{ color: '#0099ff' }}>{newCategory}</span> - {pubDate}
                                                    </Card.Text>
                                                </Card.Body>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <p>Tidak ada artikel populer tersedia.</p>
                    )}
                </Row>
            </Container>

            {/* Rekomendasi*/}
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
                    {displayedRecommendations?.length > 0 ? (
                        displayedRecommendations.map((article, idx) => {
                            // Periksa properti artikel
                            const thumbnail = article?.thumbnail || '/default-thumbnail.jpg';
                            const title = article?.title || 'No title available';
                            const pubDate = article?.pubDate ? convertDate(article.pubDate) : 'No date available';

                            return (
                                <Col key={idx}>
                                    <Card
                                        style={{
                                            border: 'none',
                                            marginBottom: '20px',
                                            marginTop: '20px',
                                            marginLeft: '20px',
                                            marginRight: '20px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleArticleClick(article)}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={thumbnail}
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
                                                {title}
                                            </Card.Title>
                                            <Card.Text style={{ fontSize: '12px' }}>
                                                <span style={{ color: '#0099ff' }}>{newCategory}</span> - {pubDate}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <p>Tidak ada artikel rekomendasi tersedia.</p>
                    )}
                </Row>

                {/* Bagian Pagination (Desain Saja) */}
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