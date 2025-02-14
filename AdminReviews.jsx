import { useEffect, useState } from "react"; 
import axios from "axios";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  // ✅ Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ Delete a review by ID
  const handleDelete = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/reviews/${reviewId}`);
        fetchReviews(); // Refresh after deletion
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete review.");
      }
    }
  };

  return (
    <div style={{ 
      fontFamily: 'sans-serif', 
      padding: '20px', 
      backgroundImage:"url('https://cdn.pixabay.com/photo/2016/08/01/01/52/school-book-1560339_1280.jpg')",
      backgroundSize:"cover",
      width:'cover', 
      height:'100vh',
    }}>
      <h2 style={{ marginBottom: '20px', color:'white',allignItems:"center",textAlign: "center", display:"center", fontSize:"28px" }}>Manage Reviews</h2>
      {reviews.length > 0 ? (
        <table style={{ 
          width: '1300px', 
          borderCollapse: 'collapse', 
          marginTop: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <thead>
            <tr style={{ backgroundColor: 'purple', color: 'yellow', fontWeight: 'bold' }}>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Product ID</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Username</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Rating</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Comment</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Profile Pic</th>
              <th style={{ padding: '12px 15px', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id} style={{ 
                borderBottom: '1px solid #ddd', 
                color:"black", 
                backgroundColor: 'white', 
                transition: 'background-color 0.3s ease',
                cursor: 'pointer' 
              }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "orange"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
              >
                <td style={{ padding: '12px 15px' }}>{review.productId}</td>
                <td style={{ padding: '12px 15px' }}>{review.username}</td>
                <td style={{ padding: '12px 15px' }}>{review.rating}⭐</td>
                <td style={{ padding: '12px 15px' }}>{review.comment}</td>
                <td style={{ padding: '12px 15px', textAlign: 'center' }}> {/* Center the image */}
                  {review.profilePic && <img src={`http://localhost:5000${review.profilePic}`} alt="Profile" width="50" style={{ borderRadius: '50%', objectFit: 'cover', border: '1px solid #ddd' }} />}
                </td>
                <td style={{ padding: '12px 15px' }}>
                  <button 
                    onClick={() => handleDelete(review._id)} 
                    style={{ 
                      backgroundColor: 'red', 
                      color: 'white', 
                      border: 'none', 
                      padding: '8px 12px', 
                      borderRadius: '4px', 
                      cursor: 'pointer', 
                      transition: 'background-color 0.3s ease' 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "purple"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "red"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default AdminReviews;
