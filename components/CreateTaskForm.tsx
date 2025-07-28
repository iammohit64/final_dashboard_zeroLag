// Example: components/CreateTaskForm.tsx

"use client";

import { useState, useEffect } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseEther, decodeEventLog } from "viem"; // <-- 1. IMPORT decodeEventLog
import { taskStakingAbi } from "@/lib/abi"; // Make sure this path is correct

// Use the deployed address from your terminal output
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function CreateTaskForm() {
  const { address } = useAccount();
  const { data: hash, writeContract, isPending } = useWriteContract();

  // State for the form
  const [deadline, setDeadline] = useState(""); // e.g., "2025-12-31T23:59"
  const [stake, setStake] = useState("0.1"); // e.g., "0.1"

  // Function to call the smart contract
  const handleCreateTask = async () => {
    if (!deadline || !stake) {
      alert("Please fill in all fields.");
      return;
    }

    // Convert deadline from HTML datetime-local input to a Unix timestamp
    const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

    // Basic check to ensure deadline is in the future
    if (deadlineTimestamp <= Math.floor(Date.now() / 1000)) {
        alert("Deadline must be in the future.");
        return;
    }

    writeContract({
      address: contractAddress,
      abi: taskStakingAbi,
      functionName: "createTask",
      args: [BigInt(deadlineTimestamp)],
      value: parseEther(stake),
    });
  };

  // Wait for the transaction to be confirmed and get the receipt
  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({ hash });

  // THIS IS THE LISTENER!

// ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  // 2. THIS IS THE CORRECTED LISTENER LOGIC
  // ▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼
  useEffect(() => {
    if (receipt && receipt.status === "success") {
      // The receipt can contain multiple logs, so we find the one we need.
      for (const log of receipt.logs) {
        try {
          // Try to decode the log using our contract's ABI.
          // This will throw an error if the log is not the 'TaskCreated' event.
          const decodedLog = decodeEventLog({
            abi: taskStakingAbi,
            eventName: "TaskCreated",
            data: log.data,
            topics: log.topics,
          });

          // If decoding succeeds, we have found our event!
          const taskId = decodedLog.args.taskId.toString();

          console.log("✅ Task Created! Task ID:", taskId);
          console.log("Frontend has the ID and is now ready to call the backend.");

          // Break the loop since we've found our event and handled it.
          break;
        } catch (error) {
          // This log was not a 'TaskCreated' event, so we ignore it and continue.
          // console.log("Skipping a log that is not TaskCreated:", error);
        }
      }
    }
  }, [receipt]);
  // ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲


  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
      <h3>Create a New Task</h3>
      <div>
        <label>Deadline: </label>
        <input
          type="datetime-local"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>
      <div style={{ marginTop: '10px' }}>
        <label>Stake Amount (ETH): </label>
        <input
          type="text"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
        />
      </div>
      <button onClick={handleCreateTask} disabled={isPending} style={{ marginTop: '15px' }}>
        {isPending ? "Confirming..." : "Create & Stake"}
      </button>

      {hash && <p>Transaction sent! Waiting for confirmation...</p>}
      {isConfirming && <p>Processing transaction...</p>}
      {receipt && receipt.status === "success" && <p style={{ color: 'green' }}>Transaction successful!</p>}
      {receipt && receipt.status === "reverted" && <p style={{ color: 'red' }}>Transaction failed!</p>}
    </div>
  );
}