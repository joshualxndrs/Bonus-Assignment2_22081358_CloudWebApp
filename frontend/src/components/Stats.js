import { useState, useEffect } from "react";

function Stats() {
    const [expanded, setExpanded] = useState(false);
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [lastUpdatedAsset, setLastUpdatedAsset] = useState('');
    const [oldestAsset, setOldestAsset] = useState('');
    const [totalVendors, setTotalVendors] = useState(0); // New state for total companies
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
            setTotalAssets(data.totalAssets || 0);
            setTotalCategories(data.totalCategories || 0);
            setLastUpdatedAsset(data.lastUpdatedAsset || 'N/A');
            setOldestAsset(data.oldestAsset || 'N/A');
            setTotalVendors(data.totalVendors || 0); // Set total companies
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
                            <p><b>Number of Assets:</b> {totalAssets}</p>
                            <p><b>Number of Categories:</b> {totalCategories}</p>
                            <p><b>Newest Asset Timestamp:</b> {lastUpdatedAsset}</p>
                            <p><b>Oldest Asset Timestamp:</b> {oldestAsset}</p>
                            <p><b>Number of Vendors:</b> {totalVendors}</p>
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
