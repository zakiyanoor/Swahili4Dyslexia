import React, { useEffect, useState, useContext } from 'react';
import '../styles/Progress.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Progress() {
    const { user } = useContext(AuthContext);
    const [progressData, setProgressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/progress/summary/${user.user_id}`, {
                    credentials: 'include',
                });
                if (!res.ok) throw new Error('Failed to fetch progress');
                const data = await res.json();
                setProgressData(data);
            } catch (err) {
                console.error('Error fetching progress:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProgress();
    }, [user.user_id]);

    if (loading) return <div className="loading">Loading progress...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="progress-page">
            <div className="sidebar">
                <div className="user-profile">
                    <div className="user-avatar">{user.user_name?.slice(0, 2).toUpperCase()}</div>
                    <h2 className="user-name">{user.user_name}</h2>
                    {/* <span className="user-role">Beginner</span> */}
                    {/* <a href="#" className="edit-profile">Edit Profile</a> */}
                </div>
            </div>

            <div className="main-content">
                <div className="progress-header">
                    <h1>My Progress</h1>
                </div>

                <div className="progress-section">
                    <h2>Overall Progress</h2>
                    <div className="progress-label">{progressData.overallProgress}% Complete</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progressData.overallProgress}%` }}></div>
                    </div>
                </div>

                <div className="progress-section">
                    <h2>Learning Stats</h2>

                    <div className="progress-label">Vocabulary Learned</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progressData.vocabularyProgress}%` }}></div>
                    </div>

                    <div className="progress-label" style={{ marginTop: '1.5rem' }}>Sentences Completed</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progressData.sentenceProgress}%` }}></div>
                    </div>
                </div>


                <div className="badges-section">
                    <h2>Achievements</h2>
                    {progressData.badges.length === 0 ? (
                        <p>No badges earned yet.</p>
                    ) : (
                        progressData.badges.map((badge) => (
                            <div key={badge.id} className="badge">
                                <div className="badge-icon">{badge.icon}</div>
                                <span>{badge.title}</span>
                            </div>
                        ))
                    )}
                </div>

                <div className="progress-section">
                    <h2>Recent Activities</h2>
                    <ul className="activity-list">
                        {progressData.recentActivities.map((activity) => (
                            <li key={activity.id} className="activity-item">
                                <div>
                                    <h3>{activity.title}</h3>
                                    <p className="activity-date">{activity.date}</p>
                                </div>
                                <span className="activity-score">{activity.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Link to="/start-learning">
                    <button className="continue-learning">Continue Learning</button>
                </Link>
            </div>
        </div>
    );
}

export default Progress;
