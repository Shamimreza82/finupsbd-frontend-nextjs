"use client";

import LoadingComponent from "@/components/loading/LoadingComponent";
import LoanEligiblityComparison from "@/components/modules/eligiblity/LoanEligiblityComparison";
import { useEffect, useState } from "react";




const EligiblityPage = () => {
  const [submissionData, setSubmissionData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = sessionStorage.getItem("eligibilityData");
        if (data) {
          const parsedData = JSON.parse(data);
          setSubmissionData(parsedData);
  
          // Await the fetch response and parse it
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/eligibility-check`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(parsedData),
            }
          );
          const result = await res.json();
          console.log(result);
        }
      } catch (error) {
        console.error("Error parsing eligibility data:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  if (isLoading) {
    return <LoadingComponent />;
  }


  console.log(submissionData)

  return (
    <div>
      {submissionData ? (
        <LoanEligiblityComparison submissionData={submissionData} />
      ) : (
        <div className="text-center py-8">
          <p>No eligibility data found. Please complete the eligibility check first.</p>
        </div>
      )}
    </div>
  );
};

export default EligiblityPage;