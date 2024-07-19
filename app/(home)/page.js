"use client";
import { useFacoryContext } from "../context/factoryContext";
import RenderCampaignList from './RenderCampaignList';

const HomePage = () => {
    console.log('inner home page')
    const { provider, signer, account, factoryContract } = useFacoryContext();

    console.log('in homepage: '); //provider, signer, account, factoryContract

    return (
        <div>
            <RenderCampaignList factoryContract={factoryContract} />
        </div>
    );
}

export default HomePage;