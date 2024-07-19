import Link from "next/link";
import { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

export const RenderCampaignList = ({ factoryContract }) => {
    const [campaigns, setCampaigns] = useState([]);

    useEffect(() => {
      console.log('in useEffect of RenderList');
      if(!campaigns.length) {
        getSummaryDataFromContract();
      }
    }, []);

    const getSummaryDataFromContract = async () => {
        console.log('in getSummaryDataFromContract')
        try {
            const campaignList = await factoryContract.getDeployedCampaigns();
            console.log('deployed campaigns: ', campaignList)
            setCampaigns(campaignList);
        } catch(error) {
            console.log('error while fetching campaign list: ', error.message)
        }
        
    }

    const items = campaigns.map(address => {
        return {
          header: address,
          description: (
            <Link href={`/campaign/${address}`}>
              <p className="text-sky-500">View Campaign</p>
            </Link>
          ),
          fluid: true
        };
      });
  
    return <Card.Group items={items} />;
  }

  export default RenderCampaignList;