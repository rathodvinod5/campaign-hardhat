import { ethers } from "ethers";
import { Card } from "semantic-ui-react";

export const RenderCardsServerComp = ({ summaryData }) => {

  const [
      minimumContribution,
      balance,
      requestsCount,
      approversCount,
      manager
    ] = summaryData;
    
    const items = [
      { 
        header: manager.toString(), 
        meta: 'Address of Manger', 
        descripion: 'Manger who created this campaign and can create requests',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: minimumContribution.toString(),
        meta: 'Minimum Contribution (wei)',
        descrption: 'You must contribute atleast this much wei to be a approver',
      },
      {
        header: requestsCount.toString(),
        meta: 'Number of Requests',
        descrption: 'A request tries to withdraw money from the contract, Request must be approved by approvers',
      },
      {
        header: approversCount.toString(),
        meta: 'Number of approvers',
        descrption: 'Number of contributers who have already donated to this campaign',
      },
      {
        header: ethers.utils.formatEther(balance.toString()),
        meta: 'Campaign balance (ether)',
        descrption: 'The balance is how much money the money is left',
      }
    ];

    

    return <Card.Group items={items} />
  }