import { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";

export const RenderCardsServerComp = ({ factoryContract }) => {
    const [summaryData, setSummaryData] = useState(null);


    useEffect(() => {
      console.log('in useEffect of RenderCardsServerComp');
      if(!summaryData) {
        getSummaryDataFromContract();
      }
    }, [summaryData]);

    const getSummaryDataFromContract = async () => {
      const { 
          balance,
          manager,
          minimumContribution,
          requestsCount,
          approversCount 
      } = await factoryContract.methods.getSummary();

      const newObject = {
        balance: balance,
        manager: manager,
        minimumContribution: minimumContribution,
        requestsCount: requestsCount,
        approversCount: approversCount 
      }
      setSummaryData(newObject);
    }

    if(!summaryData) return null;

    
    const items = [
      { 
        header: summaryData.manager, 
        meta: 'Address of Manger', 
        descripion: 'Manger who created this campaign and can create requests',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: summaryData.minimumContribution,
        meta: 'Minimum Contribution (wei)',
        descrption: 'You must contribute atleast this much wei to be a approver',
      },
      {
        header: summaryData.requestsCount,
        meta: 'Number of Requests',
        descrption: 'A request tries to withdraw money from the contract, Request must be approved by approvers',
      },
      {
        header: summaryData.approversCount,
        meta: 'Number of approvers',
        descrption: 'Number of contributers who have already donated to this campaign',
      },
      {
        header: web3.utils.fromWei(summaryData.balance, 'ether'),
        meta: 'Cmapaign balance (ether)',
        descrption: 'The balance is how much money the money is left',
      }
    ];

    

    return <Card.Group items={items} />
  }