import { Container, Row, Col } from 'react-bootstrap';
import logo from '../../assets/Logoputih.png'

function Footer() {
    return (
        <>
            {/* Footer */}
            <footer
                style={{
                backgroundColor: '#2C3C4D',
                color: '#fff',
                padding: '60px 0',
                width: '100%',
                position: 'relative',
                left: 0,
                right: 0,
                marginTop: '100px',
                }}
                >
                <Container >
                    <Row>
                        <Col md={4}>
                            <h4>
                                <img src={logo} alt="Logo" style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
                                SEAL NEWS
                            </h4>
                            <p style={{ fontSize: '12px', marginTop: '20px' }}>© 2023 Berita Kini. All Rights Reserved.</p>
                            <p style={{ fontSize: '14px', marginTop: '20px' }}>Ikuti Kami</p>
                            <span 
                                style={{ 
                                fontSize: '33px', 
                                marginRight: '25px', 
                                }}><i className="bi bi-youtube"></i>
                            </span>
                            <span 
                                style={{ 
                                fontSize: '30px', 
                                marginRight: '25px', 
                                }}><i className="bi bi-instagram"></i>
                            </span>
                            <span 
                                style={{ 
                                fontSize: '30px', 
                                marginRight: '25px', 
                                }}><i className="bi bi-facebook"></i>
                            </span>
                        </Col>
                        <Col md={2}>
                            <h5>Quick Links</h5>
                            <div className="d-flex flex-column mt-4">
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Beranda</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Hiburan</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Politik</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Olahraga</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Gaya Hidup</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Nasional</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    >Internasional</span>
                            </div>
                        </Col>
                        <Col md={2}>
                            <h5>Bantuan</h5>
                            <div className="d-flex flex-column mt-4">
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.location.href = '/'}>Kontak Kami</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.location.href = '/laporan-pembajakan'}>Laporan Pembajakan</span>
                                <span 
                                    className="text-white mb-3" 
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.location.href = '/kebijakan'}>Kebijakan</span>
                            </div>
                        </Col>
                        <Col md={4}>
                            <h5>Berlangganan Berita Terbaru</h5>
                            <div 
                                style={{ 
                                position: 'relative', 
                                width: '80%', 
                                marginTop: '25px',
                                }}
                            >
                                <input 
                                type="text" 
                                placeholder="Masukkan Email Anda" 
                                style={{ 
                                    width: '100%', 
                                    padding: '10px 40px 10px 10px', 
                                    border: '1px solid #ccc', 
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                }}
                                />
                                <i 
                                className="bi bi-send" 
                                style={{
                                    position: 'absolute',
                                    right: '10px', 
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    fontSize: '20px', 
                                    color: '#0099ff',
                                    marginRight: '10px',
                                }}
                                ></i>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>   
        </>
    )
}

export default Footer;