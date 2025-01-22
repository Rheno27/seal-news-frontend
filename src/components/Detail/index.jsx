import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getBeritaTerbaru, getBeritaHiburan, getBeritaGayaHidup, getBeritaOlahraga, getBeritaNasional, getBeritaInternasional, getBeritaEkonomi, getBeritaTeknologi } from '../../services/berita';
import komentar1 from '../../assets/komentar1.png';

function Detail({ newsDetail }) {
    const navigate = useNavigate();

    const fetchData = async () => {
        let fetchedData;
        switch (newsDetail?.category) {
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
        queryKey: ['berita', newsDetail?.category],
        queryFn: fetchData,
        refetchOnWindowFocus: false,
    });

    //convert date ke format indonesia
    const convertDate = (dateString) => {
        if (!dateString) return "Tanggal tidak tersedia";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Tanggal tidak valid";
        }
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Intl.DateTimeFormat('id-ID', options).format(date);
    };

    //random artikel
    const getRandomArticles = (posts) => {
        if (!posts || posts.length < 3) return [];
        const uniqueIndexes = new Set();
        while (uniqueIndexes.size < 3 && uniqueIndexes.size < posts.length) {
            uniqueIndexes.add(Math.floor(Math.random() * posts.length));
        }
        return Array.from(uniqueIndexes).map((index) => posts[index]);
    };

    const displayedArticles = data?.posts ? getRandomArticles(data.posts) : [];

    // Handler untuk klik pada Berita Populer
    const handleArticleClick = (article) => {
        if (!article) return;
        const params = new URLSearchParams();
        params.set('title', article?.title);
        params.set('pubDate', article?.pubDate);
        params.set('description', article?.description);
        params.set('thumbnail', article?.thumbnail);
        params.set('category', article?.category);
        
        navigate(`/detail?${params.toString()}`);
    };

    return (
        <>
            {/* Progress Bar */}
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

            {/* Headline */}
            <Container >
                <Row>
                    <Col md={8}>
                        <h2 style={{ color: 'black' }}>{newsDetail?.title}</h2>
                        <p style={{ 
                            fontSize: '16px', 
                            color: '#526071',
                            marginTop: '10px',
                            marginBottom: '10px',
                            }}>
                            <i className="bi bi-calendar-event me-2"></i>
                            <span style={{ color: '#0099ff' }}>{newsDetail.category}</span> - {convertDate(newsDetail?.pubDate)}
                        </p>
                        <img
                            src={newsDetail?.thumbnail}
                            alt="Headline"
                            className="img-fluid"
                            style={{
                            width: '100%',
                            height: 'auto',
                            marginTop: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                            }}
                        ></img>
                        <p style={{
                            fontSize: '14px',
                            color: '#526071',
                            marginBottom: '10px',
                            }}>{newsDetail?.description}</p>
                        
                        <p style={{
                            textAlign: 'justify',
                            textJustify: 'inter-word',
                            fontSize: '16px',
                            marginTop: '20px',
                            marginBottom: '10px',
                            }}>
                            Berita kali ini mengangkat isu terbaru terkait {newsDetail?.description}. 
                            Kejadian atau keputusan ini menarik perhatian banyak pihak, mengingat dampaknya yang cukup signifikan bagi sektor 
                            terkait. Proses yang panjang dan berbagai pertimbangan telah dilakukan untuk mencapai keputusan tersebut, 
                            dengan tujuan utama untuk mencapai hasil yang diinginkan. Hal ini tentunya memberikan gambaran mengenai apa yang 
                            diharapkan dari keputusan tersebut, yang akan memengaruhi banyak pihak.
                            <br />
                            <br />
                            Dalam langkah selanjutnya, {newsDetail?.description} diharapkan dapat membawa perubahan positif bagi masyarakat. 
                            Langkah ini diambil untuk memastikan tujuan yang jelas tercapai dan diharapkan dapat memberikan dampak yang lebih luas. 
                            Dengan adanya keputusan ini, diharapkan dapat memperbaiki kondisi dan memberikan manfaat berkelanjutan bagi semua pihak 
                            yang terpengaruh.
                        </p>
                    </Col>
                    <Col md={4}>
                        {displayedArticles.length > 0 ? (
                            displayedArticles.map((article, index) => {
                                const thumbnail = article?.thumbnail || '/default-thumbnail.jpg'; 
                                const title = article?.title || 'No title available';
                                const pubDate = article?.pubDate ? convertDate(article.pubDate) : 'No date available'; 
                                return (
                                    <Row key={index}>
                                        <Col style={{ marginBottom: '20px' }}>
                                            <Card style={{ cursor: 'pointer' }}>
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
                                                                <span style={{ color: '#0099ff' }}>{newsDetail?.category}</span> - {pubDate}
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Col>
                                    </Row>
                                );
                            })
                        ) : (
                            <p>Tidak ada artikel populer tersedia.</p>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* komentar */}
            <Container>
                <h3
                    style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        marginTop: '120px',
                        borderLeft: '4px solid #0099ff',
                        paddingLeft: '10px',
                    }}
                >
                    Komentar
                </h3>
                <Row style={{ marginTop: '40px' }}>
                    <Col md={1}>
                        <img src={komentar1} alt="komentar1" className="img-fluid" />
                    </Col>
                    <Col md={7}>
                        <Card>
                            <Card.Body
                            style={{
                                padding: '10px',
                                height: '200px',
                                fontSize: '14px',
                                color: 'gray',
                            }}
                            >
                            apa yang anda pikirkan?
                            </Card.Body>
                        </Card>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <div style={{ position: 'absolute', right: '0', top: '0' }}>
                                <span style={{ fontSize: '14px', color: 'gray' }}>0/100</span>
                            </div>
                        </div>
                        <Button
                        style={{
                            marginTop: '20px',
                            fontSize: '14px',
                        }}
                        >
                            <i className="bi bi-send"></i> Kirim
                        </Button>
                    </Col>
                </Row>
                <hr 
                style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    width: '66%',
                }}
                />
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
                </div>

                <Row xs={1} md={4} className="g-4">
                    {displayedArticles.length > 0 ? (
                        displayedArticles.map((article, idx) => {
                            return (
                                <Col key={idx}>
                                    <Card
                                        style={{
                                            border: 'none',
                                            marginBottom: '20px',
                                            marginTop: '20px',
                                            marginLeft: '5px',
                                            marginRight: '5px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={article?.thumbnail}
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
                                                {article?.title}
                                            </Card.Title>
                                            <Card.Text style={{ fontSize: '12px' }}>
                                                <span style={{ color: '#0099ff' }}>{newsDetail?.category}</span> - {convertDate(article?.pubDate)}
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
            </Container>
        </>
    );
}


export default Detail;
