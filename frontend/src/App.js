import { useState, useEffect } from 'react';  // import useEffect
import AssetList from './components/AssetList'; // import AssetList';
import Stats from './components/Stats';
import './App.css';

function App() {
    const [assets, setAssets] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/assets')
            .then(response => response.json())
            .then(data => setAssets(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div className='page'>
            <h1>Asset Database</h1>
            <AssetList assets={assets} setAssets={setAssets} />
            <p>Click an Asset to view associated details</p>
            <Stats />
        </div>
    );
}

export default App;