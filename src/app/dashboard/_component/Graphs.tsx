import ServiceSection from "./ServiceSection";
import SubscriptionGraph from "./Subscription";

export function BarGraph() {
  return (
    <div className="grid grid-cols-1 px-5 gap-x-5 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 sm:gap-y-3 md:gap-y-3 gap-y-5">
      <ServiceSection />  
      <SubscriptionGraph />
    </div>
  );
}
