import { NodeEnvType } from "@/app/types/environmentVariables";
import { ProtocalType } from "@/app/types/protocal";

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