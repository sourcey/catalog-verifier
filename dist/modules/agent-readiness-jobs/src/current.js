import { AGENT_READINESS_JOB_LIBRARY_SOURCE, sealAgentReadinessJobLibrary } from "./index.js";
/**
 * The library this code installs: new declarations are checked against its jobs. Sealed here,
 * apart from the library's definitions, so a browser that reads the jobs never computes a digest.
 */
export const currentAgentReadinessJobLibrary = sealAgentReadinessJobLibrary(AGENT_READINESS_JOB_LIBRARY_SOURCE);
//# sourceMappingURL=current.js.map