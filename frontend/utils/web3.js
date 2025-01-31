import { ethers } from "ethers";
import VotingABI from "../artifacts/contracts/Voting.sol/Voting.json";

const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";

export const getVotingContract = () => {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return new ethers.Contract(contractAddress, VotingABI.abi, signer);
    }
    return null;
};
