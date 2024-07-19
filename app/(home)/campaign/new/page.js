"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Form, FormField, Input, Message, Header } from 'semantic-ui-react';
import { useFacoryContext } from '@/app/context/factoryContext';

const NewCampaign = () => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const { factoryContract } = useFacoryContext();
    const { router } = useRouter();

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        try {
            await factoryContract.createCampaign(parseInt(value));
            router.push('/');
        } catch (error) {
            const message = error.message.includes('user rejected') ? 'User Rejected the transaction!' : error.message;
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    } 

    return (
        <div>
            <Header as='h2'>Create a Campaign</Header>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <FormField>
                    <label>Minimum Contributin</label>
                    <Input 
                        label="wei" 
                        labelPosition='right' 
                        value={value} 
                        type='number'
                        onChange={event => setValue(event.target.value)}
                    />
                </FormField>

                <Message error header="Oops!" content={errorMessage} />
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </div>
    );
}

export default NewCampaign;