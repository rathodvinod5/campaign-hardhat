"use client";
import Link from "next/link";
import { Header, Button } from "semantic-ui-react";
import { useFacoryContext } from "../context/factoryContext";
import RenderCampaignList from './RenderCampaignList';

const HomePage = () => {
    console.log('inner home page')
    const { provider, signer, account, factoryContract } = useFacoryContext();

    console.log('in homepage: '); //provider, signer, account, factoryContract

    return (
        <div>
            <Header as="h3">Deployed Contracts: </Header>

            <Link href="/campaign/new">
                <Button 
                    floated="right" 
                    content="Create Campaign" 
                    icon="add circle" 
                    primary 
                />
            </Link>

            <RenderCampaignList factoryContract={factoryContract} />
        </div>
    );
}

export default HomePage;