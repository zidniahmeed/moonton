import SubscriptionCard from "@/Components/SubscriptionCard";
import Authenticated from "@/Layouts/Authenticated/Index";

export default function SubscriptionPlan() {
    return (
        <Authenticated>
            <div className="ml-[300px] px-[50px]">
                <div className="py-20 flex flex-col items-center">
                    <div className="text-black font-semibold text-[26px] mb-3">
                        Pricing for Everyone
                    </div>
                    <p className="text-base text-gray-1 leading-7 max-w-[302px] text-center">
                        Invest your little money to get a whole new experiences
                        from movies.
                    </p>

                    {/* Pricing Card */}
                    <div className="flex justify-center gap-10 mt-[70px]">
                        <SubscriptionCard
                            name="Basic"
                            price={290000}
                            durationInMonth={3}
                            features={[
                                "features 1",
                                "features 2",
                                "features 3",
                                "features 4",
                            ]}
                        />
                        <SubscriptionCard
                            ispremium
                            name="Premium"
                            price={290000}
                            durationInMonth={3}
                            features={[
                                "features 1",
                                "features 2",
                                "features 3",
                                "features 4",
                            ]}
                        />
                    </div>
                    {/* /Pricing Card */}
                </div>
                {/* END: Content */}
            </div>
        </Authenticated>
    );
}
