import Debug from "debug";
import { ResolverContext, SubResolver } from "../resolvers";
import { BacktrackFsResolver } from "../resolvers/backtrackfsresolver";
const debug = Debug("resolverengine:ethpmresolver");

// 1st group - package name
// 2nd group - contract path
const FILE_LOCATION_REGEX = /^([^/]+)\/(.+)$/;

const prefixTruffle = "installed_contracts";
const prefix0x = "contracts";

export function EthPmResolver(): SubResolver {
  const backtrackT = BacktrackFsResolver(prefixTruffle);
  const backtrack0x = BacktrackFsResolver(prefix0x);

  return async (what: string, ctx: ResolverContext): Promise<string | null> => {
    const fileMatch = what.match(FILE_LOCATION_REGEX);
    if (!fileMatch) {
      return null;
    }

    let result = await backtrackT(what, ctx);
    if (result) {
      debug("Resolved %s to %s", what, result);
      return result;
    }

    result = await backtrack0x(what, ctx);
    if (result) {
      debug("Resolved %s to %s", what, result);
      return result;
    }

    return null;
  };
}
