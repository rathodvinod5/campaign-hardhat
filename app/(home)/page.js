"use client";

import Link from 'next/link';
import { Grid, Button } from 'semantic-ui-react';
import { useFacoryContext } from "../context/factoryContext";
import { RenderCardsServerComp } from "./RenderCardsServerComp";
import RenderList from './RenderList';

const HomePage = () => {
    console.log('inner home page')
    const { provider, signer, account, factoryContract } = useFacoryContext();

    console.log('in homepage: '); //provider, signer, account, factoryContract

    return (
        <div>
            <RenderList factoryContract={factoryContract} />
             {/* <div>
                <h3>Campaign Details</h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            <RenderCardsServerComp factoryContract={factoryContract} />
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <ContributeForm address={address} />
                            <div />
                        </Grid.Column>
                    </Grid.Row>
                    
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={'/request'}>
                                <a>
                                <Button primary>View Request</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div> */}
        </div>
    );
}

export default HomePage;