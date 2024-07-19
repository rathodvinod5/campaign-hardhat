"use client"
import Link from "next/link";
import { useParams } from 'next/navigation';
import { Button, Header } from "semantic-ui-react";

const Requests = () => {

    const param = useParams();
    const { campId } = param;

    return (
        <div>
            <Header as="h3">Request List</Header>
            <Link href={`/campaign/${campId}/requests/new`}>
                <Button primary>Create Request</Button>
            </Link>
        </div>
    );
}

export default Requests;