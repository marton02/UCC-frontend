import Echo from "laravel-echo";

export default interface IEchoContextValue{
    echo: Echo<"reverb"> | null;
    isReady: boolean;
};