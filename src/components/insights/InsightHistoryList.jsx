import InsightCard from "./InsightCard";
import stagger from "../../animation/stagger";

export default function InsightHistoryList({ insights = [] }) {
  return (
    <div className="insight-list">
      {insights.map((insight, index) => (
        <InsightCard
          key={insight._id}
          insight={insight}
          className="enter-row"
          style={{ "--enter-delay": `${stagger(index, { step: 60 })}ms` }}
        />
      ))}
    </div>
  );
}
