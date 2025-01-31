import { useState, useEffect } from "react";
import { getVotingContract } from "../utils/web3";

export default function Home() {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            const contract = getVotingContract();
            if (contract) {
                const count = await contract.candidatesCount();
                let tempCandidates = [];
                for (let i = 0; i < count; i++) {
                    const candidate = await contract.getCandidate(i);
                    tempCandidates.push({ name: candidate[0], votes: candidate[1].toString() });
                }
                setCandidates(tempCandidates);
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div>
            <h1>Decentralized Voting</h1>
            <ul>
                {candidates.map((candidate, index) => (
                    <li key={index}>{candidate.name} - {candidate.votes} votes</li>
                ))}
            </ul>
        </div>
    );
}
