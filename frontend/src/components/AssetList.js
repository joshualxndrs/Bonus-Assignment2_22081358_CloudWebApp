import Asset from './Asset.js';
import NewAsset from './NewAsset.js';

function AssetList(props) {
    const {assets, setAssets} = props;

	return (
		<div className='asset-list'>
            <h2>Assets</h2>

            <NewAsset assets={assets} setAssets={setAssets} />

            <hr />

            {
                assets.map((asset) => {
                    return (
                        <Asset key={asset.id} asset={asset} assets={assets} setAssets={setAssets} />
                    );
                })
            }
        </div>
	);
}

export default AssetList;
