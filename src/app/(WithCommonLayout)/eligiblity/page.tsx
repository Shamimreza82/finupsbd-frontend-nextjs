"use client"

import LoadingComponent from "@/components/loading/LoadingComponent";
import LoanComparison from "@/components/modules/eligiblity/PersonalLoanComponent"
import { useEffect, useState } from "react";
const EligiblityPage = () => {

  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    const data = sessionStorage.getItem('eligibilityData');
    if (data) {
      setSubmissionData(JSON.parse(data));
      // Optional: Clear storage after retrieval
      // sessionStorage.removeItem('eligibilityData');
    }
  }, []);

  if (!submissionData) return <div><LoadingComponent/></div>;
  
  console.log(submissionData)
  

  return (
    <div>
        <LoanComparison
        submissionData={submissionData}
        />
        
    </div>
  )
}

export default EligiblityPage