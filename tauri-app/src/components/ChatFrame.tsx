import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

// Main ChatFrame Component
export const ChatFrame = () => {
    const [question, setQuestion] = useState<string[]>([]);
    const [answer, setAnswer] = useState<string[]>([]);
    const [userQuestion, setUserQuestion] = useState<string>("");
    const [pending, setPending] = useState(false);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [controller, setController] = useState<AbortController | null>(null);

    // Function to ask AI
    async function ask_ai(q: string) {
        if (pending) return;

        const newController = new AbortController();
        setController(newController); // Store the controller to allow aborting
        setPending(true);
        setStartTime(Date.now()); // Capture start time
        setQuestion((prev) => [...prev, q]);
        setAnswer((prev) => [...prev, "pending"]);

        const timeoutMs = 600_000;
        const timeoutPromise = new Promise<string>((_, reject) =>
            setTimeout(() => reject(new Error("Timeout after 10 minutes")), timeoutMs)
        );

        try {
            const response = await Promise.race([
                invoke("talk_with_ai", { message: q, signal: newController.signal }) as Promise<string>,
                timeoutPromise
            ]);

            setAnswer((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = response;
                return updated;
            });
        } catch (err) {
            setAnswer((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] =
                    err instanceof Error ? err.message : "Unknown error";
                return updated;
            });
        }

        setPending(false);
    }

    // Function to abort the AI request
    const abortRequest = () => {
        if (controller) {
            controller.abort();
            setAnswer((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = "Request aborted by user";
                return updated;
            });
            setPending(false); // Stop the pending state
        }
    };

    return (
        <div className="flex flex-col h-screen px-2 py-2">
            <div id="main-display" className="flex-1 overflow-y-auto bg-gray-200 p-2 rounded-md">
                {question.map((q, i) => (
                    <div key={i}>
                        <MessageDisplay data={q} />
                        {answer[i] && startTime !== null && (
                            <ResponseDisplay data={answer[i]} startTime={startTime} />
                        )}
                    </div>
                ))}
            </div>
            <div className="mt-2">
                <ChatInput
                    userQuestion={userQuestion}
                    setUserQuestion={setUserQuestion}
                    ask_ai={ask_ai}
                    disabled={pending}
                    abortRequest={abortRequest} // Pass abort function to input component
                />
            </div>
        </div>
    );
};

// ChatInput Component (Input and Buttons)
type ChatInputProps = {
    userQuestion: string;
    setUserQuestion: (val: string) => void;
    ask_ai: (q: string) => void;
    disabled: boolean;
    abortRequest: () => void; // New prop for aborting the request
};

export const ChatInput = ({
    userQuestion,
    setUserQuestion,
    ask_ai,
    disabled,
    abortRequest
}: ChatInputProps) => {
    return (
        <div className="w-full bg-blue-200 rounded-md px-2 py-2 flex items-center gap-2 justify-between">
            <input
                placeholder="Ask Ai?"
                className="w-3/4 px-2 py-1 rounded"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                disabled={disabled}
            />
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded flex justify-center items-center disabled:opacity-50"
                onClick={() => {
                    ask_ai(userQuestion);
                    setUserQuestion("");
                }}
                disabled={disabled || !userQuestion.trim()}
            >
                Send
            </button>
            {disabled && (
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded flex justify-center items-center"
                    onClick={abortRequest}
                >
                    Abort
                </button>
            )}
        </div>
    );
};

// MessageDisplay Component (Displays User Messages)
export const MessageDisplay = ({ data }: { data: string }) => {
    return (
        <div className="bg-green-300 text-black mt-2 text-right rounded-md px-2 w-fit ml-auto">
            <p>{data}</p>
        </div>
    );
};

// ResponseDisplay Component (Displays AI Responses with Timer)
export const ResponseDisplay = ({ data, startTime }: { data: string; startTime: number }) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    useEffect(() => {
        if (data === "pending") {
            const interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 60000)); // minutes
            }, 60000); // Update every minute

            return () => clearInterval(interval); // Clean up on unmount
        }
    }, [data, startTime]);

    if (data === "pending") {
        return (
            <div className="bg-blue-300 text-black mt-2 text-left rounded-md px-3 py-2 w-fit">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                {elapsedTime > 0 && (
                    <span className="text-xs text-gray-600 ml-2">Waiting for response: {elapsedTime} min</span>
                )}
            </div>
        );
    }

    return (
        <div className="bg-blue-300 text-black mt-2 text-left rounded-md px-2 w-fit">
            <p>{data}</p>
        </div>
    );
};
