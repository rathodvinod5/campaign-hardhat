'use client';
import React from 'react';
import { Button, Table, TableCell,
    TableBody, TableRow, } from 'semantic-ui-react';
import { ethers } from 'ethers';

const RequestRow = ({ id, address, request, approversCount, campaign }) => {

    const onApprove = async () => {
        console.log('in onApprove ');
        try {
            await campaign.approveRequest(id);
        } catch(error) {
            console.log('error: ', error.message)
        }
    }

    const onFinalize = async () => {
        console.log('in onApprove ');
        try {
            await campaign.finalizeRequest(id);
        } catch(error) {
            console.log('error: ', error.message)
        }
    }

    const { Row, Cell } = Table;
    let [
        description, 
        value, 
        recipient, 
        complete, 
        approvalCount 
     ] = request;

    description = description.toString();
    value = value.toString();
    recipient = recipient.toString();
    complete = Boolean(complete.toString());
    approvalCount = approvalCount.toString(); 

    const readyToFinalize = approvalCount > approvalCount / 2;

    // console.log('Rneder row: ', description, value, recipient, complete, approvalCount)

    return (
        <TableRow disabled={complete} positive={readyToFinalize && !complete}>
            <TableCell>{id}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{value}</TableCell>
            <TableCell>{recipient}</TableCell>
            <TableCell>{approvalCount}/{approversCount}</TableCell>
            <TableCell>
                {!complete ? (
                    <Button onClick={onApprove} basic color='green'>
                        Approve
                    </Button>
                ) : null}
            </TableCell>
            <TableCell>
                {!complete ? (
                    <Button onClick={onFinalize} basic color='teal'>
                        Finalize
                    </Button>
                ) : null}
            </TableCell>
        </TableRow>
    );
}

export default RequestRow;