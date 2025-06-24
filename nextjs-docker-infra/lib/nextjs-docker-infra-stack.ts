import * as cdk from "aws-cdk-lib";
import * as ecr from "aws-cdk-lib/aws-ecr";
import * as apprunner from "aws-cdk-lib/aws-apprunner";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";

export class NextjsDockerInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECRリポジトリ
    const repository = ecr.Repository.fromRepositoryName(
      this,
      "NextjsDockerRepo",
      "nextjs-docker"
    );

    // App Runner用のIAMロール
    const appRunnerRole = new iam.Role(this, "AppRunnerServiceRole", {
      assumedBy: new iam.ServicePrincipal("build.apprunner.amazonaws.com"),
    });

    // ECRへのアクセス権限を付与
    repository.grantPull(appRunnerRole);

    // App Runnerサービス
    const appRunnerService = new apprunner.CfnService(
      this,
      "NextjsAppRunnerService",
      {
        serviceName: "nextjs-docker-app-cdk", // ここを変更
        sourceConfiguration: {
          authenticationConfiguration: {
            accessRoleArn: appRunnerRole.roleArn,
          },
          imageRepository: {
            imageIdentifier: `${repository.repositoryUri}:latest`,
            imageRepositoryType: "ECR",
            imageConfiguration: {
              port: "3000",
              runtimeEnvironmentVariables: [
                { name: "NODE_ENV", value: "production" },
              ],
            },
          },
        },
        instanceConfiguration: {
          cpu: "1 vCPU",
          memory: "2 GB",
        },
      }
    );
  }
}
