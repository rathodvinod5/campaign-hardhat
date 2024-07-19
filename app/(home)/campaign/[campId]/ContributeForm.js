import { useRouter } from 'next/navigation';
import { ethers } from 'ethers';
import { useState } from 'react';
import { Form, Input, Message, Button } from "semantic-ui-react";

const ContributeForm = ({ address, campaign }) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { router } = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        console.log('onSubmit, ether to wei: ', ethers.utils.parseEther(value));
        try {
            // await campaign.contribute({ value: ethers.utils.parseEther(parseInt(value)) });
            router.replace(`/camapign/${address}`, { scroll: true });
        } catch(error) {
            setErrorMessage(error.message);
        }

        setLoading(false);
    }

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label="ether" 
                    labelPosition='right'
                    val={value}
                    onChange={event => setValue(event.target.value)}
                    />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage} />
            <Button primary loading={loading}>Contribute!</Button>
        </Form>
    );
}

export default ContributeForm;