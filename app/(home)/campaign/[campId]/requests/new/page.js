"use client";
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useState } from "react";
import { ethers } from "ethers";
import { Form, Message, Button, Input, Header } from 'semantic-ui-react';
import { useFacoryContext } from "@/app/context/factoryContext";
import campaignABI from '../../../../../../artifacts/contracts/Campaign.sol/Campaign.json';


const NewRequest = () => {
    const [value, setValue]= useState("");
    const [description, setDescription]= useState("");
    const [recipient, setRecipient] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    const { signer } = useFacoryContext();
    const router = useRouter();
    const param = useParams();
    const { campId } = param;

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            const campaign = new ethers.Contract(campId, campaignABI.abi, signer);
            try {
                // await campaign.createRequest(description, ethers.utils.parseEther(parseInt(value)), recipient);
                router.replace(`/campaign/${campId}`, { scroll: true });
            } catch(err) {
                console.log('inner catch: ', err);
                throw err;
            }
        } catch(error) {
            console.log('error in connectin campaign: ', error)
            setErrorMessage(error.message)
        }
        setLoading(false);
    }


    return(
        <div>
            <Link href={`/campaign/${campId}/requests`}>
                Back
            </Link>

            <Header as="h3">Create a Request!</Header>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Amount in Ether</label>
                    <Input
                        value={value}
                        onChange={event => setValue(event.target.value)}
                        label="ether"
                        labelPosition='right'
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        value={recipient}   
                        onChange={event => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message error header="Oops!" content={errorMessage} />
                <Button primary loading={loading}>Create</Button>
            </Form>
        </div>
    );
}

export default NewRequest;