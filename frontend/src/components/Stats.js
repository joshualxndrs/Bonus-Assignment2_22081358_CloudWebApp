import { useState, useEffect } from "react";

function Stats() {
    const [expanded, setExpanded] = useState(false);
    const [totalContacts, setTotalContacts] = useState(0);
    const [totalPhones, setTotalPhones] = useState(0);
    const [lastUpdatedContact, setLastUpdatedContact] = useState('');
    const [oldestContact, setOldestContact] = useState('');
    const [totalCompanies, setTotalCompanies] = useState(0); // New state for total companies
    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState(null); 

    // Fetch stats
    async function getStats() {
        setLoading(true); // Start loading
        setError(null); // Clear previous errors

        try {
            const response = await fetch('http://localhost/api/stats');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Set all states from the response
            setTotalContacts(data.totalContacts || 0);
            setTotalPhones(data.totalPhones || 0);
            setLastUpdatedContact(data.lastUpdatedContact || 'N/A');
            setOldestContact(data.oldestContact || 'N/A');
            setTotalCompanies(data.totalCompanies || 0); // Set total companies
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError('Failed to fetch stats. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    }

    // Fetch stats on component mount
    useEffect(() => {
        getStats();
    }, []);

    return (
        <div className="stats">
            <p onClick={() => setExpanded(!expanded)}>
                {expanded ? 'Hide Stats' : 'Show Stats'}
            </p>

            {expanded && (
                <div className="stats-container">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="error">{error}</p>
                    ) : (
                        <>
                            <p><b>Number of Contacts:</b> {totalContacts}</p>
                            <p><b>Number of Phones:</b> {totalPhones}</p>
                            <p><b>Newest Contact Timestamp:</b> {lastUpdatedContact}</p>
                            <p><b>Oldest Contact Timestamp:</b> {oldestContact}</p>
                            <p><b>Number of Companies:</b> {totalCompanies}</p>
                        </>
                    )}
                    <br />
                    <button className="button green" onClick={getStats} disabled={loading}>
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
}

export default Stats;
