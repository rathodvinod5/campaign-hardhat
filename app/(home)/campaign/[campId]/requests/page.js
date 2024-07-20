"use client"
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useEffect, useState } from "react";
import { Button, Table, Header as PageHeader, TableBody } from "semantic-ui-react";
import { ethers } from 'ethers';
import { useFacoryContext } from "@/app/context/factoryContext";
import campaignABI from '../../../../../artifacts/contracts/Campaign.sol/Campaign.json';
import RequestRow from "./RequestRow";

const Requests = () => {
    const [loading, setLoading] = useState(false);
    const [campaign, setCampaign] = useState(null);
    const [requests, setRequests] = useState(null);
    const [requestCount, setRequestCount] = useState(null);
    const [approversCount, setApproversCount] = useState(null);

    const param = useParams();
    const { address, signer } = useFacoryContext();
    const { campId } = param;

    useEffect(() => {
        if(!requests) {
            getRequestsList();
        }
    }, []);

    const getRequestsList = async () => {
        console.log('in getRequestsList')
        setLoading(true);
        try {
            const campaign = new ethers.Contract(campId, campaignABI.abi, signer);
            setCampaign(campaign);
            // console.log('campaign: ', campaign);
            try {
                const requestCount = await campaign.getRequestsCount();
                const approversCount = await campaign.approversCount();

                console.log('counts: ', requestCount.toString(), approversCount.toString());
        
                const requests = await Promise.all(
                    Array(parseInt(requestCount.toString())).fill().map((element, index) => {
                        return campaign.requests(index);
                    })
                );
                console.log('requests: ', requests.length)
                setRequests(requests);
                setApproversCount(approversCount.toString());
                setRequestCount(requestCount.toString());
            } catch(err) {
                console.log('inner catch: ', err);
            }
        } catch(error) {
            console.log('error in connectin campaign: ', error)
        }
        setLoading(false);
    }

    const renderRows = () => {
        if(!requests) return null;

        return requests.map((item, index) => {
            return (
                <RequestRow 
                    key={`request-row-${index}`} 
                    id={index} 
                    address={address} 
                    request={item}
                    approversCount={approversCount}
                    campaign={campaign}
                />
            )
        })
    }

    const  { Header, Row, HeaderCell, Body } = Table;

    return (
        <div>
            <PageHeader as="h3">Requests</PageHeader>
            <Link href={`/campaign/${campId}/requests/new`}>
                <Button primary floated="right" style={{ marginBottom: 20}}>Create Request</Button>
            </Link>

            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Appr Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>

                <Body>
                   {renderRows()}
                </Body>
            </Table>
            <div>{requestCount !== null ? `Found ${requestCount} requests.` : null}</div>
        </div>
    );
}

export default Requests;