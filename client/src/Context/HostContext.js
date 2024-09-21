import { createContext } from "react";

const HostContext = createContext(
    {
        host: 'http://localhost:8000',
        setHost: () => {},
    }
);

export default HostContext;