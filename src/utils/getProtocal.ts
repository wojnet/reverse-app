import { NodeEnvType } from "@/types/environmentVariables";
import { ProtocalType } from "@/types/protocal";

export const getProtocal = (environment: NodeEnvType): ProtocalType => {
  switch(environment) {
    case "development":
      return "http";
    case "production":
      return "https";
    default:
      return "https";
  }
}