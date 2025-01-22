import { useParams } from 'react-router-dom';

const NewsDetail = ({ data }) => {
    const { title } = useParams();  // Mendapatkan title dari URL
    const post = data.posts.find(post => encodeURIComponent(post.title) === title);  // Cari artikel berdasarkan title

    if (!post) return <p>Artikel tidak ditemukan.</p>;

    return (
        <div className="news-detail">
            <h2>{post.title}</h2>
            <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 'auto' }} />
            <p>{post.description}</p>
            <p><strong>Published on:</strong> {new Date(post.pubDate).toLocaleDateString()}</p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
                <button>Baca Selengkapnya di CNN</button>
            </a>
        </div>
    );
};

export default NewsDetail;
