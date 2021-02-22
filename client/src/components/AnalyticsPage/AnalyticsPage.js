import React, { Component } from 'react';
import StatsSlider from '../Dashboard/StatsSlider/StatsSlider';
import ProductSlider from '../Dashboard/ProductSlider/ProductSlider';
import Catalog from '../Dashboard/Catalog/Catalog';
import AITool from '../Dashboard/AITool/AITool';
import Trends from '../Dashboard/Trends/Trends';
import Notifications from '../Notifications/Notifications';
import AnalyticsSaleGraph from './AnalyticsSaleGraph/AnalyticsSaleGraph';
import AnalyticsOrderGraph from './AnalyticsOrderGraph/AnalyticsOrderGraph';
import PlatformHeader from '../Publisher/PlatformHeader/PlatformHeader';
import AnalyticsCards from './AnalyticsCard/AnalyticsCard';

const platformarray = [
    { id: 1, title: "Amazon", icon: "Images/amazon.jpg" },
    { id: 2, title: "Ebay", icon: "Images/ebay.png" },
    { id: 3, title: "Shopify", icon: "Images/shopify.png" },
    { id: 4, title: "Ali Express", icon: "Images/aliexpress.png" },
    { id: 5, title: "Magento", icon: "Images/magento.jpg" },
]

const Analyticscardarray = [
    { id: 1, title: "Product Publish on Store", change: "+3.49%", amount: "8,354,838" },
    { id: 1, title: "Product Sold Store", change: "-0.42%", amount: "6,586,452" },
    { id: 1, title: "Product Views", change: "+7.54", amount: "6,054,254" },
]


class AnalyticsPage extends Component {

    handleSubmit = () => {
        this.props.changeHandler(true);
    }

    render() {

        return (
            <div className="mt-3 ml-2">
                <div className="bg-white mb-3">
                    <ul className="publisherheadermain">
                        {platformarray.map((platform, i) =>
                            <PlatformHeader id={platform.id}
                                title={platform.title}
                                icon={platform.icon}
                            />
                        )}
                    </ul>
                </div>
                <div className="row">

                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-md-3">
                                <div>
                                    {Analyticscardarray.map((card, i) =>
                                        <AnalyticsCards id={card.id}
                                            title={card.title}
                                            change={card.change}
                                            amount={card.amount}   
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <AnalyticsSaleGraph />
                            </div>

                            <div className="col-md-3">
                                <AnalyticsOrderGraph />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-12">
                                <StatsSlider />
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col-md-5">
                                <ProductSlider />
                            </div>
                            <div className="col-md-4">
                                <Catalog />
                                <AITool />
                            </div>
                            <div className="col-md-3">
                                <Trends />
                            </div>
                        </div>

                    </div>


                    <div className="col-md-2">
                        <Notifications />
                    </div>

                </div>

            </div>
        );

    }
}

export default AnalyticsPage;
