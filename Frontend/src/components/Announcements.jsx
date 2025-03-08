import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import "./Announcements.css";

// Importing images
import announcement1 from "../assets/images/announcement1.jpg";
import announcement2 from "../assets/images/announcement2.jpg";
import announcement3 from "../assets/images/announcement3.jpg";
import announcement4 from "../assets/images/announcement4.jpg";
import announcement5 from "../assets/images/announcement5.jpg";

const announcements = [
  { 
    id: 1, 
    image: announcement1, 
    title: "Scholarship Application Open", 
    description: "Solo parents can now apply for the 2024 scholarship program!", 
    link: "https://www.youtube.com/watch?v=TIzBuvdLgbg",
    date: "2024-03-01"
  },
  { 
    id: 2, 
    image: announcement2, 
    title: "Financial Assistance Update", 
    description: "New guidelines for financial assistance have been released.", 
    link: "https://www.youtube.com/watch?v=TIzBuvdLgbg",
    date: "2024-03-05"
  },
  { 
    id: 3, 
    image: announcement3, 
    title: "Health Benefits Registration", 
    description: "Enroll now to avail free health benefits for solo parents.", 
    link: "https://www.youtube.com/watch?v=TIzBuvdLgbg",
    date: "2024-03-07"
  },
  { 
    id: 4, 
    image: announcement4, 
    title: "Upcoming Community Event", 
    description: "Join us for a special solo parents gathering this month!", 
    link: "https://www.youtube.com/watch?v=TIzBuvdLgbg",
    date: "2024-03-10"
  },
  { 
    id: 5, 
    image: announcement5, 
    title: "Government Housing Support", 
    description: "New housing support options are now available for solo parents.", 
    link: "https://www.youtube.com/watch?v=TIzBuvdLgbg",
    date: "2024-03-15"
  },
];

const Announcements = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextAnnouncement = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % announcements.length);
  }, []);

  const prevAnnouncement = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(nextAnnouncement, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextAnnouncement]);

  const handlePageClick = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="announcements-wrapper">
      <section className="announcements" aria-label="Announcements Section">
        <h2 className="announcement-title">Latest Announcements</h2>
        <div 
          className="announcement-container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link 
            to={announcements[currentIndex].link} 
            className="announcement-card"
            aria-label={`Announcement: ${announcements[currentIndex].title}`}
          >
            <img
              src={announcements[currentIndex].image}
              alt={announcements[currentIndex].title}
              className="announcement-image"
            />
            <div className="announcement-content">
              <h3>{announcements[currentIndex].title}</h3>
              <p>{announcements[currentIndex].description}</p>
              <time 
                className="announcement-date"
                dateTime={announcements[currentIndex].date}
              >
                {formatDate(announcements[currentIndex].date)}
              </time>
            </div>
          </Link>
        </div>

        <div className="pagination" role="tablist">
          {announcements.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handlePageClick(index)}
              aria-label={`Go to announcement ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Announcements;
