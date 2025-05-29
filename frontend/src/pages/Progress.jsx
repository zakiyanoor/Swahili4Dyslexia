import React from 'react';
import '../styles/Progress.css';
import { Link } from 'react-router-dom';

function Progress() {
    // Sample data - replace with actual user data
    const userData = {
        name: 'John Doe',
        role: 'Beginner',
        avatarInitial: 'JD',
        overallProgress: 65,
        vocabularyProgress: 80,
        gamesProgress: 55,
        badges: [
            { id: 1, icon: '⭐', title: 'Starter' },
            { id: 2, icon: '📚', title: '100 Words' },
            { id: 3, icon: '🎮', title: 'First Game' },
        ],
        recentActivities: [
            {
                id: 1,
                title: 'Completed Lesson 10',
                date: 'May 28, 2025',
                score: '95%',
            },
            {
                id: 2,
                title: 'Vocabulary Quiz',
                date: 'May 27, 2025',
                score: '85%',
            },
            {
                id: 3,
                title: 'Game: Word Match',
                date: 'May 26, 2025',
                score: '75%',
            },
        ],
    };

    return (
        <div className="progress-page">
            {/* Left Sidebar */}
            <div className="sidebar">
                <div className="user-profile">
                    <div className="user-avatar">{userData.avatarInitial}</div>
                    <h2 className="user-name">{userData.name}</h2>
                    <span className="user-role">{userData.role}</span>
                    <a href="#" className="edit-profile">Edit Profile</a>
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                <div className="progress-header">
                    <h1>My Progress</h1>
                </div>

                <div className="progress-section">
                    <h2>Overall Progress</h2>
                    <div className="progress-label">{userData.overallProgress}% Complete</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${userData.overallProgress}%` }}></div>
                    </div>
                </div>

                <div className="progress-section">
                    <h2>Learning Stats</h2>
                    <div className="progress-label">Vocabulary Learned</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${userData.vocabularyProgress}%` }}></div>
                    </div>

                    <div className="progress-label" style={{ marginTop: '1.5rem' }}>Games Completed</div>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${userData.gamesProgress}%` }}></div>
                    </div>
                </div>

                <div className="badges-section">
                    <h2>Achievements</h2>
                    {userData.badges.map((badge) => (
                        <div key={badge.id} className="badge">
                            <div className="badge-icon">{badge.icon}</div>
                            <span>{badge.title}</span>
                        </div>
                    ))}
                </div>

                <div className="progress-section">
                    <h2>Recent Activities</h2>
                    <ul className="activity-list">
                        {userData.recentActivities.map((activity) => (
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
