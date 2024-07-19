
"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Grid, Button, Loader, Header } from 'semantic-ui-react';
import { RenderCardsServerComp } from './RenderCards';
import { useFacoryContext } from '@/app/context/factoryContext';
import { ethers } from 'ethers';

import campaignABI from '../../../../artifacts/contracts/Campaign.sol/Campaign.json';
import ContributeForm from './ContributeForm';


const CampaignDetails = ({ params }) => {
    const [campaign, setCampaign] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [campaignData, setCampaignData] = useState(null);

    const { signer } = useFacoryContext();
    const { campId }  = params;

    useEffect(() => {
        getCampaignData();
    }, []);

    const getCampaignData = async () => {
        try {
            const campaign = new ethers.Contract(campId, campaignABI.abi, signer);
            setCampaign(campaign);
            try {
                let data = await campaign.getSummary();
                setCampaignData(data);
            } catch(err) {
                console.log('inner catch: ', err);
            }
        } catch(error) {
            console.log('error in connectin campaign: ', error)
        }
        setIsLoading(false);
    }

    return (
        <div>
            <Header as="h2" disabled>Campaign Details</Header>
            <Header as="h3" dividing>{campId}</Header>
            {isLoading ? (
                <Loader active={true} />
            ) : (
                <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                <RenderCardsServerComp summaryData={campaignData}/>
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <ContributeForm campaign={campaign} address={campId} />
                            </Grid.Column>
                        </Grid.Row>
                        
                        <Grid.Row>
                            <Grid.Column>
                                <Link href={`/campaign/${campId}/requests`}>
                                    <Button primary>View Request</Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </div>
            )}
        </div>
    );
}

export default CampaignDetails;